---
author: Bryan Hughes and Lyza Danger Garder
date: '2018-08-23 00:00:00'
status: published
title: 'Johnny-Five v1.0'
slug: 'v1_0'
category:
  - Announcement
  - Platform
---

Hi from [JSConf US](https://2018.jsconf.us/) in sunny San Diego, Calif., where a representative group of Johnny-Five contributors [met and planned](https://github.com/rwaldron/johnny-five/issues/1463) what's next for Johnny-Five. And—ta-da!—we are thrilled to announce the release of Johnny-Five v1.0!

Don't panic. This is the Johnny-Five you already know and love. There are no breaking changes from the last released, tagged version (???0.15.1). In fact, there are zero changes at all.

But! Now we've got our [semver](https://semver.org/) wheels in motion. We're in a good position to start kicking out some of the features we've been excited about (but have been scared to ship because some are breaking).

We're committing to the support of both [LTS (Long-Term Support) branches of Node.js](https://github.com/nodejs/Release), which, at time of versioning are: 8.x (active LTS) and 6.x (maintenance LTS). Already succesfully running J5 on an older version of Node.js? Not to worry: it won't stop working. We're just being more thoughtful and explicit about our Node.js version support going forward.