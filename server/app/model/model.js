var sql = require('./db.js');

//Task object constructor
var RageQuitter = function(rageQuitter){
  this.player = rageQuitter.player;
  this.counter = rageQuitter.counter;
  this.last_rage_quit = new Date();
};
RageQuitter.createTask = function createUser(newTask, result) {
  sql.query("INSERT INTO ragequit set ?", newTask, function (err, res) {

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
RageQuitter.getTaskById = function createUser(taskId, result) {
  sql.query("Select task from ragequit where id = ? ", taskId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);

    }
  });
};
RageQuitter.getRageQuitterByName = function getByName(name, result) {
  console.log(name);
  sql.query("Select * from ragequit where player = ?", [name], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);

    }
  });
};
RageQuitter.getAllTask = function getAllTask(result) {
  sql.query("Select * from ragequit", function (err, res) {

    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};
RageQuitter.updateById = function(id, task, result){
  sql.query("UPDATE ragequit SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};
RageQuitter.remove = function(id, result){
  sql.query("DELETE FROM ragequit WHERE id = ?", [id], function (err, res) {

    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{

      result(null, res);
    }
  });
};

module.exports= RageQuitter;