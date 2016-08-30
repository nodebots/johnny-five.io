---
author: Brian Genisio
date: '2015-10-08 10:00:00'
status: draft
title: 'Particle-IO Now Supports I2C'
category:
  - Release
  - Announcement
---


# Particle-IO Now Supports I2C

With an updated [VoodooSpark](https://github.com/voodootikigod/voodoospark/blob/master/firmware/voodoospark.cpp) and the latest [Particle-IO](https://github.com/rwaldron/particle-io) adapter, [Particle Photons and Cores](https://www.particle.io/) can now interface with I2C devices via Johnny-Five.

This means that any existing I2C device can be hooked up to your Particle device and used just like any other I2C device. Here is an example of using the Particle Photon with an [MPU6050 Accelerometer](http://johnny-five.io/examples/accelerometer-mpu6050/).

![Photon + MPU6050](http://i.imgur.com/9qTCuLr.png)

```javascript
var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID
  }) 
});

board.on("ready", function() {
  var accelerometer = new five.Accelerometer({
    controller: "MPU6050"
  });

  accelerometer.on("change", function() {
    console.log("accelerometer");
    console.log("  x            : ", this.x);
    console.log("  y            : ", this.y);
    console.log("  z            : ", this.z);
    console.log("  pitch        : ", this.pitch);
    console.log("  roll         : ", this.roll);
    console.log("  acceleration : ", this.acceleration);
    console.log("  inclination  : ", this.inclination);
    console.log("  orientation  : ", this.orientation);
    console.log("--------------------------------------");
  });
});
```

The beauty of the Johnny-Five abstraction allows us to do some things that you may not consider.  For example, pair the [SparkFun Photon Redboard](https://www.sparkfun.com/products/13321) with the [EVShield](http://www.mindsensors.com/arduino/16-evshield-for-arduino-duemilanove-or-uno), and you have a JavaScript enabled, wireless controller for your Lego creations.  Or, connect your Photon to the [SparkFun Weather Shield](https://www.sparkfun.com/products/13630) and wirelessly automate your home.

Examples of the components that are now supported on the Particle devices in Johnny-Five include (but is not limited to):

- Accelerometer: ([ADXL345](http://johnny-five.io/examples/accelerometer-adxl345/), [MMA7660](http://johnny-five.io/examples/grove-accelerometer-mma7660-edison/))
- Color: ([ISL29125](http://johnny-five.io/examples/color-ISL29125/))
- Compas: ([HMC5883L](http://johnny-five.io/examples/compass-hmc5883l/), [HMC6352](http://johnny-five.io/examples/compass-hmc6352/))
- Expander: ([PCA9685](http://johnny-five.io/examples/expander-PCA9685/), [MCP23017](http://johnny-five.io/examples/expander-MCP23017/), [MCP23008](http://johnny-five.io/examples/expander-MCP23008/), [PCF8574](http://johnny-five.io/examples/expander-PCF8574/), [PCF8575](http://johnny-five.io/examples/expander-PCF8575/), [PCF8591](http://johnny-five.io/examples/expander-PCF8591/))
- Multi: ([EVShield](http://johnny-five.io/examples/color-EVS_EV3/), [MPU6050](http://johnny-five.io/examples/imu-mpu6050/), [MPL115A2](http://johnny-five.io/examples/multi-mpl115a2/), [BMP180](http://johnny-five.io/examples/multi-bmp180/))
- Hygometer: ([HTU21D](http://johnny-five.io/examples/multi-htu21d/)]
- Temperature: ([SI7020](http://johnny-five.io/examples/temperature-SI7020/), [TMP102](http://johnny-five.io/examples/temperature-tmp102/))
- Keypad: ([MPR121QR2](http://johnny-five.io/examples/keypad-MPR121QR2/))
- LCD: (JHD1313M1)
- Light Sensor: ([TSL2561](http://johnny-five.io/examples/grove-light-sensor-edison/))
- Motion: ([GP2Y0D805Z0F](http://johnny-five.io/examples/motion-gp2y0d805z0f/)
- Proximity: ([SRF10](http://johnny-five.io/examples/proximity-srf10/), LIDARLITE)
- Wii: ([Nunchuck](http://johnny-five.io/examples/nunchuk/), [classic](http://johnny-five.io/examples/classic-controller/))






Please report any issues [here](https://github.com/rwaldron/particle-io/issues).
