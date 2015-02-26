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
      '  var led = new five.Led(0);',
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

  addAnchors("h2, h3");

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


  var apiContent = document.querySelector(".api-content");
  var codeExamples;

  if (apiContent) {
    codeExamples = Array.from(document.querySelectorAll("pre"));
    codeExamples.forEach(function(example, index) {
      var div = document.createElement("div");
      var paragraph = example.nextElementSibling;
      var diagram = paragraph.firstChild;
      var hasBreadboardDiagram = diagram.nodeName === "IMG";

      if (hasBreadboardDiagram) {
        var height = window.getComputedStyle(example, null).getPropertyValue("height");
        example.classList.add("code-example-display");
        paragraph.classList.add("code-paragraph-display");

        diagram.style.height = height;
        div.style.height = height;
        div.classList.add("code-container");


        paragraph.parentNode.removeChild(paragraph);

        example.parentNode.replaceChild(div, example);

        div.appendChild(example);
        div.appendChild(paragraph);

        diagram.onclick = function() {
          window.open(this.src);
        };
      }
    });
  }



}());
