import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';

// Route files
import authRoutes from './routes/authRoutes.js';
import programRoutes from './routes/programRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Models for Seeding
import { User } from './models/User.js';
import { Program } from './models/Program.js';
import { Blog } from './models/Blog.js';
import { Testimonial } from './models/Testimonial.js';
import { isDbConnected } from './services/mockDb.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cuvasol API Service v1' });
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

export default app;
