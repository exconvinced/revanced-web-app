# ReVanced Web App
---
#### Video Demo:  [TBD](https://youtu.be/dQw4w9WgXcQ)
#### Description:
---
A browser implementation of the popular [ReVanced](https://github.com/ReVanced)!
Patch your android apps on a familiar interface but now on powerful PC hardware.
Covers those who find the mobile app [ReVanced Manager](https://github.com/revanced/revanced-manager) occasionally slow and buggy 
or the command line [ReVanced CLI](https://github.com/revanced/revanced-cli) a bit cryptic to set up and use.

#### Specifications:
---
- Built with Flask and Javascript. 
- Runs [ReVanced-CLI](https://github.com/revanced/revanced-cli) with Java SDK 11.
- Gets latest patches from the [official repo](https://raw.githubusercontent.com/ReVanced/revanced-patches/main/patches.json).
- Uses [AAPT](https://developer.android.com/tools/aapt2) to read APK manifest data.

### Preview
---
Full layout             |  Mobile layout
:-------------------------:|:-------------------------:
![image](https://github.com/Exconvinced/revanced-web-app/assets/139973199/68cc22b6-c6e9-4c03-9fe7-d1c896676a32)  |  ![image](https://github.com/Exconvinced/revanced-web-app/assets/139973199/6a173757-c7ac-4fbc-84e4-a7d2ae391312)

### Motivation
---
In my experience, the mobile app is buggy and slow on my Android device. 
The patch process fails at times and halts in background if you open other apps. 
Although you can use the CLI to patch on PC, non-techy people find it hard to set up and use.
This project combines the accessibility of the mobile app and the efficiency of CLI.

<details>
<summary><h3>More</h3></summary>
  I needed to build something for the <a href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x">CS50</a> final project.
  This is relatively easier compared to solving the Tideman problem set!
  <br><br>
  I learned about the communication logic behind app routes in Flask and event sources in Javascript. 
  This is a good beginner project but I should have studied about proper coding paradigms for writing cleaner code.
  I completed this project in 3 days, thanks to ChatGPT for helping me troubleshoot errors.
</details>
