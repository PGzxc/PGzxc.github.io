---
title: OC开发之——@property和@synthesize(26)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 8acc3c70
date: 2020-04-07 20:53:38
---
## 一 概述

* @property 可以在类.h文件中自动生成某个成员变量的setter和getter的声明
* @synthesize 可以在类.m文件中自动生成某个成员变量的setter和getter的实现
* @property 和@synthesize是xcode为了简化类的书写，而出现的新特性

<!--more-->

## 二 作用演示

### 2.1 Person.h头文件定义(@property)

```
#import <Foundation/Foundation.h>

@interface Person : NSObject
{
    int _age;
    int age;
    int _height;
    double _weight;
    NSString *_name;
}
@property int age;
@property int height;
@property double weight;
@property NSString *name;

-(void)test;
@end
```

### 2.2 Person.m文件定义(@synthesize)

```
#import "Person.h"

@implementation Person
@synthesize age=age;
@synthesize height=_height;
@synthesize weight=_weight;
@synthesize name=_name;

-(void)test
{
    NSLog(@"age=%d,_age=%d",age,_age);
}
@end
```

### 2.3 main.m入口文件调用

```
 Person *person=[Person new];
 [person setAge:10];
 [person test];
```

### 2.4 总结

#### 2.4.1 @property

* 用在@interface中

* 用来自动生成setter和getter的声明

* 用@property int age；就可以替代下面的两行

  ```
  -(void)setAge:(int)age;//setter
  -(int)age; //getter
  ```

#### 2.4.2 @synthesize

* 用在@implementation中

* 用来自动生成setter和getter的实现

* 用@synthesize age=_age；就可以代替

  ```
  -(void)setAge{_age=age;};
  -(int)age{return _age};
  ```

## 三 省略成员变量的写法

### 3.1 声明与实现

```
//声明
#import <Foundation/Foundation.h>
@interface Car : NSObject
@property int speed;
@property int wheels;
@end

//实现
#import "Car.h"
@implementation Car
@synthesize speed=_speed;
@synthesize wheels=_wheels;
@end
```

### 3.2 方法调用

```
  Car *car=[Car new];
  car.speed=100;
  NSLog(@"Car的速度是%d",car.speed);
```

### 3.3 说明

* 实现中`@synthesize speed=_speed;`会访问_speed这个成员变量，如果不存在，就会自动生成@private类型的\_speed变量

## 四 @property替代@property和@synthesize的用法

### 4.1 代码(Dog.h，不修改Dog.m文件)

```
#import <Foundation/Foundation.h>
@interface Dog : NSObject
@property int age;
@end
```

### 4.2 文件调用(正常输出)

```
 Dog *dog=[Dog new];
 dog.age=5;
 NSLog(@"Dog的年龄是%d",dog.age);
```
