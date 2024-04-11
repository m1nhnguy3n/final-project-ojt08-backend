const express = require('express');
const router = express.Router();

const technologyController = require('../controllers/TechnologyController');

router.post('/', technologyController.createTechnology);

router.get('/', technologyController.getAllTechnology);

router.get('/:id', technologyController.getOneTechnology);

router.patch('/', technologyController.updateTechnology);

module.exports = router;
