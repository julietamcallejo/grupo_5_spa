module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'Users_Services';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        ticket: {
            type: DataTypes.INTEGER,
        },
        sale_price: {
            type: DataTypes.INTEGER,
        },
        service_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        appointment_date: {
            type: DataTypes.DATE
        },
        purchase_date: {
            type: DataTypes.DATE
        }        
        
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    let config = {
        tableName: 'user_service',
        timestamps: false
    };
    const User_Service = sequelize.define(alias, cols, config);
    return User_Service;
};