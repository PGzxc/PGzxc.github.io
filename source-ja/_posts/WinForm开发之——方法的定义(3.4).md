---
title: 'WinForm开发之——方法的定义(3.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 15f72512
date: 2020-07-14 20:46:50
---
## 一 概述

* C#语言有一个主方法Main()，它是执行程序的入口和出口
* 方法是将完成同一功能的内容放到一起，方便书写和调用的一种方式，也体现了面向对象语言中封装的特性

<!--more-->

## 二 方法定义的语法形式

```
访问修饰符    修饰符    返回值类型    方法名(参数列表)
{
    语句块;
}
```

### 2.1 访问修饰符

* 所有类成员访问修饰符都可以使用，如果省略访问修饰符，默认是private

### 2.2 修饰符

* 在定义方法时修饰符包括virtual(虚拟的)、abstract(抽象的)、override(重写的)、static(静态的)、sealed(密封的)。override是在类之间继承时使用的

### 2.3 返回值类型

* 用于在调用方法后得到返回结果，返回值可以是任意的数据类型，如果指定了返回值类型，必须使用return关键字返回一个与之类型匹配的值。如果没有指定返回值类型，必须使用void关键字表示没有返回值

### 2.4 方法名

* 对方法所实现功能的描述。方法名的命名是以Pascal命名法为规范的

### 2.5 参数列表

* 在方法中允许有0到多个参数，如果没有指定参数也要保留参数列表的小括号。参数的定义形式是"数据类型参数名"，如果使用多个参数，多个参数之间需要用逗号隔开

## 三 实例

### 3.1  在 Test 类中定义一个方法输出指定字段的值 

```
namespace code_1
{
    class Test
    {
        private int id;                         //定义私有的整型字段 id
        public readonly string name;            //定义公有的只读字符串类型字段 name
        internal static int age;                //定义内部的静态的整型字段 age
        private const string major = "计算机";  //定义私有的字符串类型常量 major
        private void PrintMsg()
        {
            Console.WriteLine("编号：" + id);
            Console.WriteLine("姓名：" + name);
            Console.WriteLine("年龄：" + age);
            Console.WriteLine("专业：" + major);
        }
    }
}
```

### 3.2  创建 Compute 类，分别定义 4 个方法实现加法、减法、乘法、除法的操作 

```
namespace code_1
{
    class Compute
    {
        //加法
        private double Add(double num1,double num2)
        {
            return num1 + num2;
        }
        //减法
        private double Minus(double num1,double num2)
        {
            return num1 - num2;
        }
        //乘法
        private double Multiply(double num1,double num2)
        {
            return num1 * num2;
        }
        //除法
        private double Divide(double num1,double num2)
        {
            return num1 / num2;
        }
    }
}
```
