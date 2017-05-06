---
author: Brian Cooke
date: '2017-05-06 12:00:00'
status: published
title: 'Extensible Linux IO Plugin for Johnny-Five'
slug: 'linux-io'
category:
  - Announcement
  - Linux
---

Would you like to implement a Johnny-Five IO plugin for a Linux board similar to the [C.H.I.P.](https://getchip.com), [BeagleBone Black](https://beagleboard.org/black) or [Raspberry Pi](https://www.raspberrypi.org/)? Would you prefer not to implement code common to many boards like the low-level code required to access I2C devices? If so, [linux-io](https://github.com/fivdi/linux-io) could very well be just what you're looking for.

linux-io is an extensible IO plugin for Linux boards providing support for digital IO, I2C and built-in LEDs. It can be extended to provide support for additional functionality specific to a particular board, for example, PWM.

To whet your appetite for linux-io here is a tiny IO plugin for the Raspberry Pi that allows digital IO on GPIO4 and GPIO17 and I2C serial bus access on I2C bus 1:

```javascript
var LinuxIO = require('linux-io');
var util = require('util');

function TinyRaspberryPiIO() {
  if (!(this instanceof TinyRaspberryPiIO)) {
    return new TinyRaspberryPiIO();
  }

  LinuxIO.call(this, {
    pins: [{
      ids: ['P1-7', 'GPIO4'],
      gpioNo: 4,
      modes: [0, 1]
    }, {
      ids: ['P1-11', 'GPIO17'],
      gpioNo: 17,
      modes: [0, 1]
    }],
    defaultI2cBus: 1
  });

  setImmediate(function () {
    this.emit('connect');
    this.emit('ready');
  }.bind(this));
}
util.inherits(TinyRaspberryPiIO, LinuxIO);

module.exports = TinyRaspberryPiIO;
```

If a button is connected to GPIO4 and an LED is connected to GPIO17, the following program will turn the LED on when the button is pressed and turn the LED off when the button is released:

```javascript
var five = require('johnny-five');
var TinyRaspberryPiIO = require('./tiny-raspberry-pi-io');

var board = new five.Board({
  io: new TinyRaspberryPiIO()
});

board.on('ready', function() {
  var led = new five.Led('GPIO17');
  var button = new five.Button('GPIO4');

  button.on('down', function() {
    led.on();
  });

  button.on('up', function() {
    led.off();
  });
});
```

To learn more visit the [linux-io](https://github.com/fivdi/linux-io) repository. To see linux-io in action in fully fledged IO plugins visit the [BeagleBone-IO](https://github.com/julianduque/beaglebone-io) or [Pi-IO](https://github.com/fivdi/pi-io) repositories. You're likely to be very surprised to see how much can be achieved with a small amount of code.
