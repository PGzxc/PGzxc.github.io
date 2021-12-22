---
title: OC开发之——self(17)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 4c05ad6c
date: 2020-04-02 23:49:02
---
## 一 概述

OC提供了一个self关键字，self关键字总是指向该方法的对象，self出现在某个方法体中时，它所代表的对象时不确定的，我们只需要记住它代表的只能是当前类的实例

<!--more-->

## 二 代码实例

```
#include <Foundation/Foundation.h>
@interface Dog:NSObject
-(void)bark;
-(void)run;
@end
@implementation Dog
-(void)bark
{
    NSLog(@"汪汪汪");
}
-(void)run
{
    //NSLog(@"汪汪汪");
    [self bark];
    NSLog(@"跑跑跑");
}
@end
int main()
{
    Dog *d=[Dog new];
    [d run]; 
    return 0;
}
```

## 三 self关键字

### 3.1 成员变量和局部变量同名

* 当成员变量和局部变量同名时，采取就近原则，访问的是局部变量
* 用self访问成员变量，区分同名的局部变量

### 3.2 使用细节

* 出现的地方：所有的OC方法中(对象方法\类方法)，不能出现在函数
* 作用：
  - 使用“self->成员变量名“访问当前方法调用的成员变量
  - 使用"[self 方法名]"来调用方法(对象方法\类方法)

### 3.3 常见错误

* 低级错误：用self去调用函数
* 类中方法用self调用对象方法，对象方法中用self调用类方法
* self死循环
