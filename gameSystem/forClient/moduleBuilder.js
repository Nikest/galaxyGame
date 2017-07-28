function ModuleBuilderModule() {

    const gameModules = {};

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
        Object.keys(gameModules).forEach((module) = > {
            gameModules[module].init(this.api)
        }
        )
        ;

        this.initGameModules = afterInit;
        return this
    };
    this.gameStart = function () {
        gameModules.canvasRender.startRender();

        gameModules.serverRequester.getGalaxy().then(responce = > {
            const galaxy = JSON.parse(responce);
        window.starsField = galaxy.starsField;

        gameModules.astroViewer.renderGalaxy(galaxy);
    })
        ;

        this.gameStart = afterStart;
        return this
    };
    this.api = {
        getGameModules: function () {
            return gameModules
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