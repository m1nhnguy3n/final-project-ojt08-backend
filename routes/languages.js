const express = require('express');
const router = express.Router();

const languageController = require('../controllers/LanguageController');

router.post('/', languageController.createLanguage);

router.get('/', languageController.getCurrentLanguage);

router.patch('/', languageController.updateLanguage);

module.exports = router;
