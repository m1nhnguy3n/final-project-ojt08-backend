const express = require('express');
const router = express.Router();

const positionController = require('../controllers/PositionController');

router.post('/', positionController.createPosition);

router.get('/', positionController.getAllPosition);

router.get('/:id', positionController.getOnePosition);

router.patch('/', positionController.updatePosition);

module.exports = router;
