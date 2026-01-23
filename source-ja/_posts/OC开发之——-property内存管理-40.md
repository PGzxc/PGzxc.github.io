---
title: OC开发之——@property内存管理(40)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: ce9de42f
date: 2020-04-13 23:05:01
---
## 一 概述

上一篇内存管理set方法避免内存泄漏到的步骤：

```
- (void)setCar:(Car *)car
{
    if(car!=_car)
    {
        [_car release];
          _car=[car retain];
    }
}
```

本文使用@property (retain)来简化set方法的书写

<!--more-->

## 二 一般内存管理代码

### 2.1 Book类

```
//Book.h
#import <Foundation/Foundation.h>
@interface Book : NSObject
@end

//Book.m
#import "Book.h"
@implementation Book
@end
```

### 2.2 Person类

```
//Person.h
#import <Foundation/Foundation.h>
#import "Book.h"
@interface Person : NSObject
{
    Book *_book;
}
@property int age;
@property Book *book;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)setBook:(Book *)book
{
    if(_book!=book)
    {
        [_book release];
         _book=[book retain];
    }
}
- (Book *)book
{
    return _book;
}
- (void)dealloc
{
    [_book release];
    [super dealloc];
}
@end
```

### 2.3 main.m测试类

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Book.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Book *b=[[Book alloc]init];
        Person *p=[[Person alloc]init];
        p.book=b;
        
        NSLog(@"%ld",[b retainCount]);
        
        [p release];
        [b release];     
    }
    return 0;
}
```

## 三 @property内存管理

### 3.1 Person类修改

```
//Person.h
#import <Foundation/Foundation.h>
#import "Book.h"
@interface Person : NSObject
@property int age;
@property (retain)Book *book;
@end

//Person.m
#import "Person.h"
@implementation Person
- (void)dealloc
{
    [_book release];
    [super dealloc];
}
@end
```

### 3.2 Book类和main类保持不变

## 四 总结

* @property (retain)后 不需要再写set方法的内存管理
* Retain:release旧值，retain新值(OC对象)
