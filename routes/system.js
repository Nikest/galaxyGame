const express = require('express');
const router = express.Router();

const galaxyGenerator = require('../gameSystem/gameModules/galaxyGenerator');

router.get('/', function(req, res, next) {
    const stars = galaxyGenerator().generateNewGalaxy();
    res.send(stars)
});

module.exports = router;