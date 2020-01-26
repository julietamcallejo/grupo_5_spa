const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

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




var detalleUsuarios = traerUsuarios();

const userController = {
	register: (req, res) => {
		res.render('users/register');
    },
    storeUser: (req, res) => {
        // Hash de la clave
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        // Eliminar la propiedad re_password la cual no entendi bien
        delete req.body.re_password;
        
        // Nombre de la foto y el id
        let newUser = {
            id: generarId(),
            avatar: req.file.filename,
            ...req.body,
        };
        

        console.log(newUser);

        // Guardar al usario y como la función retorna la data del usuario lo almacenamos en ela variable "user"
		agregarUsuario(newUser);


        res.json(newUser);
        //res.redirect('/servicios');
    },    
    login: (req, res) => {
		res.render('users/login');
	},
	
};

module.exports = userController;