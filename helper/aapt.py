import subprocess as sp
import sys, os, re


def aapt(file):
    try:
        root = os.path.dirname(__file__)
        aapt_path = os.path.join(root, 'bin', sys.platform, 'aapt_64')
        
        command = [aapt_path, 'dump', 'badging', file]
        process = sp.Popen(command, stdout=sp.PIPE, stderr=sp.STDOUT, text=True, encoding='utf-8')

        for line in process.stdout:
            if "Invalid file" in line:
                raise Exception('Invalid file')
            yield line.strip()

    except UnicodeDecodeError:
        pass
    except Exception as e:
        pass


class APK:
    def __init__(self, file):
        if not aapt(file):
            raise Exception('Invalid file')
        
        self._file = file
        self._recommended_version = None

        for line in aapt(file):
            if line.startswith('package:'):
                self._package_name = re.search(r"name='(.+?)'", line).group(1)
                self._version_name = re.search(r"versionName='(.+?)'", line).group(1)
                self._version_code = re.search(r"versionCode='(.+?)'", line).group(1)

            elif line.startswith('application-label:'):
                self._app_label = line.split(':')[1].strip("'")

            elif line.startswith('sdkVersion:'):
                self._target_sdk_version = line.split(':')[1].strip()

            elif line.startswith('application-icon-'):
                self._app_icon = line.split(':')[1].strip()
        

    @property
    def file(self):
        return self._file
    
    @property
    def package_name(self):
        return self._package_name
    
    @property
    def version_name(self):
        return self._version_name
    
    @property
    def version_code(self):
        return self._version_code
    
    @property
    def app_label(self):
        return self._app_label
    
    @property
    def target_sdk_version(self):
        return self._target_sdk_version
    
    @property
    def app_icon(self):
        return self._app_icon
    
    @property
    def recommended_version(self):
        return self._recommended_version

    def __str__(self) -> str:
        return f"{self.app_label}\n{self.package_name}\n{self.version_name}"

    @file.setter
    def file(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @package_name.setter    
    def package_name(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @version_name.setter    
    def version_name(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @version_code.setter    
    def version_code(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @app_label.setter    
    def app_label(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @target_sdk_version.setter    
    def target_sdk_version(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @app_icon.setter    
    def app_icon(self, _):
        raise AttributeError("Invalid access: cannot be modified")

    @recommended_version.setter    
    def recommended_version(self, value):
        self._recommended_version = value

    
