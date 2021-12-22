---
title: CPP学习之——string型字符串的查找(18.9)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 3f8a665
date: 2019-12-24 22:00:22
---
## 一  概述

本节课主要讲述char型数组和string型字符串某字符的查找   

<!--more-->

## 二 char型数组查找

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	char ch1[15];
	char *p,c='w';
	strcpy(ch1,"hello world");
	p=strchr(ch1,c);
	if(p)
	{
		cout<<"字符"<<c<<"位于第"<<p-ch1<<endl;
	}else
		cout<<"没有找到";
	return 0;
}
```

### 2.2 输出结果

```
字符w位于第6
```

### 2.3 输出说明

* strchr：函数搜索字符串在另一字符串中的第一次出现

## 三 string型字符串查找

### 3.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str("hello world");
    int f=str.find_first_of('w');
    //int f=str.find('w',0);
    if(f!=string::npos)
    {
    	cout<<"在第"<<f<<"个字符"<<endl;
    }else
    	cout<<"没有找到"<<endl;
	return 0;
}
```

### 3.2 输出结果

```
在第6个字符
```

### 3.3 输出说明

* find_first_of：查找某个字符在字符串中第一次出现的位置

### 3.4 延伸(反向查找)

* rfind：反向查找