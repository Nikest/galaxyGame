function UImodule() {

    let gameModuleGetter;

    this.init = function (mBuilderApi) {
        gameModuleGetter = mBuilderApi;
        window.UIclosePopup = function () {
            console.log('rem');
            document.body.removeChild(document.getElementById('popup'))
        };

        this.init = afterInit;
    };
    this.getCanvasContainer = function () {
        return document.getElementById('view-container')
    };
    this.generateInfoAlert = function (props) {
        let modalWindow = document.createElement('section');
        modalWindow.classList.add('popup-container');
        modalWindow.id = 'popup';

        let html = `
            <aside class="popup text-to-center">
                <header><h1>${props.title}</h1></header>
                <main>
                    ${props.masseges.map((elem) = > {return `<p>${elem}</p>`}).join('')}
                </main>
                <footer>
                    <button onclick="window.UIclosePopup()">Close</button>
                </footer>
            </aside>
        `;

        modalWindow.innerHTML = html;
        document.body.appendChild(modalWindow)
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}
