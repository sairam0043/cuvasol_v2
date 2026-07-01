import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = model('Testimonial', testimonialSchema);
