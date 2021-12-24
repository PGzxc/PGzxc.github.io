---
title: Dart开发之——类
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: 6a38704c
date: 2021-02-08 13:38:29
---
## 一 概述

本文介绍Dart中对象的模板：类，涉及一下知识点：

* 自定义类和构造方法
* 类中属性和实例方法及静态属性和方法
* 抽象类及抽象方法
* 类的继承
* 类的运算符重载
* 枚举类型
* 扩展类的功能——Mixin

<!--more-->

## 二 自定义类和构造方法

### 2.1 说明

* 用`class`关键字来定义类
* 根据实际需求用于描述对象，定义属性信息(如年龄，性别等)
* 构造方法：定义一个初始化时已经有属性的对象(年龄，性别)

### 2.2 示例

#### 自定义类及其赋值

```
class People {
  //年龄
  late int age;
  //姓名
  late String name;
}
main() {
  var people = People();
  people.name = "张三";
  people.age = 18;
}
```

#### 带有构造方法的类

```
class People {
  //年龄
  late int age;
  //姓名
  late String name;
  People(int age, String name) {
    this.age = age;
    this.name = name;
  }
}
main() {
  var people = People(18,"张三");
}
```

#### 构造方法简写形式(类(this.属性))

```
class People {
  //年龄
  late int age;
  //姓名
  late String name;
  People(this.age, this.name);
}
main() {
  var people = People(18, "张三");
  print("姓名：${people.name},年龄:${people.age}");
}
```

## 三 类中属性和实例方法及静态属性和方法

### 3.1 说明

* 类中属性和实例方法是对象具备的属性和行为，需要先初始化对象再调用
* 静态属性和方法是属于类的，直接通过`类.属性`和`类.方法`直接调用

### 3.2 示例—普通类

```
class Teacher {
  String name;
  String subject;
  Teacher(this.name, this.subject);

  void teach() {
    print("我是${this.name}老师，我要讲${this.subject}");
  }
}
main() {
  var teacher=Teacher("张三", "Dart");
  teacher.teach();
}
```

### 3.3 示例—静态类

```
class Teacher {
  static String name = "张三";
  static teach() {
    print("Dart");
  }
}
main() {
  print(Teacher.name);
  Teacher.teach();
}
```

## 四 抽象类及抽象方法

### 4.1 说明

* 抽象类不可以被实例化，即不能直接使用抽象类来构造实例对象
* 只能通过实现这个抽象类接口的类或者继承它的子类来实例化对象

### 4.2 示例

```
abstract class People {
  late String name = "张三";
  People(this.name);
  void eat();
}

class Student extends People {
  Student(String name) : super(name);
  @override
  void eat() {
    print("${this.name}在吃饭");
  }
}

main() {
  var student=Student("李四");
  student.eat();
}
```

## 五 类的继承

### 5.1 说明

* Dart中，使用extends关键字进行类的继承
* 子类继承父类后，可以直接使用父类中定义的属性和方法
* 子类可以对父类的方法进行重写

### 5.2 示例

```
class People {
  String name;
  int age;

  People(this.name, this.age);

  void sayHi() {
    print("Hello");
  }
}

class Teacher extends People {
  Teacher(String name, int age) : super(name, age);

  void teach() {
    print("${this.name}正在教学");
  }
}

main() {
  var teacher = Teacher("张三", 18);
  teacher.sayHi();
  teacher.teach();
}
```

## 六 类的运算符重载

### 6.1 说明

* 类的运算符重载是指：直接可以使用类进行操作(如算数运算符+)
* 运算符重载的实质是方法的调用

### 6.2 运算符重载格式

```
返回值类型 operator 运算符(参数类别)
{
	函数体
}
```

### 6.3 示例

```
class Size {
  num width = 0;
  num height = 0;
  Size(this.width, this.height);
  Size operator +(Size size) {
    return Size(this.width + size.width, this.height + size.height);
  }
  desc() {
    print("width:${this.width},height:${this.height}");
  }
}
main() {
  var size1=Size(3, 6);
  var size2=Size(2, 2);
  var size3=size1+size2;
  size3.desc();
}
```

## 七 枚举类型

### 7.1 说明

* 当数据集合固定，且不可修改时，使用枚举来定义
* Dart中使用`neum`类定义枚举

### 7.2 示例

```
enum WeekDay
{
  MONDAY,
  TUESDAY,
  SUNDAY,
  FRIDAY,
  SATURDAY,
  THURSDAY,
  wednesday
}
main() {
  print(WeekDay.values);
  print(WeekDay.MONDAY.index);
}
```

## 八 扩展类的功能——Mixin

### 8.1 说明

* Dart中，Mixin用于类与类之间的关系，表示类之间的扩展，是继承关系的延伸
* 使用Mixin定义的Mixin类不能被继承，也不能实例化
* 当一个类需要多个类中的方法时，就可以使用Mixin
* 多个Mixin有先后关系，子类方法—>后面的Mixin—>前面的Mixin
* 两个Mixin之间的继承关系用`on`

### 8.2 示例

```
class Mixin {
  func() {
    print("Mixin func");
  }
}

mixin Two {
  func() {
    print("two func");
  }
}
mixin One on Mixin {
  @override
  func() {
    print("one func");
  }
}

class Father extends Mixin {
  @override
  func() {
    print("father func");
  }
}

class Sub extends Father with Two, One {
  @override
  func() {
    print("sub func");
  }
}

main() {
  var obj = Sub();
  obj.func();
}
```

