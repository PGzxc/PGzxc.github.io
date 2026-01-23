---
title: OC开发之——内存管理set方法2(39)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: dee58963
date: 2020-04-12 21:34:22
---

## 一 概述

上篇文章简单介绍了内存管理set的基本方法，可是依然有不太完善的地方，如给一个类成员通过set方法设置另一个类成员时及多次设置时，如何避免内存泄漏呢？

<!--more-->

## 二 代码实例

### 2.1 类实例(Car)

```
//Car.h
#import <Foundation/Foundation.h>
@interface Car : NSObject
{
    int _speed;
}
-(void)setSpeed:(int)speed;
-(int)speed;

//Car.m
#import "Car.h"

@implementation Car
- (void)setSpeed:(int)speed
{
    _speed=speed;
}
-(int)speed
{
    return _speed;
}
-(void)dealloc
{
    NSLog(@"速度为%d的Car对象被回收了",self.speed);
    [super dealloc];
}
@end
```

### 2.2 类实例(Person)

```
//Person.h
#import <Foundation/Foundation.h>
#import "Car.h"
@interface Person : NSObject
{
    Car *_car;
    int _age;
}
-(void)setCar:(Car*)car;
-(Car*)car;
-(void)setAge:(int)age;
-(int)age;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)setCar:(Car *)car
{
    if(car!=_car)
    {
        [_car release];
          _car=[car retain];
          //_car=car;
    }
}
-(Car *)car
{
    return _car;
}
-(void)setAge:(int)age
{
    _age=age;
}
-(int)age
{
    return _age;
}
-(void)dealloc
{
    [_car release];
    NSLog(@"Person对象被回收了");
    
    [super dealloc];
}
@end
```

### 2.3 main.m(运行)

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Car.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
//        Person *p=[[Person alloc]init];
//        p.age=20;
//        Car *c1=[[Car alloc]init];
//        c1.speed=250;
//        p.car=c1;
//
//        Car *c2=[[Car alloc]init];
//        c2.speed=300;
//        p.car=c2;
//
//        [c2 release];
//        [c1 release];
//        [p release];
        
        
        Person *p=[[Person alloc]init];
        p.age=20;
        
        Car *c1=[[Car alloc]init];
        c1.speed=250;
        p.car=c1;
        [c1 release];
        p.car=c1;
        p.car=c1;
        
        [p release];
             
    }
    return 0;
}
```

