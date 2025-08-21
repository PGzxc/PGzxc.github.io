---
title: Cmake自学之——No CMAKE_C_COMPILER could be found(2)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学 
tags:
  - Cmake
abbrlink: 9d3b828b
date: 2020-01-02 21:07:45
---
## 一 现象

使用cmake进行编译的过程中，可能会出现如下的信息(现象如下图)

```
-- The C compiler identification is unknown
-- The CXX compiler identification is unknown
```

<!--more-->



## 二 查看编译环境
![][0]
## 三 原因分析

### 3.1 不包含编译所需的工具包

![][1]

### 3.2 包含编译需要的工具包，但不完整

![][2]

### 3.3 原因总结

* C&C++的编译器环境没有添加到path变量中

## 四 如何修改

### 4.1 通过单独下载

* [Windows SDK  去下载][3]
![][4]

* 安装windows开发工具包
![][5]

### 4.2 通过visula studio，重新修改并安装Windows SDK

* 通过工具栏——>获取工具或功能，打开安装和修改功能
* 点击单个组件菜单栏，重新安装SDK  
![][6]

* 安装完成后，重新执行"cmake .指令"，查看错误是否已经修复(如图所示，表示程序执行正常)
![][7]




[0]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmake-gui-open.png
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-c-cpp-unknow.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-error-no-compiler-found.png
[3]:https://developer.microsoft.com/zh-cn/windows/downloads/sdk-archive
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-windows-10-sdk-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-development-kit.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-visual-studio-install-sdk.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-c-cpp-done.png