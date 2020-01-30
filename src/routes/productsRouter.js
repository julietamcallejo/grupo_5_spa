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
router.put('/productEdit/:idProduct', upload.single('foto'), productController.updateProduct);
router.delete('/productDelete/:idProduct', productController.deleteProduct);
router.get('/productDetail/:idProduct', productController.detailId);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productAdd);
router.post('/productAdd', upload.single('foto'), productController.productSave);

/* productAdd error message */
/* router.post('/products/productAdd', [
    check('nombre').isLength({min: 3}).withMessage('Por favor ingrese un texto válido'),
    check('descripcion').isAlphanumeric().isLength({max: 500}).isEmpty().withMessage('Por favor ingrese un texto válido'),
    check('resumen').isAlphanumeric().isLength({max: 300}).isEmpty().withMessage('Por favor ingrese un texto válido'),
    check('duracion').isInt({min: 40}).withMessage('Por favor ingrese un texto válido'),
    check('precio').isInt().withMessage('Por favor ingrese un texto válido')
    /*check('myImage').custom((value, filename) => {
        var isImage = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    })
], mainController.productAdd);
*/

module.exports = router;