const express = require('express');
const router = express.Router();

// controllers
const verificaitonController = require('../controllers/verificationController');

// routes
router.get('/sendCode', verificaitonController.sendCode);
router.get('/checkCode', verificaitonController.checkCode);

module.exports = router;