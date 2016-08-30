---
author: Rick Waldron
date: '2015-07-03 11:02:00'
status: published
title: 'New Keypad Component Class'
category:
  - Announcement
---


Introductory Keypad support has landed in Johnny-Five! The new `Keypad` class makes adding an analog or I2C keypad component to your project as simple as: 

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // This will initialize a SparkFun VKEY Keypad
  var keypad = new five.Keypad({
    controller: "VKEY",
    pin: "A0",
  });

  keypad.on("press", function(data) {
    console.log("Pressed: ", data.which);
  });
});
```

Programs can optionally specify special characters for keypad keys to represent: 

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // This will initialize a SparkFun MPR121QR2 Capacitive Touch Keypad
  var keypad = new five.Keypad({
    controller: "MPR121QR2",
    keys: [
      ["!", "@", "#"],
      ["$", "%", "^"],
      ["&", "-", "+"],
    ]
  });

  keypad.on("press", function(data) {
    console.log("Pressed: ", data.which);
  });
});
```

Take a look at these examples: 

- [Keypad - VKEY](/examples/keypad-analog-vkey/)
- [Keypad - Waveshare AD](/examples/keypad-analog-ad/)
- [Keypad - MPR121](/examples/keypad-MPR121/)
- [Keypad - MPR121QR2](/examples/keypad-MPR121QR2/)

The new `Keypad` class has been in the pipeline for many months as we tried to figure out how to support keypad components that require many pins and synchronous, explicit order write-read-write operations. Current support only covers keypad components that interact via ADC or I2C. For digital keypads, ie. electro-mechanical, or membrane devices, the path forward is to develop an "I2C backpack" approach that can be easily reproduced. This approach is how [Andrew Fisher](https://github.com/ajfisher) added support for [NeoPixels](https://github.com/ajfisher/node-pixel) and an alternative [Ultrasonic Ping](https://gist.github.com/ajfisher/1d57c5f845c376f04fbb) implementation. 

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).
