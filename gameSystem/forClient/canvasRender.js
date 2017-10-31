function CanvasRenderModule() {

    let coreAPI;

    let scene, renderer, container, camera, light, controls, raycaster, mouse;

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        let cameraPos = cameraPositionChecking();
        if(cameraPos) {
            coreAPI.message('cameraPosition', cameraPos)
        }

        render();
    }

    let cameraPrevPosition = {
        x: 0,
        y: 0,
        z: 0
    };

    function cameraPositionChecking() {
        const shift = {};
        let change = false;

        const shiftXfactor = Math.round(camera.position.x);
        if(Math.abs(shiftXfactor - cameraPrevPosition.x) === 1) {
            shift.x = shiftXfactor;
            cameraPrevPosition.x = shiftXfactor;
            change = true;
        } else {
            shift.x = cameraPrevPosition.x
        }

        const shiftYfactor = Math.round(camera.position.y);
        if(Math.abs(shiftYfactor - cameraPrevPosition.y) === 1) {
            shift.y = shiftYfactor;
            cameraPrevPosition.y = shiftYfactor;
            change = true;
        } else {
            shift.y = cameraPrevPosition.y
        }

        const shiftZfactor = Math.round(camera.position.z);
        if(Math.abs(shiftZfactor - cameraPrevPosition.z) === 1) {
            shift.z = shiftZfactor;
            cameraPrevPosition.z = shiftZfactor;
            change = true;
        } else {
            shift.z = cameraPrevPosition.z
        }

        return (change)? shift : false
    }

    this.init = function (getCoreAPI) {
        coreAPI = getCoreAPI;

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000000);
        camera.position.z = 6;
        camera.position.y = 6;

        window.getCamera = function () {
            return camera;
        };

        controls = new THREE.OrbitControls(camera, renderer.domElement, 2, false);
        controls.addEventListener('change', render);
        controls.enableKeys = true;

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        this.init = afterInit;
    };

    this.startRender = function () {
        container = coreAPI.getGameModules().uiModule.getCanvasContainer();
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