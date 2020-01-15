// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const productController = require('../controllers/productController');

/* GET - home page. */

router.get('/productList', productController.list);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productAdd);


module.exports = router;