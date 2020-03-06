// ************ Require's ************
const express = require('express');
const router = express.Router();


//*** Middlewares ***/

const guestMiddleware = require('../../middlewares/guestMiddleware');

// ************ Controller Require ************
const userApiController = require('../../controllers/api/userApiController');

// **** Rutas **** //
router.get('/', guestMiddleware, userApiController.list);
router.get('/:email', guestMiddleware, userApiController.find);



/* CHEQUEO DE USUARIO LOGUEADO

router.get('/check', function(req, res){
    if(req.session.usuarioLogueado == undefined){
        res.send("No estas logueado");
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.email);
    }
});*/

module.exports = router;