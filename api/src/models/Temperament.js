const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo

// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {

    sequelize.define('temperament', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },

    }, { timestamps: false });
};