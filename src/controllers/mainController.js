const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	root: (req, res) => {
		let html = readHTML('index');
		res.send(html);
	},
	contact: (req, res) => {
		res.render('contact')
	},
	//productDetail: (req, res) => {
	//	let html = readHTML('productDetail');
	//	res.send(html);
	//},
	productCart: (req, res) => {
		res.render('productCart');
	},
	register: (req, res) => {
		res.render('register');
	},
	productAdd: (req, res) => {
		res.render('productAdd');
	},
	test: (req, res) => {
		res.render('navBar');
	},
	
};

module.exports = controller