---
title: OC开发之——NSMutableArray(56)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: d3c55dd1
date: 2020-04-19 23:18:59
---
## 一 概述

NSMutableArray与NSArray的区别：

* NSMutableArray：可变数组
* NSArray：不可变数组

<!--more-->

## 二  示例

```
#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
    
        //数组创建
        NSMutableArray *array=[NSMutableArray array];//空数组
        NSMutableArray *array2=[NSMutableArray arrayWithObjects:@"rose",@"jack",@"marry",nil];
        [array addObject:[[Person alloc]init]];
        [array addObject:@"jack"];
        
        
        //数组的操作
        array.count;
        [array2 removeObject:@"rose"];
        //[array2 removeAllObjects];
        [array2 removeObjectAtIndex:1];
        NSLog(@"%ld",array.count);
        NSLog(@"数组%@",array2);
        
    }
    return 0;
}
```
