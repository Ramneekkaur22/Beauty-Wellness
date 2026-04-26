// ============================================================
// routes/reviewRoutes.js
// ============================================================
const express = require('express');
const router = express.Router();
const { addReview, getReviews, getAllReviews, deleteReview, updateReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllReviews);
router.post('/', protect, addReview);
router.get('/:serviceId', getReviews);
router.delete('/:id', protect, deleteReview);
router.put('/:id', protect, updateReview);

module.exports = router;
