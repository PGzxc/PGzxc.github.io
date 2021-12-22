---
title: CPP学习之——string型字符串的拷贝(18.7)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 8850d348
date: 2019-12-23 21:30:28
---
## 一 概述

本节课主要讲述char型数组的拷贝和string型字符串的拷贝   

<!--more-->

## 二 char型数组

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[15]="abcdefghijklmn";
	char ch2[]="1234567890";
	cout<<"源字符串"<<ch1<<endl;
	memmove(ch1,ch2,10);
	cout<<"拷贝后："<<ch1<<endl;
	return 0;
}
```

### 2.2 输出结果

```
源字符串abcdefghijklmn
拷贝后：1234567890klmn
```

### 2.3 输出说明

* 拷贝函数为memmove，其中mem是memory的缩写，意思是"内存"
* memmove函数有三个参数，第1个参数是目的字符串，第2个参数是源字符串，第3个参数是拷贝的字符数目
* 将ch2的开头的10个字符拷贝到ch1中，由于ch1的字符比ch2多4个，因此没有全部覆盖掉ch1的字符，输出的ch1最后4个字符仍是原先的字符
* 我们来看下string型字符串的拷贝，由于string类的赋值函数assign执行的功能类似于两个string型字符串的拷贝，因此string类不再提供赋值string型字符串的函数，它提供了一个从string型字符串复制到char型字符串的copy函数

## 三 string型字符串拷贝

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str="abcdefghijklmn";
	char ch2[]="1234567890";
	cout<<"源字符串："<<ch2<<endl;
	int n=str.copy(ch2,11,0);
	cout<<"拷贝了"<<n<<"个字符"<<endl;
	cout<<"拷贝后："<<ch2<<endl;
	return 0;
}
```

### 3.2 输出结果

```
源字符串：1234567890
拷贝了11个字符
拷贝后：abcdefghijk
```

### 3.2 输出说明

* string型字符串的拷贝函数时copy
* 后面的两个参数都是针对调用该函数的对象str，因此该函数的作用是从str第1个字符开始连续拷贝10个字符到ch2中，copy函数的返回值为拷贝的字符的个数