function AstroViewerModule() {

    let coreAPI;
    let galaxyDataLocal;
    let galaxyGeometry;

    this.init = function (getCoreAPI) {
        coreAPI = getCoreAPI;

        this.init = afterInit;
    };

    this.renderGalaxy = function (galaxyData, update) {
        galaxyDataLocal = galaxyData;

        new Promise((res, rej)=> {
            const starsPositions = [];
            const starsColors = [];
            const starsSizes = [];

            galaxyData.starsField.forEach((star, i)=> {
                starsPositions.push(star.x);
                starsPositions.push(star.y);
                starsPositions.push(star.z);

                starsColors.push(star.color[0] / 255);
                starsColors.push(star.color[1] / 255);
                starsColors.push(star.color[2] / 255);

                starsSizes.push(star.radius / 10000000);
            });

            res({
                positionsFloat32: new Float32Array(starsPositions),
                colorsFloat32: new Float32Array(starsColors),
                sizesFloat32: new Float32Array(starsSizes)
            });

        }).then(float32Arrays=> {
            let starMaterial;

            if(!update) {
                galaxyGeometry = new THREE.BufferGeometry();
                starMaterial = coreAPI.getGameModules().shadersMaterials.getStarsFieldMaterial();
            }

            galaxyGeometry = update? galaxyGeometry : new THREE.BufferGeometry();

            galaxyGeometry.addAttribute('position', new THREE.BufferAttribute(float32Arrays.positionsFloat32, 3));
            galaxyGeometry.addAttribute('customColor', new THREE.BufferAttribute(float32Arrays.colorsFloat32, 3));
            galaxyGeometry.addAttribute('size', new THREE.BufferAttribute(float32Arrays.sizesFloat32, 1));

            if(update) {
                return false
            }

            return {
                galaxyGeometry: galaxyGeometry,
                starMaterial: starMaterial
            }
        }).then(galaxyObject=> {

            coreAPI.message('render');

            if(!galaxyObject) {
                return false
            }

            const galaxySphere = new THREE.Points(galaxyObject.galaxyGeometry, galaxyObject.starMaterial);
            galaxySphere.frustumCulled = false;

            coreAPI.getGameModules().canvasRender.addToScene(galaxySphere);

            coreAPI.getGameModules().canvasRender.addEventListener('click', galaxySphere, function (star) {
                if(star) {
                    new Promise((res, rej)=> {
                        res(galaxyData.starsField[star.index]);
                    }).then((currentStar)=> {
                        if(star.distanceToRay < 0.025) {
                            coreAPI.getGameModules().uiModule.generateInfoAlert({
                                title: currentStar.name,
                                masseges: [
                                    'TYPE: ' + currentStar.type,
                                    'RADIUS: ' + currentStar.radius + 'km',
                                    'TEMPERATURE: ' + currentStar.temperature.toFixed(0) + 'C'
                                ]
                            });
                        }
                    });
                }
            });
        });

    };

    this.starFieldUpdate = function (stars) {
        galaxyDataLocal.starsField = stars;
        this.renderGalaxy(galaxyDataLocal, true);
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}
