// ============================================================
// controllers/reviewController.js — Review CRUD
// ============================================================
const Review = require('../models/Review');

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      service: serviceId,
      rating: Number(rating),
      comment,
    });

    const populated = await review.populate('user', 'name avatar');
    res.status(201).json({ success: true, message: 'Review submitted!', review: populated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { rating, comment } = req.body;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.json({ success: true, message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get reviews for a service
// @route   GET /api/reviews/:serviceId
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a review (owner or admin)
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Must be owner or admin
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Review.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all reviews (global)
// @route   GET /api/reviews
// @access  Public
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name avatar')
      .populate('service', 'title')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addReview, getReviews, getAllReviews, deleteReview, updateReview };
