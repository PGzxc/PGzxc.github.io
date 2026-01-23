---
title: CPP学习之——string型字符串的合并(18.4)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 673c57a1
date: 2019-12-23 21:27:13
---
## 一 概述

本节课主要讲述char型数组的合并和string型字符串的合并  

<!--more-->

## 二 char型数组的合并

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[]="what's your name";
	char ch2[]=" my name is Jack";
	strcat(ch1,ch2);
	cout<<ch1<<endl;
	cout<<ch2<<endl;
	return 0;
}
```

### 2.2 输出

```
what's your name my name is Jack
 my name is Jack
```

### 2.3 说明

* char型数组的合并使用到了strcat函数
* strcat是string catenate(字符串连接)的缩写。strcat函数将第2个字符串合并第1个字符串中，因此第1个字符串必须保证能容纳两个字符串的长度

## 三 string型字符串的合并

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="what's your name";
	string str2="my name is Jack";
	str1=str1+str2;
	cout<<strlen(str1.c_str())<<endl;
	cout<<str1.length()<<endl;
	cout<<str1.size()<<endl;
	cout<<str1<<endl;
	string str3;
	cout<<"str3:"<<str3.size()<<endl;
	return 0;
}
```

### 3.2 输出结果

```
31
31
31
what's your namemy name is Jack
str3:0
```

### 3.3 说明

* 这是因为string类在设计时增加了一个特殊的功能，它会随着字符的增多或者减少自动调节数组的大小
* 我们知道查看char型字符串的长度用但是strlen这个函数，string型字符串也可以用这个函数，不过需要将string型字符串转换为char型字符串，也就是将对象转换为数组，然后才能使用，转换方式是调用string类的一个函数c_str()，转换后的这个数组带有一个字符串结束标志，也就是C风格的字符串。这样strleng函数才能正确地计算出字符串的长度，这个长度是可见字符的长度，不包括字符串结束标志
* 无论是使用strlen还是size，它们的目的都一样，就是计算结束符'\0'之前的字符共有多少个
* 由于未被初始化的string对象是个空对象，除了字符串结束标志外，没有填充任何数据，因此输出的结果为0
* 该方法与size方法的使用相同，输出结果也相同。为什么string类中假如两个相同的功能的函数呢？
* 这是因为length()函数时早期版本的string类中的成员，而size()函数则是以后添加进去的，为的是兼容STL，关于STL在模板那一章会做详细说明。这里只需要记住，size和length的区别就是在STL中