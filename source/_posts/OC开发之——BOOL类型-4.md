---
title: OC开发之——BOOL类型(4)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 967fd015
date: 2020-03-22 22:41:24
---
## 一 概念

* BOOL类型的本质：`typedef signed char BOOL`
* BOOL类型的变量有2种取值：YES，NO

  ```
  #define YES (BOOL)1
  #define NO  (BOOL)0
  ```

* BOOL的输出(当作整数来用)

  ```
  NSLog(@"%d %d",YES,NO);
  ```

<!--more-->

## 二 示例

### 2.1 源代码(文件名bool.m)

```
#import <Foundation/Foundation.h>

BOOL test(BOOL mybool)
{
    return NO;
}
int main()
{
    BOOL b1=YES;
    BOOL b2=NO;
    BOOL b3=1;
    BOOL b4=0;
    NSLog(@"b1==%i",b1);
    NSLog(@"b2==%i",b2);
    NSLog(@"%i",test(YES));
}
```

### 2.2 编译运行文件

* 编译文件

  ```
  cc -c bool.m
  ```

* 链接文件

  ```
  cc bool.o -framework Foundation
  ```

* 运行结果

  ```
  ./a.out
  ```