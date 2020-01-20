const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, '../data/productos.json'); 
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

const detalleProductos = traerProductos();

const controller = {
	root: (req, res) => {
		res.render('index', { detalleProductos: detalleProductos,});
	},
	contact: (req, res) => {
		res.render('contact')
	},
	
	register: (req, res) => {
		res.render('register');
	},
	
	appointment: (req, res) => {
		res.render('appointment');
	},
	productAdd: (req,res) => {
		res.render('products/productAdd');
	},
};

module.exports = controller;