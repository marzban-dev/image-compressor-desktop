## Image Compressor Desktop App 🗜️🖼️️

### 🔵 This project is an image size reducer

In the easiest possible way, you just need to give the program a folder containing your photos, and by pressing a button, all the steps will be done automatically, and at the end, you will receive an output containing reduced size images.

### 🔵 Technologies
This program uses [Electron.js](https://www.electronjs.org/) technology, which is a JavaScript framework for creating desktop programs. 💻

Electron is a powerful framework for building desktop applications using JavaScript, HTML, and CSS. By embedding Chromium and Node.js into its binary, Electron enables web developers to create cross-platform apps that work seamlessly on Windows, macOS, and Linux, without requiring native development experience.

And besides, [React.js](https://react.dev/) library and several other tools have been used

React is a JavaScript library designed for creating user interfaces (UIs) in web applications. Developed by Facebook in 2011, React allows developers to build dynamic, high-performing UIs using a component-based architecture.

[Tailwind](https://tailwindcss.com) is used in the project for styling, which is a modern tool for using CSS, and [Framer Motion](https://framer.com) is also used, and the animations in the project are written with this library.

Tailwind CSS is an open-source CSS framework that takes a unique approach to styling web applications. Unlike traditional frameworks like Bootstrap, which provide predefined classes for specific elements (such as buttons or tables), Tailwind CSS focuses on utility classes. These utility classes are like building blocks that you can mix and match to style your components.

Finally, the [Sharp](https://sharp.pixelplumbing.com/) library has been used in the project to reduce the size of the photos

Sharp is a high-performance image processing module for Node.js. It’s designed to handle common image formats and provides lightning-fast operations like resizing, rotation, extraction, compositing, and gamma correction.

### 🔵 How to use

if you don't have the project on your system, use this Git command to clone the project :
```
git clone https://github.com/marzban-dev/image-compressor-desktop.git
```
and then move to the project folder using this command :
```
cd ./image-compressor-desktop
```
to start, run the program from the following path :
```text
image-compressor-desktop\out\Image Compressor.exe
```
it is an compiled version of Image Compressor app

---

⚠️ if you do not have [node.js](https://nodejs.org) installed on your system, please be sure to download and install it from this [link](https://nodejs.org).

---

if you want to edit the project source code and run it in development mode, you need to use the npm script named `start`, which is located in the `package.json` file.

but before that, you should install the dependencies by running this command :
```
npm install
```

So, to run in development mode, enter this command in CMD :
```
npm run start
```

and that's it,  have a nice compression ! 😉