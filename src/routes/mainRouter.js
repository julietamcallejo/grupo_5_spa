// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/index', mainController.root);
router.get('/contact', mainController.contact);

router.get('/register', mainController.register);

router.get('/appointment', mainController.appointment);

module.exports = router;