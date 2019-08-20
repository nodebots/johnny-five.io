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
    particle: [
      'var five = require("johnny-five");',
      'var Photon = require("particle-io");',
      'var board = new five.Board({',
      '  io: new Photon({',
      '    token: PARTICLE_TOKEN,',
      '    deviceId: PARTICLE_DEVICE_ID',
      '  })',
      '});',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led("D7");',
      '  led.blink(500);',
      '});'
    ],
    tessel: [
      'var five = require("johnny-five");',
      'var Tessel = require("tessel-io");',
      'var board = new five.Board({',
      '  io: new Tessel()',
      '});',
      '',
      'board.on("ready", function() {',
      '  var led = new five.Led("a1");',
      '  led.blink(500);',
      '});'
    ],
  };

  var index = 1;
  var platforms = [
    "Tessel 2",
    "Arduino",
    "Raspberry Pi",
    "BeagleBone",
    "BlendMicro",
    "Electric Imp",
    "LightBlue Bean",
    "Particle Photon",
    "Intel Edison",
    "pcDuino",
    "Pinoccio",
  ];
  var platformName = document.querySelector(".js-board-type");

  if (platformName) {
    setInterval(function() {
      platformName.style.opacity = 0;
      setTimeout(function() {
        platformName.innerHTML = platforms[index];
        setTimeout(function() {
          platformName.style.opacity = 1;
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

  if (location.hash && platformName) {
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
    if (!navItem.classList.contains("anchorjs-link") && location.pathname.toLowerCase() === navItem.pathname) {
      navItem.classList.add("activepath");
    }
  });

  var variants = platformdata.platforms.reduce(function(accum, platform) {
    return accum.concat(platform.variants);
  }, []);
  var platformVariants = Array.from(document.querySelectorAll("[data-variant-name]"));
  var platformFilters = Array.from(document.querySelectorAll("#platform-filters a"));
  var filtersCached = {

    /* environment relationship: [ ... elements ] */
  };

  platformFilters.forEach(function(filter) {
    var filterKey = filter.dataset.filterKey;
    var filterValue = filter.dataset.filterValue;

    if (!filtersCached[filterKey]) {
      filtersCached[filterKey] = {};
    }

    if (!filtersCached[filterKey][filterValue]) {
      filtersCached[filterKey][filterValue] = [];
    }

    filter.addEventListener("click", function() {

      if (filterKey === "relationship" && filterValue === "all") {
        filtersCached.relationship.all.forEach(function(node) {
          node.hidden = false;
        });
      } else {
        filtersCached.relationship.all.forEach(function(node) {
          node.hidden = filtersCached[filterKey][filterValue].indexOf(node) === -1;
        });
      }
    }, false);
  });

  platformVariants.forEach(function(pVariant) {
    var pVariantNotes = pVariant.querySelector(".platform-variant-notes");
    var pVariantTable = pVariant.querySelector("table");
    var platformNode = pVariant.parentNode;
    var filters = JSON.parse(platformNode.dataset.filters);

    filters.forEach(function(filter) {
      filtersCached[filter][platformNode.dataset[filter]].push(platformNode);
    });

    filtersCached.relationship.all.push(platformNode);

    pVariant.addEventListener("click", function(event) {

      var target = event.target;
      var variant = findVariant(this.dataset.variantName);

      var table = null;
      var row = null;
      var index = -1;
      var notes;

      // If its not a TD, bail out.
      if (target.nodeName !== "TD") {
        return;
      }

      if (pVariantTable.contains(event.target)) {
        // Get the row and the table, used to find the index
        // to display the correspondng note
        row = target.parentNode;
        table = row.parentNode;
      } else {
        return;
      }

      // Determine the index of the row in the table
      index = Array.from(table.children).findIndex(function(child) {
        return child === row;
      });

      // Use row index to display corresponding note
      notes = variant.notes.public[index];

      pVariantNotes.innerHTML = notes.length ? notes.join("\n") : "&nbsp;";
    }, false);
  });

  function findVariant(name) {
    var variants = platformdata.platforms.reduce(function(accum, platform) {
      return accum.concat(platform.variants);
    }, []);

    // console.log("%s variants: ", name, variants);

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

  document.addEventListener("DOMContentLoaded", function() {
    addAnchors("h2, h3, h4, h5, li p strong");

    // If the url contains a fragment, then
    // it's possible that points to one of the
    // generated anchors.
    if (location.hash) {

      if (location.hash.includes(":")) {
        // Url contained a filter hash
        var parts = location.hash.slice(1).split(":");

        filtersCached.relationship.all.forEach(function(node) {
          node.hidden = filtersCached[parts[0]][parts[1]].indexOf(node) === -1;
        });
      } else {
        setTimeout(function() {
          // After the anchors have been generated,
          // jump to it.
          location.href = location.href;
        }, 0);
      }
    }
  });
}());
