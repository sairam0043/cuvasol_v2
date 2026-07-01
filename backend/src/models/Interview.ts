import { Schema, model } from 'mongoose';

const interviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: [true, 'Please provide an interview topic/role'],
    },
    questions: [
      {
        question: String,
        userResponse: String,
        aiFeedback: String,
        score: Number, // 1 to 10
      },
    ],
    score: {
      type: Number,
      default: 0, // 0 to 100
    },
    overallFeedback: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  }
);

export const Interview = model('Interview', interviewSchema);
