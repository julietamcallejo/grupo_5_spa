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
                return res.json(users);
            })
            .catch(error => res.json(error));

    },
    
    find: (req, res) => {
        Users
            .findOne({
                where: {email: req.params.email}
            })
            .then(user => {
                
                if(user) {
                    user = {
                        id: user.id,
                        email: user.email,
                        check: true
                    }
					return res.json(user);
				}
				return res.status(404).json({
					status: res.statusCode,
                    method: req.method,
                    check: false,
                    msg: 'El email no se encuentra registrado'
				});
			}).catch(error => res.json(error));
                
    }
};


module.exports = userController;