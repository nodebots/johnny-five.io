---
author: Andrew Fisher
date: '2015-11-18 12:37'
status: published
title: 'HC-SR04 I2C Backpack support lands'
slug: 'hcsr04-i2c-backpack-support-lands'
category:
  - Announcement
  - Platform
---

A new controller for the humble [HC-SR04 ultrasonic sensor](http://www.amazon.com/SainSmart-HC-SR04-Ranging-Detector-Distance/dp/B004U8TOE6) has been released, removing the need for a [custom Firmata](http://johnny-five.io/api/proximity/#pingfirmata)!

<a href="/img/components/hcsr04.jpg"><img src="/img/components/hcsr04.jpg" width=""></a>
<a href="/img/components/parallax-ping-ultrasonic-sensor.jpg"><img src="/img/components/parallax-ping-ultrasonic-sensor.jpg" width=""></a>

As with the rest of the `Proximity` controllers, `HCSR04I2CBACKPACK` (or `HCSR04_I2C_BACKPACK`, whichever you prefer) provides a distance reading as it detects obstacles in front of it up to a range of approx 4m.

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
    console.log("Proximity: ");
    console.log("  cm  : ", this.cm);
    console.log("  in  : ", this.in);
    console.log("-----------------");
  });

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});
```

Take a look at the [example](https://github.com/rwaldron/johnny-five/blob/master/docs/proximity-hcsr04-i2c.md) for more details.

This is the first component controller to be released using the I2C Backpack approach. This sub project, known as [Interchange](https://github.com/ajfisher/nodebots-interchange), provides a mechanism for components to operate using I2C when they may not ship with this support. This is provided using an inexpensive microcontroller (typically sub-$3) to bridge between the main board and the component using the I2C/TWI standard.

The HCSR04 sensor is ubiquitous due to its cheapness (less than $2) so it features
heavily in many [@NodeBots](http://twitter.com/nodebots) projects. However, to make the sensor work, a custom
implementation of the Firmata protocol has been required, and it can also introduce performance implications as it requires a process blocking operation. Moreover, these sensors do not work easily on platforms such as the Raspberry
Pi (a popular NodeBots platform).

With this new controller using an Interchange backpack, the HC-SR04 ultrasonic sensor can now be used in any NodeBots project where the main board has standard I2C support.


[Please raise any issues here.](https://github.com/rwaldron/johnny-five/issues)
