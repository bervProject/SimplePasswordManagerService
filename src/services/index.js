const upload = require('./upload/upload.service.js');
const users = require('./users/users.service.js');
const message = require('./message/message.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(upload);
  app.configure(users);
  app.configure(message);
};
