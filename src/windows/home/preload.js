const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getDirectoryFilesCount: (path) => ipcRenderer.invoke("get-directory-files-count", path),
    startProgress: (inputPath, outputPath) => ipcRenderer.invoke("start-progress", inputPath, outputPath),
    handleUpdateProgression: (callback) => ipcRenderer.on("update-progress", callback),
})