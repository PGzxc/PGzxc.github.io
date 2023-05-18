---
title: IOS开发之——单例-模式(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 单例
abbrlink: 18fd57ca
date: 2022-02-25 08:46:44
---
## 一 概述

* 单例模式相关概念
* 类的创建过程分析
* 如何确保创建出来的是单一示例
* 单例模式的两种表现形式(懒汉和饿汉)

<!--more-->

## 二 单例模式相关概念

### 2.1 单例模式的作用

* 可以保证在程序运行过程，一个类只有一个实例，而且该示例易于供外界访问
* 从而方便地控制了实例个数，并节约系统资源

### 2.2 单例模式的使用场所

在整个应用程序中，共享一份资源(这份资源只需创建初始化1次)

## 三 类的创建过程分析

### 3.1 如何创建一个类

```
ILPerson *p=[[ILPerson alloc]init];
```

如何保证创建出来的p在程序的运行过程中是唯一的？

### 3.2 类的创建过程

* +(void)load方法：当类被加载进内存时调用1次
* +(void)initialize：当这个类第一次使用时才会被调用
* +(instancetype)alloccWithZone：初始化对象的两种方法，一个是alloc，一个是alloccWithZone
* -(id)copyWithZone：当类调用copy复制对象时，使用此方法

## 四 如何确保创建出来的是单一示例

### 4.1 为何会出现多个示例

* 在多个线程中创建对象(多线程影响)
* 在同一个线程中，多次执行new方法，多次创建(多次执行)

### 4.2 如何保证单例

* 线程安全问题(锁机制**@synchronized**)
* 防止多次创建(为空时创建，不为空返回)

## 五 单例模式的两种表现形式(懒汉和饿汉)

### 5.1 懒汉式和饿汉式

*  懒汉式：第一次用到单例对象时，再创建
* 饿汉式：1进入程序就创建一个单例对象

### 5.2 过程

* 定义一个static _instance，保存唯一的单例对象
* 分别实现类创建过程中的几个方法alloccWithZone及自定义shareTool、copyWithZone等
* 保证返回的是单1示例

### 5.3 懒汉式(ILMusicTool)

#### ILMusicTool.h

```
#import <Foundation/Foundation.h>
@interface ILMusicTool : NSObject
+(instancetype)shareMusicTool;
@end
```

#### ILMusicTool.m(锁synchronized和类创建)

```
#import "ILMusicTool.h"

@interface ILMusicTool()
@end
@implementation ILMusicTool
static id _instance;

+(instancetype)allocWithZone:(struct _NSZone *)zone
{
    NSLog(@"allocWithZone-----");
    if(_instance==nil){ //防止频繁加锁
        @synchronized (self) {
            if (_instance==nil) {
                _instance=[super allocWithZone:zone];//防止创建多次
            }
        }
    }
    return _instance;
}
+(instancetype)shareMusicTool
{
    if (_instance==nil) { //防止频繁加锁
        @synchronized (self) {
            if (_instance==nil) {
                _instance=[[self alloc]init];//防止创建多次
            }
        }
    }
    return _instance;
}
-(id)copyWithZone:(NSZone *)zone
{
    return _instance;
}
@end
```

### 5.4 饿汉式(类加载时创建)-ILSoundTool

#### ILSoundTool.h

```
#import <Foundation/Foundation.h>
@interface ILSoundTool : NSObject
+(instancetype)shareSoundTool;
@end
```

#### ILSoundTool.m

```
#import "ILSoundTool.h"

@implementation ILSoundTool
static id _instance;

//当类被加载到OC运行环境中(内存)，就会调用一次(一个类只会加载1次)
+(void)load{
    _instance=[[self alloc]init];
    //NSLog(@"load-instance---%@",_instance);
}
//第一次使用这个类的使用才会调用
//+(void)initialize
//{
//}
+(instancetype)allocWithZone:(struct _NSZone *)zone
{
    if (_instance==nil) {//防止多次创建
        _instance=[super allocWithZone:zone];
    }
    return _instance;
}
+(instancetype)shareSoundTool
{
    return _instance;
}
-(id)copyWithZone:(NSZone *)zone
{
    return _instance;
}
@end
```

