---
title: 'WinForm开发之——泛型简介(9.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 4eb40b00
date: 2020-07-22 21:57:37
---
## 一 概述

在前面已经介绍了类和方法的定义，那么泛型究竟有什么作用呢？在前面集合一节中介绍了集合，集合中的项允许 是object型的值，因此可以存放任意类型的值

<!--more-->

## 二 泛型说明

### 2.1 举例

```
ArrayList arrayList=new ArrayList();
arrayList.Add(100);
arrayList.Add("abc");
arrayList.Add(85.5);
```

* 在ArrayList中以double类型存入学生考试成绩，但存入值时并没有做验证，存入了其他数据类型的值

### 2.2 输出

```
foreach (int d in arrayList)
{
    Console.WriteLine(d);
}
```

* 在输出集合中的元素时，如果使用double类型来遍历集合中的元素
* 执行上面的代码，由于在集合中存放的并不全是double类型的值，因此会出现System.InvalidCastException异常，即指定的转换无效

## 三 总结

为了避免类似的情况产生，将集合中元素的类型都指定为double类型，不能在集合中输入其他类型的值，这种设置方式即为泛型的一种应用