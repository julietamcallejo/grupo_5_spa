const { check } = require('express-validator');
const path = require('path');

//db
const db = require('../database/models');
const Users = db.users;

module.exports = [
    check('firstName')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min: 3}).withMessage('Debe contener mas caracteres'),
    check('lastName')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min: 3}).withMessage('Debe contener mas caracteres'),
    check('email')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isEmail().withMessage('Ingresar un email con formato válido').bail()
    .custom(function (value){
        return Users.findOne({ where: {email: value} }).then(user => {
            if (user) {
                return Promise.reject('El email ya se encuentra registrado');
            }
        });
	}),
    check('password')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un núnero y un caracter especial').bail()
    .custom( function (value){
        let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*?/])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!value.match(passwordRegex)){
            throw new Error('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un núnero y un caracter especial');
        }
        return true;
    }),
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