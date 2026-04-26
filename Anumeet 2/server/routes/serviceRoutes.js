// ============================================================
// routes/serviceRoutes.js
// ============================================================
const express = require('express');
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/seed', protect, adminOnly, async (req, res) => {
  try {
    const Service = require('../models/Service');
    const { SERVICES } = require('../seeder.js');
    await Service.deleteMany({});
    await Service.insertMany(SERVICES);
    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get('/:id', getService);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
