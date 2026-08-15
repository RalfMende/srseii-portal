(function () {
  "use strict";

  var railcontrolLink = document.getElementById("railcontrol-link");
  var mswebappLink = document.getElementById("mswebapp-link");
  var z21emuGuideButton = document.getElementById("z21emu-guide-button");
  var z21emuGuideDialog = document.getElementById("z21emu-guide-dialog");
  var z21emuGuideCloseButton = document.getElementById("z21emu-guide-close");
  var luciLink = document.getElementById("luci-link");
  var terminalLink = document.getElementById("terminal-link");
  var hostHint = document.getElementById("host-hint");
  var refreshButton = document.getElementById("refresh-status");
  var wifiScanButton = document.getElementById("wifi-scan");
  var wifiConnectButton = document.getElementById("wifi-connect");
  var wifiManualToggleButton = document.getElementById("wifi-manual-toggle");
  var wifiManualHint = document.getElementById("wifi-manual-hint");
  var wifiManualFields = document.getElementById("wifi-manual-fields");
  var wifiNetworkSelect = document.getElementById("wifi-network");
  var wifiSsidInput = document.getElementById("wifi-ssid");
  var wifiSecuritySelect = document.getElementById("wifi-security");
  var wifiPasswordInput = document.getElementById("wifi-password");
  var wifiNote = document.getElementById("wifi-note");
  var host = window.location.hostname || "";
  var lang = detectLanguage();
  var manualMode = false;
  var scannedNetworksBySsid = {};

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
      webAppsSectionTitle: "Direkt im Browser von Smartphone / Tablet / PC",
      mobileUseCaseSectionTitle: "Über App auf Smartphone / Tablet",
      z21UseCaseTitle: "Z21 Emulator",
      z21UseCaseShort: "Verbindung mit der Z21-App oder WLAN-Maus.",
      z21GuideButton: "Anleitung",
      z21GuideTitle: "Z21 verbinden",
      z21AppTitle: "1. Z21-App verbinden",
      z21AppStep1: "Smartphone/Tablet mit dem WLAN der Z21 verbinden.",
      z21AppStep2: "Z21-App öffnen.",
      z21AppStep3: "In den Einstellungen die Verbindung zur Z21 auswählen.",
      z21AppStep4: "Als IP-Adresse die folgende Adresse eintragen:",
      z21AppStep5: "Verbindung speichern bzw. herstellen.",
      z21MouseTitle: "2. WLAN-Maus verbinden",
      z21MouseStep1: "WLAN-Maus einschalten.",
      z21MouseStep2: "In den WLAN-Einstellungen das WLAN der Z21 auswählen.",
      z21MouseStep3: "Mit dem WLAN verbinden.",
      z21MouseStep4: "In den Verbindungseinstellungen der WLAN-Maus die Z21-IP-Adresse eintragen:",
      z21MouseStep5: "Verbindung bestätigen.",
      z21ImportantTitle: "Wichtig",
      z21ImportantText: "Smartphone/Tablet bzw. WLAN-Maus müssen sich im gleichen Netzwerk wie die Z21 befinden.",
      z21AppNoteTitle: "Hinweis zur Z21 App",
      z21AppNoteText: "Die Z21-App kann kostenlos installiert und getestet werden. In der kostenlosen Version ist die Steuerung jedoch auf eine Lokomotive beschränkt. Für die Steuerung mehrerer Lokomotiven muss die Z21-Vollversion als In-App-Kauf freigeschaltet werden.",
      close: "Schließen",
      luciTitle: "LuCI (expert mode)",
      luciDesc: "Erweiterte OpenWrt-Einstellungen.",
      open: "Öffnen",
      statusTitle: "Status",
      refresh: "Aktualisieren",
      networkSectionTitle: "Netzwerk",
      lanStatusTitle: "LAN-Verbindung",
      wifiStatusTitle: "WLAN-Verbindung",
      statusLabel: "Status",
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
      wifiSsidManualLabel: "SSID (manuell)",
      wifiSecurityLabel: "Sicherheit",
      wifiSecurityAuto: "Automatisch",
      wifiSecurityWpa2: "WPA2-PSK",
      wifiSecurityMixed: "WPA/WPA2 gemischt",
      wifiSecurityWpa3: "WPA3-SAE",
      wifiSecurityOpen: "Offen (kein Passwort)",
      wifiManualToggleShow: "Show Advanced Config",
      wifiManualToggleHide: "Hide Advanced Config",
      wifiManualHint: "Nur bei versteckten SSIDs oder wenn der Scan das Netzwerk nicht findet.",
      wifiPasswordLabel: "Passwort",
      wifiConnect: "Verbinden",
      wifiIdle: "Bereit.",
      wifiScanning: "Scan laeuft...",
      wifiScanDone: "Scan abgeschlossen.",
      wifiNoNetworks: "Keine WLAN-Netzwerke gefunden.",
      wifiPickOrEnterSsid: "Bitte Netzwerk auswaehlen.",
      wifiPickManualSsid: "Bitte SSID fuer die manuelle Konfiguration eintragen.",
      wifiSelectNetworkFirst: "Bitte zuerst ein WLAN aus der Liste auswaehlen.",
      wifiPasswordRequired: "Bitte Passwort eingeben oder Sicherheit auf offen setzen.",
      wifiApplying: "Konfiguration wird uebernommen...",
      wifiApplyOk: "Konfiguration uebernommen.",
      wifiTesting: "Verbindung wird automatisch geprueft...",
      wifiConnectedNow: "WLAN verbunden. Status wurde aktualisiert.",
      wifiConnectTimeout: "Verbindung noch nicht bestaetigt. Bitte kurz warten oder Einstellungen pruefen.",
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
      webAppsSectionTitle: "Via Browser from Smartphone / Tablet / PC",
      mobileUseCaseSectionTitle: "Via App on Smartphone / Tablet",
      z21UseCaseTitle: "Z21 emulator",
      z21UseCaseShort: "Connect using the Z21 app or a WLAN mouse.",
      z21GuideButton: "Instructions",
      z21GuideTitle: "Connect Z21",
      z21AppTitle: "1. Connect the Z21 app",
      z21AppStep1: "Connect your smartphone or tablet to the Z21 WLAN.",
      z21AppStep2: "Open the Z21 app.",
      z21AppStep3: "Select the connection to the Z21 in Settings.",
      z21AppStep4: "Enter the following IP address:",
      z21AppStep5: "Save or establish the connection.",
      z21MouseTitle: "2. Connect the WLAN mouse",
      z21MouseStep1: "Switch on the WLAN mouse.",
      z21MouseStep2: "Select the Z21 WLAN in the WLAN settings.",
      z21MouseStep3: "Connect to the WLAN.",
      z21MouseStep4: "Enter the Z21 IP address in the WLAN mouse connection settings:",
      z21MouseStep5: "Confirm the connection.",
      z21ImportantTitle: "Important",
      z21ImportantText: "The smartphone, tablet, or WLAN mouse must be connected to the same network as the Z21.",
      z21AppNoteTitle: "Note on the Z21 app",
      z21AppNoteText: "The Z21 app can be installed and tested free of charge. In the free version, control is limited to one locomotive. To control multiple locomotives, the full Z21 version must be unlocked through an in-app purchase.",
      close: "Close",
      luciTitle: "LuCI (expert mode)",
      luciDesc: "Advanced OpenWrt settings.",
      open: "Open",
      statusTitle: "Status",
      refresh: "Refresh",
      networkSectionTitle: "Network",
      lanStatusTitle: "LAN connection",
      wifiStatusTitle: "WLAN connection",
      statusLabel: "Status",
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
      wifiSsidManualLabel: "SSID (manual)",
      wifiSecurityLabel: "Security",
      wifiSecurityAuto: "Automatic",
      wifiSecurityWpa2: "WPA2-PSK",
      wifiSecurityMixed: "WPA/WPA2 mixed",
      wifiSecurityWpa3: "WPA3-SAE",
      wifiSecurityOpen: "Open (no password)",
      wifiManualToggleShow: "Show Advanced Config",
      wifiManualToggleHide: "Hide Advanced Config",
      wifiManualHint: "Use this only for hidden SSIDs or if scan does not list the network.",
      wifiPasswordLabel: "Password",
      wifiConnect: "Connect",
      wifiIdle: "Ready.",
      wifiScanning: "Scanning...",
      wifiScanDone: "Scan finished.",
      wifiNoNetworks: "No WLAN networks found.",
      wifiPickOrEnterSsid: "Select a network.",
      wifiPickManualSsid: "Enter the SSID for manual setup.",
      wifiSelectNetworkFirst: "Select a WLAN from the list first.",
      wifiPasswordRequired: "Enter a password or set security to open.",
      wifiApplying: "Applying configuration...",
      wifiApplyOk: "Configuration applied.",
      wifiTesting: "Checking connection automatically...",
      wifiConnectedNow: "WLAN connected. Status has been updated.",
      wifiConnectTimeout: "Connection not confirmed yet. Please wait or review settings.",
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
    var resolvedHost = targetHost || host || window.location.hostname || "";
    if (!resolvedHost) {
      return;
    }

    host = resolvedHost;

    if (mswebappLink) {
      mswebappLink.href = "http://" + host + ":6020/";
    }

    if (railcontrolLink) {
      railcontrolLink.href = "http://" + host + ":8082/";
    }

    if (luciLink) {
      luciLink.href = "http://" + host + "/cgi-bin/luci/";
    }

    if (terminalLink) {
      terminalLink.href = "http://" + host + ":22/";
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

    var ariaLabelElements = document.querySelectorAll("[data-i18n-aria-label]");
    Array.prototype.forEach.call(ariaLabelElements, function (el) {
      var ariaLabelKey = el.getAttribute("data-i18n-aria-label");
      if (ariaLabelKey && translations[lang][ariaLabelKey]) {
        el.setAttribute("aria-label", translations[lang][ariaLabelKey]);
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

    el.classList.remove("pending", "ok", "err", "warn");
    if (isOk) {
      el.classList.add("pill", "ok");
      el.textContent = t("active");
    } else {
      el.classList.add("pill", "err");
      el.textContent = t("inactive");
    }
  }

  function setAppStatus(id, state) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }

    el.classList.remove("pending", "ok", "err", "warn");

    if (state === "ready") {
      el.classList.add("pill", "ok");
      el.textContent = "Bereit";
      return;
    }

    if (state === "problem") {
      el.classList.add("pill", "err");
      el.textContent = "Nicht bereit";
      return;
    }

    el.classList.add("pill", "warn");
    el.textContent = "Nicht bereit";
  }

  function setFeatureLinkState(linkEl, ready, url) {
    if (!linkEl) {
      return;
    }

    if (ready) {
      linkEl.classList.remove("is-disabled");
      linkEl.setAttribute("aria-disabled", "false");
      linkEl.removeAttribute("tabindex");
      linkEl.style.pointerEvents = "auto";
      linkEl.href = url;
      return;
    }

    linkEl.classList.add("is-disabled");
    linkEl.setAttribute("aria-disabled", "true");
    linkEl.setAttribute("tabindex", "-1");
    linkEl.style.pointerEvents = "none";
    linkEl.href = "#";
    linkEl.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }

  function setStatusNote(text) {
    var note = document.getElementById("st-note");
    if (!note) {
      return;
    }
    note.textContent = text;
  }

  function setNetworkNote(text) {
    var note = document.getElementById("network-note");
    if (!note) {
      return;
    }
    note.textContent = text;
  }

  function setZ21GuideIp(ipAddress) {
    var value = ipAddress || t("notAvailable");
    setText("z21emu-guide-ip", value);
    setText("z21emu-guide-ip-mouse", value);
  }

  function setWifiNote(text, isError) {
    if (!wifiNote) {
      return;
    }
    wifiNote.textContent = text;
    wifiNote.classList.toggle("err", !!isError);
  }

  function isManualMode() {
    return manualMode;
  }

  function setManualMode(enabled) {
    manualMode = !!enabled;

    if (wifiManualFields) {
      wifiManualFields.classList.toggle("is-hidden", !manualMode);
    }
    if (wifiManualHint) {
      wifiManualHint.classList.toggle("is-hidden", !manualMode);
    }
    if (wifiManualToggleButton) {
      wifiManualToggleButton.textContent = manualMode ? t("wifiManualToggleHide") : t("wifiManualToggleShow");
    }

    if (manualMode && wifiNetworkSelect) {
      wifiNetworkSelect.value = "";
    }
  }

  function normalizeSecurity(securityText) {
    var text = (securityText || "").toLowerCase();

    if (!text) {
      return "auto";
    }
    if (text.indexOf("open") !== -1 || text.indexOf("none") !== -1 || text.indexOf("offen") !== -1) {
      return "none";
    }
    if (text.indexOf("wpa3") !== -1 || text.indexOf("sae") !== -1) {
      return "sae";
    }
    if ((text.indexOf("wpa") !== -1 && text.indexOf("wpa2") !== -1) || text.indexOf("mixed") !== -1) {
      return "psk-mixed";
    }
    if (text.indexOf("wpa2") !== -1 || text.indexOf("psk2") !== -1) {
      return "psk2";
    }

    return "auto";
  }

  function toggleWifiActions(disabled, keepScanEnabled) {
    if (wifiScanButton && !keepScanEnabled) {
      wifiScanButton.disabled = disabled;
    }
    if (wifiConnectButton) {
      wifiConnectButton.disabled = disabled;
    }
  }

  function applyStatusData(data) {
    setText("st-hostname", data.hostname || t("unknown"));
    setText("st-model", data.model || t("unknown"));

    var network = data.network || {};
    if (network.ip) {
      updateAppLinks(network.ip);
    }
    setPill("net-lan-state", !!network.lan);
    setPill("net-wifi-state", !!network.wifi);
    setText("net-lan-ip", network.lanIp || t("notAvailable"));
    setText("net-wifi-ssid", network.ssid || t("unknown"));
    setText("net-wifi-ip", network.wifiIp || t("notAvailable"));

    var wifiAssistant = document.getElementById("wifi-assistant");
    if (wifiAssistant) {
      wifiAssistant.classList.toggle("is-hidden", !!network.wifi);
    }

    var mswebappUcReady = !!(data.services && data.services.mswebapp);
    var railcontrolUcReady = !!(data.services && data.services.railcontrol);
    var z21emuUcReady = !!(data.services && data.services.z21emu) && !!(data.services && data.services.can2lan);

    setAppStatus("st-mswebapp-feature", mswebappUcReady ? "ready" : "problem");
    setAppStatus("st-railcontrol-feature", railcontrolUcReady ? "ready" : "problem");
    setAppStatus("st-z21emu-feature", z21emuUcReady ? "ready" : "problem");
    setFeatureLinkState(mswebappLink, mswebappUcReady, "http://" + host + ":6020/");
    setFeatureLinkState(railcontrolLink, railcontrolUcReady, "http://" + host + ":8082/");

    setZ21GuideIp(network.ip);

    setPill("st-mswebapp-svc", !!(data.services && data.services.mswebapp));
    setPill("st-railcontrol-svc", !!(data.services && data.services.railcontrol));
    setPill("st-z21emu", !!(data.services && data.services.z21emu));
    setPill("st-can2lan", !!(data.services && data.services.can2lan));
    setPill("st-clone-ms2-loco", !!(data.services && data.services["clone-ms2-loco"]));
    setPill("st-maecanserver", !!(data.services && data.services.maecanserver));
    setPill("st-ms2-loco-list", !!(data.services && data.services["ms2-loco-list"]));
    setPill("st-wake-up-links88", !!(data.services && data.services["wake-up-links88"]));

    return network;
  }

  function fetchStatusData() {
    return fetch("/cgi-bin/srseii/status", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      });
  }

  function isWifiConnected(network, expectedSsid) {
    if (!network || !network.wifi) {
      return false;
    }

    if (!network.wifiIp) {
      return false;
    }

    if (expectedSsid && network.ssid && network.ssid !== "unbekannt" && network.ssid !== "unknown" && network.ssid !== "nicht verbunden") {
      return network.ssid === expectedSsid;
    }

    return true;
  }

  function waitForWifiConnection(expectedSsid) {
    var maxAttempts = 15;
    var delayMs = 2000;
    var attempt = 0;

    function poll() {
      attempt += 1;

      return fetchStatusData().then(function (data) {
        var network = applyStatusData(data);
        setStatusNote(t("statusLoaded"));
        setNetworkNote(network.message || t("statusLoaded"));

        if (isWifiConnected(network, expectedSsid)) {
          return true;
        }

        if (attempt >= maxAttempts) {
          return false;
        }

        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(poll());
          }, delayMs);
        });
      });
    }

    return poll();
  }

  function setNetworkOptions(networks) {
    if (!wifiNetworkSelect) {
      return;
    }

    wifiNetworkSelect.innerHTML = "";
    scannedNetworksBySsid = {};

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

      scannedNetworksBySsid[network.ssid] = {
        security: network.security || "",
        normalizedSecurity: normalizeSecurity(network.security || "")
      };

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
    toggleWifiActions(true, false);

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
        }
        setWifiNote(data.message || t("wifiScanDone"), false);
      })
      .catch(function (error) {
        var extra = error.rawResponse ? " Response: " + error.rawResponse : "";
        setWifiNote(t("wifiRequestFailed") + " " + error.message + extra, true);
      })
      .finally(function () {
        toggleWifiActions(false, false);
      });
  }

  function connectWifi() {
    var selectedSsid = "";
    var security = "auto";
    var fromManual = isManualMode();

    if (fromManual) {
      selectedSsid = wifiSsidInput && wifiSsidInput.value ? wifiSsidInput.value.trim() : "";
      security = wifiSecuritySelect && wifiSecuritySelect.value ? wifiSecuritySelect.value : "auto";
    } else {
      selectedSsid = wifiNetworkSelect && wifiNetworkSelect.value ? wifiNetworkSelect.value.trim() : "";
      if (selectedSsid && scannedNetworksBySsid[selectedSsid]) {
        security = scannedNetworksBySsid[selectedSsid].normalizedSecurity || "auto";
      }
    }

    var password = wifiPasswordInput && wifiPasswordInput.value ? wifiPasswordInput.value : "";

    if (!selectedSsid) {
      setWifiNote(fromManual ? t("wifiPickManualSsid") : t("wifiSelectNetworkFirst"), true);
      return;
    }

    if (fromManual && security !== "none" && security !== "auto" && !password) {
      setWifiNote(t("wifiPasswordRequired"), true);
      return;
    }

    setWifiNote(t("wifiApplying"), false);
    toggleWifiActions(true, true);

    postWifiAction("connect", {
      ssid: selectedSsid,
      password: password,
      security: security
    })
      .then(function (data) {
        if (!data.ok) {
          throw new Error(data.message || t("wifiRequestFailed"));
        }
        setWifiNote(t("wifiTesting"), false);
        return waitForWifiConnection(selectedSsid);
      })
      .then(function (connected) {
        if (connected) {
          setWifiNote(t("wifiConnectedNow"), false);
        } else {
          setWifiNote(t("wifiConnectTimeout"), true);
        }
      })
      .catch(function (error) {
        var extra = error.rawResponse ? " Response: " + error.rawResponse : "";
        setWifiNote(t("wifiRequestFailed") + " " + error.message + extra, true);
        loadStatus();
      })
      .finally(function () {
        toggleWifiActions(false, true);
      });
  }

  function loadStatus() {
    setStatusNote(t("statusLoading"));
    setNetworkNote(t("statusLoading"));

    fetchStatusData()
      .then(function (data) {
        var network = applyStatusData(data);

        setStatusNote(t("statusLoaded"));
        setNetworkNote(network.message || t("statusLoaded"));
      })
      .catch(function (error) {
        setStatusNote(t("statusLoadError") + " " + error.message);
        setNetworkNote(t("statusLoadError") + " " + error.message);
      });
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", loadStatus);
  }

  if (z21emuGuideButton && z21emuGuideDialog) {
    z21emuGuideButton.addEventListener("click", function () {
      z21emuGuideDialog.showModal();
    });
  }

  if (z21emuGuideCloseButton && z21emuGuideDialog) {
    z21emuGuideCloseButton.addEventListener("click", function () {
      z21emuGuideDialog.close();
    });
  }

  if (z21emuGuideDialog) {
    z21emuGuideDialog.addEventListener("click", function (event) {
      if (event.target === z21emuGuideDialog) {
        z21emuGuideDialog.close();
      }
    });
  }

  if (wifiNetworkSelect) {
    wifiNetworkSelect.addEventListener("change", function () {
      if (isManualMode()) {
        return;
      }
      if (wifiSsidInput) {
        wifiSsidInput.value = "";
      }
    });
  }

  if (wifiManualToggleButton) {
    wifiManualToggleButton.addEventListener("click", function () {
      setManualMode(!isManualMode());
    });
  }

  if (wifiScanButton) {
    wifiScanButton.addEventListener("click", scanWifi);
  }
  if (wifiConnectButton) {
    wifiConnectButton.addEventListener("click", connectWifi);
  }
  applyTranslations();
  setManualMode(false);
  setWifiNote(t("wifiIdle"), false);
  loadStatus();
})();
