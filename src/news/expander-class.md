---
author: Donovan Buck
date: '2015-11-03 12:00:00'
status: published
title: 'Johnny-Five Expander Class'
category:
  - Announcement
  - Tessel 2
  - I2C
---


Need to control over a thousand servos, LED's or motors with Johnny-Five? We've got you covered.

The team is pleased to introduce everyone to the new Expander class for Johnny-Five. Expanders are used to add more pins to your micro-controller and the expander class brings built in support for several of the most popular ones. Additionally, most expanders are addressable so you can chain anywhere from four to sixty four of them on a single interface.

* [MCP23017](http://www.microchip.com/wwwproducts/Devices.aspx?product=MCP23017) - 16 Channel, 16-bit Port Expander
* [MCP23008](http://www.microchip.com/wwwproducts/Devices.aspx?product=MCP23008) - 8 channel, 8-bit Port Expander
* [PCF8574](http://www.ti.com/product/pcf8574) - 8 Channel, 8-bit Port Expander
* [CF8574A](http://www.ti.com/product/pcf8574a) - 8 Channel, 8-bit Port Expander
* [PCF8575](http://www.ti.com/product/pcf8575) - 16 Channel, 16-bit Port Expander
* [PCF8591](http://www.nxp.com/products/interface_and_connectivity/i2c/i2c_dacs_and_adcs/series/PCF8591.html) - 4 Channel, 8-bit Port Expander
* [PCA9685](http://www.nxp.com/products/power_management/lighting_driver_and_controller_ics/i2c_led_display_control/series/PCA9685.html) - 16-channel, 12-bit PWM Expander.

The following breakout boards and shields that depend on these expanders have all been tested with Johnny-Five.
* [Adafruit 16-Channel Servo driver](https://www.adafruit.com/products/815)
* [Adafruit 16-Channel Servo Shield](https://www.adafruit.com/products/1411)
* [Tessel Servo Module](https://tessel.io/modules#module-servo) for the [Tessel 2](https://tessel.io/)

Expanders can be instantiated as virtual boards or device controllers.

**Expander as a virtual board**
````
var five = require("johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var virtual = new five.Board.Virtual(
    new five.Expander("PCA9685")
  );

  var servo = new five.Servo({
    pin: 1,
    board: virtual
  });

  servo.sweep();
});
````

**Expander as a device controller**
````
var five = require("johnny-five.js");
var board = new five.Board();

board.on("ready", function() {
  var servo = new five.Servo({
    pin: 1,
    controller: "PCA9685"
  });

  servo.sweep();
});
````

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).
