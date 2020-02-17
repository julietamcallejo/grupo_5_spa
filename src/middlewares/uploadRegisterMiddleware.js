const multer = require('multer');
const path = require('path');

//*** Almacenamiento de imagen ***//

let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
        let avatarPathFolder = path.join(__dirname, '../../public/images/avatars');
		cb(null, avatarPathFolder);
	},
	filename: function (req, file, cb) {
        let userFirstName = req.body.firstName.replace(/ /g, '-').toLowerCase();
		let finalName = userFirstName + '-' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

const upload = multer({ storage: diskStorage });

module.exports = upload;