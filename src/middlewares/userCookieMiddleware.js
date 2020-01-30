function userCookieMiddleware (req, res, next) {
    //setea en locals un atributo isLogged a false, no hay nadie logueado
    res.locals.isLogged = false;

    //Pregunta si existe alguna cookie de usuario o una session en curso, si es asi lo deviulve como logueado, caso contrario hace next()
    if (req.cookies.userCookie || req.session.userId) {		
		req.session.userId = req.cookies.userCookie ? req.cookies.userCookie : req.session.userId;
		res.locals.isLogged = true;
	}

	next();
}

module.exports = userCookieMiddleware;