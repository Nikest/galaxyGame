const Math = require('mathjs');
const starsGenerator = require('./starsGenerator');
const nameGenerator = require('./nameGenerator');

const starsActuals = {};
const quality = 10;

function diffusion(orbit) {
    let dif = Math.random(0, 2 + orbit / 20);
    return (Math.random(0, 1) > 0.5)? dif : -(dif);
}

function diffusionOrbit() {
    let difOrb = Math.random(0, 1);
    return (Math.random(0, 1) > 0.5)? difOrb : -(difOrb);
}

function velocity(orbits, orbit) {
    let vel = Math.random(0, (orbits - orbit) / 10) + Math.random(-1, ((orbits - orbit) / 100) * 25);
    return (Math.random(0, 1) > 0.5)? vel : -(vel);
}

const galaxyGenerator = function () {

    const starsArray = [];

    let angle = 0;
    let e = 0.85;
    let radius = 0;
    let count = 0.08;
    let orbits = 80;

    for(let o = 0; o < orbits; o++) {
        radius += 1 + o / 10;
        let x, z;
        let i = 1;
        let firstX = false;
        let x1, y1, z1;
        angle += 185 / 60;

        while(!firstX || firstX > -x) {
            x = radius * Math.sin(i + diffusionOrbit(o));
            z = (radius * e) * Math.cos(i + diffusionOrbit(o));

            x1 = x * Math.cos(angle) - z * Math.sin(angle);
            y1 = Math.random(0, 4);
            z1 = x * Math.sin(angle) + z * Math.cos(angle);

            for(let b = 0; b < Math.round(Math.random(1, (orbits - o) / 12)); b++) {
                for(let v = 0; v < Math.round(Math.random(1, 3)); v++) {
                    let px = x1 + diffusion(o) + velocity(orbits, o) / 2;
                    let py = y1 + velocity(orbits, o);
                    let pz = z1 + diffusion(o) + velocity(orbits, o) / 2;

                    starsArray.push(starsGenerator().generateStar({
                        x: px,
                        y: py,
                        z: pz,
                        ID: nameGenerator().getTextID()
                    }));

                    let nx = x1 + diffusion(o) + velocity(orbits, o) / 2;
                    let ny = y1 + velocity(orbits, o);
                    let nz = z1 + diffusion(o) + velocity(orbits, o) / 2;

                    starsArray.push(starsGenerator().generateStar({
                        x: -(nx),
                        y: ny,
                        z: -(nz),
                        ID: nameGenerator().getTextID()
                    }));
                }
            }

            i += count;

            if(typeof firstX !== "number") {
                firstX = x;
            }
        }
    }

    return {
        generateNewGalaxy: function () {
            return {
                name: nameGenerator().getName(),
                starsField: [starsGenerator().generateStar({
                    x: 0,
                    y: 0,
                    z: 0,
                    ID: nameGenerator().getTextID()
                })]
            }
        },
        generatePart: function (x, y, z) {
            const stars = [];

            for(let ix = x - quality; ix < x + quality; ix++) {
                for(let iy = y - quality; iy < y + quality; iy++) {
                    for(let iz = z - quality; iz < z + quality; iz++) {
                        let coord = ix + ':' + iy + ':' + iz;

                        if(starsActuals[coord]) {
                            stars.push(starsActuals[coord]);
                        } else {
                            let star = starsGenerator().generateStar({
                                x: ix + diffusionOrbit(),
                                y: iy + diffusionOrbit(),
                                z: iz + diffusionOrbit(),
                                ID: nameGenerator().getTextID()
                            });

                            stars.push(star);

                            starsActuals[coord] = star;
                        }
                    }
                }
            }

            return stars;
        }
    }

};

module.exports = galaxyGenerator;