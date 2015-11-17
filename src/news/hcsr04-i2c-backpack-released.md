---
author: Andrew Fisher
date: '2015-11-13 12;37'
status: published
title: 'HC-SR04 I2C Backpack support lands'
slug: 'hcsr04-i2c-backpack-support-lands'
category:
  - Announcement
  - Platform
---

A new controller for the humble HC-SR04 ultrasonic sensor has been released, 
removing the need for a custom firmata!

As with the rest of the `Proximity` controllers, `HCSR04I2CBACKPACK` provides 
a distance reading as it detects obstacles in front of it up to a range of approx 4m.

To use the new controller:

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04I2CBACKPACK",
    freq: 100,
  });

  proximity.on("data", function() {
    console.log(this.cm + "cm", this.in + "in");
  });

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});

```

Take a look at the example for more details. //link

This is the first component controller to be released using the I2C Backpack 
approach. This sub project, known as [Interchange](https://github.com/ajfisher/nodebots-interchange), 
provides a mechanism for components to operate using I2C when they may not 
ship with this support. This is provided using an inexpensive microcontroller 
(typically <$3) to bridge between the main board and the component using the 
I2C/TWI standard.

The HCSR04 sensor is ubiquitous due to its cheapness (<$2) so it features 
heavily in many nodebots projects. However, to make the sensor work, a custom 
firmata is required and it can also introduce performance implications. 
Moreover, these sensors do not work easily on platforms such as the Raspberry 
Pi (a popular nodebots platform).

With this new controller using an Interchange backpack, the HC-SR04 
ultrasonic sensor can now be used in any nodebots project where the board has I2C support.

[Issues can be created here.](https://github.com/rwaldron/johnny-five/issues)
