// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

/* GET - home page. */
router.get('/', mainController.root);
router.get('/index', mainController.root);
router.get('/contact', mainController.contact);

router.get('/register', mainController.register);

router.get('/login', mainController.login);

router.get('/appointment', mainController.appointment);

/* productAdd error message */
router.post('/products/productAdd', [
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
    })*/
], mainController.productAdd);

module.exports = router;