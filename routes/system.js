const express = require('express');
const router = express.Router();

const galaxyGenerator = require('../gameSystem/gameModules/galaxyGenerator');

router.get('/', function(req, res, next) {
    const stars = galaxyGenerator().generateNewGalaxy();
    res.send(stars)
});

router.post('/coords', function(req, res, next) {
    let star = galaxyGenerator().generatePart(req.body.x, req.body.y, req.body.z);
    res.send(star)
});

module.exports = router;