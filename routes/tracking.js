const express = require('express');
const router = express.Router();

const trackController = require('../controllers/TrackingController');

router.post('/', trackController.createTracking);

router.get('/', trackController.getAllTracking);

router.get('/:id', trackController.getOneTracking);

router.patch('/', trackController.updateTracking);

module.exports = router;
