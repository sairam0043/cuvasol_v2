import { Schema, model } from 'mongoose';

const programSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a program title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a program description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Experiential Learning',
        'Skill Development',
        'AI Interview Preparation',
        'Talent Acquisition',
        'Career Readiness',
        'Employer Solutions',
        'Student Programs',
        'Placement Support',
      ],
    },
    duration: {
      type: String,
      required: [true, 'Please specify duration (e.g. 6 Weeks)'],
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    syllabus: [
      {
        week: Number,
        topic: String,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        techStack: [String],
      },
    ],
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Program = model('Program', programSchema);
