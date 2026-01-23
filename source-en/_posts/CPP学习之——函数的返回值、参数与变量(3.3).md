---
title: CPP学习之——函数的返回值、参数与变量(3.3)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: 9755b292
date: 2019-10-26 10:43:29
---
## 一 概述 
本文将对前面所讲的函数，函数参数等概念加以总结，说明函数中的几个概念：函数返回值，函数的参数，及函数变量  

<!--more-->

## 二 代码

	#include<iostream>
	using namespace std;

	void show1()
	{
		cout<<"hello world";
	}

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

## 三 解析 

### 3.1 函数-返回值 
* void 表示函数没有返回值，如方法show1()
* int 表示函数返回整形值，如方法show()

### 3.2 函数-参数
* 空参数:表示不需要参数的函数，如方法show1()
* 带参数的函数，表示方法的执行需要传入参数，如方法show()


### 3.3 函数变量
* 如show()方法中的a或b，有数据类型，参与运算，并将结果返回