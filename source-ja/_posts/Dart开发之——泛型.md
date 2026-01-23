---
title: Dart开发之——泛型
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: aad3ac38
date: 2021-02-08 15:36:13
---
## 一 概述

泛型：把类型明确的工作推迟到创建对象或调用方法的时候

* 泛型定义
* 泛型约束及泛型函数

<!--more-->

## 二 泛型定义

### 2.1 概念

* 泛型定义：使用`<数据类型>`
* 集合中存储的数据类型与定义泛型时要一直，不然会出错

### 2.2 泛型示例

#### 基本数据类型

```
 List<String> list = ["1", "2", "3", "4"];
```

#### 泛型T

```
main() {
  var print1=printData(1);
  var print2=printData("1");
  print(print1.runtimeType);
  print(print2.runtimeType);
}
class printData<T> {
  T t;
  printData(this.t);
}
```

## 三 泛型约束及泛型函数

### 3.1 说明

* 泛型约束：又叫泛型受限，使用`extends`限定，指参数只能取值某个规定类的子类
* 泛型函数：指函数的参数只能取值某个已知类及其子类

### 3.2 泛型约束

```
abstract class Object {}
class Animal extends Object {}
class printClass<T extends Object> {}
main() {
  var printC = printClass<Animal>();
}
```

### 3.3 泛型函数

```
abstract class Object {
  var name;
  Object(this.name);
}
class Animal extends Object {
  Animal(name) : super(name);
}

Object printObj<Object>(Object obj) {
  return obj;
}

main() {
  Object obj = printObj(Animal("狗"));
  print(obj.name);
}
```

