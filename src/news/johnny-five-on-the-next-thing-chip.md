---
author: Rick Waldron
date: '2016-02-14 12:00:00'
status: published
title: 'The Next Thing Co. C.H.I.P.'
category:
  - Announcement
---

![](http://johnny-five.io/img/platforms/next-thing-chip.png)

[Sandeep Mistry](https://github.com/sandeepmistry), the author of many important NodeBots libraries ([noble](https://github.com/sandeepmistry/noble), [bleno](https://github.com/sandeepmistry/bleno), [noble-device](https://github.com/sandeepmistry/noble-device), [node-sensortag](https://github.com/sandeepmistry/node-sensortag), [node-bluetooth-hci-socket](https://github.com/sandeepmistry/node-bluetooth-hci-socket) and [many more](https://github.com/sandeepmistry?tab=repositories)), has written and released [Chip-IO](https://github.com/sandeepmistry/node-chip-io), an [IO Plugin](https://github.com/rwaldron/io-plugins) for Johnny-Five, for writing programs for the [Next Thing Co. C.H.I.P.](http://getchip.com/)!


Here's a basic "Hello World" program to get started with Johnny-Five and Chip-IO on your Next Thing Co. C.H.I.P.:

```js
var five = require("johnny-five");
var Chip = require("chip-io");

var board = new five.Board({
  io: new Chip()
});

board.on("ready", function() {
  var led = new five.Led("XIO-P6");

  led.blink(500);
});
```


![](http://johnny-five.io/img/led-scene-5.gif)


For more information, read the [platform support details](http://johnny-five.io/platform-support/#chip) and check out the [examples in the repo](https://github.com/sandeepmistry/node-chip-io/tree/master/examples).


------


Just like [Johnny-Five](https://github.com/rwaldron/johnny-five) itself, [Johnny-Five.io](http://johnny-five.io/) is an open source project; this means that community contributions towards improvement are _always_ welcome! Have a look around the site and [let us know what works and what doesn't](https://github.com/Bocoup/johnny-five.io)!



