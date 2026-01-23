---
title: OC开发之——NSDate(60)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 3bcffe25
date: 2020-04-21 23:36:31
---
## 一 概述

OC中操作时间的类是NSDate，本文介绍NSDate相关的操作：

* 获取当前时间
* NSDate转NSString
* NSString转NSDate

<!--more-->

##  二 获取当前时间

```
NSDate *date=[NSDate date];
NSLog(@"当前时间是%@",date);
        
NSDate *date2=[NSDate dateWithTimeInterval:5 sinceDate:date];
NSLog(@"%@",date2);
        
NSTimeInterval seconds=[date timeIntervalSince1970];
```

## 三 NSDate转NSString

```
//NSDate-NSString
 NSDate *date3= [NSDate date];
 NSDateFormatter *format=[[NSDateFormatter alloc]init];
 format.dateFormat=@"yyyy-MM-dd HH:mm:ss";
 NSString *str= [format stringFromDate:date3];
 NSLog(@"date转string后的内容是%@",str);
```

## 四 NSString转NSDate

```
 //NSString转NSDate
 NSString *time=@"2020/04/21 11:15:30";
 NSDateFormatter *formatter=[[NSDateFormatter alloc]init];
 formatter.dateFormat=@"yyyy/MM/dd HH:mm:ss";
 NSDate *date4= [formatter dateFromString:time];
 NSLog(@"NSString转NSDate后的内容是%@",date4);
```
