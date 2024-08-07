---
title: CPP学习之——使用const指针来传递对象(9.12)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: b9e5ee14
date: 2019-11-19 22:29:56
---
## 一 概述

* 按址传递对象虽然可以避免调用复制构造函数和析构函数，但是由于它得到了该对象的内存地址，可以随时修改对象的数据。所以，它实际上是破坏了按值传递的保护机制。   

<!--more-->

## 二 原因说明及避免办法

### 2.1 原因

* 比如说按值传递就像把罗浮宫的那副达芬奇的画制作一个副本，送交法国总理希拉克的官邸，这样希拉克堆该花的任何操作也不会影响到原画。不过假如希拉克亲自跑到罗浮宫去观赏原画，那么他完全可以对原画进行修改或操作

### 2.2 避免办法

不过我们仍然对此有解决办法，那就是用const指针来接受对象，这样就可以防止任何试图对该对象所进行的操作行为，并且保证返回一个不被修改的对象



## 三 修改过程(func函数)
### 3.1 过程

* A *one——>A \*const* one:指针one不可修改
* A const* one——const A \*const* one: 指针one指向的对象不可修改
* A* func——A *const func：返回的one指针不可修改
* A *const func——const A\*const func：返回的one指针不可修改

### 3.2 结果

* 这样就保证了传递进来的数据不被修改
* 同时又保证了返回的数据也不会被修改

## 四 代码及结果输出

### 4.1 代码

```
#include<iostream>
using namespace std;
class A {

public:
	A() {cout << "执行构造函数，创建一个对象\n";}
	A(A&) {cout << "执行复制构造函数，创建该对象的副本\n";}
	~A() {cout << "执行析构函数，删除该对象\n";}
	void set(int x){i=x;}
	int get()const{return i;}
private:
	int i;
};
const A *const func(const A *const one) {
	//one->get();
	//one->set(11);
	//one++;
	return one;
}
int main() 
{
	A a;
	a.set(11);

	const A *const p=func(&a);
	//p++;
	//p->set(11);
	cout<<"p:"<<p<<endl;
	cout<<"a:"<<&p<<endl;
	cout<<p->get()<<endl;
	return 0;
}
```

### 4.2 输出结果

```
执行构造函数，创建一个对象
p:0x22fe30
a:0x22fe28
11
执行析构函数，删除该对象
```

### 4.3 说明

* 本节主要讲了const的用法
* 我们将函数的返回值和接收参数都定义为const，就可以保证函数内不可修改原始值，同时避免利用返回值对原始值进行修改，所以加上了这个const，实际上是为了实现按值传递的保护机制，同时又避免按值传递的开销，因为不用再调用复制构造函数
* 但是加const很麻烦，下一节课讲一种更简便的方法：按别名传递对象
* 有的人会问了，你不是说这个指向常量的常指针，它指向的对象是不可修改的吗？怎么a.set(11)这里又对它进行修改了呢？这是因为指向常量的常指针，只是限制我们用该指针修改它指向的对象的值，但是它并不会改变原始对象的属性。比如说，它将原来的对象a改为常量对象，它不会这么做，所以我们还可以用对象a修改自身的值，因为这个对象a，不是常量对象。但是我们不能通过p指针来修改它指向的对象a，因为const限制了它这么做