[![Watch the video](./.preview/banner.png)](https://youtu.be/-MK7L0JYTxU)

<p align="center">
A web implementation of the popular <a href="https://github.com/ReVanced"><b>ReVanced</b></a>! <br>
Patch your Android apps on a familiar interface with a powerful PC hardware.
<br><br>
<small>
    <i>Watch video demo <a href="https://youtu.be/-MK7L0JYTxU">here</a></i>
</small>

</p>

### ⏬ Download
**https://github.com/exconvinced/revanced-web-app/releases/latest**


### 🔧 Specifications

- Built on Flask and Javascript.
- Follows [Tailwind CSS](https://tailwindcss.com/) styling convention.
- Uses [AAPT](https://github.com/exconvinced/aapt) to read and verify APK manifest data.
- Runs [ReVanced](https://github.com/ReVanced) locally with the following components:
  - ReVanced CLI [v2.22.0](https://github.com/ReVanced/revanced-cli/releases/tag/v2.22.0)
  - ReVanced Patches [v2.187.0](https://github.com/ReVanced/revanced-patches/releases/tag/v2.187.0)
  - ReVanced Integrations [v0.117.0](https://github.com/ReVanced/revanced-integrations/releases/tag/v0.117.0)

### ✅ Prerequisites
- [Python 3](https://www.python.org/downloads/release/python-3106/)
- [OpenJDK 11](https://jdk.java.net/archive/)

### 🖥️ Usage
After installing [Python 3](https://www.python.org/downloads/release/python-3106/) and [OpenJDK 11](https://jdk.java.net/archive/), simply run `launcher.bat` for Windows or `launcher.sh` for Mac OS and Linux.

### 👀 Preview

<!-- <img width="76%" alt="ReVanced Manager application displayed on a hand-held device" src="./.preview/demo.gif"/>
<img width="21%" src="./.preview/demo-mobile.gif" /> -->

| 🖥️ Desktop | 📱 Mobile |
|:-:|:-:|
| ![image](./.preview/demo.gif) | ![image](./.preview/demo-mobile.gif) |


---
#### Disclaimer
This is not an official app. This app simply utilizes ReVanced in the backend.

#### Motivation

The mobile app is occasionally buggy and slow on some devices,
e.g. the patch process eventually freezes especially upon leaving and returning to the app. 
The CLI option is versatile but non-techy people may find it hard to set up and use.
This project combines the accessibility of the mobile app and the efficiency of CLI.

<details>
<summary><h5>Dedication to CS50</h5></summary>
  I needed to build something for the <a href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x">CS50</a> final project.
  I completed this project in 3 days, thanks to ChatGPT for helping me troubleshoot errors.
  This is relatively easier than solving the Tideman problem set!
  <br><br>
  I learned a lot about the communication logic between `app.routes` in Flask and `event.sources` in Javascript. 
  I should study proper coding paradigms for writing cleaner code for my next project.
</details>
