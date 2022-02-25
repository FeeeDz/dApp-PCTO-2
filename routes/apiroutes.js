var express = require('express');
var router = express.Router();
var path = require('path');
var middleware = require('../middleware/writedata');

router.get('/getabi', (req, res) => {
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});

router.get('/getstats', (req, res) => {
    res.sendFile(path.join(__dirname, '../middleware/jsonmiddlewaredata/Stats.json'));
});

router.get('/getdatafortable', (req, res) => {
    res.sendFile(path.join(__dirname, '../middleware/jsonmiddlewaredata/DataForTable.json'));
});

router.post('/setstats', middleware.writeStats);

router.post('/setdatafortable', middleware.writeDataForTable);

module.exports = router;
