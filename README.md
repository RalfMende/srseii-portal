# SRSEII Portal

Das SRSEII Portal ist die einfache, zentrale Bedienoberflaeche fuer die Gleisbox.
Es soll typische Aufgaben fuer normale Nutzer schnell erreichbar machen und trotzdem den Expertenzugang zu LuCI erhalten.

## Zielbild

- Portal als zentrale Startoberflaeche unter `http://gleisbox/`
- Klarer Zugang zu Modellbahn-Webanwendungen
- Verstaendliche System- und Netzwerkansicht
- Schrittweise Erweiterung um WLAN-Setup, Diagnose und Recovery
- LuCI bleibt dauerhaft als Expertenmodus verfuegbar

## Grundprinzip

Das Portal ergaenzt die bestehende OpenWrt-Umgebung und darf die laufende Modellbahnsteuerung nicht beeintraechtigen.
Neue Funktionen werden in kleinen, testbaren Schritten integriert.

## Kernbereiche der Oberflaeche

- App-Launcher fuer Webanwendungen
- Status- und Diagnosebereich
- Netzwerk- und WLAN-Bedienung
- Link zu LuCI als erweiterter Expertenbereich

## Technische Leitlinien

- Laufzeit auf OpenWrt mit `uhttpd`
- Leichtgewichtiges statisches Frontend (HTML, CSS, Vanilla JavaScript)
- Kleine, klar abgegrenzte Backend-Endpunkte fuer Status und Systemaktionen
- Keine grossen Frameworks oder zusaetzliche schwere Laufzeitumgebungen

## URL-Konzept

- Portal: `/srseii/` (Entwicklung und sichere Einfuehrung)
- Mobile Station Web App: `/mswebapp/`
- RailControl: `http://<host>:8082/`
- LuCI (Expertenmodus): `/cgi-bin/luci/`

Die Umstellung der Root-URL auf das Portal wird bewusst separat und kontrolliert durchgefuehrt.

## Repository-Struktur

- `src/usr/sbin/` Shell-Skripte und Backend-Helfer zur Entwicklung
- `src/www/` CGI-Endpunkte und Frontend-Dateien zur Entwicklung
- `packaging/openwrt/Makefile` OpenWrt-Paketdefinition fuer den Feed
- `packaging/openwrt/files/` nur Symlinks auf `src/usr` und `src/www` (keine Dateikopien)

Die Paketierung greift direkt auf `src/` zu. So bleibt die Quelle eindeutig und es gibt keine duplizierten Dateien zwischen Entwicklungs- und Feed-Struktur.
