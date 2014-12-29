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
    document.querySelector(".js-board-type").innerHTML = boardsAvailable[index];

    index++;
    if (index === boardsAvailable.length) {
      index = 0;
    }
  }, 3000);
}());
