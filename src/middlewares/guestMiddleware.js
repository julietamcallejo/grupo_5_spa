function guestMiddleware (req, res, next) {
	if (req.session.userId == undefined) {
		next();
	} else {
		res.redirect('/users/profile');
	}
}

module.exports = guestMiddleware;