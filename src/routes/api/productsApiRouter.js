// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsApiController = require('../../controllers/api/productsApiController');

// **** Rutas **** //
router.get('/', productsApiController.list);
router.get('/last', productsApiController.last);
router.get('/categories', productsApiController.categories);
router.get('/:id', productsApiController.detail);





module.exports = router;