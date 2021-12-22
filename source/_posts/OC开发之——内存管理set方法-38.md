---
title: OC开发之——内存管理set方法(38)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 80e9e427
date: 2020-04-11 23:17:11
---
## 一 概述

* 如果你有个OC对象类型的成员变量，就必须管理这个成员变量的内存
* 比如：类Person有个Book *_book成员变量
* 这个就是本文将要介绍的set方法内存管理

<!--more-->

## 二 代码实例

### 2.1 Book类

```
//Book.h
#import <Foundation/Foundation.h>
@interface Book : NSObject
{
    int _price;
}
-(void)setPrice:(int)price;
-(int)price;
@end

//Book.m
#import "Book.h"
@implementation Book
- (void)setPrice:(int)price
{
    _price=price;
}
-(int)price
{
    return _price;
}
- (void)dealloc
{
    NSLog(@"Book对象被回收----");
    [super dealloc];
}
@end
```

### 2.2 Person类

```
//Person.h类
#import <Foundation/Foundation.h>
#import "Book.h"
@interface Person : NSObject
{
    Book *_book;
}
-(void)setBook:(Book *)book;
-(Book*)book;
@end

//Person.m
#import "Person.h"
@implementation Person
-(void)setBook:(Book *)book
{
    //_book=book;
    _book=[book retain];
}
-(Book *)book
{
    return _book;
}
- (void)dealloc
{
    [_book release];
    NSLog(@"Person对象被回收----");
    [super dealloc];
}
@end
```

### 2.3 main.m调用

```
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Book.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        Book *b=[[Book alloc]init];
        Person *p=[[Person alloc]init];
        
        [p setBook:b];
        [b release];
        [p release];    
    }
    return 0;
}
```

## 三 内存管理原则

### 3.1 原则分析

* 只要有人在利用某个对象，那么这个对象就不会被回收
* 只要你想用这个对象，就让这个对象的计数器+1
* 当你不再使用这个对象时，就让这个对象的计数器-1

### 3.2 谁创建，谁release

* 如果你通过alloc,new或者[mutalbe]copy来创建一个对象，那么你必须调用release或者autorelease
* 换句话说，不是你创建的，就不用你去[auto]release

### 3.3 谁retain，谁release

* 只要你调用了retain，无论这个对象是如何生成的，你都要调用release

### 3.4 总结

* 有始有终，有加有减
* 曾经让对象的计数器+1，就必须在最后让对象计数器-1