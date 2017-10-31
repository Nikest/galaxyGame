window.addEventListener('load', function () {
    const core = new CoreModule();
    core.createGameModules();
    core.initGameModules();
    core.gameStart();
});