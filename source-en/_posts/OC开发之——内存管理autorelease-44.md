---
title: OC开发之——内存管理autorelease(44)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 56dfdbcb
date: 2020-04-15 23:44:56
---
## 一 概述

不使用ARC，自己管理内存，可以通过@property和@retain实现代码优化，可是依然需要在main.m调用结束后，使用[对象 release]来释放内存，不然会有僵尸对象产生。通过本文autorelease的学习将解决这一问题。

<!--more-->

## 二 代码示例

### 2.1 Person类

```
//Person.h
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property (nonatomic,assign) int age;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)dealloc
{
    NSLog(@"Person内存对象被回收");
    [super dealloc];
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
        Person *p =[[[Person alloc]init] autorelease];
        p.age=10;
      
        @autoreleasepool {
            Person *p2=[[[Person alloc]init] autorelease];
            p2.age=20;
        }
    }
    NSAutoreleasePool *pool=[[NSAutoreleasePool alloc]init];
    Person *p3=[[[Person alloc]init] autorelease];
    [pool release];
    //[pool drain];
    return 0;
}
```

## 三 总结

### 3.1 autorelease

* 给某个对象发送一条autorelease消息时，就会将这个对象加到一个自动释放池中
* 当自动释放池销毁时，会给池子里面的所有对象发送一条release消息
* 调用autorelease方法时，并不会改变对象的计数器，并且返回对象本身
* autorelease实际上只是把对release的调用延迟了，对于每一次autorelease，系统只是把该对象放入到了当前的autorelease pool中，当该pool被释放时，该pool中的所有对象会被调用Release

### 3.2 自动释放池的创建

* iOS 5.0后 @autoreleasepool {}

* ios5.0前

  ```
  NSAutoreleasePool *pool=[[NSAutoreleasePool alloc]init];
  //被调用对象   
  [pool release];
  ```

* 在程序运行过程中，可以创建多个自动释放池，它们是以栈的形式在内存中
* OC对象只需要发送一条autorelease消息，就会把这个对象添加到最近的自动释放池中(栈顶的释放池)