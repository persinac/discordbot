var Gamelist = require('../model/GamelistModel.js');

exports.getAllGames = function(req, res) {
  Gamelist.getAllGames(function(err, rageQuitter) {
    if (err)
      res.send(err);
    res.send(rageQuitter);
  });
};

exports.createGame = function(req, res) {
  var new_game = new Gamelist({game_long: req.params.game_long, game_short: req.params.game_short});
  if(!new_game || !new_game){
    res.status(400).send({ error:true, message: 'Please provide game' });
  }
  else{
    Gamelist.createGame(new_game, function(err, game) {
      if (err)
        res.send(err);
      res.json(game);
    });
  }
};

exports.getGameByAbbreviation = function(req, res) {
  Gamelist.getGameByAbbreviation(req.params.game_short, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

/* functions below this are unused as of 02/22/19 */
/***
 * Delete will be a soft delete due to FK constraints
 * @param req
 * @param res
 */
exports.deleteGame = function(req, res) {
  Gamelist.remove( req.params.gameId, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Game has been successfully inactivated' });
  });
};