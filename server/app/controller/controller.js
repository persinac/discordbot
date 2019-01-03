var RageQuitter = require('../model/model.js');

exports.list_all_tasks = function(req, res) {
  RageQuitter.getAllTask(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', task);
    res.send(task);
  });
};



exports.create_a_task = function(req, res) {
  var new_rage_quitter = new RageQuitter(req.query);
  console.log(new_rage_quitter);
  //handles null error
  if(!new_rage_quitter || !new_rage_quitter){
    res.status(400).send({ error:true, message: 'Please provide player name' });
  }
  else{
    RageQuitter.createTask(new_rage_quitter, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
};


exports.read_a_task = function(req, res) {
  RageQuitter.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.get_player = function(req, res) {
  console.log(req);
  RageQuitter.getRageQuitterByName(req.query.player, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  RageQuitter.updateById(req.params.taskId, new RageQuitter(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  RageQuitter.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};