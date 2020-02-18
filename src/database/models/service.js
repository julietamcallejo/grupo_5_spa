module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'services';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        summary: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        professionalId: {
            type: DataTypes.INTEGER
        }
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    // let config = {
    //     tableName: 'services',
    //     timestamps: false
    // };
    const Service = sequelize.define(alias, cols);
    Service.associate = (models) => {
        Service.belongsTo(models.users, {
            as: 'user',
            foreignKey: 'userId'
        });
        Service.belongsTo(models.categories, {
            as: 'category',
            foreignKey: 'categoryId'
        });
        Service.belongsTo(models.professionals, {
            as: 'professional',
            foreignKey: 'professionalId'
        });

    }
    
    return Service;
};