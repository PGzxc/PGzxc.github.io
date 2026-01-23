---
title: OC开发之——Foundation中常用结构体(52)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 5c27d6c
date: 2020-04-19 23:15:14
---
## 一 概述

本文介绍Foundation框架中的结构体：

* NSRange
* NSPoint\CGPoint
* NSSize\CGSize
* NSRect\CGRect

<!--more-->

## 二 NSRange

### 2.1 定义

```
typedef struct _NSRange {
    NSUInteger location;
    NSUInteger length;
} NSRange;
```

### 2.2 使用

```
 NSRange rg1={2,4};
 NSRange rg2={.location=2,.length=4};
 NSRange rg3=NSMakeRange(2, 4);
 
 NSString *str=@"i love oc";
 NSRange range=[str rangeOfString:@"love"];
 NSLog(@"loc=%ld,length=%ld",range.location,range.length);
 NSLog(@"NSNotFound=%d",NSNotFound);
```

## 三 NSPoint\CGPoint

### 3.1 说明(NSPoint==CGPoint)

```
typedef CGPoint NSPoint;
```

### 3.2 使用

```
  NSPoint p1=NSMakePoint(10, 10);
  CGPoint p2 =CGPointMake(10, 10);
  //CGPointZero==CGPointMake(0, 0);
```

## 四 NSSize\CGSize

### 4.1 定义

```
struct CGSize {
    CGFloat width;
    CGFloat height;
};
```

### 4.2 使用

```
//NSSize\CGSize
CGSize s1=CGSizeMake(100,  50);
NSSize s2=NSMakeSize(100,  50);
```

## 五 NSRect\CGRect

### 5.1 定义

```
struct CGRect {
    CGPoint origin;
    CGSize size;
};
```

### 5.2 使用

```
 //NSRect\CGRect
 CGRect r1=CGRectMake(0, 0, 100, 50);
 NSRect r2=NSMakeRect(0, 0, 100, 50);
 CGRect r3={{0,0},{100,50}};
 CGRect r4={p1,s2};
        NSLog(@"x=%f,y=%f,width=%f,height=%f",r1.origin.x,r1.origin.y,r1.size.width,r1.size.height);
```

## 六 转换

```
  //转换
  NSString *strfromPoint=NSStringFromPoint(p1);
  NSLog(@"%@",strfromPoint);
  NSString * strFromSize=NSStringFromSize(s1);
  NSLog(@"%@",strFromSize);
  NSString *strFromRect=NSStringFromRect(r1);
  NSLog(@"%@",strFromRect);
```

### 七 比较

```
 //比较
 BOOL isEqual= CGPointEqualToPoint(CGPointZero, CGPointMake(0,0));
 NSLog(@"%d",isEqual);
 BOOL isContain= CGRectContainsPoint(CGRectMake(0,0, 100, 100), CGPointMake(50,50));
 NSLog(@"%d",isContain);
```
