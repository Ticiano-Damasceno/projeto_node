const { Sequelize } = require('sequelize');
require('dotenv').config();

const { HOST, DATABASE, PASSWORD, USER } = process.env;

const conn = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'sqlite',
    storage: './db/database.sqlite',
});

module.exports = conn;
