import { Response, NextFunction } from 'express';
import { Application } from '../models/Application.js';
import { AuthRequest } from '../middleware/auth.js';
import { isDbConnected, mockApplications } from '../services/mockDb.js';

// @desc    Submit application for placement/hiring
// @route   POST /api/v1/applications
// @access  Private
export const createApplication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, email, roleAppliedFor, resumeUrl, coverLetter, experienceYears } = req.body;

    if (!isDbConnected()) {
      const newApp = {
        _id: 'app_' + Math.random().toString(36).substring(2, 9),
        userId: req.user.id,
        name: name || req.user.name,
        email: email || req.user.email,
        roleAppliedFor,
        resumeUrl: resumeUrl || '',
        coverLetter: coverLetter || '',
        experienceYears: experienceYears || 0,
        status: 'applied',
        createdAt: new Date().toISOString()
      };
      mockApplications.push(newApp);
      return res.status(201).json({ success: true, data: newApp });
    }

    const application = await Application.create({
      userId: req.user.id,
      name,
      email,
      roleAppliedFor,
      resumeUrl,
      coverLetter,
      experienceYears: experienceYears || 0,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications (Admin: all, Student: user's own)
// @route   GET /api/v1/applications
// @access  Private
export const getApplications = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      let filtered = mockApplications;
      if (req.user.role !== 'admin') {
        filtered = mockApplications.filter(a => a.userId === req.user.id);
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    let query = {};
    if (req.user.role !== 'admin') {
      query = { userId: req.user.id };
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PUT /api/v1/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { status } = req.body;

    if (!['applied', 'reviewing', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid application status value' });
    }

    if (!isDbConnected()) {
      const idx = mockApplications.findIndex(a => a._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Application not found (mock)' });
      }
      mockApplications[idx].status = status;
      return res.status(200).json({ success: true, data: mockApplications[idx] });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application
// @route   DELETE /api/v1/applications/:id
// @access  Private/Admin
export const deleteApplication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockApplications.findIndex(a => a._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Application not found (mock)' });
      }
      mockApplications.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Application deleted successfully (mock)' });
    }

    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};
