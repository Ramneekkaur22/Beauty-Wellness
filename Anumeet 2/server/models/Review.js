// ============================================================
// models/Review.js — Review schema & model
// ============================================================
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      minlength: [10, 'Comment must be at least 10 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// One review per user per service
reviewSchema.index({ user: 1, service: 1 }, { unique: true });

// After save — update service average rating
reviewSchema.post('save', async function () {
  const Service = require('./Service');
  const reviews = await this.constructor.find({ service: this.service });
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await Service.findByIdAndUpdate(this.service, {
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  });
});

// After delete — update service average rating
reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const Service = require('./Service');
    const Review = doc.constructor;
    const reviews = await Review.find({ service: doc.service });
    const avg =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    await Service.findByIdAndUpdate(doc.service, {
      rating: Math.round(avg * 10) / 10,
      reviewCount: reviews.length,
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
