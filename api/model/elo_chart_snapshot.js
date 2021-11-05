const appRoot = require('app-root-path');
const {Model, DataTypes} = require('sequelize');
const sequelize = require(appRoot + '/api/lib/sequelize.js');

class EloChartSnapshot extends Model {}

EloChartSnapshot.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dispId: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  chartImageBase64: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'elo_chart_snapshot',
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  // uniqueKeys: {
  //   uniqueIndex: {
  //     fields: ['service_id', 'name']
  //   }
  // }
});

EloChartSnapshot.sync({alter: true});

module.exports = EloChartSnapshot;
