
const path = require('path');
const controller = {
	avatar: (req, res) => {
        let userAvatar = req.params.avatar;
        res.sendFile(userAvatar, { root: path.join(__dirname, '../../public/images/avatars') })
        
		
	}
	
};

module.exports = controller;