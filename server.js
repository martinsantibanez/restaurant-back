// modules for server
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const serverConfigs = require('./config/serverConfig');

mongoose.connect(serverConfigs.DBURL);
console.log("DB: "+mongoose.connection.readyState);

const app = express();

require('./server/express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
