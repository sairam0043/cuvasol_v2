import { Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { Program } from '../models/Program.js';
import { Blog } from '../models/Blog.js';
import { Application } from '../models/Application.js';
import { Interview } from '../models/Interview.js';
import { Testimonial } from '../models/Testimonial.js';
import { AuthRequest } from '../middleware/auth.js';
import { 
  isDbConnected, mockUsers, mockPrograms, mockBlogs, 
  mockApplications, mockInterviews, mockTestimonials 
} from '../services/mockDb.js';

// @desc    Get student dashboard analytics
// @route   GET /api/v1/analytics/student
// @access  Private
export const getStudentAnalytics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.user.id;

    if (!isDbConnected()) {
      const studentInterviews = mockInterviews.filter(i => i.userId === userId);
      const completedInterviews = studentInterviews.filter(i => i.status === 'completed');
      
      let avgInterviewScore = 0;
      if (completedInterviews.length > 0) {
        const sum = completedInterviews.reduce((acc, curr) => acc + (curr.score || 0), 0);
        avgInterviewScore = Math.round(sum / completedInterviews.length);
      }

      const studentApps = mockApplications.filter(a => a.userId === userId);
      const pendingReviewCount = studentApps.filter(a => a.status === 'applied' || a.status === 'reviewing').length;
      const acceptedCount = studentApps.filter(a => a.status === 'accepted').length;

      return res.status(200).json({
        success: true,
        data: {
          interviews: {
            total: studentInterviews.length,
            completed: completedInterviews.length,
            avgScore: avgInterviewScore
          },
          placements: {
            totalApplied: studentApps.length,
            pending: pendingReviewCount,
            accepted: acceptedCount,
            list: studentApps
          },
          programs: {
            activeCount: 2,
            courses: [
              { name: 'Experiential Learning Simulation', progress: 75 },
              { name: 'Skill Dev: Advanced React & TypeScript', progress: 40 }
            ]
          }
        }
      });
    }

    // Mongoose standard path
    const interviews = await Interview.find({ userId });
    const completedInterviews = interviews.filter(i => i.status === 'completed');
    const totalInterviews = interviews.length;
    
    let avgInterviewScore = 0;
    if (completedInterviews.length > 0) {
      const sum = completedInterviews.reduce((acc, curr) => acc + (curr.score || 0), 0);
      avgInterviewScore = Math.round(sum / completedInterviews.length);
    }

    const applications = await Application.find({ userId });
    const appliedRolesCount = applications.length;
    const pendingReviewCount = applications.filter(a => a.status === 'applied' || a.status === 'reviewing').length;
    const acceptedCount = applications.filter(a => a.status === 'accepted').length;

    res.status(200).json({
      success: true,
      data: {
        interviews: {
          total: totalInterviews,
          completed: completedInterviews.length,
          avgScore: avgInterviewScore
        },
        placements: {
          totalApplied: appliedRolesCount,
          pending: pendingReviewCount,
          accepted: acceptedCount,
          list: applications
        },
        programs: {
          activeCount: 2,
          courses: [
            { name: 'Experiential Learning Simulation', progress: 75 },
            { name: 'Skill Dev: Advanced React & TypeScript', progress: 40 }
          ]
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin dashboard analytics
// @route   GET /api/v1/analytics/admin
// @access  Private/Admin
export const getAdminAnalytics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const registrationsTimeline = [
      { month: 'Jan', signups: 45, interviews: 12 },
      { month: 'Feb', signups: 80, interviews: 30 },
      { month: 'Mar', signups: 120, interviews: 65 },
      { month: 'Apr', signups: 160, interviews: 90 },
      { month: 'May', signups: 220, interviews: 140 },
      { month: 'Jun', signups: 310, interviews: 210 },
    ];

    if (!isDbConnected()) {
      const totalUsers = mockUsers.length;
      const studentUsers = mockUsers.filter(u => u.role === 'student').length;
      const adminUsers = mockUsers.filter(u => u.role === 'admin').length;

      const totalPrograms = mockPrograms.length;
      const activePrograms = mockPrograms.filter(p => p.isActive === true).length;

      const totalBlogs = mockBlogs.length;
      const publishedBlogs = mockBlogs.filter(b => b.status === 'published').length;

      const totalApps = mockApplications.length;
      const appliedApps = mockApplications.filter(a => a.status === 'applied').length;
      const reviewingApps = mockApplications.filter(a => a.status === 'reviewing').length;
      const acceptedApps = mockApplications.filter(a => a.status === 'accepted').length;
      const rejectedApps = mockApplications.filter(a => a.status === 'rejected').length;

      const totalInts = mockInterviews.length;
      const completedInts = mockInterviews.filter(i => i.status === 'completed').length;

      return res.status(200).json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            students: studentUsers,
            admins: adminUsers
          },
          programs: {
            total: totalPrograms,
            active: activePrograms
          },
          blogs: {
            total: totalBlogs,
            published: publishedBlogs
          },
          applications: {
            total: totalApps,
            applied: appliedApps,
            reviewing: reviewingApps,
            accepted: acceptedApps,
            rejected: rejectedApps
          },
          interviews: {
            total: totalInts,
            completed: completedInts
          },
          testimonials: {
            total: mockTestimonials.length
          },
          timeline: registrationsTimeline
        }
      });
    }

    // Mongoose standard path
    const totalUsers = await User.countDocuments();
    const studentUsers = await User.countDocuments({ role: 'student' });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    const totalPrograms = await Program.countDocuments();
    const activePrograms = await Program.countDocuments({ isActive: true });
    
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });

    const totalApplications = await Application.countDocuments();
    const appliedApps = await Application.countDocuments({ status: 'applied' });
    const reviewingApps = await Application.countDocuments({ status: 'reviewing' });
    const acceptedApps = await Application.countDocuments({ status: 'accepted' });
    const rejectedApps = await Application.countDocuments({ status: 'rejected' });

    const totalInterviews = await Interview.countDocuments();
    const completedInterviews = await Interview.countDocuments({ status: 'completed' });

    const totalTestimonials = await Testimonial.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: studentUsers,
          admins: adminUsers
        },
        programs: {
          total: totalPrograms,
          active: activePrograms
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs
        },
        applications: {
          total: totalApplications,
          applied: appliedApps,
          reviewing: reviewingApps,
          accepted: acceptedApps,
          rejected: rejectedApps
        },
        interviews: {
          total: totalInterviews,
          completed: completedInterviews
        },
        testimonials: {
          total: totalTestimonials
        },
        timeline: registrationsTimeline
      }
    });
  } catch (error) {
    next(error);
  }
};
