---
author: Rick Waldron
date: '2016-06-23 12:00:00'
status: published
title: 'June Release: v0.9.58 & Changelog Recap'
slug: 'june-2016-release'
category:
  - Announcement
  - Platform
---

This is way overdue... There's been a lot of exciting work on Johnny-Five this year and barely enough time to write posts announcing all of it! The following work and changelogs are from April, May and June of this year, so consider this a "mid-year" recap of sorts, that happens to coincide with a huge changelog update ;)


## v0.9.58

| Commit | Message/Description |
| ------ | ------------------- |
| [e6c362b](https://github.com/rwaldron/johnny-five/commit/e6c362b75ba5f788ad33682337f5844cc186f729) | v0.9.58 |
| [5bc68b5](https://github.com/rwaldron/johnny-five/commit/5bc68b528706096323b24c02d0edfcb7ec65898a) | travis: restore test matrix, add node.js v6 |
| [eb95a0a](https://github.com/rwaldron/johnny-five/commit/eb95a0ac7a8ca2068ad9c61abce0502e77a0fc5f) | appveyor: node.js v4, 5, 6 |
| [3f87234](https://github.com/rwaldron/johnny-five/commit/3f8723488a2f3e8cf596abd35c64a8af8ac495ff) | Tests: fix lint nits |
| [aa834a8](https://github.com/rwaldron/johnny-five/commit/aa834a8b291e07f724a64fcde6f400e09d4bf077) | npmignore: ignore coverage/ |
| [e2ad0e8](https://github.com/rwaldron/johnny-five/commit/e2ad0e889eb4e5d03672f8eb3096cd0a5f1c4f7d) | travis: adding coveralls |
| [70ff11c](https://github.com/rwaldron/johnny-five/commit/70ff11c605535e535c29d67244083881b3fb660a) | istanbul: exclude deprecated garbage. |
| [c1f34f0](https://github.com/rwaldron/johnny-five/commit/c1f34f0aaf8d2f7d283dd839f93d94f389b9a32a) | istanbul: first pass |
| [79a7154](https://github.com/rwaldron/johnny-five/commit/79a715443e8a229a2ad7b71a5a352bac31f2246f) | Servo: limit history to 5 records to prevent potential memory leaks |
| [0c6c3a4](https://github.com/rwaldron/johnny-five/commit/0c6c3a4c4d43ddba55699846a8e324a4a637f308) | LCD: Tessel 2 + Grove LCD |
| [43a86a0](https://github.com/rwaldron/johnny-five/commit/43a86a097795b3e836731adee61c689e4abad4cc) | LCD: Tessel + Grove LCD JHD1313M1 |


## v0.9.57

| Commit | Message/Description |
| ------ | ------------------- |
| [c75426c](https://github.com/rwaldron/johnny-five/commit/c75426ced5141f22fa4c437f7618c85c005c2a7b) | v0.9.57 |
| [4bc57e7](https://github.com/rwaldron/johnny-five/commit/4bc57e78375b72c04a4dc2ac186dafdf4d1c1ba1) | Examples: fix lint nits |
| [3baa064](https://github.com/rwaldron/johnny-five/commit/3baa06412ad604a65ecb40c0c9388239d47d6a0a) | Examples: regen tinkerkit examples (& toggle example) |
| [9d986aa](https://github.com/rwaldron/johnny-five/commit/9d986aa7004becc187fb530425aae8bbefb6a6f6) | Joystick: __ => Fn |
| [e21c432](https://github.com/rwaldron/johnny-five/commit/e21c432d5a973560a3fe21960cb9c56d55007e07) | Button: adds TINKERKIT controller for Tinkerkit Button and Touch. Fixes gh-1142 |
| [d8eaa6a](https://github.com/rwaldron/johnny-five/commit/d8eaa6a26d6ea718715befc98d1c9a55b75b56c5) | Ensure that we are using non-eased values for finding end of animation (#1154) |
| [391ab46](https://github.com/rwaldron/johnny-five/commit/391ab469bd4291cc3fb28ca2d2b538462146524b) | Adds @ashleygwilliams to contributors |



## v0.9.56



| Commit | Message/Description |
| ------ | ------------------- |
| [339822d](https://github.com/rwaldron/johnny-five/commit/339822d4341ba4c7d21e25ee3fd9e26435c0903d) | v0.9.56 |
| [7ca427f](https://github.com/rwaldron/johnny-five/commit/7ca427fdffff34b5255cfd6954ea1acac95ee939) | Badges: don't use the old fashioned gitter svg url, it has spaces. |



## v0.9.55



| Commit | Message/Description |
| ------ | ------------------- |
| [a4e1b07](https://github.com/rwaldron/johnny-five/commit/a4e1b07341ad71a08205cd390c10b216c6b7b65d) | v0.9.55 |
| [d90a4d6](https://github.com/rwaldron/johnny-five/commit/d90a4d6c8853a3fe2d20c6a66b9fc57a4a5bd313) | Grunt: lint nits |
| [f4cb044](https://github.com/rwaldron/johnny-five/commit/f4cb044a2344a12101b84a6ed06d55e094f79a1d) | Led/Leds/RGB/RGBs: refactoring animation for LEDs; support for collections |
| [5b359bc](https://github.com/rwaldron/johnny-five/commit/5b359bc89df3f892b4349f61f3c35688e645ee84) | Animation: multiple property tweening support. |



## v0.9.54



| Commit | Message/Description |
| ------ | ------------------- |
| [f0e9fc7](https://github.com/rwaldron/johnny-five/commit/f0e9fc7e924260b1313ce626328b31f0e4d8c94f) | v0.9.54 |
| [2a0af6a](https://github.com/rwaldron/johnny-five/commit/2a0af6a97dd2d7ef88420120560e1dbb1bc9e39b) | Grunt: lint nits |
| [d348ae6](https://github.com/rwaldron/johnny-five/commit/d348ae6d2d97fd0e95e6ee7c85b06688c6897cc6) | Leds/RGBs: resolve callbacks from each entry into a single handler |
| [47df3da](https://github.com/rwaldron/johnny-five/commit/47df3da4c957b7e518d0e6f860189e4bdc40e982) | Led/RGB: time/rate etc => duration |
| [b7cc28f](https://github.com/rwaldron/johnny-five/commit/b7cc28f67d17a3016c2ba676867840735650c197) | Animation: nitpick |
| [a4b75d6](https://github.com/rwaldron/johnny-five/commit/a4b75d64fc387b4abaf37440e8d94cf0656de7aa) | Use util.deprecate to deprecate |
| [1d46f58](https://github.com/rwaldron/johnny-five/commit/1d46f58fbf9a03dc1eaf7221b904729e887a14cc) | Test: nitpicking |
| [ee84cff](https://github.com/rwaldron/johnny-five/commit/ee84cff1cf23887c6a5b4741fcc436676498c709) | Led: intensity(0-100) to match RGB |



## v0.9.53



| Commit | Message/Description |
| ------ | ------------------- |
| [129e8fe](https://github.com/rwaldron/johnny-five/commit/129e8fef693f3da1a8c4953ef37d4a0e5a5273d6) | v0.9.53 |
| [aaf2ffb](https://github.com/rwaldron/johnny-five/commit/aaf2ffb7a8f583c002d08a0a4a87861f038d8ebf) | animation-fixes |
| [b792008](https://github.com/rwaldron/johnny-five/commit/b792008fad801ff13d035d81b03e16a1776bf77b) | Cleanup: lint nits |
| [ac03868](https://github.com/rwaldron/johnny-five/commit/ac0386850cda0b9bac94c35943d2752fb345a7c7) | IMU: use less string literals and more "const-ish" bindings. Eventually move these to actual const. |
| [ccea30a](https://github.com/rwaldron/johnny-five/commit/ccea30a77b45e22241463273b272f65f855fa637) | Orientation: minor nit picking |
| [7398688](https://github.com/rwaldron/johnny-five/commit/7398688bb7d7104ee18c4212606345af97349469) | Accelerometer: MMA8452 Support (includes odr and tap support) |
| [384d4f4](https://github.com/rwaldron/johnny-five/commit/384d4f40162f55e226914a55c361d9513320400a) | five: removing Nodebot class because it's totally useless |
| [9fbcfe3](https://github.com/rwaldron/johnny-five/commit/9fbcfe341fcc7960bd1db155cab8a2663fe3ef91) | Fn: move all toFixed/ToFixed to Fn and implement across all lib files |



## v0.9.52



| Commit | Message/Description |
| ------ | ------------------- |
| [b5688a4](https://github.com/rwaldron/johnny-five/commit/b5688a47a1afcd059fda6dc640fa6a1c2c01bc80) | v0.9.52 |
| [bd630c8](https://github.com/rwaldron/johnny-five/commit/bd630c8fdb4e0f2271373b98543e1970c3bf69b8) | Multi/Barometer/Thermometer: MPL115A2 requires conversion start command for all reads |
| [6f342df](https://github.com/rwaldron/johnny-five/commit/6f342dfe0b62d5fbee5ce3acd40c4f9e1ba7d315) | Fix AppVeyor badge link |



## v0.9.51



| Commit | Message/Description |
| ------ | ------------------- |
| [0789c1b](https://github.com/rwaldron/johnny-five/commit/0789c1b78db2874cb0eb17632d56f30ba9392e6e) | v0.9.51 |
| [7eba5f7](https://github.com/rwaldron/johnny-five/commit/7eba5f77d56fbb7372521393e255d69b7a2b2132) | Light: fix change condition |
| [6f0a2d4](https://github.com/rwaldron/johnny-five/commit/6f0a2d4772e717f65a8f44b3c74320669a130014) | Firmwares: use 11 & 12 for address. |
| [d3a8dbc](https://github.com/rwaldron/johnny-five/commit/d3a8dbc235ad0fe8a46544aa1e8bb41bfa554183) | Motors, Servos, ShiftRegisters: clean up Collections |
| [e47706c](https://github.com/rwaldron/johnny-five/commit/e47706cb72a75a1835b0a308b30838e0ab588439) | Light: fix intensity level value 0-1 |



## v0.9.50



| Commit | Message/Description |
| ------ | ------------------- |
| [cf2ba6e](https://github.com/rwaldron/johnny-five/commit/cf2ba6e1ae7bdd76cb73717c12b3d3763957a405) | v0.9.50 |
| [88978db](https://github.com/rwaldron/johnny-five/commit/88978db19dbead407e26cbff42935c75912f1da3) | Sensor: remove unused dep |
| [6e6c923](https://github.com/rwaldron/johnny-five/commit/6e6c92356c8d8886c30a19cb76d5eedb7a7a3410) | Examples: Fix "Intel Edison + Grove - Accelerometer (ADXL345)" |
| [6071b2b](https://github.com/rwaldron/johnny-five/commit/6071b2bef2f66a84b0abcfc9a9afc79e0e35f2d9) | Accelerometer: ADXL345 support user defined range. Fixes gh-1135 |
| [29a9ba0](https://github.com/rwaldron/johnny-five/commit/29a9ba093b7dce5a8586969e3bea74a695f2599f) | Keypad/Touch: add "touch" alias |
| [4434b28](https://github.com/rwaldron/johnny-five/commit/4434b288e023578f2b32396190806bf84cdb2eed) | Motion/Motion.Collection: implement Collection.Emitter |
| [07a6bb8](https://github.com/rwaldron/johnny-five/commit/07a6bb8e6ea134cbdbfae6590587f18392a47f44) | Switches/Switch.Collection: implement Collection.Emitter |
| [60066fc](https://github.com/rwaldron/johnny-five/commit/60066fca327a118482fafaa990fe432e8897bec0) | Collection: Collection.prototype.byId, get a single entry from a collection by its id |
| [7b5735f](https://github.com/rwaldron/johnny-five/commit/7b5735f819a42c0833e58aaf685e814dd6c494c4) | Sensor: minor cleanups and nitpicks; Removes untested alias events |
| [f32b759](https://github.com/rwaldron/johnny-five/commit/f32b759d8e81cf3fb12662b42cca252685c9103c) | Collections: make slices produce correct type |
| [2221fca](https://github.com/rwaldron/johnny-five/commit/2221fca6e804931eac3e6775317b4f95fd06a238) | Board: make loop method stoppable & tests. |



## v0.9.49



| Commit | Message/Description |
| ------ | ------------------- |
| [984e187](https://github.com/rwaldron/johnny-five/commit/984e1871d68fafd0c34918da1a7349218460469f) | v0.9.49 |
| [a5dfe38](https://github.com/rwaldron/johnny-five/commit/a5dfe38687ee4264a8780ca2589eb3ef9ce9f2e4) | Collections: slice method & tests |




## v0.9.48



| Commit | Message/Description |
| ------ | ------------------- |
| [a5e9b72](https://github.com/rwaldron/johnny-five/commit/a5e9b72fda06c4826dcb8cfbbf0b61877cbdf031) | v0.9.48 |
| [c7e0443](https://github.com/rwaldron/johnny-five/commit/c7e0443d78248da09634d5e47990e05e18b30fb5) | serialport@3.1.1, firmata@0.12.0 |



## v0.9.47



| Commit | Message/Description |
| ------ | ------------------- |
| [2b6c3d1](https://github.com/rwaldron/johnny-five/commit/2b6c3d12ce8ea2c75f70cf647490d816fd0222ba) | v0.9.47 |
| [c15d24c](https://github.com/rwaldron/johnny-five/commit/c15d24c7c7ded8011dee50a3f1b8d7863fd0ac9e) | Servo: fixes to sweep + tests |



## v0.9.46



| Commit | Message/Description |
| ------ | ------------------- |
| [44732cf](https://github.com/rwaldron/johnny-five/commit/44732cf9be0f128884eb49a14500e331d6cbe713) | v0.9.46 |
| [554c808](https://github.com/rwaldron/johnny-five/commit/554c808d6ea10df32cc9ae9f419ba892392e503c) | Gyro/Accelerometer: precision => fixed. Fixes gh-1124 |
| [4b7c483](https://github.com/rwaldron/johnny-five/commit/4b7c483d76bc86cc8f70c537616a8a2d30cebeae) | Fix travis failures. |
| [17b171c](https://github.com/rwaldron/johnny-five/commit/17b171c402dc3f6404a73595d5e5eb45ef7ab5e8) | Thermometer: update and regen examples |
| [a69fa0e](https://github.com/rwaldron/johnny-five/commit/a69fa0e76852fa85535ea3fd0a0ea228f4d83edf) | IMU/Multi: HTU21D maintenance and improvements |
| [40d018a](https://github.com/rwaldron/johnny-five/commit/40d018a9b881c4493bb6ca669469a5f195a67f19) | Gruntfile: cleanup test running. |
| [2eb4501](https://github.com/rwaldron/johnny-five/commit/2eb45018763d82efc16116a1fc505a8d9e6baa18) | Thermometer: datasheet organization |



## v0.9.45



| Commit | Message/Description |
| ------ | ------------------- |
| [fc68f4c](https://github.com/rwaldron/johnny-five/commit/fc68f4c24901d9ab33b88dc05245c6a9a4d58f39) | v0.9.45 |
| [495e815](https://github.com/rwaldron/johnny-five/commit/495e815e47d06e388f26edb884c10b315bee9346) | Compass: MAG3110 (incl. tests & diagrams) |
| [4e13797](https://github.com/rwaldron/johnny-five/commit/4e1379778ef7ab1b51b71beaf16af9b9ee18ad9e) | Suggested fix for #1113 (#1114) |
| [dda72ff](https://github.com/rwaldron/johnny-five/commit/dda72ff6fc46f362754a04cacd575c761cf1c84e) | Add tilt switch switch with clean commit. #1107 (#1111) |
| [9e06037](https://github.com/rwaldron/johnny-five/commit/9e06037c1004adaf8c5ec59f597cb709d47b9977) | IMU/Multi: BME280 support |
| [b44c19f](https://github.com/rwaldron/johnny-five/commit/b44c19f483cec14edbcfa82ac6dcf64be345671d) | IMU/Multi: tests for SHT31 |
| [f2c0be5](https://github.com/rwaldron/johnny-five/commit/f2c0be5601d98022c9d6040650e97398885dc000) | Fix strange failure on travis |
| [899a3a3](https://github.com/rwaldron/johnny-five/commit/899a3a39e33513376db4ec4626ecd52ff63bd588) | -6 |
| [97a1f03](https://github.com/rwaldron/johnny-five/commit/97a1f03291a95362a0e06250affa125ddad6879d) | travis.yml: adds node.js 5, 6; osx & linux |



## v0.9.44



| Commit | Message/Description |
| ------ | ------------------- |
| [8f898c7](https://github.com/rwaldron/johnny-five/commit/8f898c748a9c26776d6f2a61f26c795df12e5cec) | v0.9.44 |
| [7683e00](https://github.com/rwaldron/johnny-five/commit/7683e00cc35bfb410d57d40ee545582a070424d6) | Board: update previously missed "mock-firmata" removal. |
| [dd8b169](https://github.com/rwaldron/johnny-five/commit/dd8b1694817e9aa8818c6b2a97c2a5d8d622661f) | Thermometer: fractional digit accuracy per datasheets |
| [39bc15d](https://github.com/rwaldron/johnny-five/commit/39bc15d16e4cbfce955e75e662fd0ebe758fa54e) | Thermometer: never emit null |
| [7e333a3](https://github.com/rwaldron/johnny-five/commit/7e333a365d41349b038f811bab880d42af7636a4) | Thermometer: Correct SI7020 fractional digits |
| [8540515](https://github.com/rwaldron/johnny-five/commit/8540515f2a2d95a291bec632eb104d53dd7c7bc6) | Motion: Tessel example |
| [75ffde2](https://github.com/rwaldron/johnny-five/commit/75ffde2084f3849976dfb47ca4d3d7579e312b73) | IMU/Multi: fix lint nits |
| [672f783](https://github.com/rwaldron/johnny-five/commit/672f7836212d5d9ee878e85a797df5b3cb5e82be) | IMU/Multi: BMP280 examples |
| [cadbb84](https://github.com/rwaldron/johnny-five/commit/cadbb842602b047f6fd4a74bbf81778a5e74e1df) | IMU/Multi: initial BMP280 support |
| [95826b4](https://github.com/rwaldron/johnny-five/commit/95826b4b60b69287a5d24d4992a03477a8d007d7) | IMU/Multi: use Fn.POW_2_* |
| [622342c](https://github.com/rwaldron/johnny-five/commit/622342c87abe46c9176df8344af5c1355160848e) | Fn: new consts: POW_2_*; new functions: Fn.s4-32, Fn.u4-32 |
| [e194de4](https://github.com/rwaldron/johnny-five/commit/e194de47a0751bfa3f0b9352c49a5f6bcb6ce20e) | IMU/Multi: register naming/nitpicking |
| [3c608c7](https://github.com/rwaldron/johnny-five/commit/3c608c7ef19c34ce143da5b8ef02f0b4ea25cc79) | Sometimes I annoy even myself. |



## v0.9.43



| Commit | Message/Description |
| ------ | ------------------- |
| [b0b548b](https://github.com/rwaldron/johnny-five/commit/b0b548bd1603eb7fc7e332d33bd80e4bd48ef1f8) | v0.9.43 |
| [c7ca9c4](https://github.com/rwaldron/johnny-five/commit/c7ca9c4feb81717290f3bade67369fbee7a72428) | Board: Allow IO plugin to control initialization of repl. |



## v0.9.42



| Commit | Message/Description |
| ------ | ------------------- |
| [9ad32f4](https://github.com/rwaldron/johnny-five/commit/9ad32f4b13a017e0f2902dfaee18855c3e848b64) | v0.9.42 |
| [18205bb](https://github.com/rwaldron/johnny-five/commit/18205bb72f4e4765458fdcb9f975294719769d2f) | Ignore more things |



## v0.9.41



| Commit | Message/Description |
| ------ | ------------------- |
| [b84ab12](https://github.com/rwaldron/johnny-five/commit/b84ab1262f1a676d0b4b0d130f1fdcfa121bffd3) | v0.9.41 |
| [f0c98b9](https://github.com/rwaldron/johnny-five/commit/f0c98b930fcbf51881fd4faf44c1a2df14fec001) | LCD: Upgrade JHD1313M1 bgColor to accept keywords and hex values |



## v0.9.40



| Commit | Message/Description |
| ------ | ------------------- |
| [e5f94a5](https://github.com/rwaldron/johnny-five/commit/e5f94a5ab4d0068bc6c62164d7d0a99c412da7ec) | v0.9.40 |
| [d56ff54](https://github.com/rwaldron/johnny-five/commit/d56ff540ac03ee6ccea908f5409ef085562e2183) | LCD: Fix i2cConfig address forwarding for JHD1313M1 controller |
| [e206d97](https://github.com/rwaldron/johnny-five/commit/e206d971262d6c230384e74d0f550c939f1a4b48) | Fix missing } |
| [a2f9fa7](https://github.com/rwaldron/johnny-five/commit/a2f9fa701157d3acf4f42b5774bfb025a313c63b) | Multi: BMP180 notes re: conversion time values. Fixes gh-1104 |
| [39c79da](https://github.com/rwaldron/johnny-five/commit/39c79da95203ad6d32aae5ca89f6a9a98f644779) | Update sht31d diagram |
| [9c2cb29](https://github.com/rwaldron/johnny-five/commit/9c2cb29049115d9fe57faf546c8e7c1d0a485d13) | Regen examples |
| [46914bb](https://github.com/rwaldron/johnny-five/commit/46914bb92465ca573505f041a2eb052ed6bd016e) | Thermo-humidity sensor SHT31D (#1103) |
| [aaee114](https://github.com/rwaldron/johnny-five/commit/aaee1148d3ce389ae99a5a29407ce3d242e359d0) | Board: millis() method, returns milliseconds since "ready" |
| [f1637b1](https://github.com/rwaldron/johnny-five/commit/f1637b139849f1154fa28cdc391c164b4999f5e9) | Rename __ -> Fn |
| [624dc7a](https://github.com/rwaldron/johnny-five/commit/624dc7af1d3f9fbbef95dfe76d8b1b8dd75fcb3d) | Tests: eliminate need for requiring mock-firmata from within board.js |
| [7a2696f](https://github.com/rwaldron/johnny-five/commit/7a2696fdf1a6242937b8263f8cc239bdd103a52e) | Examples: regenerate |
| [9695fcf](https://github.com/rwaldron/johnny-five/commit/9695fcf5705f1c14555e20b2251d77127cbd021c) | Add more event example and correct the commend (#1097) |
| [2e44332](https://github.com/rwaldron/johnny-five/commit/2e44332543d9911336d795cd4c921ca378f68855) | Default custom property to object literal instead of null (#1089) |


