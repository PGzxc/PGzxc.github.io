---
title: 'WinForm开发之——Stack(8.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: b56940b4
date: 2020-07-22 21:54:00
---
## 一 概述

C#中Stack(栈)是最常见的数据结构之一，栈是一种先进后出的结构，即元素从栈的尾部插入，从栈的尾部移除，类似于日常生活中搬家的时候撞车，先装上车的东西要后拿下来

<!--more-->

## 二 构造方法

### 2.1 构造方法

|      **构造方法**      |                           **作用**                           |
| :--------------------: | :----------------------------------------------------------: |
|        Stack()         |                使用初始容量创建 Stack 的对象                 |
| Stack(ICollection col) | 创建 Stack 的实例，该实例包含从指定实例中复制的元素，并且初始容量与复制的元素个数、增长因子相同 |
|  Stack(int capacity)   |             创建 Stack 的实例，并设置其初始容量              |

## 三 常用属性和方法

|    **属性或方法**    |                  **作用**                  |
| :------------------: | :----------------------------------------: |
|   Push(object obj)   |          向栈中添加元素，也称入栈          |
|    object Peek()     | 用于获取栈顶元素的值，但不移除栈顶元素的值 |
|     object Pop()     |    用于移除栈顶元素的值，并移除栈顶元素    |
|       Clear()        |         从 Stack 中移除所有的元素          |
| Contains(object obj) |        判断某个元素是否在 Stack 中         |
|  object[] ToArray()  |        复制 Stack 到一个新的数组中         |

## 四 实例 <font size=4> 创建一个栈（Stack），模拟餐馆盘子的存取 </font>

### 4.1 分析

 根据题目要求，先在栈中按顺序放置 5 个盘子，再将所有盘子取出，取盘子时应先取最上面的盘子，与栈的存取原理一致 

### 4.2 代码

```
class Program
{
    static void Main(string[] args)
    {
        Stack stack = new Stack();
        //向栈中存放元素
        stack.Push("1 号盘子");
        stack.Push("2 号盘子");
        stack.Push("3 号盘子");
        stack.Push("4 号盘子");
        stack.Push("5 号盘子");
        Console.WriteLine("取出盘子：");
        //判断栈中是否有元素
        while(stack.Count != 0)
        {
            //取出栈中的元素
            Console.WriteLine(stack.Pop());
        }
    }
}
```

### 4.3 说明

从上面的执行效果可以看出，通过Stack类提供的Pop方法可以依次从栈顶取出栈中的每一个元素