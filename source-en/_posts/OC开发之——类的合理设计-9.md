---
title: OC开发之——类的合理设计(9)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: b244e2b8
date: 2020-03-30 23:41:36
---
## 一 概述

* 本文通过一个实例来讲解如何设计类更加合理有效
* 类：人：成员变量：性别，生日，体重，最喜欢的颜色，狗，方法：吃，跑步，遛狗，喂狗
* 类：狗：成员变量：体重，毛色；方法：吃，跑

<!--more-->

## 二 代码实现

```
#include <Foundation/Foundation.h>
typedef enum{
    SexMan,
    SexWoman
}Sex;
typedef struct {
    int year;
    int month;
    int day;
} Date;
typedef enum {
    ColorBlack,
    ColorRed,
    ColorGreen
}Color;
//---------------狗定义------------
@interface Dog : NSObject
{
    @public
    double weight;//体重
    Color curColor;//毛色
    
}
-(void)eat;
-(void)run;
@end

@implementation Dog
-(void)eat
{
    weight+=1;
    NSLog(@"狗吃完这次后的体重是%f",weight);
    
}
-(void)run
{
    weight-=1;
    NSLog(@"狗跑完这次后的体重是%f",weight);
    
}

@end

//---------------人定义------------
@interface Student : NSObject
{
    @public
    Sex sex;//性别
    Date birthday;//生日
    double weight;//体重
    Color favColor;//最喜欢的颜色
    NSString *name;
    Dog *dog;
}
-(void)eat;
-(void)run;
-(void)print;
-(void)liuDog;
-(void)weiDog;
@end

@implementation Student

-(void)eat
{
    weight+=1;
    NSLog(@"吃完这次后的体重是%f",weight);
    
}
-(void)run
{
    weight-=1;
    NSLog(@"跑完这次后的体重是%f",weight);
    
}
-(void)print
{
    NSLog(@"性别=%d,喜欢的颜色=%d，姓名=%@,生日=%d-%d-%d",sex,favColor,name,birthday.year,birthday.month,birthday.day);
}
-(void)liuDog
{
    [dog run];
    
}
-(void)weiDog
{
    [dog eat];
}
@end

int main()
{
    Student *s=[Student new];
    Dog *d=[Dog new];
    d->curColor=ColorGreen;
    d->weight=20;
    s->dog=d;
    
    [s liuDog];
    [s weiDog];
  
    
    return 0;
}

void test()
{
      Student *s=[Student new];
      s->weight=50;
      s->sex=SexMan;
      s->name=@"jack";
      //Date d={2020,3,30};
      //s->birthday=d;
      //s->birthday.year=2020;
      //s->birthday.month=3;
      //s->birthday.day=30;
      
      Date d=s->birthday;
      d.year=2020;
      d.month=3;
      d.day=30;
      s->birthday=d;
      s->favColor=ColorBlack;
      
      
      [s eat];
      [s eat];
      
      [s run];
      [s run];
      
      [s print];
}

```

## 三 代码设计说明

* 可以将性别设计成枚举类
* 可以将生日设计成结构体