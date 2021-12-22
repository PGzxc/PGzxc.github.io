---
title: OC开发之——内存管理autorelease实际应用(45)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: b86014af
date: 2020-04-15 23:45:26
---
## 一 概述

本文是一个autorelease应用示例，并为类添加一个快速创建对象的类方法。
<!--more-->

## 二 代码示例

### 2.1 Person类

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property (nonatomic,assign) int age;
+(id)person;
+(id)personWithAge:(int)age;
@end

//Person.m
#import "Person.h"
@implementation Person
+(id)person
{
    return [[[self alloc]init]autorelease];
}
+(id)personWithAge:(int)age
{
    Person *p=[self person];
    p.age=age;
    return p;
}
- (void)dealloc
{
    NSLog(@"%d岁的Person 被回收了",_age);
    [super dealloc];
}
@end
```

### 2.2 GoodPerson类

```
//GoodPerson.h
#import "Person.h"
@interface GoodPerson : Person
@property (nonatomic,assign) double money;
@end

//GoodPerson.m
#import "GoodPerson.h"
@implementation GoodPerson
- (void)dealloc
{
    NSLog(@"的GoodPerson被回收了");
    [super dealloc];
}
@end
```

### 2.3 main.m

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "GoodPerson.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Person *p=[Person personWithAge:10];
        
        GoodPerson *gp=[GoodPerson personWithAge:20];
        gp.money=200;     
    }
    return 0;
}
```

## 三 总结

### 3.1 创建实例

* 之前

  ```
  Book *book = [[Book alloc] init];
  [book release];
  ```

* 现在

  ```
  Book *book = [[[Book alloc] init] autorelease];
  // 不要再调用[book release];
  ```

* 可以为类添加一个快速创建对象的类方法

  ```
  + (id)book {
      return [[[Book alloc] init] autorelease];
  }
  ```

### 3.2 规律

* 一般来说,除了alloc、new或copy之外的方法创建的对象都被声明了autorelease
* 比如下面的对象都已经是autorelease的，不需要再release

  ```
  NSNumber *n = [NSNumber numberWithInt:100];
  
  NSString *s = [NSString stringWithFormat:@"jack"];
  
  NSString *s2 = @"rose";
  ```
