function ServerRequesterModule() {

    let gameModuleGetter;

    this.init = function (mBuilderApi) {
        gameModuleGetter = mBuilderApi;
        this.init = afterInit;
    };
    this.getGalaxy = function () {
        const xmlhttp = new XMLHttpRequest();
        return new Promise(function (res, rej) {
            xmlhttp.open('GET', '/system', true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    res(xmlhttp.response)
                }
            };
            xmlhttp.send();
        })
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}