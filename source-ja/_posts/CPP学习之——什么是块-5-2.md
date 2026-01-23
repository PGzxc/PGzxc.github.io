---
title: CPP学习之——什么是块(5.2)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 块
abbrlink: c0dc5c75
date: 2019-10-28 21:31:29
---
## 一 概念

块以左大括号"{"开始，以右大括号"}"结束，中间允许存放多条语句。

<!--more-->

## 二 示例
### 2.1 代码

```
#include<iostream>
using namespace std;

int main() {
	{
		;
		int x = 1, a = 2, b = 3;
		x = a + b;
		cout << x << endl;
	}
	return 0;
}

```
### 2.2 代码说明

* int x = 1, a = 2, b = 3; 这个块虽然有多条语句，但是它可以看做一条语句