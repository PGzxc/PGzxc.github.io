---
title: P5.js开发之——基础Foundation(3)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 8e382b82
date: 2021-10-13 10:30:27
---
## 一 概述

本文介绍P5.js中的基础内容，包含

* 变量声明关键字`let`和常量关键字`const`
* 数据类型：boolean、string、number、object、class
* 运算符：`===`、`>`、`>=`、`<`、`<=`
* 语句：if-else、for、while、JSON
* 函数定义：function
* 内容打印：console

<!--more-->

## 二 变量声明关键字`let`和常量关键字`const`

### 2.1 区别

* let关键字用于声明变量，声明的变量可以再次修改
* const关键字用于声明常量，不可修改

### 2.2 示例

```
let x = 2;
const myFavNumber = 7;
```

## 三  数据类型：boolean、string、number、object、class

### 3.1 数据类型说明

* boolean：布尔类型，结果为true或false
* string：字符或字符串，字符串值必须由单引号（'）或双引号（“）包围
* number：数值类型，可以是整数、小数或其他进制数
* object：Object对象类型，对象内部有多个属性
* class：类类型(Class)，该类是创建对象的模板

### 3.2 示例

```
//1-boolean
let myBoolean = false;
//2-string
let mood = 'chill';
//3-number
let num = 46.5;
//4-object
let author = {
  name: '张三',
  age: 18
};
//5-class
class Rectangle {
  constructor(name, height, width) {
    this.name = name;
    this.height = height;
    this.width = width;
  }
}
let square = new Rectangle('square', 1, 1); // creating 
```

## 四 运算符：`===`、`>`、`>=`、`<`、`<=`

### 4.1 说明

* ===：严格相等运算符
* `>`：大于号运算符
* `>=`：大于等于运算符
* `<`：小于号运算符
* `<=`：小于等于运算符

### 4.2 示例

```
//1-===
console.log(1 === 1); // prints true to the console
//2->
console.log(100 > 1); // prints true to the console
//3->=
console.log(100 >= 100); // prints true to the console
//4-<
console.log(1 < 100); // prints true to the console
//5-<=
console.log(100 <= 100); // prints true to the console
```

## 五 语句：if-else、for、while、JSON

### 5.1 语句说明

* if-else：if-else条件控制语句
* for：循环控制语句
* while：while循环语句
* JSON.[stringify()](https://p5js.org/zh-Hans/reference/#/JSON/stringify)：Json转String语句

### 5.2 示例

```
//1-if-else
let a = 4;
if (a > 0) {
  console.log('positive');
} else {
  console.log('negative');
}
//2-for循环
for (let i = 0; i < 9; i++) {
  console.log(i);
}
//3-while循环
let num = 5;
while (num > 0) {
  num = num - 1;
  console.log(num);
}
```

## 六 函数定义：function

### 6.1 说明

* P5.js中通过function关键字定义函数
* function后面是函数的名称，函数可以有参数

### 6.2 示例

```
let myName = 'Hridi';
function sayHello(name) {
  console.log('Hello ' + name + '!');
}
sayHello(myName); // calling the function, prints "Hello 
```

## 七 内容打印：console

```
console.log('打印内容');
```

## 八 参考

* [P5.js—参考文献](https://p5js.org/zh-Hans/reference/)