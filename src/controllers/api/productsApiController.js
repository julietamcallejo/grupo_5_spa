//db
const db = require('../../database/models');
const Services = db.services;
const Categories = db.categories;



const userController = {

    list: (req, res) => {
        let offsetPage = 0;
                
        if (req.query.page){
            if (Number(req.query.page) == 1){
                offsetPage = 0;
            }
            offsetPage = (Number(req.query.page) - 1) * 10;
        }
            
        Services
            .findAndCountAll({
                attributes: ["id", "name", "summary", "price"],
                include: [{ 
                    association: 'category',
                    attributes: ["id", "name"]
                }],
                limit: 10,
                offset: offsetPage
            })
            .then( async services => {
                let categories = await Categories.findAll({
                    include: [{ 
                        association: 'services',
                        attributes: ["id", "name"]
                    }]
                });
                let countByCategory2 = {};
                let countByCategory = categories.map( oneCategory => {
                    countByCategory2[oneCategory.name] = oneCategory.services.length;
                    return oneCategory = {
                        id: oneCategory.id,
                        name: oneCategory.name,
                        total_products: oneCategory.services.length
                    }
                })
                let totalPages = Math.ceil(services.count/10);    
                let serviceList = services.rows.map( oneService => {
                    return oneService = {
                        id: oneService.id,
                        name: oneService.name,
                        summary: oneService.summary,
                        price: oneService.price,
                        category: oneService.category,
                        url: `http://localhost:3000/api/products/${oneService.id}`,
                        }
                });
                let page = Number(req.query.page);
                let nextUrl = `http://localhost:3000/api/products/?page=2`;
                let prevUrl = null;
                if(page && page != 1 ){
                    
                    prevUrl = `http://localhost:3000/api/products/?page=${(page - 1)}`;
                    
                    if( page < totalPages ) {
                        nextUrl = `http://localhost:3000/api/products/?page=${page + 1}`;
                    } else {
                        nextUrl = null;
                    }
                    
                }

                return res.status(200).json({
                    status: 200,
                    total_results: services.count,
                    total_categories: categories.length,
                    next: nextUrl,
                    prev: prevUrl,
                    total_pages: totalPages,
                    count_by_category: countByCategory2,
                    products: serviceList
                });
            })
            .catch(error => {
                console.log(error);

                return res.status(500).json({
                    status: 500
                    
                });
                });
    

},
    detail: (req, res) => {
        
            Services
                .findOne({
                    where: {id: req.params.id},
                    attributes: ["id", "name", "description", "photo"],
                    include: [{ 
                        association: 'category',
                        attributes: ["id", "name"]
                    }]
                })
                .then(service => {
                    if(service) {
                        service.photo = `http://localhost:3000${service.photo}`;
                        return res.status(200).json(service);
                    }
                    return res.status(404).json({
                        service: 'Not Found',
                        
                    });
                }).catch(error => console.log(error));
      
                
    },
    last: (req, res) => {
        
        Services
            .findAll({
                attributes: ["id", "name", "summary", "photo"],
                include: [{ 
                    association: 'category',
                    attributes: ["name"]
                }],
                order: [['id', 'DESC']],
                limit: 1
            })
            .then(service => {
                service = {
                    id: service[0].id,
                    name: service[0].name,
                    summary: service[0].summary,
                    photo: `http://localhost:3000${service[0].photo}`,
                    url: `http://localhost:3000/products/productDetail/${service[0].id}`
                };
                
                
                return res.status(200).json(service);
                
            }).catch(error => console.log(error));
  
            
},
    categories: (req, res) => {
    
        Categories
            .findAll({
                include: [{ 
                    association: 'services',
                    attributes: ["id", "name"]
                }]
            })
            .then( categories => {
                
                return res.json(categories);
            })
            .catch( errors => console.log(errors));
            
    }
};


module.exports = userController;