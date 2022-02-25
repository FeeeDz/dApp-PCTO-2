const fs = require('fs');
const path = require('path');

function writeStats (req, res, next) {
  //write the stats passed in the json file
  fs.writeFile(__dirname + "/jsonmiddlewaredata/Stats.json", JSON.stringify(req.body), function (err) { if(err) throw err; }); 
  next();
};

function writeDataForTable(req, res, next) {
  fs.appendFile(__dirname + "/jsonmiddlewaredata/DataForTable.json", JSON.stringify(req.body), function (err) { if(err) throw err; });
  console.log("st oqui, teoricamente ho scritto i dati nella tabella dinamica");
  next();
}

module.exports ={
  writeStats: writeStats,
  writeDataForTable: writeDataForTable
}