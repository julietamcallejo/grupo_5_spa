module.exports = (sequelize, DataTypes) => {
    // Nombre que se pasa en el define
    let alias = 'Users';
    // Cols son las columnas y configuraciones de cada una
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
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
            type: DataTypes.BOOLEAN
        }
    };
    //Se pasa config con nombre de la tabla, y que no busque las columnas de createdAt y updatedAt
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);
    return User;
};