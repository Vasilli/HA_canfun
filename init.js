var argv = require('minimist')(process.argv.slice(2), {
  string: ['id', 'basebuffer']
});
var socketcan = require('socketcan');

module.exports.decToHex = function(d, padlength) {
  padlength = padlength || 3;
  var hex = Number(d).toString(16).toUpperCase();

  while(hex.length < padlength) {
    hex = "0" + hex;
  }
  return hex;
};

var msgCount = 0;
var can = socketcan.createRawChannel("can0");

module.exports.onMessage = function(cb) {
  can.addListener("onMessage", cb);
};

can.addListener("onMessage", function() {
  msgCount += 1;
});

can.start();

module.exports.send = function(msg) {
  can.send(msg);
};


var closecallbacks = [];
module.exports.onClose = function(cb) {
  closecallbacks.push(cb);
};

process.on('SIGINT', function() {
  can.stop();
  if(closecallbacks.length === 0) {
    console.error("total messages: ", msgCount);
  }
  closecallbacks.forEach(function(cb) {
    cb(msgCount);
  });
  process.exit();
});

