include $(TOPDIR)/rules.mk

PKG_NAME:=srseii-portal
PKG_VERSION:=0.5.1
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/srseii-portal
  SECTION:=railroad
  CATEGORY:=Railroad
  TITLE:=SRSEII portal frontend
  DEPENDS:=+uhttpd
endef

define Package/srseii-portal/description
 Lightweight SRSEII launcher portal under /srseii/.
endef

define Build/Compile
endef

define Package/srseii-portal/install
	$(INSTALL_DIR) $(1)/www/srseii
	$(CP) ./files/www/srseii/* $(1)/www/srseii/
  $(INSTALL_DIR) $(1)/www/cgi-bin/srseii
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii/status $(1)/www/cgi-bin/srseii/status
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii/wifi-assistant $(1)/www/cgi-bin/srseii/wifi-assistant
  $(INSTALL_DIR) $(1)/usr/share/srseii
  $(INSTALL_DATA) ./files/usr/share/srseii/root-index.html $(1)/usr/share/srseii/root-index.html
  $(INSTALL_DIR) $(1)/usr/sbin
  $(INSTALL_BIN) ./files/usr/sbin/srseii-activate-root-portal $(1)/usr/sbin/srseii-activate-root-portal
  $(INSTALL_BIN) ./files/usr/sbin/srseii-restore-root-luci $(1)/usr/sbin/srseii-restore-root-luci
endef

$(eval $(call BuildPackage,srseii-portal))
