// ************ Require's ************
const express = require('express');
const router = express.Router();


//*** Middlewares ***/
const upload = require('../middlewares/uploadProductsMiddleware');
const productsValidator = require('../middlewares/productsValidatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// ************ Controller Require ************

const productController = require('../controllers/productController');



// **** Rutas **** //
router.get('/productList', productController.list);
router.get('/productSearch', productController.search);
router.get('/productEditList', authMiddleware, productController.editList);
router.get('/productEdit/:idProduct', authMiddleware, productController.editProduct);
router.put('/productEdit/:idProduct', upload.single('photo'), productController.updateProduct);
router.delete('/productDelete/:idProduct', productController.deleteProduct);
router.get('/productDetail/:idProduct', productController.detailId);
router.post('/addToCart/:idProduct', authMiddleware, productController.addToCart);
router.delete('/productUpdateCart/:idProduct', productController.updateCart);
router.get('/productCart', authMiddleware, productController.productCart);
router.get('/productAdd', authMiddleware, productController.productAdd);
router.post('/productAdd', upload.single('photo'), productsValidator, productController.productSave);
router.get('/compra', authMiddleware, productController.compra);

module.exports = router;