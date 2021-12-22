---
title: CPP学习之——引用的地址(9.2)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 引用
abbrlink: d83141a7
date: 2019-11-16 22:45:29
---
## 一 概述

我们查看一下别名的地址，就会明白为什么对别名操作就是对原名的操作

<!--more-->

## 二 代码及结果输出

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	int a;
	int &ra = a;
	a = 999;
	cout << "&a:" << &a << endl;
	cout << "&ra:" << &ra << endl;
	return 0;
}
```

### 2.2 输出结果

```
&a:0x22fe44
&ra:0x22fe44
```