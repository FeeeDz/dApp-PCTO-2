var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/getabi', (req, res) => {
    console.log("di qui ci passo");
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});


module.exports = router;
