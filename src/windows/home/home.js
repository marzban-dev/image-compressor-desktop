const {promises: fsPromises} = require("fs");
const {BrowserWindow, ipcMain} = require('electron');
const {getDirectoryFilesCount, compressor} = require("../../backend/utils");

const createHomeWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 350,
        resizable: false,
        show: false,
        title : "Image Compressor",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    mainWindow.webContents.openDevTools();

    mainWindow.removeMenu();

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.once("ready-to-show", () => {
        setTimeout(() => {
            mainWindow.show();
        }, 3000);
    })

    ipcMain.on("some-event", (event, data) => {
        console.log(data);
    });

    ipcMain.handle('get-directory-files-count', getDirectoryFilesCount);

    ipcMain.handle('start-progress', async (e, inputPath, outputPath) => {

        const compressionProgressCallback = (compressionDetail) => {
            mainWindow.webContents.send('update-progress', compressionDetail)
        }

        return await compressor(inputPath, outputPath, 40, compressionProgressCallback);
    });
}

module.exports = createHomeWindow;