import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AuthRequest } from '../middleware/auth.js';
import { isDbConnected, mockUsers } from '../services/mockDb.js';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'cuvasol_redesign_secret_jwt_2026_key', {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    if (!isDbConnected()) {
      const userExists = mockUsers.find(u => u.email === email.toLowerCase());
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists (mock)' });
      }

      const newUser = {
        _id: 'u_' + Math.random().toString(36).substring(2, 9),
        name,
        email: email.toLowerCase(),
        password, // stored plainly in mock array for direct compare
        role: role || 'student',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        createdAt: new Date().toISOString()
      };
      
      mockUsers.push(newUser);
      const token = generateToken(newUser._id);
      
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
        },
      });
    }

    // Mongoose Standard flow
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (!isDbConnected()) {
      const user = mockUsers.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials (mock)' });
      }

      // Check plaintext or hashed password
      const isMatch = user.password === password || await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials (mock)' });
      }

      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    }

    // Mongoose Standard flow
    const user: any = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth Callback Mock/API login
// @route   POST /api/v1/auth/google
// @access  Public
export const googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { googleId, email, name, avatar } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ success: false, message: 'Google credentials missing' });
    }

    if (!isDbConnected()) {
      let user = mockUsers.find(u => u.email === email.toLowerCase());
      if (!user) {
        user = {
          _id: 'u_' + Math.random().toString(36).substring(2, 9),
          name,
          email: email.toLowerCase(),
          googleId,
          role: 'student',
          avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
          createdAt: new Date().toISOString()
        };
        mockUsers.push(user);
      }
      
      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    }

    // Mongoose Standard Flow
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        if (avatar && !user.avatar) user.avatar = avatar;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        role: 'student',
      });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const user = mockUsers.find(u => u._id === req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found in mock state' });
      }
      return res.status(200).json({ 
        success: true, 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        }
      });
    }

    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
