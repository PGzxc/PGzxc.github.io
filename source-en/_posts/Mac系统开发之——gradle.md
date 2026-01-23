---
title: Mac系统开发之——gradle
categories:
  - 系统
  - Mac
tags:
  - gradle
abbrlink: 734719af
date: 2020-02-09 11:48:35
---

## 一 系统要求
本文介绍在Mac系统下下载并配置gradle，系统及要求如下：
* Mac
* Java

<!--more-->

## 二  gradle下载

* [打开gradle下载界面][1]，选择要下载的gradle版本
![][11]
* 将下载后的gradle文件解压到`/Users/用户/.gradle'目录下
![][12]

## 三 gradle配置

* 进入当前用户目录

  `cd ~/`

* 创建.bash_profile文件(如果没有.bash_profile)

  `touch .bash_profile`

* 之前以上两步后的结果文件(使用command+shift+. 显示隐藏文件)
  ![][7]

* 打开.bash_profile文件对Java进行配置
  ```
  # gradle
   GRADLE_HOME=/Users/zxc/.gradle/wrapper/dists/gradle-5.4.1-all/3221gyojl5jsh0helicew7rwx/gradle-5.4.1
   export PATH=${PATH}:${GRADLE_HOME}/bin
  ```

* 打开终端，输入`gradle -version`查看是否生效
![][13]

## 四 参考

* [Installing Gradle][2]
* [Mac系统下Android Studio配置Gradle][3]



[1]:https://gradle.org/releases/
[2]:https://docs.gradle.org/current/userguide/installation.html
[3]:https://www.jianshu.com/p/b78d0eec430a

[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-config-bash-profile.png

[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gradle-download-net-select.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gradle-unzip-gradle-folder.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/gradle-version.png

