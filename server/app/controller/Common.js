var Common = require('../model/Common.js');

exports.getUniqueUsers = function(req, res) {
  Common.getUniqueUsers(function(err, uniqueUsers) {
    if (err)
      res.send(err);
    res.send(uniqueUsers);
  });
};
exports.getUniquePlayers = function(req, res) {
  Common.getUniquePlayers(function(err, players) {
    if (err)
      res.send(err);
    res.send(players);
  });
};
exports.getUniqueReporters = function(req, res) {
  Common.getUniqueReporters(function(err, reporters) {
    if (err)
      res.send(err);
    res.json(reporters);
  });
};
exports.getTotalRowsOfRage = function(req, res) {
  Common.getTotalRowsOfRage(function(err, reporters) {
    if (err)
      res.send(err);
    res.json(reporters);
  });
};
exports.getRagingGames = function(req, res) {
  Common.getRagingGames(function(err, reporters) {
    if (err)
      res.send(err);
    res.json(reporters);
  });
};
exports.getTopPlayers = function(req, res) {
  Common.getTopPlayers(req.params.limit, function(err, players) {
    if (err)
      res.send(err);
    res.json(players);
  });
};
exports.getTopReporters = function(req, res) {
  Common.getTopReporters(req.params.limit, function(err, players) {
    if (err)
      res.send(err);
    res.json(players);
  });
};
