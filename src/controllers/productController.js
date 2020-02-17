const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

//db
const db = require('../database/models/');
const Services = db.services;
const Categories = db.categories;

//path 
const pathPublic = path.join(__dirname, '../../public');
const FotosProductos = '/images/tatamientos/';

//Controller
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
            //armado del body con la foto
            req.body = {
                photo: (FotosProductos + req.file.filename),
                ...req.body,
                };
            Services
            .create(req.body)
            .then( () => {
                Services
                .findAll({
                    order: [['id', 'DESC']],
                    limit: 1
                })
                .then(service => {
                    return res.redirect('/products/productDetail/' + service[0].id);

                })
    
            });

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
        //Armar el body antes de pasar y cuidado con la foto
        if (req.file) {
            req.body = {
                photo: (FotosProductos + req.file.filename),
                ...req.body,
            };
        } else {
            Services
            .findByPk(req.params.idProduct)
            .then(service => {
                req.body = {
                    photo: service.photo,
                    ...req.body,
            };

            });
            
    };


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
            let pathFotoABorrar = pathPublic + service.photo;
            fs.unlinkSync(pathFotoABorrar);
            service.destroy();
            return res.redirect('/products/productList');
        });
        
        
    }
};

module.exports = productController;