---
title: Dart开发之——变量
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: cf54b09a
date: 2021-01-21 11:01:00
---
## 一 概述

* 变量：在编程语言中指：通过变量名可以访问的字段
* 根据参数修饰符，可把变量分类为：可变变量和不可变变量
* 可变变量用修饰符`var`、`dynamic`或者常见数据类型修饰(String，Map)等
* Dart中变量修饰符没有`val`(区别于`js`或`kotlin`)
* 不可变变量修饰符用`final`或`const`

<!--more-->

## 二 可变变量

### 2.1 概念

* var变量在赋值之后，变量类型不可修改(赋值为其他类型)
* 变量只声明，未赋值，默认值为null(赋值类型可改变)
* dynamic修饰变量类型是可变的(动态的)

### 2.2 var变量

#### 2.2.1 只声明

```
 var name ; //var修饰变量
 int age; //基本数据类型修饰变量
 print(name);
 name = "李四";
 print(name);
 name=1;
 print(name);
```

#### 2.2.2 声明并赋值

```
 var name="张三" ; //var修饰变量
 int age=1; //基本数据类型修饰变量
 name = "李四";
```

### 2.3 dynamic变量(直接+变量名，不可加修饰符)

```
 dynamic name="张三";
 dynamic age=1;
 name=2;
```

## 三 不可变变量

### 3.1 概念

* 不可变变量指在开发中，不需要发生变化的值，如配置项
* `final`关键字声明的变量为最终变量
* `const`关键字声明的变量为常量
* 不可变变量都需要对变量进行赋值

### 3.2 final不可变变量

```
 final name="张三";
 final int age =1 ;
```

### 3.3 const不可变变量

```
 const name="张三";
 const int age =1 ;
```

