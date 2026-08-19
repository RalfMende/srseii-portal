from pathlib import Path

script = Path('package/files/www/srseii-portal/app.js').read_text(encoding='utf-8')
status_script = Path('package/files/www/cgi-bin/srseii-portal/status').read_text(encoding='utf-8')
required = [
    'runUseCaseSetup',
    'bindUseCaseAction',
    'dataset.ready',
    'usecase-setup',
    'loadStatus()',
]
missing = [item for item in required if item not in script]
if missing:
    raise AssertionError(f'Missing frontend setup behavior: {missing}')

if 't("z21GuideButton"), "z21interface", t("z21GuideButton")' in script:
    raise AssertionError('Z21 setup state must not use the Instructions label')
if 't("centralStationGuideButton"), "cs2interface", t("centralStationGuideButton")' in script:
    raise AssertionError('CS2 setup state must not use the Instructions label')
if '"useCases":{"z21interface":$z21interface_ready_value,"cs2interface":$cs2interface_ready_value}' not in status_script:
    raise AssertionError('Status CGI must preserve the existing Z21/CS2 status contract')

print('frontend setup contract check passed')
