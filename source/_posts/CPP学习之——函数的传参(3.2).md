---
title: CPP学习之——函数的传参(3.2)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: 5f15da5a
date: 2019-10-26 10:40:56
---
## 一 前言
上一篇为了便于读者了解函数的缘故，用了一个不带参数的函数。由于show函数内仅仅是输出一行字符，并未涉及到任何运算，因此小括号中的参数为空。下面我们将讲述使用带参数传递的函数。  

<!--more-->

## 二 带参数函数的演示

### 2.1 条件
* 假如我们有2个变量a和b，它们的值分别为3和4
* 我们要在show函数中将两个变量相加
* 那么我们就需要为show函数提供两个参数

### 2.2 过程
* 这两个参数是形式上的参数，即它表示show函数可以接受两个整数，并用两个形式上的名字来称呼这两个整数，形式上的名字即它们不是实际的变量名，它们只是用来代表连个整数的操作，一个是a，另一个是b，然后在函数体重将a和b相加，并返回这个结果。
* 由于它们是形式上的参数名，因此你也可以换成你自己喜欢的参数名

### 2.3 代码 

	#include<iostream>
	using namespace std;
	
	int show(int a,int b)
	{
		return a+b;
	}
	int main()
	{
		int a,b;
		cout<<"请输入两个整数："<<endl;
		cin>>a;
		cin>>b;
		cout<<"a+b="<<show(a,b)<<endl;
		return 0;
	}

### 2.4 结果 

	请输入两个整数：
	1
	2
	a+b=3


![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-chapter-3-function-params.gif