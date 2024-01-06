var can = require('./init.js');


can.onMessage(function(msg) {

  var outstr = can.decToHex(msg.id) + ": ";

  for(x = 0; x < msg.data.length; x++) {
    outstr += can.decToHex(msg.data[x], 2) + " ";
  }

  console.log(outstr);


});

