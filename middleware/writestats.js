const fs = require('fs');
const path = require('path');

const writeStats = (stats) => {
  fs.writeFileSync(path.join(__dirname + "/jsonmiddlewaredata/Stats.json"), stats);
};

module.exports = writeStats;