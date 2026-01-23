---
title: OC开发之——SEL(35)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 9fdcca78
date: 2020-04-11 09:29:43
---
## 一 概述

* 每个类的方法都存储在类对象中
* 每个方法都有一个与之对应的SEL类型的对象
* 根据一个SEL对象就可以找到方法的地址，进而调用该方法
* SEL类型的定义`typedef struct objc_selector *SEL`;

<!--more-->

## 二 代码实例

### 2.1 示例类(Person)

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject
+(void)test;
-(void)test2;
-(void)test3:(NSString *)name;
@end
//Person.m
#import "Person.h"
@implementation Person
+(void)test
{
    NSLog(@"test++++");
}
-(void)test2
{
    NSString *str= NSStringFromSelector(_cmd);
    NSLog(@"调用了test2方法----%@",str);
}
-(void)test3:(NSString *)name
{
    NSLog(@"test3----%@",name);
}
@end
```

### 2.2 调用过程

```
  Person *p=[[Person alloc]init];
  //[p test2];
  //1.把test2包装成sel类型的数据
  //2.根据sel数据找到对应的方法地址
  //3.根据方法地址调用对应的方法
  //间接调用方法
  [p performSelector:@selector(test2)];
  [p test3:@"123"];
  SEL s=@selector(test3:);
  [p performSelector:@selector(test3:) withObject:@"456"];
  [p performSelector:s withObject:@"789"];
     
  //字符串转换成方法
  NSString *name=@"test2";
  SEL test2= NSSelectorFromString(name);
  [p performSelector:test2];
        
  //方法转字符串
  [p test2];
```