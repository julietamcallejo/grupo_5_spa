// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const imageController = require('../controllers/imageController');

/* GET - home page. */
router.get('/avatars/:avatar', imageController.avatar);

module.exports = router;