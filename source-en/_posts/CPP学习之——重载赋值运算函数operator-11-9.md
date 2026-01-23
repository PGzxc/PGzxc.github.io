---
title: CPP学习之——重载赋值运算函数operator=(11.9)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 运算符
abbrlink: 2a688675
date: 2019-11-25 22:28:46
---
## 一 概述

某些情况下，当我们编写一个类的时候,，并不需要为该类重载“=”运算符，因为编译系统为每个类提供了默认的赋值运算符“=”，使用这个默认的赋值运算符操作类对象时，该运算符会把这个类的所有数据成员都进行一次赋值操作
<!--more-->
## 二 示例及结果输出

### 2.1 代码

```
#include<iostream>
using namespace std;
class num 
{
private:
	int *n;
public:
	num() 
	{
		n = new int;
		*n = 1;
		cout << "构造函数执行\n";
	}
	num(const num &s) 
	{
		n = new int;
		*n = s.get();
		cout << "复制构造函数执行\n";
	}
	~num() 
	{
		delete n;
		n = NULL;
		cout << "析构函数执行\n";
	}
	int get() const {return *n;}
	void set(int x) {*n = x;}
	const num& operator=(const num &r) 
	{
		if (this == &r) {return *this;}
		cout << "operator=函数在调用\n";
		*n = r.get();
		return *this;
	}

};
int main() 
{
	num one, two;
	one.set(1);
	num three;
	three = two = one;
	cout << three.get() << endl;
	return 0;
}
```

### 2.2 输出结果

```
构造函数执行
构造函数执行
operator=函数在调用
operator=函数在调用
1
析构函数执行
析构函数执行
析构函数执行
```

### 2.3 代码说明

* 重载赋值运算函数operator=