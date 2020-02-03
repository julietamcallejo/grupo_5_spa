function authMiddleware (req, res, next) {
	if (usuarioALoguearse != undefined) {
		next();
	} else {
		res.render('/users/login');
	}
}

module.exports = authMiddleware;