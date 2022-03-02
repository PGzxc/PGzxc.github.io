---
title: OC开发之——Foundation中的NSString(53)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 1d035d5c
date: 2020-04-19 23:16:07
---
## 一 概述

本文介绍NSString中相关的操作如：

* NSString的创建
* OC中NSString和C中字符串的转换
* 读取文本中的字符串和写入字符串

<!--more-->

## 二 NSString的创建

```
//NSString的创建
NSString *s1=@"jack";
NSString *s2=[[NSString alloc]initWithString:@"jack"];
NSString *s3=[[NSString alloc]initWithFormat:@"age is %d",10];
```

## 三 OC中NSString和C中字符串的转换

```
NSString *s4=[[NSString alloc]initWithUTF8String:"jack"];
const char *cs= [s4 UTF8String];
```

## 四 读取文本中的字符串和写入字符串

### 4.1 File

```
NSString *s5= [[NSString alloc]initWithContentsOfFile:@"/Users/zxc/Desktop/1.txt" encoding:NSUTF8StringEncoding error:nil];
NSLog(@"\n%@",s5);
[@"444" writeToFile:@"/Users/zxc/Desktop/1.txt" atomically:YES encoding:NSUTF8StringEncoding error: nil];   
```

### 4.2 URL

```
NSURL *url=[[NSURL alloc]initWithString:@"file:/Users/zxc/Desktop/1.txt"];
NSString *s6=[[NSString alloc]initWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
NSLog(@"\n%@",s6);
```
