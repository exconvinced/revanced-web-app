# revanced-web-app

An implementation of [ReVanced](https://github.com/revanced/revanced-cli) on the web!
Built with Flask and spaghetti code. Never gonna untangle them again!
Runs [`revanced-cli`](https://github.com/revanced/revanced-cli) with Java SDK 11. Just upload your unpatched apk.
Latest patches are fetched from the [official repo](https://raw.githubusercontent.com/ReVanced/revanced-patches/main/patches.json).

Full layout             |  Mobile layout
:-------------------------:|:-------------------------:
![image](https://github.com/Exconvinced/revanced-web-app/assets/139973199/68cc22b6-c6e9-4c03-9fe7-d1c896676a32)  |  ![image](https://github.com/Exconvinced/revanced-web-app/assets/139973199/6a173757-c7ac-4fbc-84e4-a7d2ae391312)

### Why make this?

In my experience, ReVanced Manager on Android is buggy and slow on my mobile device. 
The patch process fails at times and halts in background if you open other apps. 
Although you can patch on a PC using ReVanced CLI, non-techy people find it hard to set up and use.
This project combines the accessibility of the mobile app and the efficiency of CLI.

<details>
<summary>Motivation</summary>
  Well, I just needed to build anything for the <a href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x">CS50</a> final project.
  This is relatively easier compared to solving the Tideman problem set!
</details>
