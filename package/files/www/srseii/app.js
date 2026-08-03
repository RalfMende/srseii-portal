(function () {
  "use strict";

  var railcontrolLink = document.getElementById("railcontrol-link");
  var hostHint = document.getElementById("host-hint");
  var host = window.location.hostname || "gleisbox";

  if (railcontrolLink) {
    railcontrolLink.href = "http://" + host + ":8082/";
  }

  if (hostHint) {
    hostHint.textContent = "RailControl-Ziel: http://" + host + ":8082/";
  }
})();
