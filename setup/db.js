const { Sequelize } = require("sequelize");
const { logger } = require("./logger");
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: logger.log,
});

sequelize
    .authenticate()
    .then(() => logger.log(`database connected successfully`))
    .catch((error) => logger.log(`database connection failed... ${error}`));


module.exports = { sequelize };
