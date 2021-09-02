const { Sequelize } = require("sequelize")
const config = require("../config.json");
module.exports = new Sequelize({
    storage: './dbs.sqlite',
    dialect: 'sqlite',
    logging: false
})