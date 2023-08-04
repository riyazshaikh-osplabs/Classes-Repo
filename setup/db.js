const { Sequelize } = require("sequelize");
const { logger } = require("./logger");

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: logger.log,
});

sequelize
    .authenticate()
    .then(() => logger.log(`database connected successfully`))
    .catch((error) => logger.log(`database connection failed... ${error}`));


module.exports = { sequelize };
