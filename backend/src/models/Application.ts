import { Schema, model } from 'mongoose';

const applicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roleAppliedFor: {
      type: String,
      required: [true, 'Please provide the target role or job title'],
    },
    status: {
      type: String,
      enum: ['applied', 'reviewing', 'accepted', 'rejected'],
      default: 'applied',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    coverLetter: {
      type: String,
      default: '',
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Application = model('Application', applicationSchema);
