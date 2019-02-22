var sql = require('./db.js');

//Game object constructor
var GamelistModel = function(gameList){
  console.log(gameList);
  this.game_long = gameList.game_long;
  this.game_short = gameList.game_short;
};
GamelistModel.createGame = function createGame(newGame, result) {
  sql.query("INSERT INTO game_list set ?", newGame, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
GamelistModel.getGameByAbbreviation = function getGameByAbbreviation(name, result) {
  sql.query("Select * from game_list_vw where abbreviation = ?", [name], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
GamelistModel.getAllGames = function getAllGames(result) {
  sql.query("Select * from game_list_vw", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('games : ', res);
      result(null, res);
    }
  });
};
GamelistModel.remove = function(id, result){
  sql.query("DELETE FROM gamelist WHERE id = ?", [id], function (err, res) {

    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

module.exports= GamelistModel;