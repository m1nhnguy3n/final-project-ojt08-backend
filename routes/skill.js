const express = require('express');
const router = express.Router();

const skillController = require('../controllers/SkillController');

router.post('/', skillController.createSkill);

router.get('/', skillController.getAllSkill);

router.get('/:id', skillController.getOneSkill);

router.patch('/', skillController.updateSkill);

module.exports = router;
