---
title: CPP学习之——string型对象的赋值(18.3)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: e25762be
date: 2019-12-23 21:26:08
---
## 一 概述

本节课主要讲述char型数组的赋值和string型字符串的赋值   

<!--more-->

## 二 char型数组的赋值

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[]="give me";
	char ch2[]="a cup";
	strcpy(ch1,ch2);
	cout<<ch1<<endl;
	cout<<ch2<<endl;
	return 0;
}
```

### 2.2 输出

```
a cup
a cup
```

### 2.3 说明

我们还要注意两点：  

* 第一：strcpy会将char2中的所有字符，包括结束标志'\0'一块赋值到ch1中去。
* 第二：不可以直接对char型字符数组进行赋值操作，如：char a[9],b[9]; a=b;而只能用strcpy函数，或者对每个数组元素一个个的赋值，如：a[0]=b[0],a[1]=b[1]

## 三 string型字符串复制

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="give me";
	string str2="a cup";
	//str1=str2;
	str1.assign(str2);
	cout<<str1<<endl;
	cout<<str2<<endl;
	return 0;
}
```

### 3.2 输出结果

```
a cup
a cup
```

### 3.3 说明

* string类中使用operator函数重载了运算符，因此对象之间可以复制
* string类中还有一个专门的赋值函数assign
* string类的赋值函数assign，该函数可以取第二个字符串的任意字符赋给第一个字符串
* 由于是赋值，并且string类具有自动调节字符串大小的功能，因此str1的多余字符被删除，只保存str2赋给它的值