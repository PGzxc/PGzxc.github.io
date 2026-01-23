---
title: CPP学习之——else if语句(5.11)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 语句
abbrlink: 561110b7
date: 2019-10-28 21:40:15
---
## 一 概述

如果是if...else if，则满足第一个if执行第一个if里的代码，如果不满足第一个if，而满足第二个if，则执行第二个if（即else if）的代码，如果都不满足，就不执行

<!--more-->

## 二 代码及结果分析

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int a = 99;
	if (a < 10) {
		cout << "a小于10\n";
	} else if (a < 20) {
		cout << "a大于10小于20\n";
	} else if (a < 40) {
		cout << "a大于10小于40\n";
	} else if (a < 90) {
		cout << "a大于10小于90\n";
	}else
		cout<<"a大于90\n";
	return 0;

}
```

### 2.2 输出结果

```
a大于90
```