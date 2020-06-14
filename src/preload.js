// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// Securely setup methods to use Electron functions (like ipcRenderer)
// inside of renderer process. 
// Note that frontend modules like react or lodash aren't necessary here
// because they get bundled (by Parcel) just like a webpage
// https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron
// https://www.electronjs.org/docs/api/context-bridge?q=preload

const { contextBridge, ipcRenderer } = require('electron');
const validChannels = require('./ipc-channels');

contextBridge.exposeInMainWorld(
  "electron", {
    ipcSend: (channel, data) => {
      // For security, channels can be validated
      // against a list, this is disabled for
      // initial development but provided for future use
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    }
  }
)