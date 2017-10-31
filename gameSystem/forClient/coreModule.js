function CoreModule() {

    const gameModules = {};
    const subscriptions = {};

    this.createGameModules = function () {
        gameModules.canvasRender = new CanvasRenderModule();
        gameModules.serverRequester = new ServerRequesterModule();
        gameModules.uiModule = new UImodule();
        gameModules.astroViewer = new AstroViewerModule();
        gameModules.shadersMaterials = new ShadersMaterialModule();

        this.createGameModules = afterCreate;
        return this
    };

    this.initGameModules = function () {
        Object.keys(gameModules).forEach((module)=>{
            gameModules[module].init(api)
        });

        this.initGameModules = afterInit;
        return this
    };

    this.gameStart = function () {
        gameModules.canvasRender.startRender();

        gameModules.serverRequester.getGalaxy().then(responce=> {
            const galaxy = JSON.parse(responce);
            window.starsField = galaxy.starsField;

            gameModules.astroViewer.renderGalaxy(galaxy);
        });

        this.gameStart = afterStart;
        return this
    };

    const api = {
        getGameModules: function () {
            return gameModules
        },
        subscribe: function (type, fn) {
            if(subscriptions[type]) {
                subscriptions[type].push(fn);
            } else {
                subscriptions[type] = [fn];
            }
        },
        unsubscribe: function (type, fn) {
            subscriptions[type] = subscriptions[type].filter((sbscr)=>{
                if(sbscr !== fn) {
                    return sbscr;
                }
            });
        },
        message: function (type, params) {
            if(subscriptions[type]) {
                subscriptions[type].forEach((fn)=>{
                    fn(params)
                });
            }
        }
    };

    function afterCreate() {
        console.error('Modules was created');
    }
    function afterInit() {
        console.error('Modules was initializes');
    }
    function afterStart() {
        console.error('Game was Started');
    }
}