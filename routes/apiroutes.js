var express = require('express');
var router = express.Router();
var path = require('path');
var middleware = require('../middleware/writestats');

router.get('/getabi', (req, res) => {
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});

router.get('/getstats', (req, res) => {
    res.sendFile(path.join(__dirname, '../middleware/jsonmiddlewaredata/Stats.json'));
});

router.post('/setstats', middleware.writeStats, (req, res) => {
});


module.exports = router;
