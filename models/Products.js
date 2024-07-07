const { DataTypes } = require('sequelize');
const conn = require('../db');

const Products = conn.define('Products', {
    UUID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

module.exports = Products;
