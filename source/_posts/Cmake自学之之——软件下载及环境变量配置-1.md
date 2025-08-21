---
title: Cmake自学之——软件下载及环境变量配置(1)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学  
tags:
  - Cmake
abbrlink: a4ab86aa
date: 2019-12-31 21:44:29
---
## 一 概述

```
CMake是一个跨平台的安装工具，可以用简单的语句来描述所有平台的安装(编译过程)。
本节是Cmake的第一篇文章，主要介绍软件的下载及环境变量的配置   
```

<!--more-->

## 二 软件介绍、下载、安装
### 2.1 软件介绍
* GNU tools(Tool chains):编译工具链
* Cmake：跨平台的安装（编译）工具
* Clion：开发C/C++的跨平台IDE

### 2.2 软件下载(本文只提供下载链接，不提供破解)
* [Gnu Tools(Tool chains)](https://sourceforge.net/projects/cbadvanced/)
* [Softonic—Dev-C++](https://bloodshed-dev-c.en.softonic.com/)(包含Gnu Tools)
* [Github—Dev-C++](https://github.com/Embarcadero/Dev-Cpp)(包含Gnu Tools)
* [Cmake](https://cmake.org/)
* [Clion](http://www.jetbrains.com/clion/)

### 2.3 软件安装介绍(仅以Cmake为例)
* 点击上面的Cmake官网，按如图箭头所示的链接，打开下载界面
![][1]
* 根据你当前的电脑配置，选择相应的软件(本位以windows7 64位电脑为例)
![][2]
* 将下载cmake文件解压到指定的路径内
![][3]


## 三 环境变量配置

### 3.1 GNU tools(Tool chains)环境变量配置

```
 变量：MinGW D:\SoftWare\Dev-Cpp\MinGW64
 Path:%MinGW%\bin;
```

### 3.2 Cmake环境变量配置

```
变量：Cmake_HOME  D:\SoftWare\cmake
Path:%Cmake_HOME%\bin;
```

### 3.3 Clion配置

打开Clion->Settings->Build,Execution..->Toolchains，配置MinGW

![][4]

## 四 验证环境配置

```
查看GNU tools(Tool chains)：gcc --version
查看cmake配置：cmake --version
```

![][5]

## 五 参考

* [Dev-C++官网](https://www.bloodshed.net/)
* [Github—Dev-CPP](https://github.com/Embarcadero/Dev-Cpp)
* [Softonic—Dev-C++](https://bloodshed-dev-c.en.softonic.com/)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-install-download-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-windows-x64-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-upzip-destion-folder.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-clion-toolschains-setting.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-environment-config.png