---
title: CPP学习之——else语句(5.10)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 语句
abbrlink: 464546a6
date: 2019-10-28 21:39:26
---
## 一 概述

当if语句为真时，执行if条件后面的语句，为假时，则执行else后面的语句  

<!--more-->

## 二 代码及结果分析

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int a, b;
	cout << "请输入第一个数：";
	cin >> a;
	cout << "请输入第二个数：";
	cin >> b;
	if (a > b) {
		cout << "第一个数比第二个数大。\n";
	} else {
		cout << "第二个数比第一个数大。\n";
	}
	cout << "该程序执行完毕\n";

	return 0;
}
```

### 2.2 输出结果

```
请输入第一个数：1
请输入第二个数：2
第二个数比第一个数大。
该程序执行完毕
```