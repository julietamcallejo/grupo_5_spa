const fs = require('fs');
const path = require('path');

//db
const db = require('../database/models/');
const Services = db.services;
const Categories = db.categories;

//Paths
const pathProductos = path.join(__dirname, '../data/productos.json'); 
const pathUsers = path.join(__dirname, '../data/users.json');

//**** Helpers ****//

function traerProductos () {
    let productFileContent = fs.readFileSync(pathProductos, 'utf-8');
    let productArray;

    if (productFileContent == '') {
        productArray = [];
    }else{
        productArray = JSON.parse(productFileContent);
    };
    return productArray;
};

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

function getUserById(id) {
	let allUsers = traerUsuarios();
	let userById = allUsers.find(oneUser => oneUser.id == id);
	return userById;
};

var detalleProductos = traerProductos();

const controller = {
	root: (req, res) => {
        //let userLogged = getUserById(req.session.userId);
        Services
        .findAll({
            where: {
                categoryId: 1
            },
            limit: 3
        })
        .then(services => {
            res.render('index', {
                //userLogged: userLogged, 
                services
            });

        })
		
	},
	contact: (req, res) => {
		res.render('contact');
	},
	
	appointment: (req, res) => {
		res.render('appointment');
	},
	
};

module.exports = controller;