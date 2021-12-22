---
title: CPP学习之——if语句(5.9)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 语句
abbrlink: 7e37e512
date: 2019-10-28 21:38:14
---
## 一 概述

关键字if用于判断其后括号内的表达式是否为真，假如为真，那么执行括号后面的语句，假如为假，那么执行下一条语句。   

<!--more-->

## 二 代码及结果分析

### 2.1 代码

```
#include<iostream>
using namespace std;

int main() {
	int x = 3;
	if (x == 0)
		cout << "x等于0" << endl;
	else
		cout << "x不等于0" << endl;

	return 0;
}
```

### 2.2 输出结果

```
x不等于0
```

### 2.3 结果分析

* 假如x等于0，那么执行后面的语句，输出"x等于0"
* 否则，执行后面的语句输出"x不等于0"
* 由于x=3，不等于0，故输出"x不等于0"