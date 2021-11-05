const appRoot = require('app-root-path');
const express = require('express');
const app = express();
const __ = require('underscore');
const sequelize = require(appRoot + '/api/lib/sequelize.js');
const {QueryTypes} = require('sequelize');
const LeaderBoardLog = require(`${appRoot}/api/model/leader_board_log.js`);
const EloChartSnapshot = require(`${appRoot}/api/model/elo_chart_snapshot.js`);
const bodyParser = require('body-parser');
import cryptoRandomString from 'crypto-random-string';

app.use(bodyParser.json());

app.post('/upload_elo_chart_img', async (req, res, next) => {
  let {imageBase64} = req.body;

  try {
    let dispId = cryptoRandomString({length: 24});

    let eloChartSnapshotModel = await EloChartSnapshot.create({
      dispId: dispId,
      chartImageBase64: imageBase64,
    });

    res.send(dispId);
  } catch (e) {
    console.error(e);
    res.send(null);
  }
});

app.get('/elo_chart_snapshot/:dispId', async (req, res, next) => {
  let {dispId} = req.params;

  try {
    let eloChartSnapshotModel = await EloChartSnapshot.findOne({
      where: {
        dispId: dispId
      }
    });

    if (!eloChartSnapshotModel) {
      throw new Error(`elo chart snapshot not found. dispId: ${dispId}`);
    }

    const img = new Buffer.from(eloChartSnapshotModel.chartImageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } catch (e) {
    console.error(e);
    next();
  }
});

app.get('/user_candidates', async (req, res, next) => {
  let {text} = req.query;

  if (text.length < 3) {
    res.send([]);
    return;
  }

  let records = await sequelize.query(
    `
      SELECT *
      FROM (SELECT DISTINCT user_name, rl_user_id FROM leader_board_log) AS t1
      WHERE user_name LIKE ?
    `,
    {
      replacements: [`%${text}%`],
      type: QueryTypes.SELECT
    }
  );

  let data = records.map(r => ({
    id: r.rl_user_id,
    name: r.user_name,
  }));

  res.send(data.slice(0, 50));
});

app.get('/elo_log', async (req, res, next) => {
  let {id} = req.query;
  let leaderBoardLogModels = await LeaderBoardLog.findAll({
    where: {
      rlUserId: id
    }
  });
  res.send(leaderBoardLogModels.map(m => ({
    elo: m.elo,
    rank: m.rank,
    winPercent: m.winPercent,
    wins: m.wins,
    loses: m.loses,
    createdAt: m.createdAt,
  })));
});

app.get('/get_top_ranker_user_id', async (req, res, next) => {
  let records = await sequelize.query(
    `SELECT @max_id := MAX(id) AS maxid
     FROM leader_board_log;`,
    {type: QueryTypes.SELECT}
  );

  let maxid = records[0].maxid;

  let records2 = await sequelize.query(
    `SELECT user_name, rl_user_id, wins
     FROM (SELECT * FROM leader_board_log WHERE id > ${maxid - 100}) AS t1;`,
    {type: QueryTypes.SELECT}
  );

  let r = __.max(records2, r => r.wins);
  res.send({
    id: r.rl_user_id,
    name: r.user_name,
  });
});

module.exports = {
  path: '/api',
  handler: app
}
