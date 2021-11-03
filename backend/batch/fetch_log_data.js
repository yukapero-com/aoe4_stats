const appRoot = require('app-root-path');
const LeaderBoardLog = require(`${appRoot}/model/leader_board_log.js`);
const Axios = require('axios');

(async () => {
  let json;
  let page = 1;
  // while (json = await fetchJSON(page)) {
  //   console.log(`page: ${page}, itemCount: ${json.items.length}`);
  //   await insertLog(json.items)
  //   page++;
  // }

  console.log('DONE');
})();

async function insertLog(items) {
  let insertObjects = items.map(item => item);

  for (let i = 0; i < insertObjects.length; i++) {
    let insertObject = insertObjects[i];

    try {
      await LeaderBoardLog.create(insertObject);
    } catch (e) {
      console.error(e);
      console.log(insertObject);
    }
  }
  // await LeaderBoardLog.bulkCreate(insertObjects);
}

async function sleep(msec) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), msec)
  })
}

async function fetchJSON(page) {
  let res = await Axios.post("https://api.ageofempires.com/api/ageiv/Leaderboard", {
    region: 7,
    versus: 'players',
    matchType: 'unranked',
    teamSize: '1v1',
    searchPlayer: '',
    page: page,
  });

  return res.data ? res.data : null;
}
