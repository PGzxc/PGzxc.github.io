---
title: CPP学习之——Windows下Codeblocks安装与配置
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - CodeBlocks
abbrlink: 2a1d12
date: 2019-10-17 23:29:57
---
## 一 原料
* Windows7
* Code::Blocks
* C/C++编译器(MingGW)

<!--more-->

## 二 下载，安装与配置

### 2.1 MingGw(选)

#### 2.1.1 [MinGW下载][1]
* 打开下载界面，选择安装管理器
![][2]

* 第一个选择后，进入后进行下载
![][3]

#### 2.1.2 MingGW安装
* 双击运行软件  	
![][4]
* 选择软件的安装位置 
![][5]
* 加载管理器，完成后点击继续   
![][6]
* 选择要安装的package(mingw32-gcc-ada-bin，mingw32-gcc-g++-bin)
![][7]
* 点击Installation——>Apply Changes，进行安装
![][8]

#### 2.1.3 MinG2配置
* 配置MinGW环境变量 
![][9]
* 将%MinGW%/bin添加到path中
![][10]
* cmd中输入"gcc --version" 
![][11]

### 2.2 Code::Blocks

#### 2.2.1 [Code::Blocks下载][12]
* 打开下载列表界面，选择要下载的应用(本文选择带c++编译器的)
	
	-  codeblocks-xx.xx-setup.exe:不带编译器的纯Code::Blocks集成环境(机器中事先已安装MinGW)
	-  codeblocks-xx.xxmingw-setup.exe：带MinGW编译器的Code::Blocks集成环境，可以直接编译C++
	-  codeblocks-xx.xx-setup-nonadmin.exe：为了方便那些在自己的机器上没有管理员权限的用户而提供的
	-  codeblocks-xx-mingw_fortran-setup.exe:GFortran编译器(TDM-GCC)


![][13]

* 根据个人需要，下载对应的安装应用(本文选择codeblocks-17.12mingw-setup.exe)
![][14]

#### 2.2.2 Code::Blocks安装
* 运行软件，选择安装组件(Full:All plugins,all tools,just everythings)
![][15]

* 选择软件的安装位置，进行安装(安装目录内包含MinGW)
![][16]

#### 2.2.3 Code::Blocks配置
* Code::Blocks实现已集成了MinGW,进入MinGW，打开CMD输入"gcc --version"查看gcc 版本
![][17]

* 点击Settings->Global compiler settings->Toolchain executables

	- 选择MinGW的目录
	- 选择c,c++等相关编译工具

![][18]

## 三 基本应用(创建C,C++应用)

* 点击codeblocks中的菜单中的 File -> new -> project，打开创建窗口 
![][19]

* 在打开的窗口中，选择Console application 应用
![][20]

* 选择项目的语言(本文以c++为例)
![][21]

* 设置项目的名称和工作目录
![][22]
* 选择软件的编译器
![][23]
* 项目创建完成后，项目结构
![][24]
* 点击上方的几个按钮进行编译，运行，编译并运行或重新编译
![][25]


## 四 参考
[不带编译器的CodeBlocks在Windows环境下的配置][26]




[1]: https://osdn.net/projects/mingw/releases/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-download-list.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-download.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-install-accept.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-install-position.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-install-position.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-install-choice.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-install-apply-change.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-config-mingw.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-path-add.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-mingw-version.png
[12]:http://www.codeblocks.org/downloads/26
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-download-list.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-download.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblcoks-install-component.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-mingw.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-mingw-version.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-directory-tools.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-new-project.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-console-application.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-c-cpp-select.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-file-create.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-compiler.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-create-finish.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-codeblocks-build-run.png
[26]:https://jingyan.baidu.com/article/915fc414e8838051394b209b.html