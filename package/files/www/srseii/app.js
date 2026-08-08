(function () {
  "use strict";

  var railcontrolLink = document.getElementById("railcontrol-link");
  var hostHint = document.getElementById("host-hint");
  var refreshButton = document.getElementById("refresh-status");
  var host = window.location.hostname || "gleisbox";

  if (railcontrolLink) {
    railcontrolLink.href = "http://" + host + ":8082/";
  }

  if (hostHint) {
    hostHint.textContent = "RailControl-Ziel: http://" + host + ":8082/";
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.textContent = text;
  }

  function setPill(id, isOk) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }

    el.classList.remove("pending", "ok", "err");
    if (isOk) {
      el.classList.add("pill", "ok");
      el.textContent = "aktiv";
    } else {
      el.classList.add("pill", "err");
      el.textContent = "inaktiv";
    }
  }

  function setStatusNote(text) {
    var note = document.getElementById("st-note");
    if (!note) {
      return;
    }
    note.textContent = text;
  }

  function loadStatus() {
    setStatusNote("Status wird geladen...");

    fetch("/cgi-bin/srseii/status", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setText("st-hostname", data.hostname || "unknown");
        setText("st-model", data.model || "unknown");

        setPill("st-lan", !!(data.network && data.network.lan));
        setPill("st-wifi", !!(data.network && data.network.wifi));

        setPill("st-mswebapp", !!(data.apps && data.apps.mswebapp));
        setPill("st-railcontrol-app", !!(data.apps && data.apps.railcontrol));

        setPill("st-railcontrol-svc", !!(data.services && data.services.railcontrol));
        setPill("st-z21emu", !!(data.services && data.services.z21emu));
        setPill("st-can2lan", !!(data.services && data.services.can2lan));

        setStatusNote("Status erfolgreich aktualisiert.");
      })
      .catch(function (error) {
        setStatusNote("Status konnte nicht geladen werden: " + error.message);
      });
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", loadStatus);
  }

  loadStatus();
})();
