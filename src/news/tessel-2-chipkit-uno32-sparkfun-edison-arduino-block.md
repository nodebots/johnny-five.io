---
author: Rick Waldron
date: '2015-08-03 11:02:00'
status: published
title: 'Tessel 2, chipKit Uno32 & SparkFun Edison Arduino Block'
category:
  - Announcement
  - Platform
---


The team is pleased to announce support for three new hardware platforms: 


## Tessel 2

![Tessel 2 Fritzing Component Part from Johnny-Five](/img/platforms/tessel-2.png)

The Tessel 2 is a complete hardware overhaul from the Tessel 1, featuring a [580MHz Mediatek MT7620n SoC](http://www.anz.ru/files/mediatek/MT7620_Datasheet.pdf) running [OpenWrt](https://www.openwrt.org/) Linux, with the [io.js](https://iojs.org) runtime, in conjunction with an [48MHz ARM Cortex M0 microcontroller (Atmel SAMD21)](http://www.atmel.com/Images/Atmel-42181-SAM-D21_Datasheet.pdf). For more information, take a look at their [hardware overview announcement](https://tessel.io/blog/113259439202/tessel-2-hardware-overview).





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
