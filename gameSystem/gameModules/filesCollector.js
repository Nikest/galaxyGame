const fs = require('fs');
const async = require('async');

const dirPath = './gameSystem/forClient/';
let filesPaths = ['./gameSystem/forClient/three.js', './gameSystem/forClient/OrbitControls.js'];

const api = {
    createScriptForClient: function () {
        fs.readdir(dirPath, function (err, files) {
            if (err) throw err;

            files.forEach(function (file) {
                if (file !== 'three.js' && file !== 'OrbitControls.js') {
                    filesPaths.push(dirPath + file)
                }
            });

            async.map(filesPaths, function (filePath, cb) {
                fs.readFile(filePath, 'utf8', cb);
            }, function (err, results) {
                if (err) throw err;

                fs.writeFile('./public/javascripts/main.js', results.join('\n'))
            });
        });
    }
};

module.exports = api;