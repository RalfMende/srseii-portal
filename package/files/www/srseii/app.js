(function () {
  "use strict";

  var railcontrolLink = document.getElementById("railcontrol-link");
  var hostHint = document.getElementById("host-hint");
  var refreshButton = document.getElementById("refresh-status");
  var host = window.location.hostname || "gleisbox";
  var lang = detectLanguage();

  var translations = {
    de: {
      pageTitle: "SRSEII Portal",
      metaDescription: "SRSEII Portal",
      siteTitle: "SRSEII",
      heroSubtitle: "Gleisbox als Zentrale",
      mswebappTitle: "Mobile Station Web App",
      mswebappDesc: "Loks und Weichen steuern.",
      railcontrolTitle: "RailControl",
      railcontrolDesc: "Modellbahnsteuerung im Browser.",
      luciTitle: "LuCI (Expertenmodus)",
      luciDesc: "Erweiterte OpenWrt-Einstellungen.",
      open: "Öffnen",
      statusTitle: "Status",
      refresh: "Aktualisieren",
      systemTitle: "System",
      hostnameLabel: "Hostname",
      modelLabel: "Modell",
      networkTitle: "Netzwerk",
      lanLabel: "LAN",
      wifiLabel: "WLAN",
      ssidLabel: "SSID",
      ipLabel: "IP",
      appsTitle: "Apps",
      servicesTitle: "Dienste",
      noteLabel: "Hinweis:",
      noteText: "Diese Version startet unter /srseii/. Die Root-Seite bleibt vorerst unverändert.",
      loading: "wird geladen",
      active: "aktiv",
      inactive: "inaktiv",
      statusLoading: "Status wird geladen...",
      statusLoaded: "Status erfolgreich aktualisiert.",
      statusLoadError: "Status konnte nicht geladen werden:",
      unknown: "unbekannt",
      notAvailable: "nicht verfügbar",
      hostHintPrefix: "RailControl-Ziel"
    },
    en: {
      pageTitle: "SRSEII Portal",
      metaDescription: "SRSEII Portal",
      siteTitle: "SRSEII",
      heroSubtitle: "Gleisbox as the central hub",
      mswebappTitle: "Mobile Station Web App",
      mswebappDesc: "Control locomotives and turnouts.",
      railcontrolTitle: "RailControl",
      railcontrolDesc: "Model railway control in the browser.",
      luciTitle: "LuCI (expert mode)",
      luciDesc: "Advanced OpenWrt settings.",
      open: "Open",
      statusTitle: "Status",
      refresh: "Refresh",
      systemTitle: "System",
      hostnameLabel: "Hostname",
      modelLabel: "Model",
      networkTitle: "Network",
      lanLabel: "LAN",
      wifiLabel: "WLAN",
      ssidLabel: "SSID",
      ipLabel: "IP",
      appsTitle: "Apps",
      servicesTitle: "Services",
      noteLabel: "Note:",
      noteText: "This version starts under /srseii/. The root page remains unchanged for now.",
      loading: "loading",
      active: "active",
      inactive: "inactive",
      statusLoading: "Loading status...",
      statusLoaded: "Status updated successfully.",
      statusLoadError: "Status could not be loaded:",
      unknown: "unknown",
      notAvailable: "not available",
      hostHintPrefix: "RailControl target"
    }
  };

  function detectLanguage() {
    var browserLang = (navigator.language || navigator.userLanguage || "de").toLowerCase();
    return browserLang.indexOf("de") === 0 ? "de" : "en";
  }

  function t(key) {
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.textContent = text;
  }

  function applyTranslations() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t("metaDescription"));
    }

    var elements = document.querySelectorAll("[data-i18n]");
    Array.prototype.forEach.call(elements, function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    if (refreshButton) {
      refreshButton.textContent = t("refresh");
    }

    if (railcontrolLink) {
      railcontrolLink.href = "http://" + host + ":8082/";
      railcontrolLink.textContent = t("open");
    }

    if (hostHint) {
      hostHint.textContent = t("hostHintPrefix") + ": http://" + host + ":8082/";
    }
  }

  function setPill(id, isOk) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }

    el.classList.remove("pending", "ok", "err");
    if (isOk) {
      el.classList.add("pill", "ok");
      el.textContent = t("active");
    } else {
      el.classList.add("pill", "err");
      el.textContent = t("inactive");
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
    setStatusNote(t("statusLoading"));

    fetch("/cgi-bin/srseii/status", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setText("st-hostname", data.hostname || t("unknown"));
        setText("st-model", data.model || t("unknown"));

        var network = data.network || {};
        setPill("st-lan", !!network.lan);
        setPill("st-wifi", !!network.wifi);
        setText("st-ssid", network.ssid || t("unknown"));
        setText("st-ip", network.ip || t("notAvailable"));

        setPill("st-mswebapp", !!(data.apps && data.apps.mswebapp));
        setPill("st-railcontrol-app", !!(data.apps && data.apps.railcontrol));

        setPill("st-railcontrol-svc", !!(data.services && data.services.railcontrol));
        setPill("st-z21emu", !!(data.services && data.services.z21emu));
        setPill("st-can2lan", !!(data.services && data.services.can2lan));
        setPill("st-clone-ms2-loco", !!(data.services && data.services["clone-ms2-loco"]));
        setPill("st-maecanserver", !!(data.services && data.services.maecanserver));
        setPill("st-ms2-loco-list", !!(data.services && data.services["ms2-loco-list"]));
        setPill("st-wake-up-links88", !!(data.services && data.services["wake-up-links88"]));

        setStatusNote(network.message || t("statusLoaded"));
      })
      .catch(function (error) {
        setStatusNote(t("statusLoadError") + " " + error.message);
      });
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", loadStatus);
  }

  applyTranslations();
  loadStatus();
})();
