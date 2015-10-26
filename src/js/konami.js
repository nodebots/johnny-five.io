window.onload = function() {
  var artwork = document.getElementById("j5-artwork");

  if (!artwork) {
    return;
  }

  var original = artwork.firstElementChild;
  var payload = artwork.lastElementChild;
  var audio = document.createElement("audio");
  var sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var pressed = [];

  payload.srcset = "img/trick-or-treat.png";
  payload.classList.add("j5");

  if (!artwork) {
    return;
  }

  (function() {
    var types = [
      "webm",
      "mp4",
    ];

    types.forEach(function(type) {
      var file = "audio/j5." + type;
      var source = document.createElement("source");
      source.src = file;
      source.type = "audio/" + type;
      audio.appendChild(source);
    });

    window.jaudio = audio;
  }());

  document.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (sequence.length > pressed.length) {
      pressed.push(event.keyCode);
      timeout(1000, reset);
    }

    if (sequence.length === pressed.length) {
      if (isKonami()) {
        swap(payload);
      } else {
        reset();
      }
    }
  }, false);

  function isKonami() {
    return sequence.toString() === pressed.toString();
  }

  function reset() {
    pressed.length = 0;
  }

  function swap(show) {
    var hide = show === original ? payload : original;

    hide.classList.remove("vanishIn");
    hide.classList.add("vanishOut");
    show.classList.remove("vanishOut");
    show.classList.add("vanishIn");

    if (show === payload) {
      timeout(250, function() {
        audio.onended = function() {
          reset();
          swap(original);
        };
        console.log(audio);
        audio.play();
      });
    }
  }

  function timeout(time, callback) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(callback, time);
  }

};
