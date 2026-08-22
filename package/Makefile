include $(TOPDIR)/rules.mk

PKG_NAME:=srseii-portal
PKG_VERSION:=0.9.1
PKG_RELEASE:=2

include $(INCLUDE_DIR)/package.mk

define Package/srseii-portal
  SECTION:=railroad
  CATEGORY:=Railroad
  TITLE:=SRSEII portal frontend
  DEPENDS:=+uhttpd
endef

define Package/srseii-portal/description
 Lightweight SRSEII launcher portal.
endef

define Build/Compile
endef

define Package/srseii-portal/install
  $(INSTALL_DIR) $(1)/www/srseii-portal
  $(CP) ./files/www/srseii-portal/* $(1)/www/srseii-portal/
  $(INSTALL_DIR) $(1)/www/cgi-bin/srseii-portal
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/status $(1)/www/cgi-bin/srseii-portal/status
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/loco-list $(1)/www/cgi-bin/srseii-portal/loco-list
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/update $(1)/www/cgi-bin/srseii-portal/update
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/wifi-assistant $(1)/www/cgi-bin/srseii-portal/wifi-assistant
  $(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/usecase-setup $(1)/www/cgi-bin/srseii-portal/usecase-setup
  $(INSTALL_DIR) $(1)/www/mswebapp
  $(CP) ./files/www/mswebapp/* $(1)/www/mswebapp/
  $(INSTALL_DIR) $(1)/www/railcontrol
  $(CP) ./files/www/railcontrol/* $(1)/www/railcontrol/
  $(INSTALL_DIR) $(1)/usr/sbin
  $(INSTALL_BIN) ./files/usr/sbin/srseii-activate-root-portal $(1)/usr/sbin/srseii-activate-root-portal
  $(INSTALL_BIN) ./files/usr/sbin/srseii-restore-root-luci $(1)/usr/sbin/srseii-restore-root-luci
  $(INSTALL_BIN) ./files/usr/sbin/srseii-setup-usecase $(1)/usr/sbin/srseii-setup-usecase
endef

$(eval $(call BuildPackage,srseii-portal))
