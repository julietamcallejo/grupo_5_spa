// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************

const productController = require('../controllers/productController');


let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/tatamientos'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })
/* GET - home page. */

router.get('/productList', productController.list);
router.get('/productEditList', productController.editList);
router.get('/productEdit/:idProduct', productController.editProduct);
router.put('/productEdit/', upload.single('foto'), productController.updateProduct);
router.delete('/productDelete/:idProduct', productController.deleteProduct);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productAdd);
router.post('/productAdd', upload.single('foto'), productController.productSave);


module.exports = router;