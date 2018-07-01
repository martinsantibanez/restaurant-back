const ConnectRoles = require('connect-roles');
const user = new ConnectRoles();
  //permissions
  user.use('edit', function (req) {
    if (req.user.role === 'admin') {
      return true;
    }
  });
  user.use('admin', function (req) {
    if (req.user.role === 'admin') {
      return true;
    }
  });
module.exports = user;