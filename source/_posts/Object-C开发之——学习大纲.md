---
title: Object-C开发之——学习大纲
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - 学习大纲
abbrlink: e4c5840
date: 2018-06-14 11:11:59
---
## 前言
### 历史
1. Objective-C诞生于 20 世纪 80 年代
2. 由Brad Cox 发明
<!--more-->

### 简介
1. C语言的基础上，增加了一层最小的面向对象语法
2. 完全兼容C语言
3. 可以在OC代码中混入C语言代码，甚至是C++代码

### 可以用来做什么
* 可以使用OC开发Mac OS X平台应用程序
* 可以使用OC开发ios平台的应用程序

## 入门
### 开发环境配置
* Mac OS环境 
* Xcode

### 第一个ObjectC程序
#### 创建
1. 创建一个Xcode项目
2. 选择Mac OS下的Command Line Tool
3. 输入项目名称和选择语言(Object-C)
4. 选择代码存放位置

#### 编译运行
##### 过程
1、.m文件  
2、编译成.o文件  
3、链接a.out 可执行文件  

##### 运行
点击左上角的编译运行按钮运行

##### 终端指令

```
//1-编译
cc -c main.m
//2-链接
cc main.o -framework Foundation
//3-运行
./a.out
```

#### 项目介绍
##### Foundation
* 开发OC、iOS、Mac程序必备的框架
* 此框架中包含了很多常用的API(应用程序接口)
* 框架中包含了很多头文件，若想使用整个框架的内容，包含它的主头文件即可

##### autoreleasepool
* 自动释放池
* 自由的管理内存

##### NSLog
打印输出
与printf的区别：

###### NSLog
* NSLog接收OC字符串作为参数
* NSLog输出后会自动换行
* 使用NSLog需要`#import<Foundation/Foundatin.h>`

###### printf
* printf接收C语言字符串作为参数
* printf输出后不会自动换行
* 使用printf需要`#include<stdio.h>`

##### \#import的作用 
* 跟#include一样，用来拷贝某个文件的内容
* 可以自动防止文件内容被拷贝多次

#### 文件类型
##### h文件
* 头文件
* 用来定义类，实例变量及类中的方法等定义信息(interface)

##### .m文件
* 源文件
* 定义方法体，可实现object-c和c方法(implemention)

##### .mm文件
* c++源文件

## 语法
### 关键字
#### 特点
基本上所有关键字都是以@开头
#### 分类
##### 带@关键字
###### 类使用
* @interface
* @implementation
* @end
* @class

###### 成员变量
* @property
* dynamic
* @synthesize

###### 可见性
* @public
* @protected
* @private

###### 协议
* @protocol
* @optional
* @required

###### selector

##### 不带@关键字

###### 类、对象
* self(实例方法中self指代本类的实例对象、类方法中self指代类对象)
* super(super相当于调用父类的方法)
* id(指向对象的指针)

###### ARC
* \__strong(指定该属性对赋值对象持有强引用、该对象就不会自动回收)
* \__weak(该对象可能被回收)

###### 其他
* \__block：块，是一个独立的逻辑处理单元
* \_cmd：表示当前方法的slector

### 注释
* 单行注释
* 多行注释

### 数据类型
#### 基本数据类型
* char
* int
* float
* double
* BOOL

#### nil
* 相当于NULL
* 值为0

#### 字符串
##### 字符串创建
* 字符串的快速创建(NSString *str=@“hello”;)
* 使用静态方法创建

##### 字符串输出 

## 语法
### 面向对象
#### 常用术语
* 面向过程：Procedure Oriented
* 面向对象：Object Oriented，简称OO
* 面向对象编程Object Oriented programming，简称OOP

#### 定义OC的类
##### 类的声明
* 使用@interface声明一个类
* @interface的大括号{}中声明的变量
* @public修饰变量的可访问性
* 继承自NSObject

##### 类的实现
@implemention实现类中声明

#### OC中的对象
* 对象创建：[Car new]
* 对象调用

#### 面向对象的特征
##### 封装
##### 继承
###### 继承的专业术语
* 父类\超类 superclass
* 子类 subclass\subclasses

###### 继承的细节
* 单继承
* 子类和父类不能有相同的成员变量
* 方法的重写

###### super关键字
分别调用父类的对象方法和类方法

###### 继承的好处与坏处
* 好处：1.不改变原来模型的基础上，拓展方法。2.建立了类与类之间的联系。 3.抽取了公共代码
* 坏处：耦合性强

###### 适用场所
* 它的所有属性都是你想要的，一般就继承
* 它的部分属性是你想要的，可以抽取出另一个父类

##### 多态
###### 概念
* 某一类事物的多种形态
* OC对象 具有多态性

###### 多态的体现
* 子类对象赋值给父类指针
* 父类指针访问对应的属性和方法

###### 多态的好处
父类接收参数，节省代码

###### 多态的局限
不能访问子类的属性(可以考虑强制转换)

###### 多态的细节
动态绑定：在运行时根据对象的类型确定动态调用的方法

#### 分类—Category
##### 概念
在不改变原来类模型的前提下，给类扩展一些方法
##### 方式
* 继承
* 分类(Category)

##### 格式
* 分类的声明：@interface类名(分类名称)
* 分类的实现：@implementation类名(分类名称)

##### 好处
* 一个庞大的类可以分模块开发
* 一个庞大的类可以由多个人来编写，更有利于团队合作


###  类
#### 类也是个对象
1. 其实类也是一个对象，是Class类型的对象，简称“类对象”
2. Class类型的定义
3. 类名就代表着类对象，每个类只有一个类对象

#### +load和+initialize
##### +load
1. 在程序启动的时候会加载所有的类和分类，并调用所有类和分类的+load方法
2. 先加载父类，再加载子类；也就是先调用父类的+load，再调用子类的+load
3. 先加载元原始类，再加载分类
4. 不管程序运行过程有没有用到这个类，都会调用+load加载

##### +initialize
1. 在第一次使用某个类时（比如创建对象等），就会调用一次+initialize方法
2. 一个类只会调用一次+initialize方法，先调用父类的，再调用子类的

##### 获取类对象的2种方式
1. Class c = [Person class]; // 类方法
2. Person *p = [Person new];Class c2 = [p class]; // 对象方法

### 方法

#### 方法的声明
* 不带参数的方法
* 带参数的方法

#### 方法的实现
#### set方法和get方法
#### description方法
1. -description方法
2. \+ description方法

#### 对象方法和类方法
##### 类方法
###### 特点
1. 以加号+开头
2. 只能用类名调用，对象不能调用
3. 类方法中不能访问实例变量（成员变量）

###### 使用场所
当不需要访问成员变量的时候，尽量使用类方法

##### 对象方法
1. 以减号-开头
2. 只能让对象调用，没有对象，这个方法根本不可能被执行
3. 对象方法能访问实例变量（成员变量）

#### NSLog输出增强

```
__FILE__:源代码文件名
__LINE__:NSLog代码在第几行
_cmd：代表当前方法的sel
```
## 句法
### 语句
#### 循环语句
1. do while
2. while
3. for

#### 条件语句
1. if
2. else if

#### 选择语句
1. switch

## 高级应用
### 内存管理
#### 什么是内存管理
1. 移动设备的内存极其有限，每个app所能占用的内存是有限制的
2. 当占用的内存较多时，系统会发出内存警告，这时回收一些不需要再使用的内存空间

#### 管理范围
1. 任何继承了NSObject的对象
2. 对其他基本数据类型无效

#### 对象的基本结构
1. 每个OC对象都有自己的引用计数器，是一个整数，表示“对象被引用的次数
2. 每个OC对象内部专门有4个字节的存储空间来存储引用计数器

#### 引用计数器
##### 引用计数器的作用
1. 当使用alloc、new或者copy创建一个新对象时，新对象的引用计数器默认就是1
2. 当一个对象的引用计数器值为0时，对象占用的内存就会被系统回收

##### 引用计数器的操作
1. 给对象发送一条retain消息,可以使引用计数器值+1（retain方法返回对象本身）
2. 给对象发送一条release消息,可以使引用计数器值-1
3. 可以给对象发送retainCount消息获得当前的引用计数器值

#### 对象的销毁
1. 当一个对象的引用计数器值为0时，那么它将被销毁，其占用的内存被系统回收
2. 当一个对象被销毁时，系统会自动向对象发送一条dealloc消息
3. 一般会重写dealloc方法，在这里释放相关资源，dealloc就像对象的遗言
4. 一旦重写了dealloc方法，就必须调用[super dealloc]，并且放在最后面调用
5. 不要直接调用dealloc方法
6. 一旦对象被回收了，它占用的内存就不再可用，坚持使用会导致程序崩溃（野指针错误）

#### 内存管理原则
##### 原则分析
* 只要还有人在使用某个对象，那么这个对象就不会被回收
* 只要你想用这个对象，就让这个对象的计数器+1
* 当你不在使用这个对象时，就让该对象的计数器-1

##### 管理原则
1. 谁创建，谁release
2. 谁retain，谁release

#### ARC
##### 基本简介
1. ARC是自iOS 5之后增加的新特性
2. 完全消除了手动管理内存的烦琐
3. 编译器会自动在适当的地方插入适当的retain、release、autorelease语句

##### 基本原理
只要还有一个强指针变量指向对象，对象就会保持在内存中
##### 使用注意
1. 不能调用release、retain、autorelease、retainCount
2. 可以重写dealloc，但是不能调用[super dealloc]
3. @property : 想长期拥有某个对象，应该用strong，其他对象用weak
4. 其他基本数据类型依然用assign
5. 两端互相引用时，一端用strong、一端用weak

### 多线程管理
1. atomic :性能低（默认）
2. nonatomic :性能高

### Foundation
#### 常用结构体
1. NSRange
2. NSPoint/CGPoint
3. NSSize/CGSize
4. NSRect/CGRect

#### 数组
1. 不可变数组NSArray
2. 可变数组NSMutableArray

#### 字符串
1. 不可变字符串NSString
2. 可变字符串NSMutableString

#### Set集合
1. NSSet
2. NSMutableSet

#### 字典
1. NSDictionary
2. NSMutableDictionary

#### 其他
1. NSNumber
2. NSValue
3. NSDate

# 思维导图
![][1]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/objectc-outline.png