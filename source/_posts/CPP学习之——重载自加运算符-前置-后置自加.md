---
title: CPP学习之——重载自加运算符-前置/后置自加
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - C++
  - 运算符重载
abbrlink: 3e0215d2
date: 2022-02-25 13:18:22
---
## 一 概述

* 重载自加运算符，如何判断哪个是前置自加和后置自加？
* 如何查看参考文档，找到前置自加和后置自加说明

<!--more-->

## 二 重载自加运算符，如何判断哪个是前置自加和后置自加？

### 2.1 示例

```
#include<iostream>
using namespace std;
class A {
public:
	A(int x) {
		rx = x;
	}
	friend ostream& operator<<(ostream &s, A &a) {
		s << a.rx;
		return s;
	}
	int operator++() {
		cout << "++i\n";
		rx++;
		return rx;
	}
	int operator++(int) {
		cout << "i++\n";
		int i = rx;
		rx++;
		return i;
	}
private:
	int rx;
};

int main() {
	A a(3);
	cout << ++a << a++ << endl;
	return 0;
}
```

### 2.2 ++a与a++分别执行了哪个operator自加重载

* ++a：执行了int operator++()重载
* a++：执行了operator++(int)重载

## 三 如何查看参考文档，找到前置自加和后置自加说明

* 打开https://en.cppreference.com/w/网站，点击Language下面的Overloading
![][1]
* 滑动到底部，找到运算符优先级(Operator precedence)
![][2]
* 找到前缀后缀自增自减
![][3]
* 点开找到官方说明
![][4]

## 四 参考

* [Increment/decrement operators](https://en.cppreference.com/w/cpp/language/operator_incdec)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-operator-reference-overloading-click.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-operator-precedence.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-operator-increment-decrement.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-operator-prototype-overload.png