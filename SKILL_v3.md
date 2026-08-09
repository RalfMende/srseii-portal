# SRSEII Portal -- Development Skill v2.0

## 1. Projektziel

Entwickle ein schlankes, benutzerfreundliches Webportal für den **SRSEII
(Smallest Railroad Server Ever II)**.

Das Portal soll langfristig die zentrale Benutzeroberfläche des SRSEII
werden und unter folgender Adresse erreichbar sein:

``` text
http://gleisbox/
```

Das Portal soll insbesondere technisch weniger erfahrenen Modellbahnern
einen einfachen Zugang zu den installierten Anwendungen,
Netzwerkfunktionen und wichtigen Systeminformationen ermöglichen.

Die vorhandene LuCI-Oberfläche bleibt erhalten, wird aber als
**Expertenmodus** behandelt.

Grundprinzip:

> **Das SRSEII-Portal ist die einfache zentrale Bedienoberfläche. LuCI
> bleibt für erweiterte OpenWrt-Einstellungen verfügbar.**

Das Portal soll nicht versuchen, OpenWrt abzubilden. Es soll die
**Aufgaben des Modellbahners** abbilden.

------------------------------------------------------------------------

# 2. UX-Leitidee: Komplexität ausblenden

Die zentrale Erkenntnis für das Portal lautet:

> **Nicht die technische Konfiguration soll vereinfacht dargestellt
> werden, sondern die Aufgabe, die der Benutzer erledigen möchte.**

Der Nutzer soll möglichst nicht mit folgenden Begriffen konfrontiert
werden:

-   `can2lan`
-   `clone-ms2-loco`
-   `ms2-loco-list`
-   `apcli0`
-   `br-wlan`
-   `dnsmasq`
-   UCI
-   ubus
-   netifd
-   OpenWrt-Interfaces
-   Init-Skripte
-   Konfigurationsdateien

Diese Begriffe dürfen im Expertenbereich, in Diagnoseinformationen und
technischen Details erscheinen, aber **nicht als primäre
Bedienbegriffe**.

Beispiele:

Nicht:

``` text
clone-ms2-loco aktivieren
```

Sondern:

``` text
Lokliste von der Mobile Station übernehmen
```

Nicht:

``` text
WLAN-Interface konfigurieren
```

Sondern:

``` text
Mit einem WLAN verbinden
```

Nicht:

``` text
can2lan aktiv
```

Sondern:

``` text
Modellbahn-Verbindung aktiv
```

Technische Details können bei Bedarf über „Details" oder im
Expertenmodus eingeblendet werden.

------------------------------------------------------------------------

# 3. Zielgruppen

## 3.1 Normale Nutzer

Normale Nutzer sollen:

-   installierte Modellbahn-Anwendungen sehen,
-   Anwendungen per Kachel öffnen,
-   den Gesamtstatus des SRSEII verstehen,
-   den SRSEII mit einem vorhandenen WLAN verbinden,
-   eine WLAN-Verbindung testen,
-   Netzwerkprobleme verständlich diagnostizieren,
-   wichtige Modellbahn-Funktionen aktivieren,
-   die Lokliste der Mobile Station bei Bedarf synchronisieren,
-   ohne LuCI auskommen können.

Der normale Nutzer soll **keine Linux-Kenntnisse** benötigen.

## 3.2 Fortgeschrittene Nutzer

Fortgeschrittene Nutzer sollen:

-   Netzwerkstatus und Diagnoseinformationen sehen,
-   WLAN-Verbindungen neu konfigurieren,
-   Netzwerkverbindungen testen,
-   Modellbahndienste einsehen und gezielt aktivieren/deaktivieren
    können, soweit dies technisch sicher unterstützt wird,
-   Konfigurationsdetails einsehen,
-   Recovery-/Setup-Funktionen auslösen können.

## 3.3 Experten

Experten sollen weiterhin LuCI verwenden können:

``` text
http://gleisbox/cgi-bin/luci/
```

Das Portal ersetzt LuCI nicht.

------------------------------------------------------------------------

# 4. Ausgangssituation

Der SRSEII basiert auf einem **Onion Omega2+** mit MediaTek MT7688.

Aktuell wird die OpenWrt-Konfiguration über LuCI vorgenommen. Die
WLAN-Konfiguration ist für Einsteiger relativ kompliziert.

Das Portal soll diesen technischen Ablauf durch einen verständlichen
Assistenten ersetzen.

Die Oberfläche soll sich an einem einfachen mentalen Modell orientieren:

``` text
SRSEII
  │
  ├── Modellbahn-Apps
  │
  ├── Netzwerk
  │
  ├── Modellbahn-Funktionen
  │
  ├── Status & Diagnose
  │
  └── Expertenmodus
```

------------------------------------------------------------------------

# 5. Bekannte technische Umgebung

## Hardware

``` text
Modell: Onion Omega2+
SoC: MediaTek MT7688 ver:1 eco:2
OpenWrt-Target: ramips/mt76x8
Architektur: mipsel_24kc
Kernel: 5.4.238
```

## Betriebssystem

``` text
OpenWrt 21.02-SNAPSHOT
Revision: r16882-78e4cffcd8
```

Die OpenWrt-Version ist ein projektspezifischer Snapshot.

Bei der Entwicklung dürfen keine Pakete oder APIs vorausgesetzt werden,
die nur in neueren OpenWrt-Versionen verfügbar sind.

## Webserver

Vorhandener Webserver:

``` text
uhttpd
```

Ports:

``` text
HTTP: 80
HTTPS: 443
```

Web-Root:

``` text
/www
```

Vorhandene Struktur:

``` text
/cgi-bin/luci
```

Installiert sind unter anderem:

``` text
uhttpd
uhttpd-mod-lua
uhttpd-mod-ubus
LuCI
rpcd-mod-luci
```

Es ist kein zusätzlicher Webserver erforderlich.

------------------------------------------------------------------------

# 6. Ressourcen

## Flash

Beschreibbares Overlay:

``` text
Gesamt: ungefähr 6,3 MB
Belegt: ungefähr 3,7 MB
Frei: ungefähr 2,5 MB
```

Das Portal muss klein bleiben.

## RAM

``` text
Gesamt: ungefähr 123 MB
Verfügbar: ungefähr 62 MB
```

Das Portal darf keine unnötigen Hintergrunddienste erzeugen.

------------------------------------------------------------------------

# 7. Technische Leitlinien

## Unbedingt verwenden

-   vorhandenes `uhttpd`
-   statisches HTML
-   schlankes CSS
-   modernes, einfaches JavaScript ohne großes Framework
-   OpenWrt-UCI für Konfiguration
-   OpenWrt-ubus für System- und Netzwerkstatus
-   vorhandene OpenWrt-Netzwerkdienste
-   kontrollierte CGI-/Lua-/ubus-basierte Backend-Schnittstellen

## Nicht verwenden

Keine großen Webframeworks oder Laufzeitumgebungen:

-   kein Node.js
-   kein React
-   kein Vue
-   kein Angular
-   kein großer Python-Webserver
-   keine Datenbank
-   keine Container
-   keine unnötigen Hintergrunddienste
-   keine externen CDN-Abhängigkeiten

Das Portal muss auf einem Onion Omega2+ zuverlässig laufen.

------------------------------------------------------------------------

# 8. Sicherheits- und Architekturprinzip

Die Weboberfläche darf keine privilegierten Shell-Befehle direkt aus dem
Browser ausführen.

Architektur:

``` text
Browser
   │
   ▼
SRSEII-Portal
HTML + CSS + JavaScript
   │
   ▼
kleines kontrolliertes Backend
CGI / Lua / ubus
   │
   ▼
OpenWrt
UCI / ubus / netifd / hostapd / wpa_supplicant
```

Systemaktionen müssen über klar definierte Backend-Endpunkte erfolgen.

Benutzereingaben dürfen niemals ungeprüft an Shell-Kommandos übergeben
werden.

------------------------------------------------------------------------

# 9. Projektstruktur

Für die Entwicklung:

``` text
srseii-portal/
├── README.md
├── LICENSE
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── installation.md
│   ├── troubleshooting.md
│   └── roadmap.md
│
├── package/
│   ├── Makefile
│   └── files/
│       ├── www/
│       │   └── srseii/
│       │       ├── index.html
│       │       ├── style.css
│       │       ├── app.js
│       │       └── assets/
│       │
│       ├── www/
│       │   └── cgi-bin/
│       │       └── srseii/
│       │           ├── status
│       │           ├── apps
│       │           ├── wifi-scan
│       │           ├── wifi-test
│       │           ├── wifi-apply
│       │           ├── wifi-rollback
│       │           ├── service-status
│       │           └── loco-sync
│       │
│       ├── etc/
│       │   └── config/
│       │       └── srseii-portal
│       │
│       └── usr/
│           └── libexec/
│               └── srseii/
│                   ├── network-status
│                   ├── wifi-test
│                   ├── wifi-apply
│                   ├── wifi-rollback
│                   └── loco-sync
│
└── tests/
```

Die endgültige Struktur darf angepasst werden, wenn die tatsächliche
OpenWrt-Build-Umgebung bekannt ist.

------------------------------------------------------------------------

# 10. Informationsarchitektur des Portals

Die Startseite soll nicht wie eine Linux-Administrationsoberfläche
aussehen.

Empfohlene Hauptbereiche:

``` text
┌─────────────────────────────────────┐
│ SRSEII                              │
│ Ihre Modellbahn-Zentrale            │
├─────────────────────────────────────┤
│                                     │
│ Modellbahn                          │
│                                     │
│ [ Mobile Station Web App ]          │
│ [ RailControl ]                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Einrichtung                         │
│                                     │
│ [ Netzwerk & WLAN ]                 │
│ [ Modellbahn-Funktionen ]           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Status                              │
│                                     │
│ ● Alles bereit                      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [ Status & Diagnose ]               │
│ [ LuCI – Expertenmodus ]            │
└─────────────────────────────────────┘
```

Die vorhandene Screenshot-Optik mit App-Kacheln und Statuskarten kann
als Ausgangspunkt verwendet werden, soll aber in Richtung **weniger
technische Informationen auf der Startseite** weiterentwickelt werden.

------------------------------------------------------------------------

# 11. Dashboard: Was der Nutzer zuerst sehen soll

Das Dashboard soll in erster Linie drei Fragen beantworten:

### 1. Kann ich fahren?

``` text
✓ Modellbahn bereit
```

### 2. Kann ich meine Steuerungs-App öffnen?

``` text
[ Mobile Station Web App ]
[ RailControl ]
```

### 3. Gibt es ein Problem?

Wenn nein:

``` text
✓ Alles bereit
```

Wenn ja:

``` text
⚠ WLAN nicht verbunden
[ WLAN einrichten ]
```

oder:

``` text
⚠ Modellbahn-Verbindung nicht verfügbar
[ Problem prüfen ]
```

Der Dashboard-Status soll **handlungsorientiert** sein.

Nicht nur:

``` text
CAN2LAN: active
```

sondern:

``` text
✓ Verbindung zur Modellbahn aktiv
```

Technische Details können darunter optional angezeigt werden.

------------------------------------------------------------------------

# 12. App-Kacheln

Installierte Webanwendungen sollen als Kacheln dargestellt werden.

Beispiel:

``` text
Mobile Station Web App

Loks und Weichen steuern

[ Öffnen ]
```

``` text
RailControl

Modellbahnsteuerung

[ Öffnen ]
```

Die Kacheln sollen später anhand installierter Pakete erzeugt werden.

Mögliche Prüfungen:

``` sh
opkg status mswebapp
opkg status railcontrol
opkg status z21emu
```

Die erste Version darf die Kacheln noch statisch definieren.

## Wichtige Regel

Webanwendungen und Hintergrunddienste müssen getrennt dargestellt
werden.

`z21emu` ist beispielsweise ein Hintergrunddienst und keine normale
App-Kachel.

------------------------------------------------------------------------

# 13. Modellbahn-Funktionen

Neben App-Kacheln soll das Portal zukünftig **modellbahnspezifische
Funktionen** anbieten.

Beispiele:

``` text
Modellbahn-Funktionen

Lokliste
[ Lokliste von Mobile Station übernehmen ]

Verbindungen
✓ Modellbahn-Verbindung aktiv

Schnittstellen
✓ Z21-Schnittstelle aktiv
```

Die technische Implementierung darf im Hintergrund mehrere Dienste
verändern.

Der Nutzer soll nicht wissen müssen, welche Dienste dafür benötigt
werden.

------------------------------------------------------------------------

# 14. Loklisten-Synchronisation

Die Loklisten-Synchronisation ist ein zentraler Kandidat für die
Vereinfachung.

Die technische Konfiguration kann mehrere Komponenten betreffen,
insbesondere:

``` text
can2lan
clone-ms2-loco
ms2-loco-list
```

Das Portal darf diese technischen Details nicht zum primären
Bedienkonzept machen.

Stattdessen:

``` text
Lokliste

Lokliste von Mobile Station übernehmen

[ Jetzt synchronisieren ]
```

Nach erfolgreicher Synchronisation:

``` text
✓ Lokliste übernommen

27 Lokomotiven gefunden.
Letzte Synchronisation: 13:42 Uhr
```

Bei einem Fehler:

``` text
⚠ Lokliste konnte nicht übernommen werden.

Die Verbindung zur Mobile Station konnte nicht geprüft werden.

[ Erneut versuchen ]
[ Diagnose anzeigen ]
```

## Wichtige Sicherheitsregel

Wenn die technische Konfiguration eine bestimmte Kombination
aktivierter/deaktivierter Dienste erfordert, muss das Backend diese
Kombination **atomar bzw. kontrolliert** herstellen.

Der Benutzer soll nicht einzelne technische Dienste manuell kombinieren
müssen.

------------------------------------------------------------------------

# 15. Netzwerk & WLAN

Der WLAN-Assistent ist eine der wichtigsten Funktionen des Portals.

Ziel:

> Ein Modellbahner soll den SRSEII mit seinem WLAN verbinden können,
> ohne LuCI oder OpenWrt-Netzwerkkonfiguration zu verstehen.

## Primärer Ablauf

``` text
1. WLAN auswählen
        ↓
2. Passwort eingeben
        ↓
3. Verbindung testen
        ↓
4. Verbindung erfolgreich?
     /             \
   Ja              Nein
   ↓                ↓
Speichern      Alte Konfiguration behalten
   ↓
Fertig
```

## Benutzeroberfläche

``` text
WLAN einrichten

Verfügbare Netzwerke:

○ FRITZ!Box
○ Modellbahn
○ Gastnetz
○ Netzwerk manuell eingeben

Passwort:

[________________________]

[ Verbindung testen ]
```

Der Nutzer soll nach Möglichkeit nur SSID und Passwort sehen.

Technische Details wie Interface-Namen gehören in „Details".

------------------------------------------------------------------------

# 16. WLAN-Scan

Der WLAN-Scan soll:

-   verfügbare Netzwerke anzeigen,
-   SSID,
-   Signalstärke,
-   Verschlüsselungsart soweit zuverlässig ermittelbar,
-   bekannte/auswählbare Netzwerke anbieten.

Beispiel:

``` text
WLAN auswählen

FRITZ!Box                 █████
Modellbahn                ████
Gastnetz                  ███
```

Ein manuelles Eingabefeld muss ebenfalls vorhanden sein, falls ein
Netzwerk nicht gefunden wird.

------------------------------------------------------------------------

# 17. WLAN-Konfiguration sicher anwenden

Neue WLAN-Einstellungen dürfen niemals unkontrolliert die bisher
funktionierende Konfiguration ersetzen.

Pflichtablauf:

``` text
Aktuelle Konfiguration sichern
            │
            ▼
Neue WLAN-Konfiguration temporär anwenden
            │
            ▼
Verbindung prüfen
            │
       ┌────┴────┐
       │         │
 erfolgreich  fehlgeschlagen
       │         │
       ▼         ▼
dauerhaft     alte Konfiguration
speichern     wiederherstellen
```

Ein falsches Passwort darf den SRSEII nicht dauerhaft aus dem Netzwerk
aussperren.

Wenn ein echter atomarer Rollback technisch nicht möglich ist, muss eine
sichere Wiederherstellungsstrategie implementiert werden.

------------------------------------------------------------------------

# 18. WPS

**WPS wird im Portal nicht implementiert.**

Der ursprünglich vorgesehene WPS-Schritt wird vollständig übersprungen.

Es darf keine WPS-Kachel, keinen WPS-Assistenten, keinen
WPS-API-Endpunkt und keine WPS-spezifische Roadmap-Phase geben.

Der WLAN-Assistent muss ohne WPS vollständig funktionieren.

------------------------------------------------------------------------

# 19. Setup-WLAN / Recovery

Der SRSEII besitzt aktuell keine physische Taste für Netzwerk-Setup oder
Recovery.

Die erste Softwareversion darf daher nicht von einer Taste abhängig
sein.

Langfristig soll ein temporäres Setup-WLAN möglich sein.

Beispiel:

``` text
SRSEII-Setup-A42F
```

Die Kennung kann später aus einem Teil der MAC-Adresse erzeugt werden.

Das Setup-WLAN soll nicht dauerhaft aktiv sein.

Mögliche Auslöser:

-   kein WLAN konfiguriert,
-   bekannte WLAN-Verbindung schlägt mehrfach fehl,
-   Nutzer aktiviert Setup-WLAN im Portal,
-   zukünftige Hardware: Setup-Taste.

------------------------------------------------------------------------

# 20. Manuelles Recovery

Das Portal soll langfristig eine verständliche Recovery-Funktion
anbieten:

``` text
Netzwerkproblem?

[ Setup-WLAN für 15 Minuten aktivieren ]
```

Nach Aktivierung:

``` text
Setup-WLAN aktiv

Verbinden Sie Ihr Smartphone oder Ihren Computer mit:

SRSEII-Setup-A42F

Danach können Sie die WLAN-Verbindung neu einrichten.
```

Die genaue Sicherheitslogik und die Dauer müssen technisch noch
festgelegt werden.

------------------------------------------------------------------------

# 21. Automatische Recovery

Langfristiges Ziel:

``` text
SRSEII startet
      │
      ▼
Ist WLAN konfiguriert?
      │
  ┌───┴───┐
 Nein     Ja
  │        │
  ▼        ▼
Setup-AP  WLAN-Verbindung versuchen
starten          │
                 ▼
         Verbindung erfolgreich?
              │         │
             Ja        Nein
              │         │
              ▼         ▼
        Normalbetrieb  weitere Versuche
                           │
                           ▼
                     Setup-AP starten
```

Zeit, Anzahl der Versuche und Sicherheitslogik sind vor Implementierung
festzulegen.

------------------------------------------------------------------------

# 22. Status & Diagnose

Die aktuelle Oberfläche zeigt viele technische Zustände bereits in
Karten.

Diese Information soll beibehalten werden, aber in zwei Ebenen geteilt
werden.

## Benutzeransicht

``` text
Status

✓ Netzwerk verbunden
✓ Modellbahn-Verbindung aktiv
✓ Mobile Station Web App verfügbar
✓ RailControl verfügbar
```

## Technische Details

``` text
Hostname: Gleisbox
Modell: Onion Omega2+
WLAN: WLAN
IP: 192.168.x.x

CAN2LAN: active
clone-ms2-loco: active
ms2-loco-list: inactive
```

Damit bleibt die Diagnosefähigkeit erhalten, ohne normale Nutzer mit
technischen Begriffen zu überfordern.

------------------------------------------------------------------------

# 23. Verständliche Fehlerbehandlung

Fehlermeldungen sollen nicht nur technische Fehler ausgeben.

Nicht:

``` text
NetworkError when attempting to fetch resource.
```

Sondern beispielsweise:

``` text
Die WLAN-Einstellung konnte nicht übernommen werden.

Der SRSEII konnte keine Verbindung zum ausgewählten WLAN herstellen.

Die bisherige Verbindung wurde nicht verändert.

[ Erneut versuchen ]
[ WLAN-Einstellungen prüfen ]
[ Technische Details ]
```

## Fehlerstruktur

Jeder relevante Fehler sollte möglichst enthalten:

1.  Was ist passiert?
2.  Was bedeutet das?
3.  Wurde etwas verändert?
4.  Was kann der Nutzer jetzt tun?
5.  Optional: technische Details.

------------------------------------------------------------------------

# 24. Statusmodell

Das Portal sollte Zustände möglichst mit drei einfachen Ebenen
darstellen:

``` text
✓ Bereit
⚠ Aufmerksamkeit erforderlich
✕ Problem
```

Nicht jede technische Inaktivität ist ein Fehler.

Beispiel:

``` text
LAN       nicht verbunden
WLAN      verbunden
```

ist kein Fehler, wenn WLAN die aktive Verbindung ist.

Die Statuslogik muss daher zwischen:

-   aktiv,
-   inaktiv,
-   nicht benötigt,
-   Fehler

unterscheiden können.

------------------------------------------------------------------------

# 25. Dienste

Technische Dienste sollen nicht automatisch als Apps erscheinen.

Beispiele:

``` text
CAN2LAN
Z21-Emulator
MQTT
clone-ms2-loco
ms2-loco-list
```

Sie gehören in:

``` text
Status & Diagnose
```

oder:

``` text
Modellbahn-Funktionen
```

Je nach Funktion.

## Benutzerfreundliche Darstellung

Nicht:

``` text
CAN2LAN active
```

sondern:

``` text
Modellbahn-Verbindung
✓ aktiv
```

Optional:

``` text
Technischer Dienst: can2lan
```

------------------------------------------------------------------------

# 26. Startseite -- empfohlene endgültige Struktur

Die Startseite soll gegenüber einer klassischen OpenWrt-Administration
deutlich ruhiger werden.

Empfehlung:

``` text
SRSEII
Ihre Modellbahn-Zentrale

┌─────────────────────────────────┐
│ Mobile Station Web App          │
│ Loks und Weichen steuern        │
│ [ Öffnen ]                      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ RailControl                    │
│ Modellbahnsteuerung             │
│ [ Öffnen ]                      │
└─────────────────────────────────┘

Status
✓ Alles bereit

Netzwerk
✓ WLAN verbunden
192.168.x.x

Modellbahn
✓ Verbindung aktiv

[ Netzwerk & WLAN ]
[ Modellbahn-Funktionen ]
[ Status & Diagnose ]

[ LuCI – Expertenmodus ]
```

Die technische Dienstliste muss nicht dauerhaft auf der Startseite
stehen.

------------------------------------------------------------------------

# 27. Bezug zur bestehenden Oberfläche

Die bestehende Oberfläche mit:

-   App-Kacheln,
-   Statusbereich,
-   Netzwerkbereich,
-   WLAN-Assistent

ist ein guter technischer Prototyp.

Für die nächste Iteration soll sie jedoch stärker nach Benutzeraufgaben
strukturiert werden.

Insbesondere:

### Beibehalten

-   SRSEII-Branding
-   App-Kacheln
-   Statuskarte
-   WLAN-Assistent
-   LuCI-Link
-   responsive Layout
-   kompakte Darstellung

### Vereinfachen

-   technische Dienstnamen auf der Startseite,
-   redundante Netzwerkdetails,
-   technische Fehlermeldungen,
-   Vermischung von Apps und Diensten.

### Ergänzen

-   Gesamtstatus „Alles bereit",
-   handlungsorientierte Warnungen,
-   Modellbahn-Funktionen,
-   Loklisten-Synchronisation,
-   verständliche Fehlerdialoge,
-   technische Details als optionale Ebene.

------------------------------------------------------------------------

# 28. LuCI / Expertenmodus

LuCI bleibt vollständig erhalten.

Portal-Link:

``` text
LuCI – Expertenmodus
```

Ziel:

``` text
/cgi-bin/luci/
```

LuCI soll normale Nutzer nicht mit OpenWrt-Details überfordern.

Das **SRSEII Portal** ist die einfache Ebene.

LuCI ist die technische Ebene.

------------------------------------------------------------------------

# 29. Root-URL

Während der Entwicklung:

``` text
http://gleisbox/srseii/
```

Die bestehende LuCI-Startseite bleibt zunächst unverändert.

Für ein offizielles SRSEII-Image kann später die Root-URL geändert
werden:

``` text
http://gleisbox/
```

→ SRSEII-Portal

LuCI bleibt:

``` text
http://gleisbox/cgi-bin/luci/
```

Die Root-Änderung sollte vorzugsweise im SRSEII-Image oder dessen
Dateioverlay erfolgen.

Ein separates Paket soll `/www/index.html`, das zu `luci-base` gehört,
nicht unkontrolliert überschreiben.

------------------------------------------------------------------------

# 30. Sicherheit

Besonders kritisch:

-   WLAN-Passwörter
-   Netzwerkänderungen
-   Aktivierung des Setup-AP
-   Neustart von Netzwerkdiensten
-   Recovery
-   Modellbahn-Dienstkonfiguration

Anforderungen:

-   keine unkontrollierte Ausführung von Benutzereingaben,
-   keine direkte Übergabe von WLAN-Namen oder Passwörtern an
    Shell-Kommandos,
-   Eingaben validieren,
-   Shell-Escaping vermeiden, wenn sichere UCI-/ubus-Schnittstellen
    verfügbar sind,
-   WLAN-Passwörter nicht in Browser-Logs oder Statusantworten ausgeben,
-   sensible Daten nicht auf der Statusseite anzeigen,
-   technische Änderungen möglichst vorübergehend testen und erst nach
    Erfolg dauerhaft speichern.

------------------------------------------------------------------------

# 31. API-Grundsätze

Die Weboberfläche soll kleine, klar abgegrenzte Endpunkte verwenden.

Beispiele:

``` text
GET  /cgi-bin/srseii/status
GET  /cgi-bin/srseii/apps
GET  /cgi-bin/srseii/service-status
GET  /cgi-bin/srseii/wifi-scan

POST /cgi-bin/srseii/wifi-test
POST /cgi-bin/srseii/wifi-apply
POST /cgi-bin/srseii/wifi-rollback
POST /cgi-bin/srseii/loco-sync
```

JSON als Datenaustauschformat.

Keine unnötigen Hintergrundprozesse.

------------------------------------------------------------------------

# 32. Beispiel Status-API

Beispiel:

``` text
GET /cgi-bin/srseii/status
```

Mögliche Antwort:

``` json
{
  "hostname": "Gleisbox",
  "model": "Onion Omega2+",
  "network": {
    "lan": false,
    "wifi": true,
    "ssid": "WLAN",
    "ip": "192.168.x.x"
  },
  "apps": {
    "mswebapp": true,
    "railcontrol": true
  },
  "services": {
    "z21emu": true,
    "can2lan": true
  }
}
```

Die tatsächlichen Statusprüfungen müssen anhand der vorhandenen Dienste
und Init-Skripte ermittelt werden.

------------------------------------------------------------------------

# 33. Modellbahn-Konfiguration als Profile

Langfristig sollte das Portal technische Konfigurationen zu
verständlichen Profilen zusammenfassen.

Beispiel:

``` text
Modellbahn-Funktionen

○ Grundbetrieb
  Verbindung zur Gleisbox

○ Mobile Station
  Mobile Station Web App
  Lokliste übernehmen

○ RailControl
  RailControl-Verbindung

○ Z21-kompatible Steuerung
  Z21-Schnittstelle
```

Dabei dürfen keine Annahmen über technische Abhängigkeiten getroffen
werden, bevor diese auf dem konkreten SRSEII untersucht wurden.

Das Portal soll eine fachliche Funktion aktivieren und die
erforderlichen technischen Komponenten im Hintergrund konfigurieren.

------------------------------------------------------------------------

# 34. Diagnose-Assistent

Statt einer reinen Liste technischer Statuswerte soll das Portal
langfristig einen Diagnose-Assistenten anbieten.

Beispiel:

``` text
Problem mit der Modellbahn?

[ Diagnose starten ]
```

Der Assistent prüft beispielsweise:

``` text
✓ SRSEII erreichbar
✓ Netzwerk verbunden
✓ Modellbahn-Dienst aktiv
✓ CAN-Verbindung vorhanden
✓ Steuerungs-App erreichbar
```

Bei einem Fehler:

``` text
⚠ CAN-Verbindung nicht verfügbar

Mögliche Ursache:
Die Modellbahn-Schnittstelle ist nicht aktiv.

[ Problem beheben ]
[ Technische Details ]
```

Die Diagnose darf nur Aktionen anbieten, deren technische
Voraussetzungen tatsächlich bekannt sind.

------------------------------------------------------------------------

# 35. Entwicklungsphasen

## Version 0.1 -- SRSEII Portal Grundgerüst

Ziele:

-   Portal unter `/srseii/`
-   responsive Startseite
-   App-Kacheln
-   MSWebApp
-   RailControl
-   LuCI
-   keine Systemänderungen
-   kein WLAN-Zugriff

## Version 0.2 -- Status

Ziele:

-   kleines Backend
-   Hostname
-   Hardwaremodell
-   Netzwerkstatus
-   installierte Modellbahn-Pakete
-   Dienststatus
-   verständlicher Gesamtstatus

## Version 0.3 -- Netzwerkstatus

Ziele:

-   LAN-Status
-   WLAN-Status
-   SSID
-   IP-Adresse
-   verständliche Zustände
-   verständliche Fehlermeldungen

## Version 0.4 -- WLAN-Assistent

Ziele:

-   WLAN-Scan
-   Netzwerkauswahl
-   Passwort
-   manuelle SSID
-   Verbindungstest
-   sichere Übernahme
-   Rollback bei Fehler

## Version 0.5 -- Modellbahn-Funktionen

Ziele:

-   technische Dienste erfassen
-   verständliche Funktionsdarstellung
-   Loklisten-Synchronisation
-   technische Abhängigkeiten im Backend kapseln

## Version 0.6 -- Diagnose

Ziele:

-   Diagnose-Assistent
-   verständliche Handlungsempfehlungen
-   technische Details optional
-   Supportinformationen

## Version 0.7 -- Recovery

Ziele:

-   Setup-AP manuell aktivieren
-   zeitlich begrenzter Setup-AP
-   automatische Recovery bei fehlender WLAN-Verbindung

**WPS ist keine Entwicklungsphase und wird nicht implementiert.**

## Spätere Versionen

Mögliche Erweiterungen:

-   Hardware-Setup-Taste
-   QR-Code für Setup-WLAN
-   individuelles Setup-Passwort
-   Diagnosebericht
-   Export von Supportinformationen
-   Mehrsprachigkeit
-   automatische App-Registrierung
-   automatische Erkennung weiterer Modellbahn-Apps

------------------------------------------------------------------------

# 36. Priorisierung

Bei der Entwicklung gilt folgende Priorität:

### P0 -- unbedingt

1.  Startseite
2.  App-Launcher
3.  Gesamtstatus
4.  Netzwerkstatus
5.  WLAN-Assistent
6.  sichere WLAN-Übernahme
7.  verständliche Fehlerbehandlung

### P1 -- hoher Nutzen

8.  Modellbahn-Funktionen
9.  Loklisten-Synchronisation
10. Diagnose-Assistent
11. Dienst-Abhängigkeiten im Backend

### P2 -- später

12. Setup-WLAN
13. automatische Recovery
14. Support-Export
15. automatische App-Erkennung

### Nicht umsetzen

-   WPS
-   große Webframeworks
-   unnötige Hintergrunddienste
-   vollständige OpenWrt-Konfiguration im Portal

------------------------------------------------------------------------

# 37. Definition of Done für Version 0.1

Version 0.1 ist fertig, wenn:

-   das Portal unter `/srseii/` erreichbar ist,
-   die Seite auf Smartphone, Tablet und PC funktioniert,
-   MSWebApp über eine Kachel erreichbar ist,
-   RailControl über eine Kachel erreichbar ist,
-   LuCI über eine Kachel erreichbar ist,
-   keine bestehende SRSEII-Funktion verändert wird,
-   keine WLAN-Konfiguration verändert wird,
-   kein zusätzlicher großer Dienst installiert wird,
-   das Portal als OpenWrt-Paket gebaut werden kann.

------------------------------------------------------------------------

# 38. Definition of Done für WLAN-Assistent

Der WLAN-Assistent ist fertig, wenn:

-   verfügbare Netzwerke angezeigt werden,
-   eine SSID ausgewählt werden kann,
-   eine SSID manuell eingegeben werden kann,
-   ein Passwort sicher eingegeben werden kann,
-   die neue Verbindung zunächst getestet wird,
-   die bisherige Konfiguration bei Fehler erhalten bleibt,
-   eine erfolgreiche Verbindung dauerhaft gespeichert werden kann,
-   verständliche Erfolg-/Fehlermeldungen erscheinen,
-   keine Zugangsdaten in Statusantworten oder Logs ausgegeben werden,
-   der Ablauf ohne LuCI funktioniert,
-   WPS nicht erforderlich ist.

------------------------------------------------------------------------

# 39. Definition of Done für Modellbahn-Funktionen

Die Modellbahn-Funktionen sind fertig, wenn:

-   technische Dienste nicht mehr als primäre Benutzeraktionen
    erscheinen,
-   eine fachliche Funktion über eine verständliche Aktion gestartet
    werden kann,
-   erforderliche technische Dienste automatisch berücksichtigt werden,
-   die tatsächlichen Abhängigkeiten auf dem SRSEII verifiziert wurden,
-   Loklisten-Synchronisation über einen einfachen Button möglich ist,
-   Fehler verständlich dargestellt werden,
-   technische Details optional einsehbar sind.

------------------------------------------------------------------------

# 40. Coding-Regeln

Der Code soll:

-   klein,
-   verständlich,
-   wartbar,
-   modular,
-   ressourcenschonend,
-   OpenWrt-21.02-kompatibel

sein.

## JavaScript

-   kein Build-Schritt erforderlich,
-   kein npm,
-   keine externen CDN-Abhängigkeiten,
-   möglichst modernes Vanilla JavaScript,
-   keine großen Bibliotheken.

## CSS

-   responsive,
-   mobilfreundlich,
-   gut lesbar,
-   keine großen CSS-Frameworks.

## Backend

-   kleine, klar abgegrenzte Endpunkte,
-   JSON als Datenaustauschformat,
-   keine unnötigen Hintergrundprozesse,
-   keine direkte Shell-Ausführung aus Browserdaten.

------------------------------------------------------------------------

# 41. Offene technische Fragen

Vor der finalen Paketimplementierung klären:

1.  Wo befindet sich das SRSEII-Image-Repository?
2.  Wer verwaltet die Image-Builds?
3.  Welche OpenWrt-SDK-Version wird für die Pakete verwendet?
4.  Wo liegen die Makefiles der bestehenden Pakete?
5.  Wie werden `.ipk`-Pakete gebaut?
6.  Wie werden Pakete auf den Feed-Server veröffentlicht?
7.  Wie ist die MSWebApp technisch eingebunden?
8.  Welche URLs verwendet MSWebApp genau?
9.  Wie werden die vorhandenen Dienste gestartet?
10. Welche Init-Skripte existieren?
11. Welche WLAN-Pakete sind installiert?
12. Welche WLAN-Schnittstelle wird verwendet?
13. Ist `wpa_supplicant` oder eine andere WLAN-Komponente aktiv?
14. Welche Firewall-Zonen und Netzwerkinterfaces existieren?
15. Wie werden `can2lan`, `clone-ms2-loco` und `ms2-loco-list` auf dem
    konkreten Image konfiguriert?
16. Welche technische Abhängigkeit besteht zwischen
    Loklisten-Synchronisation und diesen Diensten?
17. Welche vorhandenen Netzwerk- und Recovery-Mechanismen des SRSEII
    können sicher verwendet werden?

------------------------------------------------------------------------

# 42. Nächste Untersuchung auf dem SRSEII

Folgende Befehle sind sinnvoll:

``` sh
cat /etc/config/network
```

``` sh
cat /etc/config/wireless
```

Achtung: Die Ausgabe von `/etc/config/wireless` kann WLAN-Zugangsdaten
enthalten. Passwörter vor dem Teilen entfernen oder ersetzen.

``` sh
iw dev
```

``` sh
ubus call network.wireless status
```

``` sh
ubus call network.interface dump
```

``` sh
opkg list-installed | grep -Ei 'wpad|hostapd|wpa|iwinfo'
```

``` sh
ls -la /etc/init.d
```

``` sh
ps w
```

``` sh
opkg files mswebapp
```

``` sh
opkg files railcontrol
```

``` sh
opkg files z21emu
```

Zusätzlich für die Modellbahn-Dienste:

``` sh
/etc/init.d/can2lan status
/etc/init.d/clone-ms2-loco status
/etc/init.d/ms2-loco-list status
```

Falls diese Init-Skripte existieren.

Diese Informationen werden benötigt, um die WLAN-, Dienst- und
Loklistenintegration korrekt zu implementieren.

------------------------------------------------------------------------

# 43. Projektprinzip

Bei allen Entscheidungen gilt:

> **Die bestehende Modellbahnsteuerung darf durch das Portal nicht
> beeinträchtigt werden.**

Zusätzlich gilt:

> **Das Portal soll technische Komplexität kapseln, nicht lediglich
> technisch anders darstellen.**

Und:

> **Eine Funktion soll für den Modellbahner als Aufgabe sichtbar sein;
> die dafür erforderlichen Linux-Dienste sind Implementierungsdetails.**

Neue Funktionen sollen schrittweise integriert werden:

``` text
1. Startseite
2. App-Launcher
3. Gesamtstatus
4. Netzwerkstatus
5. WLAN-Assistent
6. Modellbahn-Funktionen
7. Loklisten-Synchronisation
8. Diagnose
9. Setup-WLAN
10. Recovery
```

Jede Phase soll einzeln testbar und möglichst rückgängig zu machen sein.

------------------------------------------------------------------------

# 44. Design-Ziel

Das Portal soll sich am Ende eher so anfühlen:

``` text
┌────────────────────────────────────┐
│ SRSEII                             │
│ Ihre Modellbahn-Zentrale           │
│                                    │
│ ✓ Alles bereit                     │
│                                    │
│ Modellbahn                         │
│                                    │
│ [ Mobile Station Web App ]         │
│ [ RailControl ]                    │
│                                    │
│ Einrichtung                        │
│                                    │
│ [ Netzwerk & WLAN ]                │
│ [ Modellbahn-Funktionen ]          │
│                                    │
│ Diagnose                           │
│                                    │
│ [ Status & Diagnose ]              │
│                                    │
│ ─────────────────────────────────  │
│ LuCI – Expertenmodus               │
└────────────────────────────────────┘
```

und nicht wie:

``` text
CAN2LAN active
clone-ms2-loco active
ms2-loco-list inactive
apcli0
br-wlan
dnsmasq
UCI
```

Die technischen Informationen bleiben verfügbar -- aber sie sind **nicht
mehr die Benutzeroberfläche**.
