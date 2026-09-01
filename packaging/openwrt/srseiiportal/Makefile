# Copyright (C) 2025 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.

include $(TOPDIR)/rules.mk

PKG_NAME:=srseiiportal
PKG_VERSION:=0.9.2
PKG_RELEASE:=1

SRSEII_ROOT:=/work/srseiiportal

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=SRSEII portal frontend
endef

define Package/$(PKG_NAME)/description
  Launcher Web Portal for Smallest Railroad Server Ever (SRSEII)
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/www
	$(CP) $(SRSEII_ROOT)/src/www/. $(1)/www/

	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(SRSEII_ROOT)/src/usr/sbin/* $(1)/usr/sbin/
endef

define Package/$(PKG_NAME)/postinst
	#!/bin/sh
	[ -n "$${IPKG_INSTROOT}" ] || {
	    /usr/sbin/srseii-activate-root-portal
	}
	exit 0
endef

$(eval $(call BuildPackage,$(PKG_NAME)))