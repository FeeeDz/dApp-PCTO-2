
var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/getabi', (req, res) => {
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});

module.exports = router;
