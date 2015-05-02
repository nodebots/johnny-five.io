---
author: Derek Wheelden
date: '2015-05-02 11:02:00'
status: draft
title: 'Proximity Devices Now Share Common API'
category:
  - Announcement
---

Look how far we've come.

With the release of the new [Proximity](/api/proximity/) class, devices which measure *distance to obstruction* now share a common home. Devices that were formerly spread across Infrared, Sonar, and Ping classes can be found in one place, and used with a more consistent API. The new API also implementing new devices is even easier, and we've been able to add a handful of [new proximity devices](/examples/proximity/#proximity) already.

Check the [API docs](/api/proximity/) for a list of supported devices, and how to use them.

<pre><code class="language-javascript">var five = require(&quot;johnny-five&quot;);
var board = new five.Board();
&nbsp;
board.on(&quot;ready&quot;, function() {
  var proximity = new five.Proximity({
    controller: &quot;GP2Y0A21YK&quot;,
    pin: &quot;A0&quot;
  });
&nbsp;
  proximity.on(&quot;data&quot;, function() {
    console.log(this.cm + &quot;cm&quot;, this.in + &quot;in&quot;);
  });
&nbsp;
  proximity.on(&quot;change&quot;, function() {
    console.log(&quot;The obstruction has moved.&quot;);
  });
});
</code></pre>

All distance to obstruction devices now share this API, with the only changes being the `controller` and `pin` properties.

This change will not affect existing code, but `IR.Proximity`, `Sonar`, and `Ping` have been deprecated and will be removed in the next major release of Johnny-Five.

Please report any issues [here](https://github.com/rwaldron/johnny-five/issues).



