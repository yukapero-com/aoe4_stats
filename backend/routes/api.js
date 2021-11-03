const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const sequelize = require(appRoot + '/backend/lib/sequelize.js');
const {QueryTypes} = require('sequelize');
const LeaderBoardLog = require(`${appRoot}/backend/model/leader_board_log.js`);

router.get('/user_candidates', async (req, res, next) => {
  let {text} = req.query;

  if (text.length < 3) {
    res.send([]);
    return;
  }

  let records = await sequelize.query(
    `
      SELECT * FROM
      (SELECT DISTINCT user_name, rl_user_id FROM leader_board_log) AS t1
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

router.get('/elo_log', async (req, res, next) => {
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

module.exports = router;
