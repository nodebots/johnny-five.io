---
author: Rick Waldron
date: '2015-04-25 12:00:00'
status: published
title: 'Galileo-IO/Edison-IO: Default I2C Bus Updates'
category:
  - Announcement
  - Galileo
  - Edison
---


[Galileo-IO](https://github.com/rwaldron/galileo-io), which is Johnny-Five's [IO-Plugin](https://github.com/rwaldron/io-plugins) for the [Intel Galileo and Edison](https://www-ssl.intel.com/content/www/us/en/do-it-yourself/maker.html) platforms will now default to I2C bus `1` when running on the Edison Mini board.

[![](https://cdn.sparkfun.com//assets/parts/1/0/0/1/1/13025-01.jpg)](https://www.sparkfun.com/products/13025)

This change will not affect code running on the Edison Arduino board or either generation of Galileo boards. The decision to default to bus `1` is the result of learning that [SparkFun Edison Blocks](https://www.sparkfun.com/categories/272) with support for I2C are connecting on that bus, and not bus `6` (which the Edison Arduino Board connects on). Here are the physical pin outs for connecting on the Mini board:

Connection to bus `1`:

|I2C-1-SDA|I2C-1-SCL|
|---------|---------|
|J17-8    |J18-6    |

Please report any issues [here](https://github.com/rwaldron/galileo-io/issues).



