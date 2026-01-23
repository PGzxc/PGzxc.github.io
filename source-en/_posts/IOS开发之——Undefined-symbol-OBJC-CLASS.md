---
title: 'IOS开发之——Undefined symbol:_OBJC_CLASS'
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: be7092bf
date: 2022-03-02 22:13:48
---
## 一 现象

导入MBProgressHUD显示信息时，出现如下异常现象

```
Undefined symbols for architecture x86_64:
  "_OBJC_CLASS_$_MBProgressHUD", referenced from:
      objc-class-ref in ViewController.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)

Undefined symbol: _OBJC_CLASS_$_MBProgressHUD
```

<!--more-->

## 二 原因

编译程序(cc -c 要编译到程序名)，生成“ViewController.o”文件时，找不到OBJC_CLASS_$_MBProgressHUD

## 三 解决办法

### 3.1 新建MBProgress并将MBProgressHUD中的内容copy到MBProgress中
#### 添加MBProgressHUD后的项目结构

![][1]

ViewController.m如何引用

```
#import "MBProgressHUD/MBProgressHUD+MJ.h"
```

#### MBProgress代替MBProgressHUD后
![][2]

ViewController.m如何引用

```
#import "MBProgressHUD+MJ.h"
```

### 3.2 Build Phases添加编译文件和Resources资源文件

#### Compile Sources—添加.m文件

依次点击：项目—>TARGETS—>01-xxx—>Build Phases——>Compile Sources——>+号，将如下文件添加进来

```
MBProgressHUD.m
MBProgressHUD+MJ.m
```

![][3]

#### Copy Bundle Resources——添加资源文件(图片)

依次点击：项目—>TARGETS—>01-xxx—>Build Phases——>Compile Bundle Resources——>+号，将如下文件添加进来

```
MBProgressHUD.bundle
```

![][4]

## 四 使用

### 4.1 代码

```
[MBProgressHUD showError:@"请输入用户名"];
```

### 4.2 效果图
![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-mbprogress-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-mbprogress-project-struct-replace.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-mbprogress-compile-sources-add-m.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-mbprogress-bundle-resources-add.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-mbprogress-modify-use-show-error.png

