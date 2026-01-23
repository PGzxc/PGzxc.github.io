---
title: OC开发之——ARC循环引用(48)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 599fb0b7
date: 2020-04-17 23:15:53
---
## 一 概述

我们知道两个非ARC类相互引用时，会出现错误，将import改为@class引用，可以避免此类现象的发生，那么ARC中两个类相互引用时，是否也会发生循环引用问题？？？

<!--more-->

## 二 ARC中两个类相互引用代码

### 2.1 Person类

```
//Person.h
#import <Foundation/Foundation.h>
@class Dog;
@interface Person : NSObject
@property (nonatomic,strong) Dog *d;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)dealloc
{
    NSLog(@"Person----dealloc");
}
@end
```
### 2.2 Dog类

```
//Dog.h
#import <Foundation/Foundation.h>
@class Person;
@interface Dog : NSObject
@property (nonatomic,strong) Person *p;
@end

//Dog.m
#import "Dog.h"
@implementation Dog
- (void)dealloc
{
    NSLog(@"Dog----dealloc");
}
@end
```

### 2.3 main.m类

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Dog.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Person *p=[[Person alloc]init];
        Dog *d=[[Dog alloc]init];
        p.d=d;
        d.p=p;    
    }
    return 0;
}
```

### 2.4 现象及原因

####  2.4.1现象
* 两个类相互引用，导致死循环

#### 2.4.2 原因

![][1]

* d指针指向Dog的引用
* p指针指向Person的引用
* Person中的_dog指向Dog引用
* Dog中的_person指向Person引用
* 执行结束时，d和p指针被回收
* \_dog和\_person因为强引用无法回收

#### 2.4.3 解决办法
* 将其中一个类的引用修改为weak



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-arc-strong-weak-use.png