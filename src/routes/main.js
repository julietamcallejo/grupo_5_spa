// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/contact', mainController.contact);
router.get('/productList', productController.list);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', mainController.productCart);
router.get('/register', mainController.register);
router.get('/productAdd', mainController.productAdd);
router.get('/navBar', mainController.test);
router.get('/navBar2', mainController.test2);

module.exports = router;