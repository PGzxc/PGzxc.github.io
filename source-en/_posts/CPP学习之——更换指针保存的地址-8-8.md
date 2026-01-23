---
title: CPP学习之——更换指针保存的地址(8.8)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: 13965a84
date: 2019-11-09 08:47:51
---
## 一 概述

我们可以将一个变量的值赋给另一个变量     

那么我们可不可以对指针再进行赋值，比如说我们能不能更换指针保存的地址 ？  

<!--more-->

## 二 代码及结果

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	int i = 0;
	int j = 1;
	int *p = &i;
	cout << "i:" << "\t" << i << endl;
	cout << "&i:" << "\t" << &i << endl;
	cout << "j:" << "\t" << j << endl;
	cout << "&j:" << "\t" << &j << endl;
	cout << "p:" << "\t" << p << endl;
	cout << "*p:" << "\t" << *p << endl;
	p=&j;
	cout << "更换地址后";
	cout << "i:" << "\t" << i << endl;
	cout << "&i:" << "\t" << &i << endl;
	cout << "j:" << "\t" << j << endl;
	cout << "&j:" << "\t" << &j << endl;
	cout << "p:" << "\t" << p << endl;
	cout << "*p:" << "\t" << *p << endl;
	return 0;
}
```

### 2.2 输出结果

```
i:	0
&i:	0x22fe34
j:	1
&j:	0x22fe30
p:	0x22fe34
*p:	0
更换地址后i:	0
&i:	0x22fe34
j:	1
&j:	0x22fe30
p:	0x22fe30
*p:	1
```