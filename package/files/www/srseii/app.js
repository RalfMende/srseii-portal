(function () {
  "use strict";

  var railcontrolLink = document.getElementById("railcontrol-link");
  var mswebappLink = document.getElementById("mswebapp-link");
  var hostHint = document.getElementById("host-hint");
  var refreshButton = document.getElementById("refresh-status");
  var wifiScanButton = document.getElementById("wifi-scan");
  var wifiConnectButton = document.getElementById("wifi-connect");
  var wifiTestButton = document.getElementById("wifi-test");
  var wifiNetworkSelect = document.getElementById("wifi-network");
  var wifiSsidInput = document.getElementById("wifi-ssid");
  var wifiPasswordInput = document.getElementById("wifi-password");
  var wifiNote = document.getElementById("wifi-note");
  var host = window.location.hostname || "";
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
      hostHintPrefix: "RailControl-Ziel",
      wifiAssistantTitle: "WLAN-Assistent",
      wifiScan: "WLAN-Scan",
      wifiNetworkLabel: "Gefundenes Netzwerk",
      wifiNetworkPlaceholder: "Bitte zuerst scan starten",
      wifiSsidLabel: "SSID",
      wifiPasswordLabel: "Passwort",
      wifiConnect: "Verbinden",
      wifiTest: "Verbindung testen",
      wifiIdle: "Bereit.",
      wifiScanning: "Scan laeuft...",
      wifiScanDone: "Scan abgeschlossen.",
      wifiNoNetworks: "Keine WLAN-Netzwerke gefunden.",
      wifiPickOrEnterSsid: "Bitte Netzwerk auswaehlen oder SSID eintragen.",
      wifiApplying: "Konfiguration wird uebernommen...",
      wifiApplyOk: "Konfiguration uebernommen. Jetzt Verbindung testen.",
      wifiTesting: "Verbindung wird getestet...",
      wifiRequestFailed: "WLAN-Aktion fehlgeschlagen:"
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
      hostHintPrefix: "RailControl target",
      wifiAssistantTitle: "WLAN assistant",
      wifiScan: "Scan WLAN",
      wifiNetworkLabel: "Detected network",
      wifiNetworkPlaceholder: "Run a scan first",
      wifiSsidLabel: "SSID",
      wifiPasswordLabel: "Password",
      wifiConnect: "Connect",
      wifiTest: "Test connection",
      wifiIdle: "Ready.",
      wifiScanning: "Scanning...",
      wifiScanDone: "Scan finished.",
      wifiNoNetworks: "No WLAN networks found.",
      wifiPickOrEnterSsid: "Select a network or enter an SSID.",
      wifiApplying: "Applying configuration...",
      wifiApplyOk: "Configuration applied. Test the connection now.",
      wifiTesting: "Testing connection...",
      wifiRequestFailed: "WLAN action failed:"
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

  function updateAppLinks(targetHost) {
    if (!targetHost) {
      return;
    }

    host = targetHost;

    if (mswebappLink) {
      mswebappLink.href = "http://" + host + ":6020/";
    }

    if (railcontrolLink) {
      railcontrolLink.href = "http://" + host + ":8082/";
    }

    if (hostHint) {
      hostHint.textContent = t("hostHintPrefix") + ": http://" + host + ":8082/";
    }
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

    updateAppLinks(host);

    if (mswebappLink) {
      mswebappLink.textContent = t("open");
    }

    if (railcontrolLink) {
      railcontrolLink.textContent = t("open");
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

  function setWifiNote(text, isError) {
    if (!wifiNote) {
      return;
    }
    wifiNote.textContent = text;
    wifiNote.classList.toggle("err", !!isError);
  }

  function toggleWifiActions(disabled) {
    if (wifiScanButton) {
      wifiScanButton.disabled = disabled;
    }
    if (wifiConnectButton) {
      wifiConnectButton.disabled = disabled;
    }
    if (wifiTestButton) {
      wifiTestButton.disabled = disabled;
    }
  }

  function setNetworkOptions(networks) {
    if (!wifiNetworkSelect) {
      return;
    }

    wifiNetworkSelect.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = t("wifiNetworkPlaceholder");
    wifiNetworkSelect.appendChild(defaultOption);

    if (!networks || !networks.length) {
      return;
    }

    networks.sort(function (a, b) {
      return (b.quality || 0) - (a.quality || 0);
    });

    networks.forEach(function (network) {
      if (!network || !network.ssid) {
        return;
      }

      var option = document.createElement("option");
      option.value = network.ssid;
      option.textContent = network.ssid + " (" + (network.security || "?") + ", " + (network.quality || 0) + "%)";
      wifiNetworkSelect.appendChild(option);
    });
  }

  function postWifiAction(action, payload) {
    var params = new URLSearchParams();
    params.set("action", action);

    Object.keys(payload || {}).forEach(function (key) {
      params.set(key, payload[key]);
    });

    return fetch("/cgi-bin/srseii/wifi-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: params.toString(),
      cache: "no-store"
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.text().then(function (text) {
        try {
          return JSON.parse(text);
        } catch (parseError) {
          parseError.rawResponse = text;
          throw parseError;
        }
      });
    });
  }

  function scanWifi() {
    setWifiNote(t("wifiScanning"), false);
    toggleWifiActions(true);

    fetch("/cgi-bin/srseii/wifi-assistant?action=scan", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.text().then(function (text) {
          try {
            return JSON.parse(text);
          } catch (parseError) {
            parseError.rawResponse = text;
            throw parseError;
          }
        });
      })
      .then(function (data) {
        if (!data.ok) {
          throw new Error(data.message || t("wifiRequestFailed"));
        }

        var networks = Array.isArray(data.networks) ? data.networks : [];
        setNetworkOptions(networks);

        if (networks.length === 0) {
          setWifiNote(t("wifiNoNetworks"), true);
          return;
        }

        if (wifiNetworkSelect) {
          wifiNetworkSelect.selectedIndex = 1;
          if (wifiSsidInput) {
            wifiSsidInput.value = wifiNetworkSelect.value || "";
          }
        }
        setWifiNote(data.message || t("wifiScanDone"), false);
      })
      .catch(function (error) {
        var extra = error.rawResponse ? " Response: " + error.rawResponse : "";
        setWifiNote(t("wifiRequestFailed") + " " + error.message + extra, true);
      })
      .finally(function () {
        toggleWifiActions(false);
      });
  }

  function connectWifi() {
    var selectedSsid = wifiSsidInput && wifiSsidInput.value ? wifiSsidInput.value.trim() : "";
    var password = wifiPasswordInput && wifiPasswordInput.value ? wifiPasswordInput.value : "";

    if (!selectedSsid) {
      setWifiNote(t("wifiPickOrEnterSsid"), true);
      return;
    }

    setWifiNote(t("wifiApplying"), false);
    toggleWifiActions(true);

    postWifiAction("connect", {
      ssid: selectedSsid,
      password: password
    })
      .then(function (data) {
        if (!data.ok) {
          throw new Error(data.message || t("wifiRequestFailed"));
        }
        setWifiNote(data.message || t("wifiApplyOk"), false);
      })
      .catch(function (error) {
        var extra = error.rawResponse ? " Response: " + error.rawResponse : "";
        setWifiNote(t("wifiRequestFailed") + " " + error.message + extra, true);
      })
      .finally(function () {
        toggleWifiActions(false);
      });
  }

  function testWifi() {
    setWifiNote(t("wifiTesting"), false);
    toggleWifiActions(true);

    postWifiAction("test", {})
      .then(function (data) {
        if (!data.ok) {
          throw new Error(data.message || t("wifiRequestFailed"));
        }
        setWifiNote(data.message || t("statusLoaded"), false);
        loadStatus();
      })
      .catch(function (error) {
        var extra = error.rawResponse ? " Response: " + error.rawResponse : "";
        setWifiNote(t("wifiRequestFailed") + " " + error.message + extra, true);
        loadStatus();
      })
      .finally(function () {
        toggleWifiActions(false);
      });
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
        if (network.ip) {
          updateAppLinks(network.ip);
        }
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

  if (wifiNetworkSelect && wifiSsidInput) {
    wifiNetworkSelect.addEventListener("change", function () {
      wifiSsidInput.value = wifiNetworkSelect.value || "";
    });
  }

  if (wifiScanButton) {
    wifiScanButton.addEventListener("click", scanWifi);
  }
  if (wifiConnectButton) {
    wifiConnectButton.addEventListener("click", connectWifi);
  }
  if (wifiTestButton) {
    wifiTestButton.addEventListener("click", testWifi);
  }
  applyTranslations();
  setWifiNote(t("wifiIdle"), false);
  loadStatus();
})();
