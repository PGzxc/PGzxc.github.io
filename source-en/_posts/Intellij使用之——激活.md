---
title: Intellij使用之——激活
categories:
  - 工具
  - IntelliJ
tags:
  - Intellij破解
abbrlink: bafcfc5a
date: 2019-12-24 22:12:38
---
## 一 使用说明

本文参考互联网上的解决方法，给出的Intellij激活方案，仅供参考，本项目只做个人学习研究之用，不得用于商业用途！若资金允许，请点击[链接](https://www.jetbrains.com/idea/buy/)购买正版，谢谢合作！

Intellij激活补丁：  

* jetbrains-agent.jar
* JetbrainsCrack-xx-release-enc.jar

<!--more-->

## 二 jetbrains-agent.jar激活

下载压缩包解压后得到jetbrains-agent.jar，把它放到你认为合适的文件夹内。
1. 启动你的IDE，如果上来就需要注册，选择：试用（Evaluate for free）进入IDE
2. 点击你要注册的IDE菜单："Configure" 或 "Help" -> "Edit Custom VM Options ..."
3. 在打开的vmoptions编辑窗口末行添加："-javaagent:/absolute/path/to/jetbrains-agent.jar" 

![][1]

## 三 JetbrainsCrack-xx-release-enc.jar激活

1. 把下载的jar包放在idea的安装目录下（bin）
2. 修改idea安装目录下文件，可以以记事本方式打开

	```
	goland64.exe.vmoptions
	goland.exe.vmoptions
	```

3. 添加 -javaagent:jar包路径

   ```
   -javaagent:D:\SoftWare\GoLand 2019.3\bin\JetbrainsCrack-4.2-release-enc.jar
   ```
4. 重启idea即可

## 四 参考
* [Custom license][2]
* [Jetbrains系列产品2019.3.1最新激活方法][3]
* [JetbrainsCrack-4.2-release-enc.jar 激活补丁包 最新版(附激活方法+注册码)][4]
* [Jetbrains2019全系列激活补丁ZhilePatch jetbrains-agent.jar v2.0.1 绿色版][5]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jetbrains-agent-active.png
[2]:https://zhile.io/custom-license.html
[3]:https://zhile.io/2018/08/25/jetbrains-license-server-crack.html
[4]:https://www.jb51.net/softs/669519.html
[5]:https://www.jb51.net/softs/672190.html

