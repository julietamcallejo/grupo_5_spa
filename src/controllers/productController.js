const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

//db
const db = require('../database/models/');
const Services = db.services;
const Categories = db.categories;

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
        Services
            .findAll()
            .then(services => {
                return res.render('products/productList', { services })
            })
            .catch(error => res.send(error))
            
            
    },
    detailId: (req, res) => {
        let id = req.params.idProduct;
        Services
        .findByPk(id,{
            include: ['category']
        })
        .then(service => {
            return res.render('products/productDetail', {service});
        })
        .catch(error => res.send(error))
        
    },
    productCart: (req, res) => {
		res.render('products/productCart');
    },
    productAdd: (req, res) => {
        Categories
        .findAll()
        .then(categories => {
            
            return res.render('products/productAdd', { categories });
        })
        
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
            req.body = {
                photo: (FotosProductos + req.file.filename),
                ...req.body,
                };
            Services
            .create(req.body)
            .then( service => {
                return res.redirect('/products/productDetail/' + service.id);
            })

        
        
        // req.body = {
        //     id: generarId(),
        //     foto: (FotosProductos + req.file.filename),
        //     ...req.body,
        // }
        // let productoNuevo = req.body;
        // agregarProducto(productoNuevo);
        
        // //res.json(productoNuevo)
        // res.redirect('/products/productList');
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
        Services
            .findAll()
            .then(services => {
                return res.render('products/productEditList', { services })
            })
            .catch(error => res.send(error))

    },
    editProduct: (req, res) => {
        let id = req.params.idProduct;
        
        Categories
        .findAll()
        .then(categories => {
            Services
            .findByPk(id,{
                include: ['category']
            })
            .then(service => {
                return res.render('products/productEdit', { service, categories })
            })
        })
        
        .catch(error => res.send(error))


        
    },
    updateProduct: (req, res) => {
        
        Services
        .update(req.body, {
            where: {id: req.params.idProduct}
        })
        .then(() => {
            
            return res.redirect('/products/productDetail/' + req.params.idProduct);
        })
        .catch(error => res.send(error))

    },
    deleteProduct: (req, res) => {
        let id = req.params.idProduct;

        Services
        .findByPk(id)
        .then( service => {
            service.destroy();
            return res.redirect('/products/productList');
        })
        // let arrayProductos = detalleProductos.filter( producto => {return producto.id != id});
        // guardarProductos(arrayProductos);
        
        // //Borrado de la imagen
        // let fotoABorrar = detalleProductos.find( producto => { return producto.id == id}).foto;
        // let pathFotoABorrar = pathPublic + fotoABorrar;
        // fs.unlinkSync(pathFotoABorrar);

        // return res.redirect('/products/productList');
        // //res.send(pathFotoABorrar);
    }
};

module.exports = productController;