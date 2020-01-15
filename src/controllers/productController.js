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

function generarId () {
    let productos = traerProductos();
    if (productos.lenght == 0) {
        return 1;
    }
    let lastProduct = productos.pop();
    return lastProduct.id + 1;
};

function guardarProducto (datoProducto) {
    let productos = traerProductos();
    productos.push(datoProducto);
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, ''));
};

const detalleProductos = traerProductos();

const productController = {
    list: (req, res) => {
        res.render('productList', {detalleProducto: detalleProductos});
    },
    detailId: (req, res) => {
        let id = req.params.idProduct;
        res.render('productDetail', {detalleProducto: detalleProductos[id]});
    },
    productCart: (req, res) => {
		res.render('productCart');
    },
    productAdd: (req, res) => {
		res.render('productAdd');
	},
};

module.exports = productController