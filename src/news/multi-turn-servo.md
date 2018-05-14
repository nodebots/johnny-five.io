---
author: Donovan Buck
date: '2018-05-10 12:00:00'
status: published
title: 'Multi-Turn Servo Support in Johnny-Five'
slug: 'multi-turn-servo'
category:
  - Announcement
  - Servo
---

Johnny-Five has long enjoyed top notch support for standard 180° hobby servos, but now support has been extended to servos with any amount of throw. If you have a multi-turn (whinch) servo you can simply pass in the total range in degrees. 

```javascript
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var servo = new five.Servo({
    pin: 10,
    // This multi-turn servo can turn 6.75 revolutions or 2430°
    deviceRange: [0, 2430]
  });

  // Add servo to REPL (optional)
  this.repl.inject({
    servo: servo
  });

  servo.sweep();

});
```

This update also works for 90° or 360° servos:

```javascript
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var servo = new five.Servo({
    pin: 10,
    // This servo is only capable of turning 90°
    deviceRange: [0, 90]
  });

  // Add servo to REPL (optional)
  this.repl.inject({
    servo: servo
  });

  servo.sweep();

});
```

In addition, Johnny-Five now positions servos with more accuracy by setting the PWM duty cycle instead of passing the position in whole integer degrees. Don't know what that means? That's okay, just know that Johnny-Five does it for you and it's awesome.

This update requires the latest versions of most IO Plug-ins:

* imp-io v0.3.0 / Tyrion v0.0.3
* particle-io v0.15.0 / VoodooSpark v4.1.0
* tessel-io v1.2.0
* raspi-io v8.1.1
* beaglebone-io v3.0.0
* linux-io v0.9.2

If you are using Firmata, you are in the clear and don't need to worry about having the latest version.
