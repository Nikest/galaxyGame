const Math = require('mathjs');
const nameGenerator = require('./nameGenerator');

const starsGenerator = function () {

    const starsType = {
        O: {
            temperature: [30000, 60000],
            color: [191, 207, 255],
            radius: [4591620],
            luminocity: [1400000],
            fraction: [9990000, 10000000],
        },
        B: {
            temperature: [10000, 30000],
            color: [232, 237, 255],
            radius: [1252260],
            luminocity: [20000],
            fraction: [9975000, 9990000]
        },
        A: {
            temperature: [7500, 10000],
            color: [255, 255, 255],
            radius: [973980],
            luminocity: [80],
            fraction: [9915000, 9975000]
        },
        F: {
            temperature: [6000, 7500],
            color: [255, 253, 244],
            radius: [800055],
            luminocity: [6],
            fraction: [9615000, 9915000]
        },
        G: {
            temperature: [5000, 5000],
            color: [255, 245, 204],
            radius: [695000],
            luminocity: [1.2],
            fraction: [8855000, 9615000]
        },
        K: {
            temperature: [3500, 5000],
            color: [255, 220, 155],
            radius: [486990],
            luminocity: [0.4],
            fraction: [7645000, 8855000]
        },
        M: {
            temperature: [2000, 3500],
            color: [255, 143, 132],
            radius: [278280],
            luminocity: [0.04],
            fraction: [0, 7645000]
        }
    };

    return {
        generateStar: function (addons) {
            const fraction = Math.random(1, 10000000);

            const starType = Object.keys(starsType).find(star = > {
                    if(fraction >= starsType[star].fraction[0] && fraction <= starsType[star].fraction[1]
            )
            {
                return star
            }
        })
            ;

            const temperature = Math.random(starsType[starType].temperature[0], starsType[starType].temperature[1]);

            const star = {
                name: nameGenerator().getName(),
                type: starType,
                temperature: temperature,
                color: starsType[starType].color,
                radius: starsType[starType].radius[0]
            };

            return Object.assign(star, addons)
        }
    }

};

module.exports = starsGenerator;