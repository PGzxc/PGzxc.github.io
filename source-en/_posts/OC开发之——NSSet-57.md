---
title: OC开发之——NSSet(57)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 97ac543b
date: 2020-04-19 23:19:40
---
## 一 概述

本文介绍NSSet与NSArray 
共同点：

* 都是集合，都能存放多个OC对象
* 只能存放OC对象，不能存放非OC对象类型(基本数据类型：int、char、float等，结构体，枚举)
* 本身都不可变，都有一个可变的子类

不同点：
* NSArray有顺序，NSSet没有顺序

<!--more-->

## 二 示例

```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
       //基本使用
        NSSet *s=[NSSet set];
        NSSet *s2=[NSSet setWithObjects:@"jack",@"rose",nil];
        
        //set操作
        NSString *str=[s2 anyObject];
        NSLog(@"%@",str);
        
        //NSMutableSet
        NSMutableSet *ms=[NSMutableSet setWithObject:@"jack"];
        [ms addObject:@"rose"];
        [ms removeObject:@"rose"];
        [ms removeAllObjects];
        
    }
    return 0;
}
```

