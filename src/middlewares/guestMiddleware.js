function guestMiddleware (req, res, next) {
	if (req.session.userId == undefined) {
		next();
	} else {
		res.render('/users/profile');
	}
}

module.exports = guestMiddleware;