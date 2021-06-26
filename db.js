const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:Tsd115032132@@localhost:5432/workoutlog'
);

module.exports = sequelize;
