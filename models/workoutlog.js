const { DataTypes } = require('sequelize');
const db = require('../db');

const Workoutlog = db.define('workoutlog', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  results: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Workoutlog;
