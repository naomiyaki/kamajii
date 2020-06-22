# Kamajii 2020
A minimal Electron 9 Boilerplate with Parcel (2.0!) Pre-Compiled React, SCSS, and other common configurations ready to go
___

![Gif of Kamajii the boiler at work from Spirited Away](readme.gif)

Kamajii 2020 Beta has been rebuilt from the ground-up to work with Electron 9 and [Parcel 2.0 (in beta)](#parcel-2-bundling). It is configured out of the box with [React](#react-built-in), [Sass](#sass), [secure ipc communication](#secure-ipc-communication), and [BYO DevTool Extension suppport](#drop-in-dev-tool-setup).

## 🖌 Let's Make a Desktop App!
Kamajii is a boilerplate or starter-kit for [Electron](https://github.com/electron/electron): GitHub's framework for building cross platform apps using JavaScript and other web technologies.

[TLDR I'm ready to go!!!](#using-Kamajii-as-a-drop-in-boilerplate-for-getting-started-fast!)

Electron already has a [very good quick-start-app](https://github.com/electron/electron-quick-start), but Javascript apps often have a next-step in the setup that involves installing a bundler, and a UI library like React or Vue. For Electron, there are a couple more things that go in this next step like setting up build commands, secure access to global Node methods, and dev-tool extensions. That's where a starter kit like Kamajii can help.

There are [plenty of great Electron starter kits](https://github.com/sindresorhus/awesome-electron#boilerplates) out there already, but Electron and the world of bundlers move fast. I made this one specifically to work with Parcel 2, which has little documentation on getting started with Electron. So if you're doing that, I hope this repo and the documentation are a helpful guide for you 💖

## 🚚 Version Caveats
This repo has been built and tested to create/run a functioning Electron 9 app with React. However, Parcel 2 is still in beta and has a few warnings and missing features which I'll go over below, so consider this package is in beta too. I am also still learning how Parcel's new configurations work with Electron. I'll try to update Kamajii as Parcel 2 reaches additional betas/final release.

While you might not be looking to use a pre-release bundler in your project right now, I hope this repo will serve as a sample guide for seting up Parcel 2 with Electron as it evolves.

I used "2020" in the name because I think it's important to be very deliberate about the timeline for any kind of boilerplate code (especially JS). As of Summer 2020, it's very up-to-date 🎃. If you're reading this a year out or more (or 1+ versions of Electron), it might be time to start fresh with today's modules, or seek out a newer boilerplate.

## 🎧 How to use?
I think there are two ways to use an Electron starter.

### Using Kamajii as a drop-in boilerplate for getting started fast!
Maybe this isn't your first Electron app and you're like. Parcel! React! All of this - let's just get going! OK buckaroo, here's how you do that:

- Download or clone this repo to your machine.  
`git clone https://gitlab.com/naomiyaki/kamajii.git`
- Hop into your terminal and cd into the directory.  
`cd kamajii`
- Install all the Node dependencies  
`npm install` or `yarn install`
- Either bundle and run the built app with these two commands or...  
`npm run bundle` then `npm start`
- ...Try development mode (with hot reloading) with just one line:  
`npm run dev`

### Using Kamajii as a reference/tutorial for your own-app build out
In my experience, Electron starter-kits work best as a reference point for options and configurations you might want to use in your own app. This repo is no different.

If you're fairly new to JavaScript or Electron, it helps to start with Electron's own [quick-start guide](https://github.com/electron/electron-quick-start), then go through the Kamajii files (or any other starter-kit) and learn the app structure, picking and choosing the features that you want in your own program.

Maybe there's just a couple features from here you want, or you're trying to upgrade your Electron app from Parcel 1 to Parcel 2.  
The walkthroughs in the rest of this guide are for you!

## Feature Walkthrough
The bulk of the documentation is written as comments in the code itself - this walkthrough briefly goes through each feature as well as where you can find the code.

The guide assumes you have Node setup on your machine and know how to access code via the terminal and your editor of choice. It's not meant to be a beginner's guide to Electron as there is [plenty of documentation for that](https://www.electronjs.org/docs), but if you need further help getting started, feel free to reach out!

### Package.json
Since package.json can't really contain comments, here is a quick rundown of Kamajii's setup. Note that this explanation isn't in the same order as the file itself.

``` 
"main": "./src/main.js", 
```
This is the entry point for the app when running in development.

#### Scripts
```
"scripts": {
    "start": "electron .",
    "dev": "npm-run-all -s trash-temp -p dev-bundle dev-start",
    "bundle": "run-s trash-bundle bundle-build",
    "pack": "run-s trash-temp bundle-build pack-build",
    "dist": "run-s trash-temp bundle-build dist-build",
    ...
    ... # Lots more scripts in here
}
```

That's a LOT of scripts, but don't worry, you'll only really use one of them for development and a couple other for bundling and packaging the app.

- `npm run bundle` and then `npm start` (or `npm run start`)  
📦 This will bundle the code with Parcel and then open the app from the command line using your bundled files. Subsequent changes you make to files will not show up in the app until you bundle and start again.

- `npm run dev`  
🚀 This will run Parcel's dev server, and then open the app using dynamically generated files on the server. You can now change any files in the renderer process while the app is open, and it will automatically reload with your changes.  
Because the dev-server runs in parallel with Electron, it may take a few seconds for Parcel to finish the initial build before you see anything in the app.
 Keep in mind that changes to the main process (`main.js`, `preload.js`, etc.) will not cause a reload: you still need to rerun the command for these.

- `npm run pack`  
This will bundle your code with Parcel, and then package the app as an executable for your current OS using [Electron Builder](https://www.electron.build/).

- `npm run dist`  
This will bundle your code with Parcel, and then package the app as an application installer for your current OS using [Electron Builder](https://www.electron.build/).

#### Main Parcel Commands
```
    "dev-bundle": "parcel ./src/index.html --target renderer --dist-dir ./bundle",
    ...
    "bundle-build": "parcel build ./src/index.html --target renderer ",
```
You never have to run `dev-bundle` or `bundle-build` on their own (they is run as part of `dev` and `bundle` respectively), but they're useful to point out because this is the main Parcel command. It passes the renderer endpoint `src/index.html` to Parcel and also flags a "target" called "renderer."

##### The reason there are so many scripts is because Kamajii uses npm-run-all to consolidate multiple smaller scripts into one. Every other script in `package.json` is one of these smaller scripts.

#### Minimal Parcel Configuration
```
  "renderer": "./bundle/index.html",
  "targets": {
    "renderer": {
      "publicUrl": "./",
      "context": "browser"
    }
  },
```
This, along with the script above is the bulk of the Parcel 2 configuration for this app! The `renderer` field at the top defines a file where the entry point in the `parcel` command will be bundled.

In other words  
`parcel src/index.html renderer` -> becomes -> `"renderer": "./bundle/index.html"`  
And Parcel figures out pretty much everything from there.

In this context "renderer" is what [Parcel calls a "target"](https://github.com/parcel-bundler/parcel#targets) and we need to set it up as such in `package.json` in the `"targets:"` object by creating an object `"renderer": {` with a matching name. This is also where we setup any additional configuration for the target. It's not clear what the default configs are at this time.

`"publicUrl": "./",`  
This tells Parcel to look in the current directory for the bundle when its running. The dev-server works without this, but it's necessary for the static bundle.

`"context": "browser"`  
My understanding is that this tells Parcel to bundle files for a browser based JS app (as opposed to a Node module or something). The documentation isn't super clear on exactly the what/how here.  
There is actually an "electron-renderer" context available in Parcel 2, but it assumes the use of import/require, which is turned off by default (and left off in Kamajii for security). Of course, you can still use `import` all the same with the "browser" context, because Parcel will bundle your modules just like it would for the browser.

#### Bundle directory and the Dev Server
Starting Kamajii with `npm start dev` will cause Electron to open the renderer code from a dev-server that is storing files inside "./bundle/." If you setup the Content Security Policy inside `src/index.html` for development (see index.html for instructions), any changes made to the Javascript will be instantly re-bundled and reloaded inside Electron! This is called "Hot Module Reloading" or "HMR."

By default, Parcel saves bundled files in a "dist/" directory, but since Electron Builder saves packaged versions of the application there, Kamajii is seutup to use a "bundle/" directory instead. For development, the --dist-dir option configures this, so you can save development files and production bundled files in separate places if you want. 

In testing, files bundled for development don't work without HMR warnings in production, so running bundle or any of the app packaging commands always removes "bundle/" and re-bundles your renderer code before building. As of the Beta-1 update, no commands will automatically delete the "dist" folder, but there is still a `temp-trash` command in package.json if you want to delete **all** temporary/built files.

##### There are some default Parcel targets like "module" and "browser," I'm not sure if you need to define these inside of `"targets":` or not.

```
  "build": {
    "appId": "com.kamajii.app",
    "mac": {
      "category": "public.app-category.developer-tools"
    }
  },
```
These fields are required for packaging your app on Mac OS. Even though Electron Builder can package the app for Mac on your machine, [additional setup](https://www.electron.build/configuration/mac) is required to become a signed developer and publish the app without warnings.

### Parcel 2 Bundling
It's here! Kamajii has scripts to bundle static assets and also run a dev server with hot-module reloading. 

Files:  
`package.json`  
Parcel has some minimal configuration for this Electron build-out (see above)

`src/main.js`  
Checks whether to get assets from the dev-server or bundle.

`index.html`  
[Hot module reloading](#bundle-directory-and-the-dev-server) requires a differenct content-security-policy for development, so you'll want to adjust this for long dev sessions.

### Sass
I really like Sass, and Parcel makes it really easy to just include a file and start building.

#### ⚠️ Bug time
SCSS hot-module reloading is... still a little spotty in Parcel 2. In my testing it works if you are working in a single file, but changes to `include` files will not show until you update your top level `index.scss` type file. I'm hoping it's addressed soon!

Files:  
`src/index.html`
Includes the initial Sass index file

`src/assets/index.scss`
Sass root file. Also includes normalize and some scss for the sample app.

`src/assets/_normalize.css`  
`src/assets/_normalize.scss`

### React built in
You should see a React app up and running when you start Kamajii! There's a little sample component for you to modify and test.

Files:  
`src/renderer.js`  
Renders a React component in the main html.

`src/components/Process.js`  
First sample React component.

### Secure ipc Communication
Electron's security is always evolving. In a small, internal app it might be OK to use some Node methods right in the renderer, but it's considered insecure to expose this access in general.

Still, the renderer needs *some way* to get messages back and forth with the main process. So Kamajii has a little script that creates single-purpose ipc messaging promises based on a simple object (You can also add your own methods, of course)!

Files:  
`src/ipc-channels.js`  
A simple Javascript object where you can name your ipcMethod and give it a channel string. Any object in here will be turned into an ipcMethod that can be used in the renderer globally.

`src/preload.js`  
Contains the script that loads the ipc methods into the renderer. This is also where you would add additional methods.

`src/renderer.js` (line 15)  
Has an example ipc promise. If this is working, you'll see a message in the Electron/Window console from the main process.

`src/main.js` (line 78)
Returns a message to the promise in the renderer and also runs code in the main process. If this is working, you'll see a Node console log that a message has been recieved from the renderer.

### Drop-in Dev Tool setup
Electron recently changed the way Dev Tools are loaded, and you now have to download them to your system somewhere and instantiate them within the app. Kamajii simplifies this a little bit by providing a folder to put them in, and a couple of sample lines that will load extensions in that folder. By default this is setup for React and Redux, but you should be able to set this up with [any of the extensions listed by Electron](https://www.electronjs.org/docs/tutorial/devtools-extension#supported-devtools-extensions).

The easiest way I've found to download the extension is by installing it in your local version of Google Chrome, then finding the extension files on your system, and putting them into the folder below.

How to find the extension files once installed in Chrome:
1. Go to `chrome://extensions/` inside of chrome. Click "details" on the extension you want to install, and note the `ID` of the extension.
1. Find the extension on your system. There is a [list of possible directories here](https://www.electronjs.org/docs/tutorial/devtools-extension#how-to-load-a-devtools-extension).
1. Find the folder that matches the ID from step 1. The folder you want is usually not this ID folder, but a folder inside it with the version-number of the extension (something like `4.7.0_0/`)
1. Copy that folder to the `dev-tool-extensions` folder inside Kamajii. If you want, you can then rename the folder based on its extension name instead of a version number.

Files:  
`dev-tool-extensions`  
Where to put your downloaded dev tool extensions

`src/main.js`  
Has two lines that, if uncommented, will load dev tool extensions that have been named "react" and "redux" from this folder. You can change the names to whatever you need, of course. 

##### There is a [node module that does this too](https://www.npmjs.com/package/electron-devtools-installer), but personally I like to just set it and forget it.

## 🌌 What's next!
- ...we wait. Parcel's Beta-1 was just released, so it may be a couple months before the next one, but once it does I'll try to implement it in here.

- CSS Modules? If [SCSS reloading](#sass) doesn't get fixed soon, I may explore this as an alternative.

- Bundling Electron main process with Parcel. While I often don't need the powers of a bundler to use Node APIs, having everying in one file and dynamic reloading could be great.

If you found this useful, or want to read some hopeful queer fantasy comics, please consider [supporting me on Patreon](http://www.patreon.com/naomirubin)! Thanks so much for trying out Kamajii.