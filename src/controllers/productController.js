const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

//db
const db = require('../database/models/');
const Services = db.services;
const Categories = db.categories;
const Users = db.users;
const UsersServices = db.userService;
const Op = db.Sequelize.Op;

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
    search: (req, res) => {
        let searchQuery = req.query.search;
        Services
            .findAll({
                where: {
                    name: {[Op.like]: `%${searchQuery}%`}
                }
            })
            .then(results => {
                res.render('products/searchResults', {
                    results,
                    searchQuery
                });
            })
            .catch(errors => {
                res.send(errors);
            })

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
    addToCart: (req, res) => {
        let serviceId = req.params.idProduct
        
        //Busco el servicio
        Services
        .findByPk(serviceId)
        .then(service => {
            //Armo la operacion a registrar
            let addItem = {
                userId: req.session.userId,
                serviceId: service.id,
                quantity: req.body.quantity,
                salePrice: service.price,
            };
            
            
            UsersServices
                .create(addItem)
                .then( item => {
                    //return res.send(item);
                    return res.redirect('/products/productCart');
            })
            .catch(error => {
                return res.send(error);
            })
        })
        
    },
    productCart: (req, res) => {
        UsersServices
        .findAll({
            where: {
                userId: req.session.userId
            },
            include: ['service', 'user']
        })
        .then(userCart => {
            //return res.send(userCart);
            return res.render('products/productCart', { userCart });
            
            
        })
		//
    },
    updateCart: (req, res) => {
        UsersServices
        .findByPk(req.params.idProduct)
        .then(item => {
            item.destroy();
            return res.redirect('/products/productCart');
        });
        
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
            let userSession = req.session.userId
            console.log(req.body);

            //armado del body con la foto
            req.body = {
                photo: (FotosProductos + req.file.filename),
                userId: userSession,
                ...req.body,
                };
            Services
            .create(req.body)
            .then(serviceCreated => {
                return res.redirect('/products/productDetail/' + serviceCreated.id);

                
    
            });

        } else {
            Categories
            .findAll()
            .then(categories => {
                
                return res.render('products/productAdd', { 
                    errors: errors.array(),
                    hasErrorGetMessage,
                    oldData: req.body,
                    categories });
            })
        
        
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
        let userSession = req.session.userId;
        req.body = {
            userId: userSession,
            ...req.body,
            };
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
    },
    compra: (req, res) => {
        return res.render('products/compra')
    },
};

module.exports = productController;