

const controller = {
	avatar: (req, res) => {
        let userAvatar = req.params.avatar;
        res.render('image', {userAvatar});
		
	}
	
};

module.exports = controller;