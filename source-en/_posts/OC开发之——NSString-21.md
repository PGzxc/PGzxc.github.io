---
title: OC开发之——NSString(21)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: c867ba5
date: 2020-04-03 23:56:38
---
## 一 概述

C语言中的字符串类型是char，OC中的字符串类型是NSString，且字符串的标识符是"@"开头，后面紧跟着双引号，双引号中是要显示的字符串的内容

<!--more-->

## 二 NSString代码实例

```
#include <Foundation/Foundation.h>

int main()
{
    NSString *str=@"hello";
    char *str2="hello";

    NSLog(@"OC语言字符串：%@",str);
    NSLog(@"C语言字符串：%s",str2);
    int age=15;
    int no=5;
    NSString *name=@"jack";
    int size=[name length];
    NSString *newStr=[NSString stringWithFormat:@"My age is %d and no is %d and name=%@",age,no,name];
    NSLog(@"%@",newStr);
    NSLog(@"name的长度是%d",size);
    return 0;
}
```