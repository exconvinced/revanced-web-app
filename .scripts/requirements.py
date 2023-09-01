# This script downloads the required files for the project

from os.path import dirname, abspath, join, isdir
from os import makedirs, rename
import shutil
import subprocess as sp
import requests
import json


ROOT_DIR = dirname(dirname(abspath(__file__)))
REQUIREMENTS = join(ROOT_DIR, '.scripts', 'requirements.json')
REVANCED_DIR = join(ROOT_DIR, 'bin', 'revanced')
AAPT_DIR = join(ROOT_DIR, 'helper')
makedirs(REVANCED_DIR, exist_ok=True)


def download_file(url, path):
    """
    Download a file from a URL to a path
    """
    r = requests.get(url, stream=True)
    with open(path, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)


def get_revanced():
    """
    Initiate the download of ReVanced files
    """
    with open(REQUIREMENTS, 'r') as f:
        requirements = json.load(f)

    for package in requirements:
        name, version, extensions = package['name'], package['version'], package["extensions"]
        if version != 'latest':
            version = f"tags/v{version}"
        api = f"https://api.github.com/repos/ReVanced/{name}/releases/{version}"

        r = requests.get(api)
        if r.status_code == 200:
            for asset in r.json()['assets']:
                for ext in extensions:
                    if asset['name'].endswith(ext):
                        file = f"{name}.{ext}"
                        url = asset['browser_download_url']
                        path = join(REVANCED_DIR, file)
                        download_file(url, path)
                        print(f"Downloaded {file} to {REVANCED_DIR}")


def get_aapt():
    """
    Initiate the download of aapt
    """
    url = "https://github.com/exconvinced/aapt.git"
    aapt = join(AAPT_DIR, 'aapt')
    sp.run(['git', 'clone', url, aapt])


def copy_launchers():
    """
    Copy the launchers to the root directory
    """
    for file in ['launcher.bat', 'launcher.sh']:
        shutil.copy(join(ROOT_DIR, '.scripts', 'launchers', file), ROOT_DIR)


def main():
    get_revanced()
    get_aapt()
    copy_launchers()


if __name__ == '__main__':
    main()

