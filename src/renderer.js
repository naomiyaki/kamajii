// This file is required by the index.html file
// and gets precompiled by Parcel. It will
// be executed in the renderer process for that window.

// Node.js APIs are available in this process when "nodeIntegration"
// is turned on, optionally globals can be selectively added in
// "preload.js"

// Instantiate react app in main index.html
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Process from './components/Process';

// ReactDOM.render(
//   <Process/>,
//   document.getElementById('renderer')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import Process from './components/Process';

ipcRenderer.send('ipc-active', {name: "Sample"});

ReactDOM.render(
    <Process/>,
    document.getElementById('renderer')
);