---
title: OC开发之——第一个OC类(6)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 76bb2048
date: 2020-03-22 22:43:40
---
## 一 概述

* 接下来就在OC中模拟现实生活中的情况，创建一辆车出来。首先要有一个车子类，然后再利用车子类创建车子对象
* 要描述OC中的类稍微麻烦一点，分2大步骤：类的声明、类的实现

<!--more-->

## 二 代码编写

### 2.1类的声明

#### 2.1.1 分析过程

* 定义一个Car类，拥有2个属性：轮子数、时速，1个行为：跑
* 类名\属性的命名规则：标示符的规则
* 类名的命名规范：有意义、驼峰标识、首字母大写

#### 2.1.2 类的声明(代码)

```
#import <Foundation/Foundation.h>
// 类的声明
@interface Car : NSObject
{
    @public
    int wheels; // 多少个轮子
    int speed; // 时速
}
- (void)run; // 跑的行为
@end
```

#### 2.1.3 代码说明

* @interface的大括号{}中声明的变量：wheels、speed
* @interface的大括号和函数的大括号是不一样的
* 默认会初始化为0
* @public可以让Car对象的wheels和speed属性被外界访问
* 加上：NSObject的目的是让Car类具备创建对象的能力

### 2.2 类的实现

#### 2.2.1 类的实现(代码)

```
@implementation Car
- (void) run
{
    NSLog(@"%i个轮子，%i时速的车子跑起来了", wheels, speed);
}
@end
```

#### 2.2.2 代码说明

* 类的实现开始标识符是@implementation，后面紧跟着类名，结束标识符是@end
* 大括号中书写类中的方法

### 2.3 创建对象

#### 2.3.1 代码编写

```
// 主函数
int main()
{
    // 创建车子对象
    Car *c = [Car new];
    c->wheels = 3;
    c->speed = 300;
    
    [c run];
    return 0;
}
```

#### 2.3.3 代码说明

* [Car new]每次都会创建出新的对象，并且返回对象的地址，那么就应该用一个指针变量保存对象的地址：`Car *c=[Car new];`，用一个指针变量c指向内存中的Car对象
* 设置车子对象的属性：跟用指向结构体的指针访问结构体属性一样，用`->`
  - c->wheels=3;
  - c->speed=300;

#### 2.3.4 创建多个对象

```
//分别只设置wheels、speed属性
Car *c1 = [Car new];
c1->wheels = 4;
Car *c2 = [Car new];
c2->speed = 250;
[c1 run];
//1个赋值给另一个，然后修改属性
Car *c1 = [Car new];
c1->wheels = 4;
c1->speed = 250;
Car *c2 = c1;
c2->wheels = 3;
[c1 run];
```
#### 2.3.5 面向对象封装的好处

* 更加接近人类的思考方式
* 只需要关注对象，不需要关注步骤

#### 2.3.6 对象与函数参数

* 对象成员变量作为函数参数(修改指向对象的成员)
* 指向对象的指针作为函数参数(修改指针的指向)

## 三 完整代码

```
#include <Foundation/Foundation.h>

@interface Car : NSObject
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
    NSLog(@"车子跑起来了");
}
@end

int main()
{
    Car *car1=[Car new];
    car1->wheels=4;
    car1->speed=200;
    
    Car *car2=[Car new];
    car2->wheels=4;
    car2->speed=250;
    
    NSLog(@"车子有轮子数：%d，车速：%d",car1->wheels,car1->speed);
    [car1 run];
    return 0;
}
```

## 四 类的声明和实现(概念问题)

### 4.1 @interface和@implementation的分工

* @interface就好像暴漏在外面的钟表表面
* @implementation就好像隐藏在时钟内部的构造实现

### 4.2 常见错误

* 只有类的声明，没有类的实现
* 漏了@end
* @interface和@implementation嵌套
* 两个类的声明嵌套
* 成员变量没有写在括号里面
* 方法的声明写在了大括号里面

### 4.3 语法细节

* 成员变量不能在{}中进行初始化，不能被直接拿出去访问
* 方法不能当做函数一样调用
* 成员变量\方法不能用static等关键字修饰，别跟C语言混在一起(暂时忽略)
* 类的实现可用写在main函数的后面，主要在声明后面就行了

### 4.4 OC方法和函数的区别

* OC方法只能声明在@interface和@end之间，只能实现在@implementation和@end之间。也就是会说OC方法不能独立与类存在
* C 函数不属于类，跟类没有联系，C函数只规定函数的文件所有
* C函数不能访问OC对象的成员
* 低级错误：方法有声明，但是实现的时候写成了函数

### 4.5 OC的方法注意

* 方法只有声明，没有实现(经典错误)
* 方法没有声明，只有实现(编译器警告，但是能调用，OC的弱语法)
* 编译的时候：访问没有的成员变量直接报错，访问没有的方法，只是警告

### 4.6 @implementation

* 没有@interface，只有@implementation，也是能成功定义一个类的
* @implementation中不能声明和@interface一样的成员变量
