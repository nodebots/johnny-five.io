---
author: Derek Wheelden
date: '2015-05-02 11:02:00'
status: draft
title: 'Proximity Components Now Share Common API'
category:
  - Announcement
---

Look how far we've come.

With the release of the new [Proximity](/api/proximity/) class, components which measure *distance to obstruction* now share a common home. Components that were formerly spread across Infrared, Sonar, and Ping classes can be found in one place, and used with a more consistent API. The new API also makes implementing new components even easier, and we've been able to add a handful of [new proximity components](/examples/proximity/#proximity) already.

Check the [API docs](/api/proximity/) for a list of supported components, and how to use them.

```js
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A0"
  });

  proximity.on("data", function() {
    console.log(this.cm + "cm", this.in + "in");
  });

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});
```

All distance to obstruction devices now share this API, with the only changes being the `controller` and `pin` properties.

This change will not affect existing code, but `IR.Distance`, `IR.Proximity`, `Sonar`, and `Ping` have been deprecated and will be removed when Johnny-Five reaches 1.0.

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).



