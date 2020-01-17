// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const productController = require('../controllers/productController');

/* GET - home page. */

router.get('/productList', productController.list);
router.get('/productEditList', productController.editList);
router.get('/productEdit/:idProduct', productController.editProduct);
router.put('/productEdit/', productController.updateProduct);
router.delete('/productDelete/:idProduct', productController.deleteProduct);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productAdd);
router.post('/productAdd', productController.productSave);


module.exports = router;