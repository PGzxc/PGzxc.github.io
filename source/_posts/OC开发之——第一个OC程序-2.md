---
title: OC开发之——第一个OC程序(2)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: ab94098d
date: 2020-03-22 22:39:23
---
## 一 概述

* C语言程序的代码文件以“.c”结尾，OC程序是以.m为结尾
* OC完全兼容C语言，故本文的程序示例，包含C程序和OC程序
* 简单介绍在OC程序开发中遇到的问题
* 几个重要的概念

<!--more-->

## 二 第一个OC程序(C语言)
### 2.1 程序创建
* 进入到OC程序文件夹中

  ```
  cd /Users/zxc/Code/OC
  ```

* 创建第一个OC文件

  ```
  touch 01-Hello-C.m
  ```

* 打开OC文件，进行编辑(默认打开xcode，请事先已安装)

  ```
  open 01-Hello-C.m
  ```

### 2.2 代码编写
```
#include <stdio.h>

int main()
{
    printf("Hello_C\n");
    return 0;
}
```


### 2.3 终端指令编译

* 编译程序(cc -c 要编译到程序名)，生成“程序名.o”文件

  ```
  cc -c 01-Hello-C.m
  ```

* 链接程序(cc 程序名.o)，生成“a.out”文件(可执行文件)

  ```
  cc 01-Hello-C.o
  ```

### 2.4 运行程序

* 运行程序(./a.out)，屏幕打印输出结果

  ```
  Hello_C
  ```

## 三 第二个OC程序(Object-C语言)

### 3.1 程序创建(延续程序一到编译环境)

* 创建OC文件(object-c语言)

  ```
  touch 01-Hello-OC.m
  ```

* 打开OC文件，进行编辑(默认打开xcode，请事先已安装)

  ```
  open 01-Hello-OC.m 
  ```

### 3.2 代码编写

```
#import <Foundation/Foundation.h>

int main()
{
    NSLog(@"Hello OC");
    return 0;
}
```

### 3.3 终端指令编译

* 编译程序(cc -c 要编译的文件名.m)

  ```
  cc 01-Hello-OC.m
  ```

* 链接(cc 要编译的文件名.0 -framework Foundation)

  ```
  cc 01-Hello-OC.o -framework Foundation
  ```

### 3.4 运行程序

* 运行程序(./a.out)，屏幕打印输出结果

  ```
  2020-03-17 22:25:26.025 a.out[4315:79925] Hello OC
  ```

## 四 程序编译中，可能出现的问题

### 4.1 程序编译中出现的

#### 4.1.1 现象 

```
01-Hello-OC.m:6:5: warning: implicitly declaring library function 'NSLog' with
      type 'void (id, ...)' [-Wimplicit-function-declaration]
    NSLog(@"Hello OC");
    ^
01-Hello-OC.m:6:5: note: include the header <Foundation/NSObjCRuntime.h> or
      explicitly provide a declaration for 'NSLog'
1 warning generated.
Undefined symbols for architecture x86_64:
  "_NSLog", referenced from:
      _main in 01-Hello-OC-0ad647.o
  "___CFConstantStringClassReference", referenced from:
      CFString in 01-Hello-OC-0ad647.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

#### 4.1.2 原因  

* NSLog缺少头文件

#### 4.1.3 解决办法(导入头文件)：  

* \#import <Foundation/Foundation.h>

### 4.2 链接过程中出现

#### 4.2.1 现象

```
Undefined symbols for architecture x86_64:
  "_NSLog", referenced from:
      _main in 01-Hello-OC.o
  "___CFConstantStringClassReference", referenced from:
      CFString in 01-Hello-OC.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)

```

#### 4.2.2 原因

* 链接时，未指定链接库

#### 4.2.3 解决办法(指定链接库)

* cc 01-Hello-OC.o <font color=red>-framework Foundation</font>

## 五 几个概念

### 5.1 NSLog与print的区别

* NSLog接收OC字符串作为参数，printf接收C语言字符串作为参数
* NSLog输出后会自动换行，printf输出后不会自动换行
* 使用NSLog需要#import<Foundation/Foundation.h>
* 使用printf需要#include<stdio.h>

### 5.2 #import的作用

* 跟#include一样，用来拷贝某个文件的内容

* 可以自动防止文件内容被拷贝多次，也就是为头文件中不用加入下面的预处理指令了

  ```
  #ifdef _STDIO_H
  #define _STDIO_H
  #endif
  ```

### 5.3 Foundation框架的作用

* 开发OC，iOS，Mac程序必备的框架
* 此框架中包含了很多常用的API(应用程序接口)
* 框架中包含了很多头文件，若想使用整个框架的内容，包含它的主头文件即可#import <Foundation/Foundation.h>
* Foundation的路径：/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk/System/Library/Frameworks/Foundation.framework/Headers/Foundation.h
