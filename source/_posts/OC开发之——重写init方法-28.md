---
title: OC开发之——重写init方法(28)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: a9a773ae
date: 2020-04-08 23:20:14
---
## 一 概述

* 我们之前的代码，在进行类的初始化时，调用[类 new]方法，会创建出一个完整的对象
* OC中创建出一个完整的可用对象，会经历一下两个方法：
  - 调用+alloc分配存储空间(+alloc)，返回类对象
  - 调用对象-init进行初始化(-init)
* 但是，使用这种方式([类 new])，成员的默认值都是0，所以需要重写

<!--more-->

## 二 创建对象的方式
### 2.1 要创建的类名

```
//Person.h文件
#import <Foundation/Foundation.h>
@interface Person : NSObject
@property int age;
@end
```

### 2.2 new方式

```
Person *p=[Person new];
```

### 2.3 alloc和init方式

```
 //两行代码
 Person *p1=[Person alloc];
 Person *p2=[p1 init];
 //一行代码合并
 Person *p3=[[Person alloc]init];
```

### 2.4 说明

* new方式和默认的alloc和init方式，创建出来的对象，默认为0

## 三 重写init方式

### 3.1 init初始化构造方法说明

* init是类的默认初始化构造方法
* 初始化完成后，变量默认值是0
* 为了构造完成后，变量值不为0，需要在类的.m文件中重写init构造方法

### 3.2 Person.m文件中重写init构造方法

```
#import "Person.h"
@implementation Person
- (instancetype)init
{
    //self =[super init];
    if(self =[super init])
    {
        _age=10;
    }
    return self;
}
@end
```

### 3.3 main.m文件中调用(初始化年龄)

```
Person *p3=[[Person alloc]init];
NSLog(@"Person的年龄是%d",p3.age);
```

### 3.4 子类Student继承Person

```
//Student.h头文件
#import "Person.h"
@interface Student : Person
@property int no;
@end
//Student.m文件
#import "Student.h"

@implementation Student
-(instancetype)init
{
    if(self=[super init])
    {
        _no=1;   
    }
    return self;
}
@end
```

### 3.5 main.m文件中调用(初始化年龄和编号)

```
 Student *stu=[[Student alloc]init];
 NSLog(@"Student的年龄是%d，编号是%d",stu.age,stu.no);
```

## 四 id和instancetype的区别

### 4.1 在ARC(Auto Reference Count)环境下

* instancetype用来在编译器确定实例的类型
* id编译期不检查类型，运行时检查类型

### 4.2 在MRC(Manual Reference Count)环境下

* instancetype和id一样，不做具体类型检查

### 4.3 区别三

* id可以作为方法的参数，但instancetype不可以
* instancetype只适用于初始化方法和遍历构造器的返回值类型

## 五参考

* [OC中instancetype与id的区别][1]


[1]:https://www.jianshu.com/p/bd913b3a8e93