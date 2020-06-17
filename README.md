# Kamajii 2020
A minimal Electron 9 Boilerplate with Parcel (2.0!) Pre-Compiled React, SCSS, and other common configurations ready to go
___

![Gif of Kamajii the boiler at work from Spirited Away](https://media.giphy.com/media/ljPMWcS0zdSpCOk3gE/giphy.gif)

Kamajii 2020 Alpha has been rebuilt from the ground-up to work with Electron 9 and Parcel 2.0 (in alpha). It is configugred out of the box with React, SCSS, secure ipc communication, and BYO DevTool Extension suppport (instructions on how to download below - link to this if possible).

## 🖌 Let's Make a Desktop App!
Kamajii is a boilerplate or starter-kit for [Electron](https://github.com/electron/electron): GitHub's framework for building cross platform apps using JavaScript and other web technologies.

Electron already has a [very good quick-start-app](https://github.com/electron/electron-quick-start), but Javascript apps often have a next-step in the setup that involves installing a bundler, and a UI library like React or Vue. For Electron, there are a couple more things that go in this next step like setting up build commands, secure access to global node methods, and dev-tool extensions. That's where a starter-kit like Kamajii comes in!

There are plenty of great Electron starter kits out there already, but Electron and the world of bundlers move fast. I made this one specifically to work with Parcel 2, which has little documentation on getting started with Electron. So if you're doing that, I hope this repo and the documentation are a helpful guide for you 💖

## 🚚 Version Caveats
This repo has been built and tested to create/run a functioning Electron 9 app with React. However, Parcel 2 is still in alpha and has a few warnings and missing features which I'll go over below, so this package is in alpha too. I'll try to update as Parcel 2 reaches beta/final release.

I used "2020" in the name because I think it's important to be very deliberate about the timeline for any kind of boilerplate code (especially JS). As of Summer 2020, it's very up-to-date 🎃. If you're reading this a year out or more (or 1+ versions of Electron), it might be time to start fresh with today's modules, or seek out a newer boilerplate.

## 🎧 How to use?
I think there are two ways to use an Electron starter.
### Using Kamajii as a drop-in boilerplate for getting started fast!
Maybe this isn't your first Electron app and you're like. Parcel! React! All of this - let's just get going! OK buckaroo, here's how you do that:

- Download or clone this repo to your machine.  
`git clone https://gitlab.com/naomiyaki/kamajii-2020.git`
- Hop into your terminal and CD into the directory. Rename it if you like!  
`cd kamajii-2020`
- Install all the node dependencies  
`npm install` or `yarn install`
- Either bundle and run the built app with these two commands or...  
`npm run bundle` then `npm start`
- Try development mode (with hot reloading) with just one line:  
`npm run dev`

### Using Kamajii as a reference/tutorial for your own-app build out
In my experience, Electron starter-kits work best as a reference point for options and configurations you might want to use in your own app. This repo is no different.

If you're fairly new to JavaScript or Electron, it helps to start with Electron's own [quick-start guide](https://github.com/electron/electron-quick-start), then go through the files and learn the app structure, picking and choosing the features from Kamajii (or any other starter-kit) that you want in your own program.

Maybe there's just a couple features from here you want, or you're trying to upgrade your Electron app from Parcel 1 to Parcel 2.

The walkthroughs in the rest of this guide is for you!

## Feature Walkthrough
The bulk of the documentation is written as comments in the code itself - this walkthrough briefly goes through each feature as well as where you can find the code.

The guide assumes you have node setup on your machine and know how to access code via the terminal and your editor of choice, it's not meant to be a beginner's guide to Electron as there is [plenty of documentation for that already](https://www.electronjs.org/docs), but if you need further help getting started, feel free to reach out!

### Package.json
Since package.json can't really contain comments, here is a quick rundown of Kamajii's setup. Note that this explanation isn't in the same order as the file itself.

`"main": "./src/main.js",`
This is the entry point for the app when running in development.

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

That's a LOT of scripts*, but don't worry, you'll only really use one of them for development and a couple other for bundling and building the app.

- `npm run bundle` and then `npm start` (or `npm run start`)  
This will bundle the code with Parcel and then open the app from the command line using your bundled files. Subsequent changes you make to files will not show up in the app until you bundle and start again.

- `npm run dev`  
This will run Parcel's dev server, and then open the app using dynamically generated files on the server. You can now change any files in the renderer process while the app is open, and it will automatically reload with your changes. Because the dev-server runs in parallel with Electron, it may take a few seconds for Parcel to finish the initial build before you see anything in the app. 
 Keep in mind that changes to the main process (`main.js`, `preload.js`, etc.) will not cause a reload: you still need to rerun the command for these.

- `npm run pack`
This will package the app as an executable for your current OS using Electron Builder. Make sure to run `npm run bundle` before doing this if you haven't already bundled your code.

- `npm run dist`
This will package the app as an application installer for your current OS using Electron Builder. Make sure to run `npm run bundle` before doing this if you haven't already bundled your code.

*The reason there are so many scripts is because Kamajii uses npm-run-all to consolidate multiple smaller scripts into one. Every other script in `package.json` is one of these smaller scripts.

### Parcel 2 Bundling

### Sass and it's many issues
⚠ Bug time: SCSS hot-module reloading is... still a little spotty in Parcel 2. In my testing it works if you are working in a single file, but changes to `include` files will not show until you update your top level `index.scss` type file.

### React built in

### Secure ipc Communication

### Drop-in Dev Tool setup

## 🌌 What's next!
...we wait. Parcel's next release should be coming out soon, so once that comes out I'll try to implement it in here as soon as possible.

If you found this useful, or want to read some hopeful queer fantasy comics, please consider [supporting me on Patreon](http://www.patreon.com/naomirubin)! Thanks so much for trying out Kamajii.