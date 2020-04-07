// ************ Require's ************
const express = require('express');
const router = express.Router();


//*** Middlewares ***/

const guestMiddleware = require('../../middlewares/guestMiddleware');

// ************ Controller Require ************
const userApiController = require('../../controllers/api/userApiController');

// **** Rutas **** //
router.get('/', userApiController.list);
router.get('/check/:email', userApiController.find);
router.get('/:id', userApiController.detail);





module.exports = router;