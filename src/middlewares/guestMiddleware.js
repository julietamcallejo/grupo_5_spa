function guestMiddleware (req, res, next) {
	if (usuarioALoguearse == undefined) {
		next();
	} else {
		res.render('/users/profile');
	}
}

module.exports = guestMiddleware;