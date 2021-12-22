---
title: CPP学习之——string与string数组(18.17)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: fbad3d72
date: 2019-12-27 21:54:50
---
## 一 概述

本节课主要介绍string与string数组的使用情况  

<!--more-->

## 二 string 示例演示

### 2.1 代码

```
#include<iostream>
using namespace std;
string show(const string p)
{
	cout << p << endl;
	return p;
}
int main()
{
	string str = "hello world";
	string str1 = show(str);
	cout << str1;
}
```

### 2.2 输出结果

```
hello world
hello world
```

## 三 string数组

### 3.1 代码

```
#include<iostream>
using namespace std;
void show(const string str[],int n);
int main()
{
	const int length=5;
	string str[length];
	for(int i=0;i<length;i++)
	{
		cout<<i+1<<":";
		cin>>str[i];
	}
	cout<<"输出结果："<<endl;
	show(str,length);

	return 0;
}
void show(const string str[],int n)
{

	for(int i=0;i<n;i++)
	{
		cout<<i+1<<":"<<str[i]<<endl;
	}
}
```

### 3.2 输出结果

```
1:apple
2:banana
3:orange
4:watermelon
5:pear
输出结果：
1:apple
2:banana
3:orange
4:watermelon
5:pear
```

### 3.3 说明

* string对象数组与二维char型数组差不多，如：string str[5] ，char str[5]
* 不同的是，string对象数组有自动调节数组大小的功能，而二维char数组缺没有，因此使用二维char型数组你必须将数组定义的足够大，以避免数组越界