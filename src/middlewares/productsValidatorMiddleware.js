const { check } = require('express-validator');
const path = require('path');


module.exports = [
	check('name', 'Debe darle un Nombre al Servicio').notEmpty(),
    check('description', 'Su servicio debe tener una descripción').notEmpty(),
    check('summary', 'Agregue un resúmen').notEmpty(),
    check('duration')
    .notEmpty().withMessage('Agregue una duración en minutos').bail()
    .isInt({ min: 10}).withMessage('Ingrese una duración mayor a 10 minutos'),
    check('price')
    .notEmpty().withMessage('Agregue un precio').bail()
    .isInt({ min: 100}).withMessage('Ingrese un precio válido'),
    check('photo')
    .custom((value, { req }) => {
        let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        if (typeof req.file == 'undefined') {
            throw new Error('Debe ingresar una foto del servicio');
        } else if (req.file.originalname) {
            let fileExtension = path.extname(req.file.originalname);
            let extensionIsOk = acceptedExtensions.includes(fileExtension);
            if (!extensionIsOk) {
                throw new Error('Los formatos válidos son JPG, JPEG y PNG');
            }
        }
        return true;
    })
];