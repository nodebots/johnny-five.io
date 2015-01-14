(function() {
  var boardsAvailable = [
      "Arduino",
      "Electric Imp",
      "Spark Core",
      "Intel Galileo",
      "Intel Edison",
      "Linino One",
      "Pinoccio",
      "Raspberry Pi",
      "TI Launchpad"
    ],
    index = 1;

  setInterval(function() {
    var el = document.querySelector(".js-board-type") || {};

    if (el.length) {
      el.style.opacity = 0;

      setTimeout(function() {
        el.innerHTML = boardsAvailable[index];
        setTimeout(function() {
          el.style.opacity = 1;
        }, 200);
      }, 500);
    }

    index++;
    if (index === boardsAvailable.length) {
      index = 0;
    }
  }, 3500);
}());
