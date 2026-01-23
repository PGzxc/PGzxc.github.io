---
title: CPP学习之——string型字符串的替换(18.6)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: '20012049'
date: 2019-12-23 21:29:32
---
## 一  概述

本节课讲述char型数组的替换和string型字符串的替换   

<!--more-->

## 二 char型数组

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[10]="gh";
	char ch2[]="abcdef";
	strncpy(ch1,ch2,3);
	cout<<ch1<<endl;
	return 0;
}
```

### 2.2 输出结果

```
abc
```

## 三 string型字符串替换

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="gh";
	string str2="abcdef";
	str1.replace(0,1,str2,4,2);
	cout<<str1<<endl;
	return 0;
}
```

### 3.2 输出结果

```
efh
```

