---
author: Derek Wheelden
date: '2015-06-08 18:30:00'
status: draft
title: 'Motion Detection Components Now Share Common API'
category:
  - Announcement
---

All motion detection components now live under the same roof. These components detect motion--typically by sensing changes in infrared or ultrasonic field--and provide a boolean state. Johnny-Five now handles all motion detection components consistently, emitting `motionstart` and `motionend` events, in addition to other standard events such as `change` and `data`. Components that require a calibration delay also emit a `calibrated` event.

Check the [API docs](/api/motion/) for a list of supported components, and how to use them.

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var motion = new five.Motion(7);

  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  motion.on("motionstart", function() {
    console.log("motionstart");
  });

  motion.on("motionend", function() {
    console.log("motionend");
  });
});
```

This change will not affect existing code, but `IR.Motion`, and `Pir` have been deprecated and will be removed when Johnny-Five reaches 1.0.

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).
