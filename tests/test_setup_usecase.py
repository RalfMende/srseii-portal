from pathlib import Path

setup_script = Path("package/files/usr/sbin/srseii-setup-usecase").read_text(encoding="utf-8")
app_js = Path("package/files/www/srseii/app.js").read_text(encoding="utf-8")

required = [
    "service_is_running",
    "get_usecase_pkgs",
    "get_usecase_services",
    "get_usecase_requirements",
    "verify_usecase_ready",
    "Use case readiness check failed",
    "Verified ready service",
    "Verified ready package",
]
missing = [item for item in required if item not in setup_script]
if missing:
    raise AssertionError(f"Setup script missing centralized use-case registry: {missing}")
    
if "get_usecase_pkgs" not in setup_script:
    raise AssertionError("get_usecase_pkgs must be included in the setup script")

if "get_usecase_services" not in setup_script:
    raise AssertionError("get_usecase_services must be included in the setup script")

if "pkg_is_installed \"$package_name\"" not in setup_script and "if pkg_is_installed \"$package_name\"; then" not in setup_script:
    raise AssertionError("Use-case readiness must check packages explicitly before declaring readiness")

if "if pkg_is_installed \"$package_name\"; then\n\t\t\techo \"Verified ready package" in setup_script:
    pass

if "if pkg_is_installed \"$item\" || service_is_running \"$item\"" in setup_script:
    raise AssertionError("Use-case readiness must validate packages and services separately, not with a combined OR check")

if "return loadStatus().then(function ()" not in app_js:
    raise AssertionError("Frontend must await a refreshed status after a successful setup run")
if "var statusPromise = fetchStatusData()" not in app_js:
    raise AssertionError("loadStatus must return the fetch promise chain")

print("centralized use-case registry and readiness verification passed")
