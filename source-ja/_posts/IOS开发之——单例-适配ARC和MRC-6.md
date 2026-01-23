---
title: IOS开发之——单例-适配ARC和MRC(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6baf1d6d
date: 2022-02-26 12:54:58
---
## 一 概述

单例模式在ARC\MRC环境下的写法有所不同，需要编写2套不同的代码，可以用宏判断是否为ARC环境

```
#if __has_feature(objc_arc)
//ARC
#else 
//MRC
#endif
```

<!--more-->

## 二 几个概念

### 2.1 ARC和MRC

#### Objective-c中两种内存管理机制ARC、MRC 

* ARC(Automatic Reference Counting)：自动内存管理
* MRC(manual Reference Counting)：手动内存管理

注意：Xcode4.1及其以前版本没有ARC，MRC与ARC的区别如下图。需要理解MRC，但实际使用时强推ARC

![][1]
#### Objective-c语言中的MRC 

在MRC的内存管理模式下，与对变量的管理相关的方法有：retain,release和autorelease。

retain和release方法操作的是引用计数，当引用计数为零时，便自动释放内存。并且可以用NSAutoreleasePoll对象，对加入自动释放池(autorelease调用)的变量进行管理，当drain时回收内存。

* retain：该方法的作用是将内存数据的所有权赋给另一个指针变量，引用数加1，即retainCout+=1;
* release：该方法是释放指针变量对内存数据的所有权，引用数减1，即retainCount-=1;
* autorelease：该方法是将该对象内存的管理放到autoreleasepool中

#### Objective-c语言中的ARC

在ARC中与内存管理有关的标识符，可以分为变量标识符和属性标识符，对于变量默认为__strong，而对于属性默认为unsafe_unretained。也存在autoreleasepool.

### 2.2 \##name代表什么意思

* \## 连接符号由两个井号组成，其功能是在带参数的宏定义中将两个子串(token)联接起来，从而形成一个新的子串
* 但它不可以是第一个或者最后一个子串
* 简单的说，“##”是一种分隔连接方式，它的作用是先分隔，然后进行强制连接

## 三 适配ARC和MRC代码(ILSingleton.h)

```
// .h文件
#define ILSingletonH(name) + (instancetype)shared##name;

// .m文件
#if __has_feature(objc_arc)

    #define ILSingletonM(name) \
    static id _instace; \
 \
    + (id)allocWithZone:(struct _NSZone *)zone \
    { \
        static dispatch_once_t onceToken; \
        dispatch_once(&onceToken, ^{ \
            _instace = [super allocWithZone:zone]; \
        }); \
        return _instace; \
    } \
 \
    + (instancetype)shared##name \
    { \
        static dispatch_once_t onceToken; \
        dispatch_once(&onceToken, ^{ \
            _instace = [[self alloc] init]; \
        }); \
        return _instace; \
    } \
 \
    - (id)copyWithZone:(NSZone *)zone \
    { \
        return _instace; \
    }

#else

    #define ILSingletonM(name) \
    static id _instace; \
 \
    + (id)allocWithZone:(struct _NSZone *)zone \
    { \
        static dispatch_once_t onceToken; \
        dispatch_once(&onceToken, ^{ \
            _instace = [super allocWithZone:zone]; \
        }); \
        return _instace; \
    } \
 \
    + (instancetype)shared##name \
    { \
        static dispatch_once_t onceToken; \
        dispatch_once(&onceToken, ^{ \
            _instace = [[self alloc] init]; \
        }); \
        return _instace; \
    } \
 \
    - (id)copyWithZone:(NSZone *)zone \
    { \
        return _instace; \
    } \
 \
    - (oneway void)release { } \
    - (id)retain { return self; } \
    - (NSUInteger)retainCount { return 1;} \
    - (id)autorelease { return self;}

#endif
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-instance-arc-mrc-compare.png