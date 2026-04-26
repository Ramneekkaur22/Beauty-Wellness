// ============================================================
// models/Service.js — Beauty service schema & model
// ============================================================
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Hair Care',
        'Skin Care',
        'Nail Art',
        'Makeup',
        'Spa & Massage',
        'Eyebrows & Lashes',
        'Wellness',
        'Men Grooming',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    duration: {
      type: Number, // in minutes
      required: [true, 'Duration is required'],
      min: [5, 'Duration must be at least 5 minutes'],
    },
    image: {
      type: String,
      default: '',
    },
    provider: {
      type: String,
      required: [true, 'Provider name is required'],
    },
    location: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Text index for search
serviceSchema.index({ title: 'text', description: 'text', category: 'text', provider: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
