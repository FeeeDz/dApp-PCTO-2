const fs = require('fs');
const path = require('path');

const writeStats = (stats) => {
  console.log("dovrei star scrinendo");
  fs.writeFileSync(path.join(__dirname + "/jsonmiddlewaredata/Stats.json"), stats);
};

module.exports = writeStats;