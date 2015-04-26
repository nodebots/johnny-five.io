/* global addAnchors: true, location: true, hljs: true */
(function() {
  var hello = "";
  var hellos = {
    arduino: [
      'var five = require("johnny-five");',
      'var board = new five.Board();',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led(13);',
      '  led.blink(500);',
      '});'
    ],
    beaglebone: [
      'var five = require("johnny-five");',
      'var BeagleBone = require("beaglebone-io");',
      'var board = new five.Board({',
      '  io: new BeagleBone()',
      '});',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led("P9_14");',
      '  led.blink(500);',
      '});'
    ],
    edison: [
      'var five = require("johnny-five");',
      'var Edison = require("edison-io");',
      'var board = new five.Board({',
      '  io: new Edison()',
      '});',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led(0);',
      '  led.blink(500);',
      '});'
    ],
    spark: [
      'var five = require("johnny-five");',
      'var Spark = require("spark-io");',
      'var board = new five.Board({',
      '  io: new Spark({',
      '    token: SPARK_TOKEN,',
      '    deviceId: SPARK_DEVICE_ID',
      '  })',
      '});',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led("D7");',
      '  led.blink(500);',
      '});'
    ],
  };

  var index = 1;
  var platforms = [
    "Arduino",
    "BeagleBone",
    "BlendMicro",
    "Electric Imp",
    "LightBlue Bean",
    "Spark Core",
    "Intel Galileo",
    "Intel Edison",
    "Linino One",
    "pcDuino",
    "Pinoccio",
    "Raspberry Pi"
  ];
  var platform = document.querySelector(".js-board-type");

  if (platform) {
    setInterval(function() {

      platform.style.opacity = 0;

      setTimeout(function() {
        platform.innerHTML = platforms[index];
        setTimeout(function() {
          platform.style.opacity = 1;
        }, 200);
      }, 500);

      if (++index === platforms.length) {
        index = 0;
      }
    }, 1500);

    document.body.addEventListener("click", function(event) {
      if (event.target.dataset.hello) {
        event.preventDefault();
        sayHello(event.target.dataset.hello);
      }
    });
  }

  function sayHello(key) {
    var keys = Object.keys(hellos);
    var index = keys.indexOf(key);
    var block = document.querySelector(".hello pre code");

    if (typeof sayHello.scenes === "undefined") {
      sayHello.scenes = Array.from(document.querySelectorAll(".hello-scene"));
    }

    sayHello.scenes.forEach(function(scene) {
      scene.src = "img/led-scene-" + index + ".gif";
    });

    block.textContent = hellos[key].join("\n");
    hljs.highlightBlock(block);
  }

  if (location.hash && platform) {
    hello = location.hash.slice(1);
    if (hellos[hello]) {
      sayHello(hello);
    }
  }

  var capabilities = document.querySelectorAll(".variant td");
  var classes = new Map([
    ["yes", "green"],
    ["no", "red"]
  ]);

  if (capabilities.length) {
    Array.from(capabilities).forEach(function(element) {
      var contents = element.textContent.trim();
      if (classes.has(contents)) {
        element.classList.add(classes.get(contents));
      }
    });
  }


  var navlist = Array.from(document.querySelectorAll(".navlist a"));

  navlist.forEach(function(navItem) {
    if (location.pathname === navItem.pathname) {
      navItem.classList.add("current");
    }
  });

  var apinavlist = Array.from(document.querySelectorAll(".api-nav-list a"));

  apinavlist.forEach(function(navItem) {
    if (!navItem.classList.contains("anchorjs-link") && location.pathname === navItem.pathname) {
      navItem.classList.add("activepath");
    }
  });

  var variants = platformdata.platforms.reduce(function(accum, platform) {
    return accum.concat(platform.variants);
  }, []);
  var platformVariants = Array.from(document.querySelectorAll("[data-variant-name]"));

  platformVariants.forEach(function(pVariant) {
    var pVariantNotes = pVariant.querySelector(".platform-variant-notes");
    var pVariantTables = pVariant.querySelectorAll("table");

    pVariantTables[0].dataset.capabilies = "a";
    pVariantTables[1].dataset.capabilies = "b";

    pVariant.addEventListener("click", function(event) {
      var target = event.target;
      var variant = findVariant(this.dataset.variantName);
      var parent = null;
      var index = -1;
      var notes;

      if (event.target.nodeName !== "TD" ||
        (!event.target.classList.contains("red") && !event.target.classList.contains("green"))) {
        return;
      }

      if (pVariantTables[0].contains(event.target)) {
        parent = target.parentNode;
      } else {
        target = target.parentNode;
        parent = target.parentNode;
      }

      index = Array.from(parent.children).findIndex(function(child) {
        return child === target;
      });

      notes = variant.notes.public[index];
      pVariantNotes.innerHTML = notes.length ? notes.join("\n") : "&nbsp;";
    }, false);
  });

  function findVariant(name) {
    var variants = platformdata.platforms.reduce(function(accum, platform) {
      return accum.concat(platform.variants);
    }, []);

    return variants.find(function(variant) {
      return variant.name === name;
    });
  }

  // index.html "easter egg"
  var johnny = document.querySelector("img.j5");
  var visitmike = document.getElementById("visit-mike");
  var click = {
    timer: null,
    count: 0
  };

  if (johnny) {
    johnny.onclick = function() {
      if (click.timer === null) {
        click.timer = setTimeout(function() {
          clearTimeout(click.timer);
        }, 2000);
      } else {
        if (++click.count === 3) {
          clearTimeout(click.timer);
          visitmike.previousElementSibling.style.display = "none";
          visitmike.style.display = "block";
          click.count = 0;
          click.timer = null;

          setTimeout(function() {
            visitmike.previousElementSibling.style.display = "block";
            visitmike.style.display = "none";
          }, 3000);
        }
      }
    };
  }

  window.onload = function() {
    addAnchors("h2, h3, h4, li p strong");
  };
}());
