module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'Services';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
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
        category_id: {
            type: DataTypes.INTEGER
        },
        professional_id: {
            type: DataTypes.INTEGER
        }
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    let config = {
        tableName: 'services',
        timestamps: false
    };
    const Service = sequelize.define(alias, cols, config);
    Service.associate = (models) => {
        Service.belongsTo(models.Categories, {
            as: 'Category',
            foreignKey: 'category_id'
        });
        Service.belongsTo(models.Professionals, {
            as: 'Professionals',
            foreignKey: 'professional_id'
        });

    }
    
    return Service;
};