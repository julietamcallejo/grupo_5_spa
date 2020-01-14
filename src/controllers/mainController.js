const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const detalleProductos = require('../data/product');

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