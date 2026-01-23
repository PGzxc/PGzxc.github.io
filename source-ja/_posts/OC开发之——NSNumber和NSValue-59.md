---
title: OC开发之——NSNumber和NSValue(59)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: ba7f562a
date: 2020-04-21 23:25:48
---
## 一 概述

```
  @{
     @"name":@"jack",
     @"age":10
   };
```

我们上节使用`@{}`来表示dictionary，但是"@age:10"却会出现错误，因为不能使用基本数据类型(10)，需要将基本数据类型包装成对象，这就用到了本课中的NSNumber

<!--more-->

## 二 NSNumber

### 2.1 NSNumber说明

NSNumber类能够通过一种基本数据类型生成NSNumber对象，并依据此对象获取其他基本数据类型，甚至包括了字符与字符串的转换

### 2.2 使用示例

```
    NSNumber *num=[NSNumber numberWithInt:10];
    NSDictionary *dict= 
       @{
            @"name":@"jack",
            @"age":num
        };
    NSNumber *num2=dict[@"age"];
    NSLog(@"num2==%d",num2.intValue);
        
    //double
    NSNumber *n=[NSNumber numberWithDouble:10.5];
    double d=[n doubleValue];
    NSLog(@"d=%f",d);
        
    //NSString
    NSString *str=[NSString stringWithFormat:@"%d",20];
    NSLog(@"str==%d",str.intValue);
        
    //包装类型
    NSArray *array=
    	 @[
            @{@"name":@"jack",@"age":@20},
            @{@"name":@"rose",@"age":@25},
            @{@"name":@"jim",@"age":@27}
        ];
    @10.5;
    @YES;
    @'A';
    @"A";
        
    int age=20;
    @(age);
```

## 三 NSValue

### 3.1 说明

* NSNumber是NSValue的子类, 但NSNumber只能包装数字类型
* NSValue可以包装任意值
* 因此, 可以用NSValue将结构体包装后，加入NSArray\NSDictionary中

### 3.2 示例

```
   CGPoint p=CGPointMake(10, 10);
   NSValue *value= [NSValue valueWithPoint:p];
   NSArray *array=@[value];
        
  CGPoint point =[value  pointValue];
```
