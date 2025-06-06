---
title: Ruby开发之——介绍(1)
categories:
  - 开发
  - B-高级语言
  - Ruby
tags:
  - Ruby
abbrlink: '78166977'
date: 2024-12-17 09:11:52
---
## 一 概述

* Ruby是什么？
* Ruby的功能特点
* Ruyb与Python比较

<!--more-->

## 二  Ruby是什么？

### 2.1 Ruby是什么？

* Ruby是一种动态的，开源的，面向对象的和反射的编程语言。
*  它运行在所有类型的平台上，如：Windows，Mac OS和所有版本的UNIX系统
* 它是完全面向对象的编程语言。 一切东西都是Ruby中的一个对象。 每个代码都有其属性和动作(方法)。 这里的属性是指变量，动作则是指参考的方法。

### 2.2 Ruby的历史

Ruby由 Yukihiro 、“Martz” 、Matsumoto 在20世纪90年代中期在日本设计开发的

## 三 Ruby的功能特点

### 3.1 面向对象

* Ruby是纯粹面向对象的编程语言。
* 每个值都是一个对象。
*  每个对象都有一个类，每个类都有一个超类。 
* 每个代码都有其属性和动作。 Ruby受到Smalltalk语言的影响。
*  适用于对象的规则适用于整个Ruby。

### 3.2 灵活性

* Ruby是一种灵活的语言，可以轻松地删除，重新定义或添加现有部件。
* 它允许其用户根据需要自由地更改其部件。

### 3.3 混合类型

* Ruby只具有单一继承的功能。
*  Ruby有类和模块。
*  模块有方法，但没有实例。
*  相反，一个模块可以混合到一个类中，它将该模块的方法添加到类中。
*  它类似于继承，但更灵活。

### 3.4 视觉外观

* Ruby通常更像英文关键字，一些标点符号用于装饰Ruby。
* 它不需要变量声明。

### 3.5 动态输入和鸭式输入

* Ruby是一种动态的编程语言。
* Ruby程序不用经过编译就可以执行。
*  所有的类，模块和方法定义的代码是在运行时构建的。
* Ruby变量是松散类型的语言，任何变量都可以容纳任何类型的对象。 
* 当在对象上调用一个方法时，Ruby只会查找该名称，而不管对象的类型如何。
* 鸭式输入它允许制作假设为其他类的类。

### 3.6 变量常数

* 在Ruby中，常量并不是很常数。
*  如果一个已经初始化的常量在脚本中被修改，那么它只会触发一个警告，但不会停止程序。

### 3.7 命名约定

Ruby为其变量，方法，常量和类定义了一些命名约定。

* 常数：以大写字母开头。
* 全局变量：以美元符号(`$`)开头。
* 实例变量：以(`@`)符号开始。
* 类变量：从(`@@`)符号开始。
* 方法名称：允许以大写字母开头。

### 3.8 关键字参数

像Python一样，也可以使用关键字参数来定义Ruby方法。

### 3.9 方法名称

* 方法允许以问号(`?`)或感叹号(`!`)结尾。 
* 按照惯例，回答问题的方法以问号结束，指定方法可以用感叹号改变对象结束的状态。

### 3.10 单例方法

* Ruby单例方法是每个对象的方法。
*  它们只对您定义的对象可用。

### 3.11 缺少方法

如果一个方法丢失，Ruby将使用`lost`方法名称来调用`method_missing`方法。

### 3.12 语句分隔符

单行中的多个语句时，语句中间必须包含分号。

### 3.13 关键词

在Ruby中有大约`42`个关键字不能用于其他目的。 它们称为保留字

### 3.14 区分大小写

Ruby是区分大小写的语言。 小写字母和大写字母表示不同对象含义

## 四 Ruyb与Python比较

Ruby和Python编程语言之间存在许多差异和相似之处

### 4.1 相似之处

* 它们都是高级语言。
* 它们都是服务器端脚本语言。
* 两者都用于Web应用程序。
* 两个工作在多个平台上。
* 两者都具有清晰的语法，易于阅读。
* 两者都使用一种叫作`irb`的交互式提示。
* 对象都是强大的动态类型。
* 两者都使用嵌入式`doc`工具

### 4.2 不同之处

|        术语         |                             Ruby                             |                            Python                            |
| :-----------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|        定义         |            Ruby是一种开源的Web应用程序编程语言。             |                  Python是一种高级编程语言。                  |
|      面向对象       |                      面向对象编程语言。                      |                  不完全面向对象的编程语言。                  |
|    创始人/开发者    |                     松本在20世纪90年代。                     |                Guido Van Rossum在20世纪80年代                |
|      开发环境       |                        支持EclipseIDE                        |                         支持多个IDE                          |
|       程序库        |                       它比Python库更小                       |                        有较大范围的库                        |
|      混合类型       |                        可使用混合类型                        |                       不可使用混合类型                       |
|       Web框架       |                        Ruby on Rails                         |                            Django                            |
|        社区         |                      主要集中在Web应用                       |                     专注于学术界和Linux                      |
|        使用         |      苹果Github上的Twitter Groupon的Shopify ThemeForest      | 谷歌Instagram的Mozilla Firefox浏览器，华盛顿邮报，雅虎Shopzilla |
|       内置类        |                        内置类可以修改                        |                       内置类不可以修改                       |
|       elseif        |                            elsif                             |                             elif                             |
|    取消设置变量     | 一旦设置了变量，就无法将其设置为不可用。只要它在范围内，它将出现在符号表中。 |               del语句用于删除一个设置的变量。                |
|    `yield`关键字    |     它将执行另一个作为最终参数传递的函数，然后立即恢复。     |   它将执行返回到函数调用之外的范围。外部代码负责恢复功能。   |
|      匿名函数       |              支持块，`procs`和`lambdas`表达式。              |                    仅支持`lambda`表达式。                    |
|        函数         |                           没有函数                           |                            有函数                            |
|        元组         |                         它不支持元组                         |                           支持元组                           |
| `switch`/`case`语句 |                  它支持`switch`/`case`语句                   |                 它不支持`switch`/`case`语句                  |
|    `lambda`函数     |                     它的`lambda`函数更大                     |                   它只支持单行`lambda`函数                   |
|        继承         |                          支持单继承                          |                          支持多继承                          |

## 五 参考

* [益佰教程—Ruby](https://www.yiibai.com/ruby/ruby-vs-python.html)
* [菜鸟教程—Ruby](https://www.runoob.com/ruby/ruby-intro.html)