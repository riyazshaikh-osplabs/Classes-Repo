const { DataTypes } = require("sequelize");
const { sequelize } = require('../../setup/db');
const { generateDate } = require("../../utils/utils");
const City = require("./city");
const State = require("./state");

const Person = sequelize.define('Person', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Mobile: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'Id'
    }
  },
  StateId: {
    type: DataTypes.INTEGER,
    references: {
      model: State,
      key: "Id"
    }
  },
  CreatedOn: {
    type: DataTypes.DATE,
    defaultValue: () => generateDate(),
    allowNull: true
  }

}, { freezeTableName: true, timestamps: false });

module.exports = Person;