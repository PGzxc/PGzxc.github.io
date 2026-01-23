---
title: OC开发之——第二个OC程序(3)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 70dab44b
date: 2020-03-22 22:40:37
---
## 一 概述

* 本文主要讲述多个OC程序混合开发时的处理
* 示例1：OC程序+C语言程序 混合开发
* 示例2：OC程序+OC程序 混合开发

<!--more-->

## 二 示例

### 2.1 OC程序+C语言程序 混合开发

* 文件间关系：one.m，two.c，two.h

  ```
  1. one.m是入口文件
  2. two.c是被调用函数文件
  3. two.h是two.c的头文件
  ```

* 文件代码

  ```
  //two.c
  #import <stdio.h>
  
  void test()
  {
      printf("调用了test函数\n");
  }
  // two.h
  void test();
  
  //one.m
  #import "two.h"
  int main()
  {
      test();
      return 0;
  }
  ```

* 编译文件(生成one.o two.o文件)

  ```
  cc -c one.m two.c
  ```

* 链接文件(生成a.out文件)

  ```
  cc one.o two.o
  ```

* 运行文件(调用方法，控制台输出结果)

  ```
  ./a.out
  ```

### 2.2 OC程序+OC程序 混合开发

* 文件间关系(one.m，two.m，two.h)

  ```
  1. one.m是入口文件
  2. two.m是被调用函数文件
  3. two.h是two.m的头文件
  ```
* 文件代码

  ```
  //two.m
  #import <Foundation/Foundation.h>
  
  void test()
  {
      NSLog(@"调用了test函数");
  }
  
  // two.h
  void test();
  
  //one.m
  #import "two.h"
  int main()
  {
      test();
      return 0;
  }
  ```

* 编译文件(生成one.o two.o文件)

  ```
  cc -c one.m two.m
  ```

* 链接文件(生成a.out文件)

  ```
  cc one.o two.o -framework Foundation
  ```

* 运行文件(调用方法，控制台输出结果)

  ```
  ./a.out
  ```


## 三 总结

* 混合编译时，涉及到多个文件进行编译和链接的情况
* 如果引用中，没有使用到Foundation框架的话，就不需要用-framework Foundation