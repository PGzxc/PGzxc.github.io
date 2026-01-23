---
title: OC开发之——description方法(34)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: d8d8c09a
date: 2020-04-10 23:56:35
---
## 一 概述

* OC执行NSLog输出日志信息时，会调用description方法
* description方法分为+description和-description方法
* +description是类方法，-description是对象方法

<!--more-->

## 二 description方法演示

### 2.1 使用到的类(Person)

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property int age;
@property NSString *name;
@end
//Person.m
#import "Person.h"
@implementation Person
- (NSString *)description
{
    return [NSString stringWithFormat:@"age=%d,name=%@",_age,_name];
}
+(NSString *)description
{
    return @"---Person";
}
@end
```

### 2.2 对象方法调用(-description)

```
Person *p=[[Person alloc]init];
p.age=20;
p.name=@"jack";
NSLog(@"Person=%@",p);
```

### 2.3 类方法调用(+description)

```
Class c=[Person class];
NSLog(@"%@",[Person class]);
```

### 2.4 NSLog其他输出

```
 NSLog(@"%d",__LINE__);
 NSLog(@"%s",__FILE__);
 NSLog(@"%s",__func__);
```
