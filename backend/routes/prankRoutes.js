const express = require('express');
const router = express.Router();

// controllers
const prankController = require('../controllers/prankController');

// routes
router.get('/record', prankController.record);
router.get('/recordFinished', prankController.recordFinished);
router.get('/detect', prankController.detect);

module.exports = router;