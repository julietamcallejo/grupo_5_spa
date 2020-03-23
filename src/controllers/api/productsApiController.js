//db
const db = require('../../database/models');
const Services = db.services;
const Categories = db.categories;



const userController = {
    list: (req, res) => {
            
            Services
                .findAll({
                    attributes: ["id", "name", "summary"],
                    include: [{ 
                        association: 'category',
                        attributes: ["id", "name"]
                    }]
                })
                .then( async services => {
                    let categories = await Categories.findAll({
                        include: [{ 
                            association: 'services',
                            attributes: ["id", "name"]
                        }]
                    });
                    let countByCategory = categories.map( oneCategory => {
                        return oneCategory = {
                            id: oneCategory.id,
                            name: oneCategory.name,
                            total_products: oneCategory.services.length
                        }
                    })
                        
                    let serviceList = services.map( oneService => {
                        return oneService = {
                            id: oneService.id,
                            name: oneService.name,
                            summary: oneService.summary,
                            category: oneService.category,
                            url: `http://localhost:3000/api/products/${oneService.id}`,
                            }
                    });
                    let page = Number(req.query.page);
                    let nextUrl = `http://localhost:3000/api/products/?page=2`;
                    let prevUrl = null;
                    if(!page){
                        serviceList = serviceList.slice(0,10);
                        
                    } else {
                        serviceList = serviceList.slice((page*10-10), (page*10));
                        prevUrl = `http://localhost:3000/api/products/?page=${page}`;
                        page += 1;
                        if( page <= (services.length / 10)+1) {
                            nextUrl = `http://localhost:3000/api/products/?page=${page}`;
                        } else {
                            nextUrl = null;
                        }
                        
                    }

                    return res.status(200).json({
                        
                        total_results: services.length,
                        total_categories: categories.length,
                        next: nextUrl,
                        prev: prevUrl,
                        count_by_category: countByCategory,
                        products: serviceList
                    });
                })
                .catch(error => {
                    console.log(error);

                    return res.json(error);
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