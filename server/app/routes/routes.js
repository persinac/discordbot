'use strict';
module.exports = function(app) {
  var rageQuit = require('../controller/controller');

  app.route('/rager/:player')
    .post(rageQuit.getRageQuitterByName);

  app.route('/rager/new/:player&:reporter')
    .post(rageQuit.createRageQuitter);

  app.route('/rager/list')
    .get(rageQuit.get_all_rage_quitters);

  /* Routes not used
  app.route('/rager/update/:rageQuitterId')
    .post(rageQuit.updateRageQuitterById);

  app.route('/rager/delete/:rageQuitterId')
    .post(rageQuit.deleteRageQuitter);
   */
};