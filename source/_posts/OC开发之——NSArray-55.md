---
title: OC开发之——NSArray(55)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: ce643192
date: 2020-04-19 23:17:50
---
## 一 概述

本文介绍集合中的数组：NSArray

<!--more-->

## 二 代码示例

```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        //array创建
        NSArray *array=[NSArray array]; //空数组
        NSArray *array2= [NSArray arrayWithObject:@"jack"];
        NSArray *array3= [NSArray arrayWithObjects:@"jack",@"rose",nil];
        NSArray *array4=@[@"jack",@"rose",@"jone"];
        
        //数组元素
        [array2 count];
        array2.count;
        
        //元素访问
        [array3 objectAtIndex:1];
        array3[1];
        
        NSLog(@"数组array2的大小%d",array2.count);
        NSLog(@"数组array2第1个元素是:%d",[array3 objectAtIndex:1]);
        
        //遍历
        for (int i=0; i<array4.count; i++) {
            NSLog(@"%d---%@",i,array4[i]);
        }
        for (id obj in array4) {
           NSLog(@"%d---%@",[array4 indexOfObject:obj],obj);
        }
        
        [array4 enumerateObjectsUsingBlock:
         ^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
             NSLog(@"%d---%@",idx,obj);
            if (idx==1) {
                *stop=YES;
            }
        }];
        
    }
    return 0;
}
```