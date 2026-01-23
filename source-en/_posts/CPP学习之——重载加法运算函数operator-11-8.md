---
title: CPP学习之——重载加法运算函数operator+(11.8)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 运算符
abbrlink: 2275d329
date: 2019-11-22 10:27:43
---
## 一 概述

既然使用关键字operator配合运算符++可以实现对象的自加，那么关键字operator配合运算符+就可以实现将对象相加，本节我们就来学习一下重载加法运算函数operator+，减法运算的道理与加法相同，这里就不说了  

<!--more-->

## 二 实现分析

* 在使用operator+之前我们先来看如果没有operator+重载函数我们该如何对两个对象进行相加运算。
* 比如说我们定义了两个对象：sum a,b;然后将这两个对象相加的结果赋给第三个对象：sum c=a+b;
* 我们要实现这样的操作仍然要定义一个add()函数，该函数被对象a所调用，在调用的同时将对象b作为参数传递到add()函数中去，然后在函数中将两个对象的成员变量相加，并将结果传递到构造函数中，最后返回这个构造函数。

## 三 对象调用方法相加示例及结果输出

### 3.1 代码

```
#include<iostream>
using namespace std;
class num
{
private:
	int n;
public:
	num(){n=1;cout<<"构造函数执行\n";}
	num(int i){n=i;cout<<"带参数的构造函数执行\n";}
	num(const num&s){this->n=s.n;cout<<"复制构造函数执行\n";}
	~num(){cout<<"析构函数执行\n";}
	int get()const{return n;}
	void set(int x){n=x;}
	num add(const num&r){return num(n+r.get());}
	const num &operator++()
	{
		++n;
		return *this;
	}
	const num&operator++(int o)
	{
		num temp(*this);
		++n;
		return temp;
	}

};
int main()
{
	num one(1),two(2),three;
	three=one.add(two);
	cout<<"one:"<<one.get()<<endl;
	cout<<"two:"<<two.get()<<endl;
	cout<<"three:"<<three.get()<<endl;
	return 0;
}
```

### 3.2 输出结果

```
带参数的构造函数执行
带参数的构造函数执行
构造函数执行
带参数的构造函数执行
析构函数执行
one:1
two:2
three:3
析构函数执行
析构函数执行
析构函数执行
```

## 四 operator+示例及结果输出

### 4.1 代码

```
#include<iostream>
using namespace std;
class num
{
private:
	int n;
public:
	num(){n=1;cout<<"构造函数执行\n";}
	num(int i){n=i;cout<<"带参数的构造函数执行\n";}
	num(const num&s){this->n=s.n;cout<<"复制构造函数执行\n";}
	~num(){cout<<"析构函数执行\n";}
	int get()const{return n;}
	void set(int x){n=x;}
	const num operator+(const num&r){return num(n+r.get());}
	const num &operator++()
	{
		++n;
		return *this;
	}
	const num&operator++(int o)
	{
		num temp(*this);
		++n;
		return temp;
	}

};
int main()
{
	num one(1),two(2),three;
	//three=one.add(two);
	three=(one+two);
	cout<<"one:"<<one.get()<<endl;
	cout<<"two:"<<two.get()<<endl;
	cout<<"three:"<<three.get()<<endl;

	return 0;
}
```

### 4.2 输出结果

```
带参数的构造函数执行
带参数的构造函数执行
构造函数执行
带参数的构造函数执行
析构函数执行
one:1
two:2
three:3
析构函数执行
析构函数执行
析构函数执行
```

