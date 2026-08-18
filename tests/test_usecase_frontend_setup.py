from pathlib import Path

script = Path('package/files/www/srseii/app.js').read_text(encoding='utf-8')
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

print('frontend setup contract check passed')
