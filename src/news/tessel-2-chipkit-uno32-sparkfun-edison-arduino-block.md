---
author: Rick Waldron
date: '2015-08-03 11:02:00'
status: published
title: 'Tessel 2, chipKit Uno32 & SparkFun Edison Arduino Block'
slug: 'tessel-2-chipkit-uno32-sparkfun-edison-arduino-block'
category:
  - Announcement
  - Platform
---


The team is pleased to announce support for three new hardware platforms: 


## [Tessel 2](/platform-support/#tessel-2)

[![Tessel 2 Fritzing Component Part from Johnny-Five](/img/platforms/tessel-2.png)](https://www.sparkfun.com/products/13036)

The [Tessel 2](https://shop.tessel.io/) is a complete hardware and software overhaul from the Tessel 1, featuring a [580MHz Mediatek MT7620n SoC](http://www.anz.ru/files/mediatek/MT7620_Datasheet.pdf) running [OpenWrt](https://www.openwrt.org/) Linux, with the [io.js](https://iojs.org) runtime, in conjunction with an [48MHz ARM Cortex M0 microcontroller (Atmel SAMD21)](http://www.atmel.com/Images/Atmel-42181-SAM-D21_Datasheet.pdf). For more information, take a look at their [hardware overview announcement](https://tessel.io/blog/113259439202/tessel-2-hardware-overview).

The [Tessel-IO](https://github.com/rwaldron/tessel-io) module is still in development, so early test reports are wanted! Using the module is just like any other [IO-Plugin](https://github.com/rwaldron/io-plugins): 

```js
var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", function() {
  // Write your program locally and push to the Tessel 2 when ready!  
});
```

Once you're ready to test: 

```sh
tessel run program.js
```

(Subject to change as development continues)

Check out the [Tessel-IO README](https://github.com/rwaldron/tessel-io#install--setup) for installation and setup details, as well as board and per-pin capability information.

## [chipKit Uno32](/platform-support/#chipkit-uno32)

[![chipKit Uno32](/img/platforms/chipkit-uno32.png)](http://chipkit.net/wpcproduct/chipkit-uno32/)

This [chipKit Uno32](http://chipkit.net/wpcproduct/chipkit-uno32/) was the highlight of this year's [International Nodebots Day](https://github.com/nodebots/nodebotsday) at [HeatSync Labs](http://www.heatsynclabs.org/) in [Mesa, AZ](http://chipkit.net/nodebots-day/)! Compatible with the [Arduino Uno](https://www.arduino.cc/en/Main/arduinoBoardUno), simply flash [StandardFirmata](https://github.com/firmata/arduino/) to the board via Arduino IDE and it's ready to go! (Note: digital pins 26-41 and analog pins A6-A11 are presently not supported, pending a pin definition update in StandardFirmata's `Boards.h`).



## [SparkFun Edison Arduino Block](/platform-support/#sparkfun-arduino-block)

[![](/img/platforms/sparkfun-arduino-block.png)](https://www.sparkfun.com/products/13036)

The [SparkFun Edison Arduino Block](https://www.sparkfun.com/products/13036) is an interesting addition to Johnny-Five's [Intel Edison](https://software.intel.com/en-us/iot/library/edison-getting-started) supported variants. This "block" doesn't take advantage of the native bindings provided by [Galileo-IO](https://github.com/rwaldron/galileo-io); instead, it connects via Serial/Uart to an Atmega328P chip, which is flashed with StandardFirmata! Checkout the tutorial at [SparkFun Blocks for Intel® Edison - Arduino Block](https://learn.sparkfun.com/tutorials/sparkfun-blocks-for-intel-edison---arduino-block) for help getting started.

As with all Intel Edison variants, your program will run directly on the board itself. The only difference is that instead of requiring the [Galileo-IO](https://github.com/rwaldron/galileo-io) plugin, you'll simply specify the serialport path: 

```js
// This code runs on the Edison, communicating with the 
// SparkFun Arduino Block via Serial1 (/dev/ttyMFD1)
var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/ttyMFD1"
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(500);
});
```

