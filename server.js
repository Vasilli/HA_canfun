const can     = require('./init.js');
const util    = require('util');
const candesc = require('./CAN_DATA.json');
const canids = Object.keys(candesc);

//console.log(candesc);
console.log(canids);
//console.log('inc 1CC:',canids.includes("1CC"));

//---------------------------
can.onMessage(function(msg) {

  var id = can.byteToHex(msg.id);
  if(canids.includes(id)) { // only if have in canDesc file

    findPost(id, msg.data);

  } // if
});


//---------------------------
var lastobj = {};
// byte: 00,01,02,03,04,05,06,07
// bit:  07,06,05,04,03,02,01,00
function findPost(id, data) {

  if(lastobj[id]) {
    console.log('  :',id);

    var lastdata = lastobj[id];

    for(var x = 0; x < data.length; x++) {

      console.log('   b:',x,' m:',can.decToHex(data[x],8),' l:',can.decToHex(lastdata[x],8),' :',data[x] !== lastdata[x]);

       if(data[x] !== lastdata[x]) {
         console.log(         '!=');



      } // if
    } // for
  } // if
  lastobj[id] = data;
}


//---------------------------
function findBitPos(lastData, newData) {

  var json = {}, odt, ndt;

  for(var pos = 0; pos < 8; pos++) {

    odt = (lastData & (1 << pos));
    ndt = (newData  & (1 << pos));

    if(odt !== ndt)
      json[pos] = !!ndt;
  }
  return json;
}






//  console.log(util.inspect(msg, {depth: null}));
//  console.log('msg.id:',msg.id,' hex.id:',can.decToHex(msg.id),' inc:',canids.includes(can.byteToHex(msg.id)));
