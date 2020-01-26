// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const path = require('path');

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


// **** Rutas **** //
router.get('/register', userController.register);
router.post('/register', upload.single('avatar'), userController.storeUser);

router.get('/login', userController.login);




module.exports = router;