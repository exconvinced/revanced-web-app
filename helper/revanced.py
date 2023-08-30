# revanced.py
# This script gives the directories of ReVanced dependencies

from os.path import join
from os import makedirs

makedirs(join("bin", "revanced"), exist_ok=True)
makedirs(join("bin", 'apk'), exist_ok=True)

REVANCED_DIR = join("bin", "revanced")
APK_DIR = join("bin", 'apk')


class Revanced:
    def __init__(self):
        self.cli          = join(REVANCED_DIR, f'revanced-cli.jar')
        self.patches      = join(REVANCED_DIR, f'revanced-patches.jar')
        self.patches_json = join(REVANCED_DIR, f'revanced-patches.json')
        self.integrations = join(REVANCED_DIR, f'revanced-integrations.apk')
        self.options      = join(REVANCED_DIR, 'revanced-options.json')

        self.unpatched = join(APK_DIR, 'unpatched.apk')
        self.patched   = join(APK_DIR, 'patched.apk')