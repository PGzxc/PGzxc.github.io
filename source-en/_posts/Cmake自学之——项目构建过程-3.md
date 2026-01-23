---
title: Cmake自学之——项目构建过程(3)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学 
tags:
  - Cmake
abbrlink: d807aa20
date: 2020-01-12 21:10:09
---
## 一 概述

```
本节主要介绍使用Cmake创建一个简单的项目，并编译运行查看结果输出。
结合项目实例介绍，项目中使用到的语法等知识点  
```

<!--more-->

## 二 运行环境

* 系统：windows 7 64位
* cmake version： 3.16.2
* gcc --version：4.9.2

## 三 Cmake项目构建

### 3.1 使用cmd终端构建项目

* 在文件夹中新建两个文件:main.cpp(运行文件)，CMakeList.txt(脚本文件)

![][1]

* main.cpp(运行文件)

  ```
  #include<iostream>
  using namespace std;
  int main()
  {
  	cout<<"hello world"<<endl;
  }
  ```

* CMakeList.txt(脚本文件，其中项目文件夹名称为CmakeDemo)

  ```
  cmake_minimum_required(VERSION 3.10)
  project(CmakeDemo)
  add_executable(CmakeDemo main.cpp)
  ```

* 创建项目编译过程中代码存储的文件夹，并进入到文件夹内部

  ```
   mkdir cmake-build-debug
   cd cmake-build-debug\
  ```

  ![][2]

* 执行`cmake ..`表示构建上一级目录下 CMakeLists.txt 的配置，并在当前目录下生成 Makefile 等文件

  ```
  cmake .表示构建当前目录下 CMakeLists.txt 的配置
  cmake ..表示构建上一级目录下 CMakeLists.txt 的配置，并在当前目录下生成 Makefile 等文件
  ```

  ![][3]

* 执行`cmake --build .`将上步生成的Makefile等文件生成CmakeDemo可执行文件

  ```
  cmake --build .
  ```

  ![][4]

* 运行生成的CmakeDemo.exe，查看输出结果(hello wold)

  ```
  .\Debug\CmakeDemo.exe
  ```

  ![][5]

### 3.2 使用IDE工具(Clion)构建项目

* 打开Clion，依次点击：File—>New Project—>C++ Executable，创建Cpp项目
![][6]

* 创建完成后，项目会自动进行项目关联和编译，生成Makefile和exe可执行文件

  ![][7]

* 点击右上角的运行按钮，运行项目，查看项目输出结果

  ![][8]

## 四 CMakeLists.txt 脚本介绍

* cmake_minimum_required(VERSION 3.10)：指定运行此配置文件所需的 CMake 的最低版本
* project(CmakeDemo):表示项目的名称是CmakeDemo
* add_executable(CmakeDemo main.cpp): 将名为main.cpp的源文件编译成一个名称为 CmakeDemo 的可执行文件




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-create-two-file.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-mkdir-build-folder.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-pre-build.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-build-file.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-cmd-debug-run-effect.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-clion-create-project.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-clion-auto-build.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-clion-run-result.png
