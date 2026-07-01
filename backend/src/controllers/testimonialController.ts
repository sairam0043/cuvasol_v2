import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial.js';
import { isDbConnected, mockTestimonials } from '../services/mockDb.js';

// @desc    Get all testimonials
// @route   GET /api/v1/testimonials
// @access  Public
export const getTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { featured } = req.query;

    if (!isDbConnected()) {
      let filtered = mockTestimonials;
      if (featured === 'true') {
        filtered = mockTestimonials.filter(t => t.isFeatured === true);
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    const query: any = {};
    if (featured === 'true') {
      query.isFeatured = true;
    }
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/v1/testimonials
// @access  Private/Admin
export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, role, company, text, rating, isFeatured, avatar } = req.body;
    const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

    if (!isDbConnected()) {
      const newTest = {
        _id: 't_' + Math.random().toString(36).substring(2, 9),
        name,
        role,
        company,
        text,
        rating: rating || 5,
        isFeatured: isFeatured || false,
        avatar: avatar || defaultAvatar,
        createdAt: new Date().toISOString()
      };
      mockTestimonials.push(newTest);
      return res.status(201).json({ success: true, data: newTest });
    }
    
    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      text,
      rating: rating || 5,
      isFeatured: isFeatured || false,
      avatar: avatar || defaultAvatar,
    });
    
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/v1/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockTestimonials.findIndex(t => t._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Testimonial not found (mock)' });
      }
      mockTestimonials[idx] = { ...mockTestimonials[idx], ...req.body };
      return res.status(200).json({ success: true, data: mockTestimonials[idx] });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/v1/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockTestimonials.findIndex(t => t._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Testimonial not found (mock)' });
      }
      mockTestimonials.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Testimonial deleted successfully (mock)' });
    }

    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};
