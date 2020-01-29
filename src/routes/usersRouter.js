// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ************ Controller Require ************
const userController = require('../controllers/userController');


//*** Almacenamiento de imagen ***//

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

//*** Traer usuarios para validar registro ***/
const pathUsers = path.join(__dirname, '../data/users.json'); 

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


// **** Rutas **** //
router.get('/register', userController.register);
router.post('/register', upload.single('avatar'), [
	check('first_name').notEmpty().withMessage('Completar Nombre'),
	check('last_name').notEmpty().withMessage('Completar Apellido'),
	check('email').isEmail().withMessage('Ingresar un email válido'),
	check('password').isLength({min: 6}).withMessage('La clave debe tener al menos 6 caracteres'),
	check('email').custom(function (value){
		let user = detalleUsuarios.find( usuario => usuario.email == value);
		if (user != undefined) {
			return false;
		}else{
			return true;
		}

	}).withMessage('Email ya registrado anteriormente')
], userController.storeUser);

router.get('/login', userController.login);
router.get('/logout', userController.logout);




module.exports = router;