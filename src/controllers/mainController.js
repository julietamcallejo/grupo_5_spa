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
		
		res.render('index');
	},
	contact: (req, res) => {
		let html = readHTML('contact');
		res.send(html);
	},
	
	productCart: (req, res) => {
		let html = readHTML('productCart');
		res.send(html);
	},
	register: (req, res) => {
		res.render('register');
	},
	productAdd: (req, res) => {
		let html = readHTML('productAdd');
		res.send(html);
	},
	test: (req, res) => {
		res.render('navBar');
	},
	test2: (req, res) => {
		res.render('testNav2');
	},
	
};

module.exports = controller