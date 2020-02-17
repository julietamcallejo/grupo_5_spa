const multer = require('multer');
const path = require('path');

//*** Almacenamiento de imagen ***//

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
        let fotosPath = path.join(__dirname, '../../public/images/tatamientos');
		cb(null, fotosPath);
	},
	filename: function (req, file, cb) {
        let productName = req.body.name.replace(/ /g, '-').toLowerCase();
		let finalName = productName + '-' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage });

module.exports = upload;