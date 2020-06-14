// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Context Isolation provides a separate secure context
      // for exposed node methods, will be default from Electron 12 on
      // https://www.electronjs.org/docs/tutorial/context-isolation
      contextIsolation: true,
      // Preload script can be used to add global node variables and
      // securely pass Electron/Node methods to be used in renderer
      // https://www.electronjs.org/docs/api/process#event-loaded
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  if (process.env.DEV_SERVER === 'true') {
    // If dev server is running, run bundled files from there
    // Currently these are in a 'dist' file because this isn't configurable by Parcel 2 (yet!)
    // But should be in a future update
    mainWindow.loadURL('http://localhost:1234');
  } else {
    // Otherwise run from Parcel packaged bundle
    // Kamajii uses "bundle", because "build" and "dist" are both used by electron-builder
    mainWindow.loadFile('./bundle/index.html');
  }

  // Open the DevTools if the app isn't being run from a built package.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Test IPC to ensure preloaded objects
ipcMain.handle('to-main', async(e, data) => {
  console.log(`Message recieved from renderer: "${data.message}"`);
  return `Message returned from main: "${data.message}"`;
});