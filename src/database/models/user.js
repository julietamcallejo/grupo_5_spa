module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'users';
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
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.INTEGER
        }
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    // let config = {
    //     tableName: 'users',
    //     timestamps: false
    // };
    const User = sequelize.define(alias, cols);
    return User;
};