---
title: OC开发之——@property其他参数设置(41)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 24d2ac4
date: 2020-04-13 23:05:12
---
## 一 概述

上一课介绍了使用@property (retain)替代OC对象的set方法管理内存，本文再介绍@property其他相关的知识点：

* set方法内存管理相关参数
* 是否要生成set方法
* 多线程管理
* setter和getter方法的名称

<!--more-->

## 二 代码示例

### 2.1 Person类

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property (nonatomic,assign) int age;
@property (retain) NSString *name;
@property (readwrite) int height;
@property (getter=abc,setter=setAbc:) int weight;
@end

//Person.m
@implementation Person
- (int)abc
{
    return _weight;
}
@end
```

### 2.2 main.m

```
#import <Foundation/Foundation.h>
#import "Person.h"
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Person *p=[[Person alloc]init];
        //[p setWeight:100];
        //[p setAbc:100];
        p.weight=100;
        int a=[p abc];
        NSLog(@"%d",a);     
    }
    return 0;
}
```

## 三 @property参数
### 3.1 控制set方法的内存管理
* Retain:release旧值，retain新值(OC对象)
* Assign:直接赋值，不做任何内存管理(默认，用于非OC对象类型)
* Copy：release旧值，copy新值(一般用于NSString*)

### 3.2 控制需不需要生成set方法

* Readwrite：同时生成set方法和get方法(默认)
* readonly：只会生成get方法

### 3.3 多线程管理

* Atomic：性能低(默认)
* Nonatomic：性能高

### 3.4 控制set方法和get方法的名字

* setter：设置set方法的名称，一定有个冒号：
* getter：设置get方法的名称