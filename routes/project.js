const express = require('express');
const router = express.Router();

const projectController = require('../controllers/ProjectController');

router.post('/', projectController.createProject);

router.get('/', projectController.getAllProjects);

router.get('/:id', projectController.getOneProject);

router.delete('/:id', projectController.deleteProject);

router.patch('/:id', projectController.updateProject);

module.exports = router;
