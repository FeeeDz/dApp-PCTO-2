const fs = require('fs');
const path = require('path');

function writeStats(req, res, next) {
  //write the stats passed in the json file
  fs.writeFile(__dirname + "/jsonmiddlewaredata/Stats.json", JSON.stringify(req.body), function (err) { if (err) throw err; });
  next();
};

function writeDataForTable(req, res, next) {
  let tmp;
  try {
    tmp = JSON.parse(fs.readFileSync(__dirname + "/jsonmiddlewaredata/DataForTable.json", function (err) { if (err) throw err; }));
    tmp.push(req.body);
    fs.writeFileSync(__dirname + "/jsonmiddlewaredata/DataForTable.json", JSON.stringify(tmp), function (err) { if (err) throw err; });
  }
  catch (err) {
    fs.writeFileSync(_dirname + "/jsonmiddlewaredata/DataForTable.json", JSON.stringify("[]"), function (err) { if (err) throw err; });
    fs.writeFile(__dirname + "/jsonmiddlewaredata/DataForTable.json", JSON.stringify(req.body), function (err) { if (err) throw err; });
  }
  next();

}

module.exports = {
  writeStats: writeStats,
  writeDataForTable: writeDataForTable
}