# OpenWrt Packaging

Dieser Ordner enthaelt die Feed-Integration fuer das SRSEII Portal.

## Inhalt

- `Makefile`: OpenWrt-Paketdefinition fuer `srseii-portal`
- `files/usr` und `files/www`: Symlinks auf die Entwicklungsquellen in `src/usr` und `src/www`

## Prinzip: keine Dateikopien

Die eigentlichen Quellen liegen ausschliesslich unter `src/`.
Die Paketierung referenziert diese Quellen direkt ueber `$(CURDIR)/../../src/...`.
Damit bleibt die Codebasis an einer einzigen Stelle wartbar.

## Erwartete Struktur

- `src/usr/sbin/...`
- `src/www/...`
- `packaging/openwrt/Makefile`
- `packaging/openwrt/files/usr -> ../../../src/usr`
- `packaging/openwrt/files/www -> ../../../src/www`

## Nutzung im Feed

Dieses Verzeichnis kann als Paketordner in einem OpenWrt-Feed verwendet werden.
Es werden keine Dateien unter `packaging/openwrt/files` dupliziert.
