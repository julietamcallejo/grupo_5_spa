const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');

const pathUsers = path.join(__dirname, '../data/users.json'); 
const pathPublic = path.join(__dirname, '../../public/');

const pathAvatars = '/images/avatar';




//**** Helpers ****//


function traerUsuarios () {
    let usersFileContent = fs.readFileSync(pathUsers, 'utf-8');
    let usersArray;

    if (usersFileContent == '') {
        usersArray = [];
    }else{
        usersArray = JSON.parse(usersFileContent);
    };
    return usersArray;
};

function generarId () {
    let usuarios = traerUsuarios();
    if (usuarios.lenght == 0) {
        return 1;
    }
    let lastUsers = usuarios.pop();
    return lastUsers.id + 1;
};

function agregarUsuario (datoUsuario) {
    let usuarios = traerUsuarios();

    usuarios.push(datoUsuario);
    fs.writeFileSync(pathUsers, JSON.stringify(usuarios, null, ''));
    
};

function getUserByEmail(email) {
	let allUsers = traerUsuarios();
	let userByEmail = allUsers.find(oneUser => oneUser.email == email);
	return userByEmail;
};

function getUserById(id) {
	let allUsers = traerUsuarios();
	let userById = allUsers.find(oneUser => oneUser.id == id);
	return userById;
};




var detalleUsuarios = traerUsuarios();

const userController = {
	register: (req, res) => {
		res.render('users/register');
    },
    storeUser: (req, res) => {
        //*** Traigo los errores y valido ***/

        let errors = validationResult(req);
        

        if (errors.isEmpty()) {
            // Hash de la clave
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            // Eliminar la propiedad re_password la cual no entendi bien
            delete req.body.re_password;
        
            // Nombre de la foto y el id
            let user = {
            id: generarId(),
            avatar: req.file.filename,
            ...req.body,
            };
        

            // Guardar al usario y como la función retorna la data del usuario lo almacenamos en ela variable "user"
            agregarUsuario(user);
        
            // Setear en session el ID del usuario nuevo para auto loguearlo
            //req.session.userId = user.id;
        
            // Setear la cookie para mantener al usuario logueado
		    //res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });


            res.json(user);
            //res.redirect('/users/profile');

        } else {
            console.log(errors.array());
            return res.render('users/register', {errors: errors.array()});
        };


        
    },    
    login: (req, res) => {
		res.render('users/login');
    },
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userCookie', null, { maxAge: 1 });
        
        return res.redirect('index');
		//return res.redirect('/users/profile');
	}
	
};

module.exports = userController;