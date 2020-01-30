// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

//*** Middlewares ***/
const upload = require('../middlewares/uploadRegisterMiddleware')
const registerValidator = require('../middlewares/registerValidatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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
router.get('/register', userController.register);

router.post('/register', upload.single('avatar'), registerValidator, userController.storeUser);

router.get('/login', userController.login);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', userController.logout);

module.exports = router;