const can = require('./init.js');
const util = require('util');
const obj = require('./CAN_DATA.json');
const keys = Object.keys(obj);

console.log(obj);
console.log(keys);
console.log('inc 1CC:',keys.includes("1CC"));

// 0 1 2 3 4 5 6 7 8 9 A B C D E F 
// 
//
// F E D C B A 9 8 7 6 5 4 3 2 1
// 


var lastdata = {};

can.onMessage(function(msg) {

  console.log(util.inspect(msg, {depth: null})); //':'+msg);

  // was before
  if(lastdata[msg.id]) {



    if(msg.id == 0x1CC && keys.includes('1CC')) {
      console.log('--find:1CC'); 
    }
    else if(msg.id == 0x458 && keys.includes('458')) {
      console.log('--find:458');
    }

  }
  lastdata[msg.id] = msg.data;


  var outstr = can.decToHex(msg.id) + ": ";

  for(x = 0; x < msg.data.length; x++) {
    outstr += can.decToHex(msg.data[x], 2) + " ";
  }

//  console.log(outstr);


});

