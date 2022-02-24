const fs = require('fs');
const path = require('path');

function writeStats (req, res, next) {
  //write the stats passed in the json file
  fs.writeFile(__dirname + "/jsonmiddlewaredata/Stats.json", JSON.stringify(req.body), function (err) { if(err) throw err; }); 
  next();
};

module.exports ={
  writeStats: writeStats
}