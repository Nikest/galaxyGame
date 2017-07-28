window.addEventListener('load', function () {
    const mBuilder = new ModuleBuilderModule();
    mBuilder.createGameModules();
    mBuilder.initGameModules();
    mBuilder.gameStart();
});