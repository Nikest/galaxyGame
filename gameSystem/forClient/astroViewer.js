function AstroViewerModule() {

    let gameModuleGetter;

    this.init = function (mBuilderApi) {
        gameModuleGetter = mBuilderApi;

        this.init = afterInit;
    };

    this.renderGalaxy = function (galaxyData) {

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

                starsSizes.push(star.radius / 2000000);
            });

            res({
                positionsFloat32: new Float32Array(starsPositions),
                colorsFloat32: new Float32Array(starsColors),
                sizesFloat32: new Float32Array(starsSizes)
            });

        }).then(float32Arrays=> {
            const galaxyGeometry = new THREE.BufferGeometry();

            galaxyGeometry.addAttribute('position', new THREE.BufferAttribute(float32Arrays.positionsFloat32, 3));
            galaxyGeometry.addAttribute('customColor', new THREE.BufferAttribute(float32Arrays.colorsFloat32, 3));
            galaxyGeometry.addAttribute('size', new THREE.BufferAttribute(float32Arrays.sizesFloat32, 1));

            const starMaterial = gameModuleGetter.getGameModules().shadersMaterials.getStarsFieldMaterial();

            return {
                galaxyGeometry: galaxyGeometry,
                starMaterial: starMaterial
            }
        }).then(galaxyObject=> {
            const galaxySphere = new THREE.Points(galaxyObject.galaxyGeometry, galaxyObject.starMaterial);

            gameModuleGetter.getGameModules().canvasRender.addToScene(galaxySphere);

            gameModuleGetter.getGameModules().canvasRender.addEventListener('click', galaxySphere, function (star) { console.log(star);
                if(star) {
                    new Promise((res, rej)=> {

                        res(galaxyData.starsField[star.index]);

                    }).then((currentStar)=> {

                        if(star.distanceToRay < 0.05) {
                            gameModuleGetter.getGameModules().uiModule.generateInfoAlert({
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

    function afterInit() {
        console.error('Modules was initializes');
    }
}
