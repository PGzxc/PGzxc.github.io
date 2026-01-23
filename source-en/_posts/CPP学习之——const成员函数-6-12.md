---
title: CPP学习之——const成员函数(6.12)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - const
abbrlink: 9afad8c2
date: 2019-11-05 22:21:25
---
## 一 概述

如果你不想让某个成员函数修改成员变量的值，那么不妨将这个成员函数声明为const;

<!--more-->

## 二 代码及结果

### 2.1 代码

```
#include<iostream>
using namespace std;
class A {

private:
	int i, j;
public:
	void func(int x, int y) {
		i = x, j = y;
	}
	void print() const {
		cout << "两数相乘为：" << i * j << endl;
	}

};
int main() {
	A a;
	a.func(1, 2);
	a.print();
	return 0;
}
```

### 2.3 结果

```
两数相乘为：2
```

### 2.4  结论

你在编程时一定尽量多用const，对于不应当改变对象的成员函数都应该声明为const，这样假如该成员函数试图去修改该对象的成员变量，编译器会提示错误，从而达到帮助你查错的目的

