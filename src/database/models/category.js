module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'categories';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
        
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    let config = {
        tableName: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.services, {
            as: 'services',
            foreignKey: 'categoryId'
        });
        

    }
    return Category;
};