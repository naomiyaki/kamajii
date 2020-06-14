// This file is required by the index.html file
// and gets precompiled by Parcel. It will
// be executed in the renderer process for that window.

// Node.js APIs are available in this process when "nodeIntegration"
// is turned on, optionally globals can be selectively added in
// "preload.js"

import React from 'react';
import ReactDOM from 'react-dom';
import Process from './components/Process';

// Send sample Ipc message to main process
window.electron.ipcSend('to-main', {name: "Sample"});

// Instantiate react app in main index.html
ReactDOM.render(
    <Process/>,
    document.getElementById('renderer')
);