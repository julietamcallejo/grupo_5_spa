// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/index', mainController.root);
router.get('/contact', mainController.contact);

router.get('/appointment', mainController.appointment);

module.exports = router;