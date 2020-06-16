# Kamajii 2020
A minimal Electron 9 Boilerplate with Parcel (2.0!) Pre-Compiled React, SCSS, and other common configurations ready to go
___

![Gif of Kamajii the boiler at work from Spirited Away](https://media.giphy.com/media/ljPMWcS0zdSpCOk3gE/giphy.gif)

Kamajii 2020 Alpha has been rebuilt from the ground-up to work with Electron 9 and Parcel 2.0 (in alpha). It is configugred out of the box with React, SCSS, secure ipc communication, and BYO DevTool Extension suppport (instructions on how to download below - link to this if possible).

## 🖌 Let's Make a Desktop App!
Kamajii is a boilerplate or starter-kit for [Electron](https://github.com/electron/electron): GitHub's framework for building cross platform apps using JavaScript and other web technologies.

Electron already has a [very good quick-start-app](https://github.com/electron/electron-quick-start), but Javascript apps often have a next-step that involves setting up a bundler, and a UI library like React or Vue. For Electron, there are a couple more things that go in this next step like setting up build commands, secure inter-process communication, and dev-tool extensions. That's where a starter-kit like Kamajii comes in!

There are plenty of great Electron starter kits out there already, but Electron and the world of bundlers move fast. I made this one specifically to work with Parcel 2, which has little documentation on setting up with Electron. So if you're hoping to do that, I hope this repo and the documentation are a helpful guide for you! 💖

## 🚚 Version Caveats
This repo has been built and tested to create/run a functioning Electron 9 app with React. However, Parcel 2 is still in alpha and has a few warnings and missing features which I'll go over below, so this package is in alpha too. I'll try to update as Parcel 2 reaches beta/final release.

I used "2020" in the name because I think it's important to be very deliberate about the timeline for any kind of boilerplate code (especially JS). As of Summer 2020, it's very up-to-date 🎃. If it's a year out or more (or 1+ versions of Electron), it might be time to start fresh with today's modules (or seek out a newer boilerplate).

## 🎧 How to use?
I think there are two ways to use an Electron starter.
### Using Kamajii as a drop-in boilerplate for getting started fast!
Maybe this isn't your first electron app and you're like. Parcel! React! All of this - let's just get going! OK buckaroo, here's how you do that:

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

Especially if you're fairly new to JavaScript or Electron, it helps to start with Electron's own quick-start guide, then go through the files and learn the app structure, picking and choosing the features from Kamajii (or any other starter-kit) that you want in your own app.

Maybe there's just a couple features from here you want, or you're trying to upgrade your Electron app from Parcel 1 to Parcel 2.

The feature walkthrough in the rest of this guide is for you!

## 🌌 What's next!
...we wait. Parcel's next release should be coming out soon, so once that comes out I'll try to implement it in here as soon as possible.

If you found this useful, or want to read some hopeful queer fantasy comics, please consider [supporting me on Patreon](http://www.patreon.com/naomirubin)! Thanks so much for trying out Kamajii.