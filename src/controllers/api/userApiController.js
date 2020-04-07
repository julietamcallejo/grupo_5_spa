//db
const db = require('../../database/models');
const Users = db.users;



const userController = {
    list: (req, res) => {
        let offsetPage = 0;
        if (req.query.page){
            if (Number(req.query.page) == 1){
                offsetPage = 0;
            }
            offsetPage = (Number(req.query.page) - 1) * 10;
        }
        
            Users
                .findAndCountAll({
                    attributes: ["id", "firstName", "lastName", "email"],
                    limit: 10,
                    offset: offsetPage
                })
                .then( users => {
                    let totalPages = Math.ceil(users.count/10);
                    let userList = users.rows.map( oneUser => {
                        return oneUser = {
                            id: oneUser.id,
                            firstName: oneUser.firstName,
                            lastName: oneUser.lastName,
                            email: oneUser.email,
                            url: `http://localhost:3000/api/users/${oneUser.id}`,
                            }
                    });
                    let page = Number(req.query.page);
                    let nextUrl = `http://localhost:3000/api/users/?page=2`;
                    let prevUrl = null;
                    if(page && page != 1){
                        prevUrl = `http://localhost:3000/api/users/?page=${(page - 1)}`;
                        if( page < totalPages ) {
                            nextUrl = `http://localhost:3000/api/users/?page=${page + 1}`;
                        } else {
                            nextUrl = null;
                        }
                                                
                    } 
                        
                    return res.status(200).json({
                        
                        total_results: users.count,
                        next: nextUrl,
                        prev: prevUrl,
                        users: userList
                    });
                })
                .catch(error => res.json(error));
        

    },
    detail: (req, res) => {
        
            Users
                .findOne({
                    where: {id: req.params.id},
                    attributes: ["id", "firstName", "lastName", "email", "avatar"]
                })
                .then(user => {
                    if(user) {
                        user.avatar = `http://localhost:3000/images/avatars/${user.avatar}`;
                        return res.status(200).json(user);
                    }
                    return res.status(404).json({
                        user: 'Not Found',
                        
                    });
                }).catch(error => res.json(error));
        
                
    },
    
    find: (req, res) => {
        
        Users
            .findOne({
                attributes: ['id', 'email'],
                where: {email: req.params.email}
                
            })
            .then(user => {
                
                if(user) {
					return res.status(200).json({
                        userFound: true,
                        msg: "email registrado",
                        //data: user
                    });
				}
				return res.status(404).json({
                    userFound: false,
                    msg: "email no registrado"
				});
			}).catch(error => res.json(error));
                
    }
};


module.exports = userController;