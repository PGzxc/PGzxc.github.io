---
title: OC开发之——id(27)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: e09c508f
date: 2020-04-08 23:19:28
---
## 一 概述

* 万能指针，能指向任何OC对象，相当于NSObject*
* id类型的定义

  ```
  typedef struct objc_object{
  	Class isa;
  }*id;
  ```

<!--more-->

## 二 id使用示例

### 2.1 Person类的定义和声明

```
//Person.h文件
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property int age;
@property id obj;
@end
//Person.m文件
#import "Person.h"
@implementation Person
@end
```

### 2.2 main.m入口文件

```
id d=[Person new];
[d setAge:10];
[d setObj:@"123"];
    
NSLog(@"Person的年龄是%d",[d age]);
```

