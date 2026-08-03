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

- `package/Makefile` OpenWrt-Paketdefinition
- `package/files/www/srseii/` Portal-Frontend
- `package/files/usr/share/srseii/root-index.html` vorbereitete Root-Startseite (optional)
- `package/files/usr/sbin/srseii-activate-root-portal` kontrollierte Aktivierung der Root-Startseite
- `package/files/usr/sbin/srseii-restore-root-luci` Wiederherstellung der vorherigen Root-Seite
