// ************ Require's ************
const express = require('express');
const router = express.Router();


//*** Middlewares ***/
const upload = require('../middlewares/uploadProductsMiddleware')
const productsValidator = require('../middlewares/productsValidatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// ************ Controller Require ************

const productController = require('../controllers/productController');



// **** Rutas **** //
router.get('/productList', productController.list);
router.get('/productEditList', productController.editList);
router.get('/productEdit/:idProduct', productController.editProduct);
router.put('/productEdit/:idProduct', upload.single('photo'), productController.updateProduct);
router.delete('/productDelete/:idProduct', productController.deleteProduct);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productAdd);
router.post('/productAdd', upload.single('photo'), productsValidator, productController.productSave);


module.exports = router;