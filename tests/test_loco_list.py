import json
from pathlib import Path

endpoint = Path("package/files/www/cgi-bin/srseii-portal/loco-list")
html = Path("package/files/www/srseii-portal/index.html").read_text(encoding="utf-8")
app_js = Path("package/files/www/srseii-portal/app.js").read_text(encoding="utf-8")
makefile = Path("package/Makefile").read_text(encoding="utf-8")

assert endpoint.exists()
assert endpoint.stat().st_mode & 0o111, "loco-list CGI must be executable"
endpoint_text = endpoint.read_text(encoding="utf-8")
for required in [
    'REQUEST_METHOD:-GET',
    '"status":"ready"',
    '"status":"empty"',
    '"status":"error"',
    '/www/config/lokomotive.cs2',
    'lokomotive.cs2',
    '.(adresse|adr|addr|address)',
    '.name',
    '.(name|typ)',
    'sort -n',
]:
    assert required in endpoint_text, f"Missing locomotive-list behavior: {required}"

assert '$(INSTALL_BIN) ./files/www/cgi-bin/srseii-portal/loco-list' in makefile
for required in [
    'id="loco-list-status"',
    'id="loco-list-details"',
    'data-i18n="locoListReady"',
    'data-i18n="locoListIntro"',
    'id="loco-list-empty"',
    'id="loco-list-table-wrap"',
    'id="loco-list-rows"',
    'data-i18n="locoListAddress"',
    'data-i18n="locoListProtocol"',
    'data-i18n="locoListName"',
]:
    assert required in html, f"Missing locomotive-list UI: {required}"

for required in [
    'fetchLocoListData',
    'renderLocoList',
    'locoListEmpty',
    'locoListError',
    'protocolCell',
]:
    assert required in app_js, f"Missing locomotive-list frontend behavior: {required}"

assert 'loco-list" type="button' not in html
assert '<caption id="loco-list-count"' not in html
assert 'locoListProtocol' in app_js
print("0.9.1 locomotive-list contract passed")
