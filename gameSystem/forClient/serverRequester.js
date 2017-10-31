function ServerRequesterModule() {

    let coreAPI;

    this.init = function (getCoreAPI) {
        coreAPI = getCoreAPI;
        this.init = afterInit;

        coreAPI.subscribe('render', ()=> {
            sbscr();
        });
    };

    this.getGalaxyPart = function (coords) {
        unsbscr();
        const xmlhttp = new XMLHttpRequest();
        return new Promise(function (res, rej) {
            xmlhttp.open('POST', '/system/coords', true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    coreAPI.getGameModules().astroViewer.starFieldUpdate(JSON.parse(xmlhttp.response));
                }
            };
            xmlhttp.send(JSON.stringify(coords));
        })
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

    let unsbscr = () => {
        coreAPI.unsubscribe('cameraPosition', this.getGalaxyPart);
    };

    let sbscr = () => {
        coreAPI.subscribe('cameraPosition', this.getGalaxyPart);
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}