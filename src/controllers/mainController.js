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
	productCart: (req, res) => {
		res.render('productCart');
	},
	register: (req, res) => {
		res.render('register');
	},
	productAdd: (req, res) => {
		res.render('productAdd');
	},
	appointment: (req, res) => {
		res.render('appointment');
	},
};

module.exports = controller