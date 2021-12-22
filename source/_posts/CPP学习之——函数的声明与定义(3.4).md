---
title: CPP学习之——函数的声明与定义(3.4)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: b1fe95b9
date: 2019-10-26 10:44:42
---
## 一 概述
在程序中使用函数时，你必须先声明它，然后再定义；

* 声明的目的是告诉编译器你即将要定义的函数的名字是什么，返回值的类型是什么以及函数是什么。  
* 而定义则是告诉编译器这个函数的功能是什么。    
* 假如我们不声明，那么该函数就不能被其他函数调用。通常我们把函数声明叫做函数原型，而把函数定义叫做函数实现。  

<!--more-->

## 二 示例

### 2.1 有声明，有定义
	#include<iostream>
	using namespace std;
	int add(int,int);

	int add(int x,int y)
	{
		return x+y;
	}

	int main()
	{
		cout<<add(1,2);
		return 0;
	}

### 2.2 没有声明，有定义 

	#include<iostream>
	using namespace std;
	//int add(int,int);

	int add(int x,int y)
	{
		return x+y;
	}

	int main()
	{
		cout<<add(1,2);
		return 0;
	}


## 三 没有声明引起的问题 

### 3.1 代码

	#include<iostream>
	using namespace std;
	void A()
	{
		cout<<"函数A"<<endl;
		B();
	}
	void B()
	{
		cout<<"函数B"<<endl;
		A();
	}
	int main()
	{
		A();
		B();
		return 0;
	}

### 3.2 异常

	error: 'B' was not declared in this scope



### 3.3 解决  

	#include<iostream>
	using namespace std;
	void A();
	void B();
	void A()
	{
		cout<<"函数A"<<endl;
		B();
	}
	void B()
	{
		cout<<"函数B"<<endl;
		A();
	}
	int main()
	{
		A();
		B();
		return 0;
	}

注：  

* 实现声明函数A和函数B
* 结果：因函数A和函数B相互调用，导致死循环