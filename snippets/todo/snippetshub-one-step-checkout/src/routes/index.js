const express = require('express');
const router = express.Router();
const { YourController } = require('../controllers/index');

// Define your routes here
router.get('/', YourController.getHome);
router.post('/submit', YourController.submitForm);

module.exports = router;