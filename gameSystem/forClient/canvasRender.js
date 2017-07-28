function CanvasRenderModule() {

    let gameModuleGetter;

    let scene, renderer, container, camera, light, controls, raycaster, mouse;

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }

    this.init = function (mBuilderApi) {
        gameModuleGetter = mBuilderApi;

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.z = 6;
        camera.position.y = 6;

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);
        controls.enableKeys = true;

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        this.init = afterInit;
    };

    this.startRender = function () {
        container = gameModuleGetter.getGameModules().uiModule.getCanvasContainer();
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false);

        animate();
    };

    this.addToScene = function (object) {
        scene.add(object)
    };

    this.getControls = function () {
        return controls
    };

    this.addEventListener = function (event, object, callback) {
        document.addEventListener(event, function (e) {
            mouse.x =  (e.clientX / renderer.domElement.width) * 2 - 1;
            mouse.y = -(e.clientY / renderer.domElement.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            let intersects = raycaster.intersectObject(object, true);

            callback(intersects.sort((a, b)=> {
                return a.distanceToRay - b.distanceToRay;
            })[0])
        });
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}