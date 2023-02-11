const {BrowserWindow} = require('electron');

const createSplashWindow = () => {
    const splashWindow = new BrowserWindow({
        width: 200,
        height: 200,
        transparent: true,
        show: false,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            preload: SPLASH_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    splashWindow.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);

    splashWindow.center();

    splashWindow.once("ready-to-show", () => {
        splashWindow.show();
        setTimeout(() => {
            splashWindow.close();
        }, 3000);
    });
}

module.exports = createSplashWindow;