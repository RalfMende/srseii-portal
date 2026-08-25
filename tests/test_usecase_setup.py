from pathlib import Path

script = Path('src/usr/sbin/srseii-setup-usecase')
if not script.exists():
    raise AssertionError('Missing use-case setup script: src/usr/sbin/srseii-setup-usecase')

text = script.read_text(encoding='utf-8')
required = [
    'mswebapp',
    'railcontrol',
    'z21interface',
    'cs2interface',
    'opkg status',
    'opkg install',
    '/etc/init.d/',
    'enable',
    'start',
    'json_escape',
]
missing = [item for item in required if item not in text]
if missing:
    raise AssertionError(f'Missing setup logic for: {missing}')

print('usecase setup script contract check passed')
