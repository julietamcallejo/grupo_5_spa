// ************ Require's ************
const express = require('express');
const router = express.Router();


//*** Middlewares ***/
const upload = require('../middlewares/uploadRegisterMiddleware')
const registerValidator = require('../middlewares/registerValidatorMiddleware');
const loginValidator = require('../middlewares/loginValidatorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// ************ Controller Require ************
const userController = require('../controllers/userController');

// **** Rutas **** //
router.get('/register', guestMiddleware, userController.register);

router.post('/register', upload.single('avatar'), registerValidator, userController.storeUser);

router.get('/login', guestMiddleware , userController.login);

router.post('/login', loginValidator , userController.processLogin);

router.get('/profile', authMiddleware, userController.profile);

router.get('/profileEdit/:userId', authMiddleware, userController.profileEdit);

router.put('/profileEdit/:userId', upload.single('avatar'), userController.profileUpdate);

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