module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'userService';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        ticket: {
            type: DataTypes.INTEGER,
        },
        salePrice: {
            type: DataTypes.INTEGER,
        },
        serviceId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        appointmentDate: {
            type: DataTypes.DATE
        },
        purchaseDate: {
            type: DataTypes.DATE
        }        
        
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    let config = {
        tableName: 'userService',
        timestamps: true
    };
    const UserService = sequelize.define(alias, cols, config);
    UserService.associate = (models) => {

    UserService.belongsTo(models.services, {
        as: 'service',
        foreignKey: 'serviceId'
    });
    UserService.belongsTo(models.users, {
        as: 'user',
        foreignKey: 'userId'
    });
};
    return UserService;
};