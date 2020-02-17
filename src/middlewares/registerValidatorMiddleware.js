const { check } = require('express-validator');
const path = require('path');
const fs = require('fs');
const pathUsers = path.join(__dirname, '../data/users.json'); 

//**** Helpers ****//

function traerUsuarios () {
    let usersFileContent = fs.readFileSync(pathUsers, 'utf-8');
    let usersArray;

    if (usersFileContent == '') {
        usersArray = [];
    }else{
        usersArray = JSON.parse(usersFileContent);
    };
    return usersArray;
};
var detalleUsuarios = traerUsuarios();

module.exports = [
	check('firstName', 'Este campo debe estar completo').notEmpty(),
	check('lastName', 'Este campo debe estar completo').notEmpty(),
    check('email')
    .notEmpty().withMessage('Debe ingresar un email').bail()
    .isEmail().withMessage('Ingresar un email con formato válido').bail()
    .custom(function (value){
		let user = detalleUsuarios.find( usuario => usuario.email == value);
		if (user != undefined) {
			return false;
		}else{
			return true;
		}

	}).withMessage('Email ya registrado anteriormente'),
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