---
title: CPP学习之——析构函数和delete运算符(10.9-10.10)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: c5b15642
date: 2019-11-22 09:37:38
---
## 一 概述

本节主要介绍析构函数和delete运算符的使用 

<!--more-->

## 二 示例及结果输出

### 2.1 代码

```
#include<iostream>
using namespace std;
class A 
{
	public:
	A() {cout << "构造函数执行！\n";}
	~A() {cout << "析构函数执行！\n";}
};
int main() {
	A *p = new A;
	delete p;
	return 0;
}
```

### 2.2 输出结果

```
构造函数执行！
析构函数执行！
```