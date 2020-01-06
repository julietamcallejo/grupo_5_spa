const fs = require('fs');
const path = require('path');


//Variable que contiene los productos

const detalleProductos = require('../data/product');


// ************ Function to Read an HTML File ************

function readHTML (fileName) {
    let filePath = path.join(__dirname, `/../views/${fileName}.html`);
    let htmlFile = fs.readFileSync(filePath, 'utf-8');
    return htmlFile;
}

const productController = {
    list: (req, res) => {
        res.render('productList', {detalleProducto: detalleProductos});
    },

    detailId: (req, res) => {
        
        let id = req.params.idProduct;
        res.render('productDetail', {detalleProducto: detalleProductos[id]});
    },
};

module.exports = productController