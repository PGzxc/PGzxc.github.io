---
title: OC开发之——内存管理ARC(46)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 98d8c5d4
date: 2020-04-16 23:07:52
---
## 一 ARC介绍

* ARC是自iOS5之后增加的新特性，完全消除类手动管理内存的繁琐，编译器会自动在适当的地方插入适当的release,retain,autorelease语句。你不再需要担心内存管理，因为编译器为你处理了一切
* ARC是编译器特性，而不是iOS运行时特性，它也不是类似其他语言中的垃圾收集器。因此ARC和手动内存管理性能是一样的，有时还能更加快速，因为编译器还可以执行某些优化

<!--more-->

## 二 基本原理

### 2.1 规则

ARC的规则非常简单：只要还有一个强指针变量指向对象，对象就会保存在内存中

### 2.2 强指针和弱指针

* 默认所有实例变量和局部变量都是Strong指针
* 若指针指向的对象被回收后，若指针会自动变为nil指针，不会引发野指针错误

## 三 代码

### 3.1 Dog类

```
//Dog.h
#import <Foundation/Foundation.h>
@interface Dog : NSObject
@end

//Dog.m
#import "Dog.h"
@implementation Dog
- (void)dealloc
{
    NSLog(@"Dog被回收了----");
}
@end
```

### 3.2 Person类

```
//Person.h
#import <Foundation/Foundation.h>
#import "Dog.h"
@interface Person : NSObject
@property (nonatomic,strong) Dog *dog;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)dealloc
{
    NSLog(@"Person 被回收了");
}
@end
```

### 3.3 main.m

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Dog.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        __strong Person *p=[[Person alloc]init];
       __weak Dog *d=[[Dog alloc]init];
        p.dog=d; 
    }
    return 0;
}

```

## 四 使用注意

* 不能调用release，retain，autorelease，retainCount
* 可以重写dealloc，但是不能调用[super dealloc]
* @property：想长期拥有某个对象，应该用strong，其他对象用weak
  - 其他基本数据类型依然用assign
  - 两端相互引用时，一端用strong，一端用weak