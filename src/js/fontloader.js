(function(win, undefined) {
  "use strict";

  var initialJS = win.document.getElementById("fontloader"),
    fontSrcRef = win.document.getElementsByName("fonts")[0];

  // simple load CSS function
  function loadCSS(href) {
    if (initialJS && initialJS.parentNode) {
      var link = win.document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      initialJS.parentNode.insertBefore(link, initialJS);
    } else {
      win.setTimeout(function() {
        loadCSS(href);
      }, 15);
    }
  }

  if (fontSrcRef) {
    // if fontSrcRef defined, grab its content attr for the font url
    loadCSS(fontSrcRef.content);
  }
}(this));
