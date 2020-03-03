const { check } = require('express-validator');
const path = require('path');

//db
const db = require('../database/models');
const Users = db.users;

module.exports = [
	check('firstName', 'Este campo debe estar completo').notEmpty(),
	check('lastName', 'Este campo debe estar completo').notEmpty(),
    check('email')
    .notEmpty().withMessage('Debe ingresar un email').bail()
    .isEmail().withMessage('Ingresar un email con formato válido').bail()
    .custom(function (value){
        return Users.findOne({ where: {email: value} }).then(user => {
            if (user) {
                return Promise.reject('Email ya registrado anteriormente');
            }
        });
	}),
    check('password')
    .notEmpty().withMessage('Debe ingresar una contraseña').bail()
    .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('avatar')
    .custom((value, { req }) => {
        let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        if (typeof req.file == 'undefined') {
            return true;
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