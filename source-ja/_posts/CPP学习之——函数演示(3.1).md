---
title: CPP学习之——函数演示(3.1)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: db1ea437
date: 2019-10-26 10:38:13
---
## 一 函数概述
* 函数又叫方法，即实现某项功能或服务的代码块

<!--more-->

## 二 函数举例
### 2.1 功能
* 比如说，我们要实现输出一行文字的功能，可以这么来编写输出函数

<!--more-->

### 2.2 功能实现

	#include<iostream>
	using namespace std;
	
	void show()
	{
		std::cout<<"hello world"<<endl;
	
	}
	int main()
	{
		show();
	
	}