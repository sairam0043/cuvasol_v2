import mongoose from 'mongoose';

// Check if mongoose is active/connected
export const isDbConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

// In-Memory Data Arrays with Default Test Credentials
export const mockUsers: any[] = [
  {
    _id: 'u_student_test_1',
    name: 'Alex Student',
    email: 'student@cuvasol.com',
    password: 'password123',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alex+Student',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'u_admin_test_1',
    name: 'Sarah Admin',
    email: 'admin@cuvasol.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah+Admin',
    createdAt: new Date().toISOString()
  }
];

export const mockPrograms: any[] = [];
export const mockBlogs: any[] = [];
export const mockTestimonials: any[] = [];
export const mockApplications: any[] = [];
export const mockInterviews: any[] = [];
