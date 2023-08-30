# revanced.py
# This script gives the directories of ReVanced dependencies

from os.path import join, exists, makedirs
from os import getenv

makedirs(join("bin", "revanced"))
makedirs(join("bin", 'apk'))

REVANCED_DIR = join("bin", "revanced")
APK_DIR = join("bin", 'apk')

CLI_VER = "2.22.0"
PATCHES_VER = "2.187.0"
INTEGRATIONS_VER = "0.117.0"

# give github api url equivalent of this
# https://github.com/ReVanced/revanced-cli/releases/download/v3.0.1/revanced-cli-3.0.1-all.jar
# https://api.github.com/repos/ReVanced/revanced-cli/releases/tags/v2.22.0

class Revanced:
    def __init__(self):
        self.cli          = join(REVANCED_DIR, f'revanced-cli-{CLI_VER}.jar')
        self.patches      = join(REVANCED_DIR, f'revanced-patches-{PATCHES_VER}.jar')
        self.patches_json = join(REVANCED_DIR, f'revanced-patches-{PATCHES_VER}.json')
        self.integrations = join(REVANCED_DIR, f'revanced-integrations-{INTEGRATIONS_VER}.apk')
        self.options      = join(REVANCED_DIR, 'revanced-options.json')

        self.unpatched = join(APK_DIR, 'unpatched.apk')
        self.patched   = join(APK_DIR, 'patched.apk')