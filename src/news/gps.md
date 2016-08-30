---
author: Donovan Buck
date: '2016-03-14 12:00:00'
status: published
title: 'Johnny-Five GPS Class'
category:
  - Announcement
  - GPS
---

It's a big, big world out there and we don't want your robots getting lost, soooo...

The team is pleased to introduce everyone to the new [GPS class](http://johnny-five.io/api/gps/) for Johnny-Five. This class adds support for some of the most common GPS modules, receivers, breakouts and shields. It can report on current location, course, ground speed and satellite data. GPS is one of the first uses of firmata's brand new support for serial communication.

The following chip sets have been tested with the GPS class:
- [MediaTek MT3339](http://www.mediatek.com/en/products/connectivity/gps/mt3339)
- [U-blox NEO-6M](https://www.u-blox.com/en/product/neo-6-series)

The following receiver modules have been tested with the GPS class:
- [66-Channel LS20031 GPS Receiver Module](https://www.pololu.com/product/2138)
- [G-Top LadyBird 1 (PA6H)](http://www.gtop-tech.com/en/product/LadyBird-1-PA6H/MT3339_GPS_Module_04.html)

The following breakouts have been tested with the GPS class:
- [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/products/746)

**GPS Example**

![gps.png](https://raw.githubusercontent.com/rwaldron/johnny-five/master/docs/breadboard/gps-adafruit.png)

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: { rx: 11, tx: 10 }
  });

  // If latitude, longitude, course or speed change log it
  gps.on("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    console.log("  longitude  : ", this.longitude);
    console.log("--------------------------------------");
  });
});
```

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).
