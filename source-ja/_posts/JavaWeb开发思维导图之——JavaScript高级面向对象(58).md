---
title: JavaWeb开发思维导图之——JavaScript高级面向对象(58)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: e7ffe4f5
date: 2025-02-17 09:13:56
---
## 一 概述

* 类的定义和使用
* 字面量定义类和使用
* 继承


<!--more-->

## 二 内容详情

### 2.1 类的定义和使用

1-定义格式

class 类名{constructor(变量列表){变量赋值;}方法名(参数列表){方法体;return 返回值;}}

2-使用格式:

* let 对象名 = new 类名(实际变量值);
* 对象名.方法名();

3-示例

```
class Person{constructor(name,age){this.name=name;this.age=age;} show() {}}
let p = new Person("张三"，23)
let p = new Person("张三"，23)
```

### 2.2 字面量定义类和使用

1-定义格式

let 对象名={变量名:变量值,..,方法名: function(参数列表){方法体;return 返回值;}}

2-使用格式

* 对象名.变量名
* 对象名.变量名

3-示例

```
let person={name:"张三",age:23,eat:function(){}}
p.name
p.eat()
```

### 2.3 继承

1-概念

* 让类与类产生子父类的关系，子类可以使用父类有权限的成员
* 继承关键字: extends
* 顶级父类: Object

2-示例

```
class Work extends Person{constructor(name,age,salary){super(name,age);this.salary=salary;}}
```

## 三 思维导图

![javaweb-xmind-javascript-object-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-javascript-object-6.png