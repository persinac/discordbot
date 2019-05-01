'use strict';
module.exports = function(app) {
  var rageQuit = require('../controller/RageQuitterController');
  var gamelist = require('../controller/GamelistController');
  var common = require('../controller/Common');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  /***
   * Ragelist
   */
  app.route('/rager/:player').post(rageQuit.getRageQuitterByName);
  app.route('/rager/new/:player&:reporter').post(rageQuit.createRageQuitter);
  app.route('/rager/list').get(rageQuit.get_all_rage_quitters);

  /***
   * Gamelist
   */
  app.route('/gamelist/:game_short').post(gamelist.getGameByAbbreviation);
  app.route('/gamelist/new/:game_long&:game_short').post(gamelist.createGame);
  app.route('/gamelist/list').get(gamelist.getAllGames);

  /***
   * Common
   */
  app.route('/common/uniqueUsers').get(common.getUniqueUsers);
  app.route('/common/uniquePlayers').get(common.getUniquePlayers);
  app.route('/common/uniqueReporters').get(common.getUniqueReporters);
  app.route('/common/uniqueGames').get(gamelist.getAllGames);
  app.route('/common/totalRowsOfRage').get(common.getTotalRowsOfRage);
  app.route('/common/ragingGames').get(common.getRagingGames);
  app.route('/common/top/player/:limit').post(common.getTopPlayers)
  app.route('/common/top/reporter/:limit').post(common.getTopReporters)

  /* Routes not used
  app.route('/rager/update/:rageQuitterId')
    .post(rageQuit.updateRageQuitterById);

  app.route('/rager/delete/:rageQuitterId')
    .post(rageQuit.deleteRageQuitter);

  app.route('/gamelist/remove/:game')
    .get(rageQuit.get_all_rage_quitters);
   */
};