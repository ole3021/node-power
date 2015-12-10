"use strict"
const net = require('net'), fs = require('fs'),

filename = process.argv[2],

server = net.createServer(function(connection) {
  console.log("Subscriber connected.");
  connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }) + '\n');

  let watcher = fs.watch(filename, function() {
    connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    }) + '\n');
  });

  connection.on('close', function() {
    console.log("Subscriber disconnected.");
    watcher.close();
  });
});

if (!filename) {
  throw Error('No target filename was specified!');
}

server.listen(5432, function() {
  console.log("Listening for Subscribers...");
});
