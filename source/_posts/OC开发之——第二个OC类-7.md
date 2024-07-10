---
title: OC开发之——第二个OC类(7)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: af6e9c3
date: 2020-03-30 23:38:37
---
## 一 概述

* 第一个OC类简单介绍了OC开发中类的定义，属性的声明及编译过程及常见的错误问题
* 本文以一个示例展开介绍，并分析类在内存中的分配情况

<!--more-->

## 二 示例
### 2.1 代码编写
```
#include <Foundation/Foundation.h>
@interface Person:NSObject
{
    @public
    int age;
    double weight;
}
-(void)walk;
-(void)eat;
@end
@implementation Person

-(void)walk
{
    NSLog(@"%d岁，%f公斤的人走了一段路",age,weight);
}
-(void)eat
{
      NSLog(@"%d岁，%f公斤的人在吃东西",age,weight);
}
@end

int main()
{
    Person *p=[Person new];
    p->age=20;
    p->weight=50.0;
    [p walk];
    [p eat];
    
    Person *p1=[Person new];
    p1->age=30;
    p1->weight=60.0;
    [p1 walk];
    return 0;
}
```

### 2.2 输出结果

```
2020-03-30 20:30:31.800 a.out[1638:25451] 20岁，50.000000公斤的人走了一段路
2020-03-30 20:30:31.800 a.out[1638:25451] 20岁，50.000000公斤的人在吃东西
2020-03-30 20:30:31.800 a.out[1638:25451] 30岁，60.000000公斤的人走了一段路
```

## 三 类在内存中的分配

### 3.1 内存分配一

#### 代码

```
Person *p=[Person new];
p->age=20;
p->weight=50.0;
[p walk];
```

#### 示意图

![][1]

### 3.2 内存分配二

#### 代码

```
Person *p=[Person new];
p->age=20;
p->weight=40;
    
Person *p2=p;
p2->age=30;
[p walk];
```

#### 示例图
![][2]
### 3.3 内存分配三
#### 代码

```
Person *p= [Person new];
p->age=20;
p->weight2=40;
    
Person *p2=[Person new];
p2->age=30;
p2->weight=50;
p=p2;
p->age=40;
[p2 walk];
```

#### 示意图
![][3]

### 3.4 内存分配四(对象指向同一个类)
#### 代码

```
Person *p=[Person new];
p->age=20;
p->weight=40;
[p eat];
[p walk];
    
Person *p2=[Person new];
p->age=30;
p->weight=60;
[p2 eat];
[p2 walk];
```

#### 示意图

![][4]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-memory-allocation-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-memory-allocation-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-memory-allocation-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-memory-allocation-4.png
