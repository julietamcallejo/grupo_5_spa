const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

//db
const db = require('../database/models');
const Services = db.services;

const pathProductos = path.join(__dirname, '../data/productos.json'); 
const pathPublic = path.join(__dirname, '../../public/');

const FotosProductos = '/images/tatamientos/';
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

function agregarProducto (datoProducto) {
    let productos = traerProductos();
    productos.push(datoProducto);
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, ''));
};

function guardarProductos (productos) {
   
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, ''));
};

var detalleProductos = traerProductos();

const productController = {
    list: (req, res) => {
        db.sequelize
            .query('SELCECT * FROM services')
            .then(services => res.send(services))
            return;
            
    
        
        res.render('products/productList', {detalleProducto: detalleProductos});
    },
    detailId: (req, res) => {
        let id = req.params.idProduct;
        res.render('products/productDetail', {detalleProducto: detalleProductos[id]});
    },
    productCart: (req, res) => {
		res.render('products/productCart');
    },
    productAdd: (req, res) => {
        res.render('products/productAdd');
    },
    productSave: (req, res) => {
        /* Funcion para utilizar en la vista, como parametro va a tener el campo del formulario y el array de errores. Sile campo del error existe retorna el msg.*/
        const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
        }

        //*** Traigo los errores y valido ***/

        let errors = validationResult(req);

        if (errors.isEmpty()) {

        //req.body.precio = Number(req.body.precio);
        
        req.body = {
            id: generarId(),
            foto: (FotosProductos + req.file.filename),
            ...req.body,
        }
        let productoNuevo = req.body;
        agregarProducto(productoNuevo);
        
        //res.json(productoNuevo)
        res.redirect('/products/productList');
        } else {
        //return res.send(errors);
        return res.render('product/productAdd', {
            errors: errors.array(),
            hasErrorGetMessage,
            oldData: req.body
        });
    };
    },
    editList: (req, res) => {
        res.render('products/productEditList',{detalleProducto: detalleProductos});
    },
    editProduct: (req, res) => {
        let id = req.params.idProduct;
        let producto = detalleProductos.find( producto => { return producto.id == id});
        
        res.render('products/productEdit',{producto: producto});
        
        //res.json(producto);
    },
    updateProduct: (req, res) => {
        let arrayProductos = detalleProductos;
        let idProduct = Number(req.params.idProduct);
        let posiciónAEditar = arrayProductos.findIndex( producto => producto.id == idProduct);

        if (req.file) {
            req.body = {
                id: idProduct,
                foto: (FotosProductos + req.file.filename),
                ...req.body,
            };
        } else {
            req.body = {
                id: idProduct,
                foto: (arrayProductos[posiciónAEditar].foto),
                ...req.body,
        };
    };
    /*
        req.body = {
            id: idProduct,
            foto: (FotosProductos + req.file.filename),
            ...req.body, 
        }  
    */
        let productoEditado = req.body;

        arrayProductos[posiciónAEditar] = productoEditado;

        guardarProductos(arrayProductos);
        
        return res.redirect('/products/productList');
        
        //res.json(arrayProductos);
    },
    deleteProduct: (req, res) => {
        let id = req.params.idProduct;
        let arrayProductos = detalleProductos.filter( producto => {return producto.id != id});
        guardarProductos(arrayProductos);
        
        //Borrado de la imagen
        let fotoABorrar = detalleProductos.find( producto => { return producto.id == id}).foto;
        let pathFotoABorrar = pathPublic + fotoABorrar;
        fs.unlinkSync(pathFotoABorrar);

        return res.redirect('/products/productList');
        //res.send(pathFotoABorrar);
    }
};

module.exports = productController;