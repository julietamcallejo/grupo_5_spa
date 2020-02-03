// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {check, validationResult, body} = require('express-validator');

//*** Middlewares ***/
const upload = require('../middlewares/uploadRegisterMiddleware')
const registerValidator = require('../middlewares/registerValidatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// ************ Controller Require ************
const userController = require('../controllers/userController');

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
router.get('/register', guestMiddleware, userController.register);

router.post('/register', upload.single('avatar'), registerValidator, userController.storeUser);

router.get('/login', guestMiddleware, userController.login);

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres")
], userController.processLogin);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', authMiddleware, userController.logout);

/* CHEQUEO DE USUARIO LOGUEADO

router.get('/check', function(req, res){
    if(req.session.usuarioLogueado == undefined){
        res.send("No estas logueado");
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.email);
    }
});*/

module.exports = router;