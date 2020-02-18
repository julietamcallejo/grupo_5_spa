module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'professionals';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING
        }
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    // let config = {
    //     tableName: 'professionals',
    //     timestamps: false
    // };
    const Professional = sequelize.define(alias, cols);
    return Professional;
};