---
author: Tim Choo
date: '2016-08-30 12:30:00'
status: published
title: 'Configuring Johnny-Five For Node-RED on Raspbian'
slug: 'johnny-five-node-red-raspbian'
category:
  - Guide
  - Platform
---


# Configuring Johnny-Five to work with the Node-RED graphical development tool in Raspbian

Node-RED is a wonderfully productive drag and drop development tool for creating Node.js apps. It is especially useful in IoT development since there are tons of useful nodes to interface with your Raspberry Pi. While Node-RED comes with a bunch of python based Raspberry Pi nodes that let you read/write from the GPIO pins, keyboard, and mouse, it does not come out of the box with nodes that let you work with I2C, SPI devices, or various sensors. This is where Johnny-Five comes in really handy. Once you install the install the Johnny-Five nodes you can drag and drop them onto the palette and wire them up with a host of other nodes to create fully functional apps in minutes or in some cases seconds. However, getting the Johnny-Five nodes to work in Raspbian is a bit tricky because the Pi needs root in order to access the I/O pins, so I thought I would document all the steps to make it work (this is for a Raspberry Pi 2 Model B) -> [Configuring Johnny-Five to work with Node-Red](https://timchooblog.wordpress.com/2016/06/14/configuring-the-johnny-five-robotics-library-to-work-in-node-red/)
