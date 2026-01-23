---
title: CPP学习之——声明一个类(6.4)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 类
abbrlink: 83c487e7
date: 2019-11-03 21:45:33
---
## 一 概述

声明一个类然后我们才能使用它，这就好像给某人起名字一样，有了名字我们才能称呼他  

<!--more-->

## 二 如何声明类

### 2.1 代码

```
#include<iostream>
using namespace std;

class Human {

public:
	void GetStature();
	void GetWeight();
private:
	int stature;
	int weight;
};

int main() {
	return 0;
}

```

### 2.2 声明类时注意的事项

* public：表示它后面的成员都是公有的(公有的意思是该类的对象可以直接访问这些成员)
* private：表示它后面的成员都是私有的，不能被对象直接访问，必须通过公有的成员函数才能访问

### 2.3 声明类的过程中做了什么

* 声明一个类并没有为人类分配内存，它只是告诉编译器：人类是什么，它包含了哪些数据的类型，功能是什么。同时它还告诉编译器该类有多大，类的大小是根据该类的变量来定的，该类有两个成员变量，一个是身高，一个是体重，它们都是int型，我们知道一个Int型占用4个字节的内存，因此该类的大小是2乘以4等于8个字节。该类的方法不占用内存，因为我们没有为方法"GetStature()"和"GetWeight()"声明类型，它们的返回值是void
