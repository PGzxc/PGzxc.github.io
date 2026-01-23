---
title: OC开发之——block(49)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 6bef0f8c
date: 2020-04-18 23:37:44
---
## 一 概述

* Block封装了一段代码，可以在任何时候执行
* Block可以作为函数参数或者函数的返回值，而其本身又可以带输入参数或返回值
* 苹果官方建议尽量多用block。在多线程，异步任务，集合遍历，集合排序，动画转场用的很多

<!--more-->

## 二 Block的定义

### 2.1 定义实例

```
int (MySum)(int,int)=^(int a,int b){return a+b;};
```

### 2.2 定义说明

* 定义一个叫MySum的block对象，它带有两个int参数，返回int
* 等式右边就是block的具体实现

### 2.3 block变量访问

* block可以访问局部变量，但是不能修改
* 如果要修改就要加关键字：`__block`

### 2.4 block变量访问示例

```
int sum=10;
int (^MyBlock)(int)=^(int num)
{
	sum++;//编译报错
  return num*sum;
};
//如果修改
__block int sum=10;
```

## 三 Block和函数指针对比

### 3.1 定义函数指针

```
int (*myFun)(int,int);
```

### 3.2 定义Block

```
int (^MyBlock)(int,int);
```

### 3.3 调用函数指针

```
(*myFun)(10,20);
```

### 3.4 调用Block

```
MyBlock(10,20);
```

## 四 Block的赋值

### 4.1 在声明的同时定义变量，然后赋值

```
int (^MySum)(int,int)=^(int a,int b){return a+b;};
```

### 4.2 也可以先用typedef先声明类型，再定义变量进行复制

```
typedef int (^MySum)(int,int);
MySum sum=^(int a,int b){return a+b;};
```

## 五 示例

### 5.1 示例一(不带参数)

```
  void (^myblock)() = ^{
      NSLog(@"----------");
   }; 
  myblock();
```

### 5.2 示例二(带参数)

```
 int (^sumblock)(int,int)=^(int a,int b)
  {
     return a+b;
  };
  int c=sumblock(1,2);
  NSLog(@"%d",c);
```

### 5.3 示例三(变量赋值)

```
 int a=10;
 __block int b=20;
 void (^block)();
 block=^{
         // a=20;
          b=25;
        };
```

### 5.4 示例四(定义类型)

```
typedef int (^MyBlock) (int,int);
 MyBlock addblock=^(int a,int b)
  {
     return a+b;
  };
 MyBlock  minusBlock=^(int a,int b)
  {
     return a-b;
  };
  MyBlock multiBlock=^(int a,int b)
  {
     return a*b;
  };
```
