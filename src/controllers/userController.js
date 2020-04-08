const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');


//db
const db = require('../database/models');
const Users = db.users;


const userController = {
    register: (req, res) => {
        return res.render('users/register')
    },
    storeUser: (req, res) => {
        /* Funcion para utilizar en la vista, como parametro va a tener el campo del formulario y el array de errores. Sile campo del error existe retorna el msg.*/
        const hasErrorGetMessage = (field, errors) => {
            for (let oneError of errors) {
                if (oneError.param == field) {
                    return oneError.msg;
                }
            }
            return false;
        }

        //*** Traigo los errores y valido ***/
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            // Hash de la clave
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            // Eliminar la propiedad re_password la cual no entendi bien
            delete req.body.re_password;

            // Nombre de la foto y el id
            let avatar;
            if (typeof req.file === 'undefined') {
                avatar = 'default-user.png';
            } else {
                avatar = req.file.filename;
            }

            let user = {
                avatar: avatar,
                ...req.body,
            };

            /*// Guardar al usario y como la función retorna la data del usuario lo almacenamos en la variable "user"
            agregarUsuario(user);

            // Setear en session el ID del usuario nuevo para auto loguearlo
            req.session.userId = user.id;*/
            Users
                .create(user)
                .then(user => {
                    req.session.userId = user.id;

                    // Setear la cookie para mantener al usuario logueado (Checkbox RECORDAME)
                    if (req.body.remember != undefined) {
                        res.cookie('userCookie', user.id, {maxAge: 60000 * 60});
                    };

                    //return res.send(newUser);
                    return res.redirect('/users/profile');

                });

            
            
        } else {
            // return res.send(errors);
            return res.render('users/register', {
                errors: errors.array(),
                hasErrorGetMessage,
                oldData: req.body
            });
        }
        ;
    },
    login: (req, res) => {
        return res.render('users/login')
    },

    profile: (req, res) => {
        /*let userLogged = getUserById(req.session.userId);*/
        Users
            .findByPk(req.session.userId)
            .then(userLogged => {
                res.render('users/profile', { userLogged });
            })
            .catch(error => res.send(error))
    },
    profileEdit: (req, res) => {
        
        Users
            .findByPk(req.params.userId)
            .then(userLogged => {
                res.render('users/profileEdit', { userLogged });
            })
            .catch(error => res.send(error))
    },
    profileUpdate: (req, res) => {
        
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            delete req.body.re_password;
        }
        

        // Nombre de la foto y el id
        let avatar;
        let user;
        if (typeof req.file === 'undefined') {
            user = req.body;

        } else {
            
            avatar = req.file.filename;
            user = {
                avatar: avatar,
                ...req.body,
                };
        }
        
        Users
            .update(user, {
                where: {id: req.params.userId}
                })
            .then(() => {
            
                return res.redirect('/users/profile/');
        })
        .catch(error => res.send(error))


    },

    logout: (req, res) => {
        // Destruir la session
        req.session.destroy();
        // Destruir la cookie
        res.cookie('userCookie', null, { maxAge: 1 });

        return res.redirect('/index');
    },

    processLogin: (req, res) => {
        /* Funcion para utilizar en la vista, como parametro va a tener el campo del formulario y el array de errores. Si el campo del error existe retorna el msg.*/
        const hasErrorGetMessage = (field, errors) => {
            for (let oneError of errors) {
                if (oneError.param == field) {
                    return oneError.msg;
                }
            }
            return false;
        }

        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.array(),
                hasErrorGetMessage,
                oldData: req.body
            });

        } else {
            // Buscar usuario por email
            /*let user = getUserByEmail(req.body.email);*/

            Users
                .findOne({
                    where: {email: req.body.email}
                })
                // Validación info de usuario
                .then(user => {
                    if(user != null){
                       if (bcrypt.compareSync(req.body.password, user.password)) {
                           // Setear en session el ID del usuario
                           req.session.userId = user.id;

                           // Setear la cookie
                           if (req.body.remember) {
                               res.cookie('userCookie', user.id, { maxAge: 60000 * 120 });
                           }

                           // Redireccionamos al visitante a su perfil
                           return res.redirect('/users/profile/');
                       } else {
                           let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                           res.render('users/login', {mensaje: usuarioInvalido});
                       }
                    } else {
                        let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                        res.render('users/login', {mensaje: usuarioInvalido});
                    }
                })
            //Si lo encontramos
            /*if (user.email != undefined) {
                // Al ya tener al usuario, comparamos las contraseñas
			    if (bcrypt.compareSync(req.body.password, user.password)) {
				    // Setear en session el ID del usuario
                    req.session.userId = user.id;
                    
                    // Setear la cookie
				    if (req.body.remember) {
					    res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
                    }
                
                    // Redireccionamos al visitante a su perfil
                    return res.redirect('/users/profile/');
                } else {
                    let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                    res.render('users/login', {mensaje: usuarioInvalido});
                    }
            } else {
                let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                res.render('users/login', {mensaje: usuarioInvalido});
            }*/
        }
    },
};


module.exports = userController;