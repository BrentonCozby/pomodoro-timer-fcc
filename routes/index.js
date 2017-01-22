var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Pomodoro Timer',
        description: 'Pomodoro timer for productivity. A Free Code Camp project.'
    });
});

module.exports = router;
