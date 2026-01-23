---
title: OC开发之——OC对象与函数参数(8)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: fe9a9666
date: 2020-03-30 23:40:46
---
## 一 概述

* 学过其他编程语言的人可能对“按值传递”与“按址传递”有所了解
* 按值传递：在调用函数中将原函数的值拷贝一份过去被调用的函数，在被调用函数中对该值的修改不会影响原函数的值
* 按地址传递：在调用函数的时候将原函数的值所在的地址拷贝一份过去，被调用函数对这个地址所作的修改会影响原来的值。

<!--more-->

## 二 示例(OC语言)

```
#include <Foundation/Foundation.h>
@interface Car:NSObject
{
    @public
    int wheels;
    int speed;
    
}
-(void)run;

@end
@implementation Car

-(void)run
{
    NSLog(@"%d个轮子，速度为%d km/h的车子跑起来了",wheels,speed);
}

@end

void test(int w,int s)
{
    w=20;
    s=200;
}
void test1(Car *newC)
{
    newC->wheels=5;
}
void test2(Car *newC)
{
    Car *c2=[Car new];
    c2->wheels=5;
    c2->speed=300;
    
    newC=c2;
    newC->wheels=6;
}

int main()
{
   Car *c= [Car new];
    c->wheels=4;
    c->speed=250;
    //test(c->wheels,c->speed);
    //test1(c);
    test2(c);
    [c run];
    
    return 0;
}

```

## 三 说明

* 上述方法中的：void test(int w,int s)是按值传递，参数是基本变量
* 上述方法中的：void test1(Car *newC)和void test1(Car *newC)，参数是对象