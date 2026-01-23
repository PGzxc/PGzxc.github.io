---
title: OC开发之——OC简介(1)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: ef4da163
date: 2020-03-22 22:37:37
---
## 一 OC简介

* C语言的基础上，增加了一层最小的面向对象语法
* 完全兼容C语言
* 可以在OC代码中混入C语言代码，甚至是C++代码
* 可以使用OC开发Mac OS平台和IOS平台的应用程序

<!--more-->

## 二 OC语法预览

### 2.1 关键字

* 基本上所有关键字都是以“@”开头

* 下面是一些常见的关键字

  ```
  @interface,@implementation,@end
  @public,@protected,@private,@selector
  @try,@catch,@throw,@finally
  @protocol,@optional,@required,@class
  @property,@synthesize,@dynamic
  
  self,super,id,_cmd,_block,_strong,_weak
  ```

### 2.2 字符串以“@”开头

* 比如@“Hello"是OC中的字符串，而“Hello"则是C语言中的字符串

### 2.3 其他语法

| 基本数据类型 | char,int,float,double,BOOL(YES\NO)                          |
| :----------: | ----------------------------------------------------------- |
|     nil      | 相当于C语言中的NULL，也就是0                                |
|   基本语句   | 循环语句(do while, while, for)，条件语句(if,if-else,switch) |
|     注释     | //和/\*....*/                                               |
|   屏幕输出   | NSLog(@"Hello");NSLog(@"age is %i",27);                     |

##  三 OC程序的开发过程

与C语言类似：  

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-build-process.png