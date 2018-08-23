---
author: Derek Wheelden
date: '2015-08-25 20:23:00'
status: published
title: 'Introducing I2C Component Backpacks'
slug: 'introducing-i2c-component-backpacks'
category:
  - Announcement
  - Platform
---

The Johnny-Five team has begun work on a method of controlling previously incompatible components. Inspired by Adafruit, Johnny-Five backpacks are AVRs that we communicate with over I2C, opening up a whole new world of JavaScript-controlled electronics. Historically, certain protocols like SPI and software serial have been unavailable to Johnny-Five, which meant we couldn't support some really awesome components like addressable LED strips, ping sensors, and IR receivers.

Backpacks are programmed with a--typically very small--C++ firmware, with an I2C layer that Johnny-Five can use to send and receive commands and data. Backpacks are typically an Arduino Pro Mini or Nano, which can be purchased for as little as $2.

For a more detailed introduction to Johnny-Five backpacks, plus an awesome NeoPixel demo, [follow this link](https://derek.business/posts/beginners-guide-to-backpacks/).

To see the backpacks currently supported, check out:
* [node-pixel](https://github.com/ajfisher/node-pixel)
* [DSTouch](https://github.com/rwaldron/j5-ds-touch)

![Johnny-Five backpack wiring example](/img/backpacks/backpack_neopixels.png)
