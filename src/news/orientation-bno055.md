---
author: John Lennard
date: '2016-02-19 20:30:00'
status: published
title: 'BNO055 Sensor and Absolute Orientation'
slug: 'bno055-sensor-absolute-orientation'
category:
  - Announcement
  - Platform
---

Do you want to know how your robot is oriented or implement an AHRS but you're not too keen on writing your own sensor fusion algorithm? Johnny-Five now has support for the Bosch BNO055. The BNO055 contains an accelerometer, gyroscope and magentometer on the same die as a Cortex M0 core. The BNO055 performs all the tricky parts of filtering and combining sensor data into usable, stable, absolute Euler angles or quarternions. 

To make accessing the Euler angles and quarternion data easier, we have added a handy orientation class that can be accessed as shown below:

```javascript
var five = require("johnny-five"),
  board;

board = new five.Board();

board.on("ready", function () {

  var imu = new five.IMU({
    controller: "BNO055",
  });


  imu.orientation.on("change", function () {

    console.log("orientation");
    console.log("  w            : ", this.quarternion.w);
    console.log("  x            : ", this.quarternion.x);
    console.log("  y            : ", this.quarternion.y);
    console.log("  z            : ", this.quarternion.z);

    console.log("  heading      : ", this.euler.heading);
    console.log("  roll         : ", this.euler.roll);
    console.log("  pitch        : ", this.euler.pitch);

    console.log("--------------------------------------");

  });
});
```

You can learn more about the BNO055 with this [handy Adafruit BNO055 guide](https://learn.adafruit.com/adafruit-bno055-absolute-orientation-sensor/overview) or view the [data sheets and application notes here](http://www.bosch-sensortec.com/bst/products/all_products/bno055).