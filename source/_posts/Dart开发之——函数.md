---
title: Dart开发之——函数
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: ad06be84
date: 2021-02-07 16:25:35
---
## 一 概述

本文介绍Dart中的函数，涉及一下内容：

* main函数
* 自定义函数
* 可选参数的函数
* 匿名函数
* 闭包

<!--more-->

## 二 main函数

### 2.1 说明

* main是整个程序的入口
* 我们常见的main是省去了返回值，参数的函数

### 2.2 完整的main函数

```
void main(List<String> args)
{
  print(args);
}
```

在Program arguments处传入`1,2,3`后可以运行程序，并查看输出结果

## 三 自定义函数

### 3.1 说明

* 自定义函数用于给自定义的功能函数命名
* 函数返回值和类型在定义时，可以省略
* 只有一行代码的返回语句，可用双箭头代替
* 自定义一个函数满足下面的格式

  ```
  返回值 函数名(参数)
  {
  	函数体
  }
  ```

### 3.2 自定义函数

#### 按照规则定义函数

```
main() {
  var result=addFunction(1, 1);
  print(result);
}
int addFunction(int a, int b) {
  return a + b;
}
```

#### 省略返回值和参数类型

```
addFunction(a, b) {
  return a + b;
}
```

#### 双箭头返回语句定义

```
addFunction(a,b)=>a+b;
```

## 四 可选参数的函数

### 4.1 说明

* Dart中可选参数分为`名称可选参数`和`位置可选参数`
* `名称可选参数`中，参数列表放在大括号中；指明参数类型需要用`required`修饰，参数顺序不重要
* `位置可选参数`中，参数放在中括号中
* 可选参数可以设置默认值，调用时，可以省去参数传入

### 4.2 名称可选参数

```
main() {
  myFunc(age: 18,name: "张三");
}
myFunc({required String name, required int age}) {
  if (name != null) {
    print("名字是:$name");
  }
  if (age != null) {
    print("年龄是:$age");
  }
}
```

### 4.3 位置可选参数

```
main() {
 myFunc2("张三");
}
myFunc2(String name,[int? age]) {
  if (name != null) {
    print("名字是:$name");
  }
  if (age != null) {
    print("年龄是:$age");
  }
}
```

## 五 匿名函数

### 5.1 说明

* 没有名字的函数称为匿名函数
* 可以先给匿名函数变量赋值再调用；也可以直接通过匿名函数调用

### 5.2 示例

```
main() {
  //先赋值再调用
  var res = func(1, 2);
  print(res);
  //直接调用
  (a, b) {
    return a + b;
  }(1, 2);
}

var func = (a, b) {
  return a + b;
};
```

## 六 闭包

### 6.1 说明

闭包是一种函数对象作用范围

### 6.2 示例

```
main() {
  var package=func("张三");
  print(package());
}
func(name){
  return ()=>"Hello $name";
}
```

说明：

* 参数name只能在func内部使用，出了作用域就会失效
* func函数返回一个匿名函数，这个匿名函数就是一个闭包