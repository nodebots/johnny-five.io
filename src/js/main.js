/* global addAnchors: true */
(function() {
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
  var element = document.querySelector(".js-board-type");

  if (element) {
    setInterval(function() {

      element.style.opacity = 0;

      setTimeout(function() {
        element.innerHTML = platforms[index];
        setTimeout(function() {
          element.style.opacity = 1;
        }, 200);
      }, 500);

      if (++index === platforms.length) {
        index = 0;
      }
    }, 1500);
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
      console.log(contents, classes.has(contents));
      if (classes.has(contents)) {
        element.classList.add(classes.get(contents));
      }
    });
  }
}());
