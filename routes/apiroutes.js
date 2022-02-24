var express = require('express');
var router = express.Router();
var path = require('path');
var {writeStats} = require('../middleware/writestats');

router.get('/getabi', (req, res) => {
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});

router.get('/getstats', (req, res) => {
    res.sendFile(path.join(__dirname, '../jsonmiddlewaredata/Stats.json'));
});

router.post('/setstats', (req, res) => {
    console.log("req.body: " + req.body);
    writeStats(req.body);
});


module.exports = router;
