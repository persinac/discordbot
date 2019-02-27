var sql = require('./db.js');

//Common constructor
var Common = function() {};

Common.getUniqueUsers = function getUniqueUsers(result) {
  console.log("MODEL - Admin");
  sql.query("SELECT player FROM ragequit GROUP BY player UNION SELECT reporter FROM ragequit GROUP BY reporter", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('users : ', res);
      result(null, res);
    }
  });
};
Common.getUniquePlayers = function getUniquePlayers(result) {
  sql.query("SELECT player FROM ragequit GROUP BY player", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('players : ', res);
      result(null, res);
    }
  });
};
Common.getUniqueReporters = function getUniqueReporters(result) {
  sql.query("SELECT reporter FROM ragequit GROUP BY reporter", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('reporters : ', res);
      result(null, res);
    }
  });
};
Common.getTotalRowsOfRage = function getTotalRowsOfRage(result) {
  sql.query("SELECT count(*) as totalRowsOfRage FROM ragequit", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('count : ', res);
      result(null, res);
    }
  });
};
Common.getTotalRowsOfRage = function getTotalRowsOfRage(result) {
  sql.query("SELECT count(*) as totalRowsOfRage FROM ragequit", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('count : ', res);
      result(null, res);
    }
  });
};
Common.getRagingGames = function getRagingGames(result) {
  sql.query(
    "SELECT gl.game_long, count(*) as numOfRageQuitters " +
    "FROM ragequit rq " +
    "JOIN game_list gl on gl.id = rq.game_id " +
    "GROUP BY gl.game_long " +
    "ORDER BY count(*) DESC", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('count : ', res);
      result(null, res);
    }
  });
};
Common.getTopPlayers = function getTopPlayers(limit, result) {
  sql.query("select player, count(*) from ragequit group by player order by count(*) desc limit ?", [Number(limit)], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
Common.getTopReporters = function getTopReporters(limit, result) {
  sql.query("select reporter, count(*) from ragequit group by reporter order by count(*) desc limit ?", [Number(limit)], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

module.exports = Common;