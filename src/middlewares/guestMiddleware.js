function guestMiddleware (req, res, next) {
	if (req.session.userId == undefined) {
		next();
	} else {
		res.render('/users/login');
	}
}

module.exports = guestMiddleware;