//db
const db = require('../../database/models');
const Users = db.users;


const userController = {
    list: (req, res) => {
        Users
            .findAll({
                attributes: ["email"]
            })
            .then( users => {
                return res.status(200).json({
                    total_results: users.length,
                    data: users
                });
            })
            .catch(error => res.json(error));

    },
    
    find: (req, res) => {
        Users
            .findOne({
                where: {email: req.params.email},
                attributes: ['id', 'email']
            })
            .then(user => {
                if(user) {
					return res.status(302).json({
                        userFound: true,
                        msg: "email registrado",
                        data: user
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