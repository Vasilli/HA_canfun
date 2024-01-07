const can = require('./init.js');
const util = require('util');
const obj = require('./CAN_DATA.json');

console.log(obj);


can.onMessage(function(msg) {

  console.log(util.inspect(msg, {depth: null})); //':'+msg);

  var outstr = can.decToHex(msg.id) + ": ";

  for(x = 0; x < msg.data.length; x++) {
    outstr += can.decToHex(msg.data[x], 2) + " ";
  }

//  console.log(outstr);


});

