---
title: Cmake自学之——工具介绍(4)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学
tags:
  - Cmake
abbrlink: 32360f4f
date: 2020-01-12 21:12:27
---
## 一 概述

本节主要介绍一下内容：

* Cmake是什么
* Cmake项目中bin目录中的命令工具

<!--more-->

## 二 Cmake是什么

* CMake是一个开源、跨平台的系列工具，旨在构建、测试和打包软件
* 官网地址：[CMake](https://cmake.org/)

## 三 Cmake项目中的命令工具
### 3.1 Cmake指令的位置
![][1]

### 3.2 Cmake指令介绍

* cmake.exe：执行cmake指令相关的指令发出者
* cpack.exe：执行cpack打包输出相关指令发出者
* ctest.exe：执行ctest测试相关指令发出者
* cmake-gui.exe：cmake图形化工具集
* cmcldeps.exe：CMake 为Win平台编译器提供的依赖解析工具，构建系统正确跟踪源文件与头文件的依赖关系

## 四 工具命令简单介绍

### 4.1  Cmake工具命令介绍

* 查看cmake包含命令

  ```
  cmake --help
  ```

![][2]

* cmake命令格式介绍

  ```
  cmake [options] <path-to-source>
  cmake [options] <path-to-existing-build>
  cmake [options] -S <path-to-source> -B <path-to-build>
  
  options: 为可选项，为空时，构建的路径为当前路径
  path-to-source：源码文件路径
  path-to-existing-build和path-to-build：编译后的文件夹路径
  -S(source)：表示指明源码文路径参数，后跟源码文件路径
  -B(build)：表示编译后文件路径参数，后跟编译文件路径
  ```

* cmake [options] -S <path-to-source> -B <path-to-build>：指明源码和编译后文件路径(将源码编译到下图Debug文件夹内)
  ![][3]

* cmake [options]  -B <path-to-build>：仅指明编译后文件的路径(将源码编译到下图d文件夹内)

  ![][4]

* cmake --build . 编译项目
![][5]

* 进入到Debug目录下，运行项目，并添加运行参数
![][6]

### 4.2 cpack工具命令介绍

* 查看cpack包含命令

```
  cpack --help
```

  ![][7]

* 其他命令操作，参考cmake(后续结合实例讲解)

### 4.3 ctest工具命令介绍

* 查看ctest包含命令
![][8]

* 其他命令操作，参考cmake(后续结合实例讲解)

### 4.4 cmake-gui 图形化工具介绍

* 双击运行cmake-gui图形化工具
![][9]

* 点击菜单栏(Tools->configure或者左下方的Configure按钮打开配置选择卡)，选择Generator
  ![][10]

* 选择要编译的源文件，点击Generator按钮
![][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-bin-list.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-help.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd--s-d-sample.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-build-b.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-tools-build-project.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-tools-run-params.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpack-tools-help.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ctest-tools-help.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-tools-gui-open.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-tools-generator-choice.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-tools-gui-source-generate.png