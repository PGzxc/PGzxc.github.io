---
title: Object-C开发之——学习大纲
categories:
  - 基础语言
  - Object-C
tags:
  - 学习大纲
abbrlink: e4c5840
date: 2018-06-14 11:11:59
---
# 前言
## 历史
1. Objective-C诞生于 20 世纪 80 年代
2. 由Brad Cox 发明
<!--more-->
## 简介
1. C语言的基础上，增加了一层最小的面向对象语法
2. 完全兼容C语言
3. 可以在OC代码中混入C语言代码，甚至是C++代码
# 入门
## 开发环境配置
Mac OS环境 Xcode
## 第一个ObjectC程序
### 创建
1. 创建一个Xcode项目
2. 选择Mac OS下的Command Line Tool
3. 输入项目名称和选择语言(Object-C)
4. 选择代码存放位置

### 编译运行
#### 过程
1、.m文件  
2、编译成.o文件  
3、链接a.out 可执行文件  

#### 项目介绍
1. Foundation
2. autoreleasepool
3. NSLog
4. #import的作用 

#### 文件类型
1. .h文件
2. .m文件
3. .mm文件


# 语法
## 关键字
### 特点
基本上所有关键字都是以@开头
### 带@关键字
### 不带@关键字
## 注释
## 数据类型
# 语法
## 面向对象
## 类
### 类也是个对象
1. 其实类也是一个对象，是Class类型的对象，简称“类对象”
2. Class类型的定义
3. 类名就代表着类对象，每个类只有一个类对象

### +load和+initialize
#### +load
1. 在程序启动的时候会加载所有的类和分类，并调用所有类和分类的+load方法
2. 先加载父类，再加载子类；也就是先调用父类的+load，再调用子类的+load
3. 先加载元原始类，再加载分类
4. 不管程序运行过程有没有用到这个类，都会调用+load加载

#### +initialize
1. 在第一次使用某个类时（比如创建对象等），就会调用一次+initialize方法
2. 一个类只会调用一次+initialize方法，先调用父类的，再调用子类的

#### 获取类对象的2种方式
1. Class c = [Person class]; // 类方法
2. Person *p = [Person new];
Class c2 = [p class]; // 对象方法
## 方法

### 方法的声明与实现
### set方法和get方法
### description方法
1. -description方法
2. + description方法

### 对象方法和类方法
#### 类方法
1. 以加号+开头
2. 只能用类名调用，对象不能调用
3. 类方法中不能访问实例变量（成员变量）
#### 对象方法
1. 以减号-开头
2. 只能让对象调用，没有对象，这个方法根本不可能被执行
3. 对象方法能访问实例变量（成员变量）
# 句法
## 语句
### 循环语句
1. do while
2. while
3. for

### 条件语句
1. if
### 选择语句
1. switch
# 高级应用
## 内存管理
### 什么是内存管理
1. 移动设备的内存极其有限，每个app所能占用的内存是有限制的
2. 当占用的内存较多时，系统会发出内存警告，这时回收一些不需要再使用的内存空间
### 管理范围
1. 任何继承了NSObject的对象
2. 对其他基本数据类型无效
### 对象的基本结构
1. 每个OC对象都有自己的引用计数器，是一个整数，表示“对象被引用的次数
2. 每个OC对象内部专门有4个字节的存储空间来存储引用计数器
### 引用计数器
#### 引用计数器的作用
1. 当使用alloc、new或者copy创建一个新对象时，新对象的引用计数器默认就是1
2. 当一个对象的引用计数器值为0时，对象占用的内存就会被系统回收

#### 引用计数器的操作
1. 给对象发送一条retain消息,可以使引用计数器值+1（retain方法返回对象本身）
2. 给对象发送一条release消息,可以使引用计数器值-1
3. 可以给对象发送retainCount消息获得当前的引用计数器值
### 对象的销毁
1. 当一个对象的引用计数器值为0时，那么它将被销毁，其占用的内存被系统回收
2. 当一个对象被销毁时，系统会自动向对象发送一条dealloc消息
3. 一般会重写dealloc方法，在这里释放相关资源，dealloc就像对象的遗言
4. 一旦重写了dealloc方法，就必须调用[super dealloc]，并且放在最后面调用
5. 不要直接调用dealloc方法
6. 一旦对象被回收了，它占用的内存就不再可用，坚持使用会导致程序崩溃（野指针错误）
### 内存管理原则
1. 谁创建，谁release
2. 谁retain，谁release
### ARC
#### 基本简介
1. ARC是自iOS 5之后增加的新特性
2. 完全消除了手动管理内存的烦琐
3. 编译器会自动在适当的地方插入适当的retain、release、autorelease语句

#### 基本原理
只要还有一个强指针变量指向对象，对象就会保持在内存中
#### 使用注意
1. 不能调用release、retain、autorelease、retainCount
2. 可以重写dealloc，但是不能调用[super dealloc]
3. @property : 想长期拥有某个对象，应该用strong，其他对象用weak
4. 其他基本数据类型依然用assign
5. 两端互相引用时，一端用strong、一端用weak
## 多线程管理
1. atomic :性能低（默认）
2. nonatomic :性能高

## Foundation
### 常用结构体
1. NSRange
2. NSPoint/CGPoint
3. NSSize/CGSize
4. NSRect/CGRect

### 数组
1. 不可变数组NSArray
2. 可变数组NSMutableArray

### 字符串
1. 不可变字符串NSString
2. 可变字符串NSMutableString

### Set集合
1. NSSet
2. NSMutableSet

### 字典
1. NSDictionary
2. NSMutableDictionary

### 其他
1. NSNumber
2. NSValue
3. NSDate


# 思维导图
![][1]

[1]: https://images.pgzxc.com/objectc-outline.png