---
title: CPP学习之——char型字符串与函数(18.12)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 81b2f769
date: 2019-12-24 22:07:53
---
## 一 概述

本节课主要讲述char数组和string型字符串中，查询有多少个字符   

<!--more-->

## 二 示例演示及结果输出

### 2.1 代码(指针参数)

```
#include<iostream>
#include<cstring>
using namespace std;
int get(const char *p);
int main()
{
	char ch[15]="hello world";
	char *p="very well";
	int a=get(ch);
	int b=get(p);
	cout<<ch<<"共有"<<a<<"个字符"<<endl;
	cout<<p<<"共有"<<b<<"个字符"<<endl;
	return 0;
}
int get(const char *p)
{
	int count=0;
	while(*p)
	{
		count++;
		p++;
	}
	return count;
}
```

### 2.2  代码(数组参数)

```
int get(const char[]);
```

### 2.3 输出结果

```
hello world共有11个字符
very well共有9个字符
```

