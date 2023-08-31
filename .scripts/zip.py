import zipfile, os, sys

FILES = ["bin/revanced/", "helper/", "static/", "templates/", "venv/", "app.py", "launcher.bat", "launcher.sh", "README.md"]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIP_FILENAME = sys.argv[1]
IGNORE = [".git", "__pycache__", ".gitignore"]


def is_ignored(path):
    """
    Checks if the path is in the ignore list
    """
    for i in IGNORE:
        if i in path:
            return True
    return False


def collect_all_files():
    for file in FILES:
        path = os.path.join(ROOT, file)

        if os.path.isfile(path):
            yield path

        elif os.path.isdir(path):
            for root, dirs, files in os.walk(path):
                for file in files:
                    abs_path = os.path.join(root, file)
                    if not is_ignored(abs_path):
                        yield abs_path


def main():
    with zipfile.ZipFile(ZIP_FILENAME, "w") as zipf:
        for file in collect_all_files():
            print(file)
            zipf.write(file, arcname=file[len(ROOT) + 1 :])


if __name__ == "__main__":
    main()
