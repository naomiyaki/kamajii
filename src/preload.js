// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// Securely setup methods to use Electron functions (like ipcRenderer)
// inside of renderer process. 
// Note that frontend modules like react or lodash aren't necessary here
// because they get bundled (by Parcel) just like a webpage
// https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron
// https://www.electronjs.org/docs/api/context-bridge?q=preload
// https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations

const { contextBridge, ipcRenderer } = require('electron');
const validChannels = require('./ipc-channels');

// Instead of directly exposing methods like invoke or send, individual
// methods are generated based on the list in ipc-channels 
// so the renderer cannot access ipc methods arbitrarily.
const ipcMethods = {}
Object.keys(validChannels).forEach((key) => {
  ipcMethods[key] = (data) => ipcRenderer.invoke(validChannels[key], data);
});

// This is just an example of how to expose these, if you're using send/recieve
// you could build separate generators, or if you're just building some internal thing
// that doesn't need security, you could just expose the methods you need
contextBridge.exposeInMainWorld(
  "electron", {...ipcMethods}
)