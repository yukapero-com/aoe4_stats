const appRoot = require('app-root-path');
const {Model, DataTypes} = require('sequelize');
const sequelize = require(appRoot + '/api/lib/sequelize.js');

class LeaderBoardLog extends Model {}

LeaderBoardLog.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.STRING(255),
  },
  userId: {
    type: DataTypes.STRING(255),
  },
  rlUserId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING(255),
  },
  avatarUrl: {
    type: DataTypes.STRING(255),
  },
  playerNumber: {
    type: DataTypes.STRING(255),
  },
  elo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eloRating: {
    type: DataTypes.INTEGER,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING(255),
  },
  wins: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  winPercent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  losses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  winStreak: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'leader_board_log',
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  // uniqueKeys: {
  //   uniqueIndex: {
  //     fields: ['service_id', 'name']
  //   }
  // }
});

LeaderBoardLog.sync({alter: true});

module.exports = LeaderBoardLog;
