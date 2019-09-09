// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const os = require('os')
const url = require('url')

// Let electron reload by itself when files change
if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname)
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file',
    slashes: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl)

  // If running in a development mode, open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()

    // Scoop local .env file into node
    require('dotenv').config();

    // Setup cross platform DevTools Extension locations
    const darwinDTELocation = '/Library/Application Support/Google/Chrome/Default/Extensions/'
    const winDTELocation = '/AppData/Local/Google/Chrome/User Data/Default/Extensions/'

    // Currently supports Mac and Windows development
    // (Linux has a lot of variables: https://electronjs.org/docs/tutorial/devtools-extension)
    let dTELocation = null;
    if (process.platform === 'darwin' || process.platform === 'win32') {
      dTELocation = process.platform === 'darwin' ? darwinDTELocation : winDTELocation;
    }

    // Setup React Dev Tool if configured in .env
    if(dTELocation && process.env.DTE_REACT_ID && process.env.DTE_REACT_VER){
      BrowserWindow.addDevToolsExtension(
        path.resolve(os.homedir() + `${dTELocation}/${process.env.DTE_REACT_ID}/${process.env.DTE_REACT_VER}`)
      );
    }

    if(dTELocation && process.env.DTE_REDUX_ID && process.env.DTE_REDUX_VER){
      BrowserWindow.addDevToolsExtension(
        path.resolve(os.homedir() + `${dTELocation}/${process.env.DTE_REDUX_ID}/${process.env.DTE_REDUX_VER}`)
      );
    }
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
