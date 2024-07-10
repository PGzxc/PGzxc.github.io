---
title: Mac系统开发之——Java
categories:
  - 系统
  - Mac
tags:
  - Java
abbrlink: 37dc2a10
date: 2020-02-09 11:34:47
---
## 一 概述
本文主要讲述在Mac系统下进行开发时，Java相关的操作：  
- 查看Java版本
- Java卸载
- Java安装
- Java配置

<!--more-->

## 二 Java 卸载

### 2.1 查看已安装的Java版本

![][1]
### 2.2 卸载已安装的Java版本

1. 单击位于停靠栏中的 **Finder** 图标
2. 在 Finder 菜单中单击**前往**
3. 单击**实用工具**
4. 双击**终端**图标
5. 在“终端”窗口中，**复制并粘贴**以下命令：
  
   `sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin` 
   `sudo rm -fr /Library/PreferencePanes/JavaControlPanel.prefPane`  
   `ls /Library/Java/JavaVirtualMachines/`
   `sudo rm -rf /Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk`
![][2]

## 三 Java 下载，安装及配置
### 3.1 下载及安装
* [官网下载jdk][3]
![][4]
* 双进已下载的sdk进行安装
![][5]
* 安装成功后如图所示 
![][6]
### 3.2 配置
* 进入当前用户目录

  `cd ~/`

* 创建.bash_profile文件(如果没有.bash_profile)

  `touch .bash_profile`

* 之前以上两步后的结果文件(使用command+shift+. 显示隐藏文件)
  ![][7]

* 打开.bash_profile文件对Java进行配置
  ```
  # java
    JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home
    export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
    export PATH=$JAVA_HOME/bin:$PATH
  ```

* 打开终端，输入`java -version`查看是否生效
![][8]
## 四 Java更新
* 单击位于 System Preferences（系统首选项）下的 Java 图标来启动 Java Control Panel（Java 控制面板）
![][9]
* 转到 Java 控制面板中的 Updaete（更新）选项卡并单击 Update Now（立即更新）按钮将打开安装程序窗口。
![][10]

## 五 参考
* [如何在 Mac 上卸载 Java？][11]
* [Mac环境下Java卸载][12]
* [如何为 Mac 更新 Java？][13]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-version-look-uninstall.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-uninstall-progress.png
[3]:https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-net-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-install-start.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-install-success.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-config-bash-profile.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-version.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-update-pianhao.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java_update-setting.png
[11]:https://www.java.com/zh_CN/download/help/mac_uninstall_java.xml
[12]:https://blog.csdn.net/qq_43212747/article/details/88140407
[13]:https://www.java.com/zh_CN/download/help/mac_java_update.xml
