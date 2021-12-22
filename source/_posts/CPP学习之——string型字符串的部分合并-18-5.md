---
title: CPP学习之——string型字符串的部分合并(18.5)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 6b2aa9fb
date: 2019-12-23 21:28:31
---
## 一 概述

本节课讲述char型数组的部分和并和string型字符串的部分合并  

<!--more-->

## 二 char型数组的部分合并

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[]="ab";
	char ch2[]="abcde";
	strncat(ch1,ch2,3);
	cout<<ch1<<endl;
	return 0;
}
```

### 2.2 输出结果

```
ababc
```
### 2.3 说明

* C语言提供了strncat函数来实现对char型字符串的部分合并，或者说部分复制
* str是string的简写，意思是字符串，cat是category的简写，意思是连接，strncat有3个参数，前两个是char型字符串数组名，第3个则是需要复制的字符数，这个字符数指的是需要提取第2个字符串头几个字符。该函数的作用是将第2个字符串中前n个字符连接到第1个字符串中

## 三 string型字符串的部分合并

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="ab";
	string str2="abcdef";
	str1.append(str2,2,3);
	cout<<str1<<endl;
	return 0;
}
```

### 3.2 输出结果

```
abcde
```

### 3.3 说明

* 用string类对象str1调用string类的成员函数append
* 该函数同样有3个参数，第1个参数是第2个字符串str2，第2个参数是确定要复制的字符的位置，即从str2中哪个字符开始复制，第3个参数是赋值字符的个数

