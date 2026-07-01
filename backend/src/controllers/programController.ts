import { Request, Response, NextFunction } from 'express';
import { Program } from '../models/Program.js';
import { isDbConnected, mockPrograms } from '../services/mockDb.js';

// @desc    Get all programs
// @route   GET /api/v1/programs
// @access  Public
export const getPrograms = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { category } = req.query;

    if (!isDbConnected()) {
      let filtered = mockPrograms;
      if (category) {
        filtered = mockPrograms.filter(p => p.category === category);
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    const query: any = {};
    if (category) {
      query.category = category;
    }
    
    const programs = await Program.find(query);
    res.status(200).json({ success: true, count: programs.length, data: programs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single program
// @route   GET /api/v1/programs/:id
// @access  Public
export const getProgramById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const program = mockPrograms.find(p => p._id === req.params.id);
      if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found (mock)' });
      }
      return res.status(200).json({ success: true, data: program });
    }

    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// @desc    Create program
// @route   POST /api/v1/programs
// @access  Private/Admin
export const createProgram = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const newProgram = {
        _id: 'p_' + Math.random().toString(36).substring(2, 9),
        ...req.body,
        syllabus: req.body.syllabus || [],
        projects: req.body.projects || [],
        image: req.body.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
        createdAt: new Date().toISOString()
      };
      mockPrograms.push(newProgram);
      return res.status(201).json({ success: true, data: newProgram });
    }

    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// @desc    Update program
// @route   PUT /api/v1/programs/:id
// @access  Private/Admin
export const updateProgram = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockPrograms.findIndex(p => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Program not found (mock)' });
      }
      mockPrograms[idx] = { ...mockPrograms[idx], ...req.body };
      return res.status(200).json({ success: true, data: mockPrograms[idx] });
    }

    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete program
// @route   DELETE /api/v1/programs/:id
// @access  Private/Admin
export const deleteProgram = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockPrograms.findIndex(p => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Program not found (mock)' });
      }
      mockPrograms.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Program deleted successfully (mock)' });
    }

    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.status(200).json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    next(error);
  }
};
