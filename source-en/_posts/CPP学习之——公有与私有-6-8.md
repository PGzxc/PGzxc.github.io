---
title: CPP学习之——公有与私有(6.8)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 公有与私有
abbrlink: 64e35e03
date: 2019-11-05 22:17:16
---
## 一 概述

关键字public可以将类的成员说明为公有，即可以被该类的所有成员所访问

<!--more-->

## 二 实例一

### 2.1 代码

```
#include<iostream>
using namespace std;
class Human {
	int weight;
};
int main() {
	Human Tom;
	Tom.weight = 150;
	cout << "汤姆的体重为：" << Tom.weight << endl;
	Human Mike;
	Mike.weight = 160;
	cout << "迈克的体重为：" << Mike.weight << endl;

	return 0;

}
```

### 2.2 结果

```
error: 'int Human::weight' is private
```

### 2.3 说明

* 这是因为类的成员默认是私有的，私有成员不能被对象直接访问，只能通过在类中设定的接口函数来访问。
* 而程序代码中，Tom对象和Mike对象都试图直接访问weight成员，结果导致出现了错误信息
* 要解决这个问题就要在类中设置一个公有的接口函数，类的对象通过这个接口函数才能访问私有成员。

### 三 实例二

#### 3.1 代码

```
#include<iostream>
using namespace std;
class Human {

private:
	int weight;
public:
	void set(int w) {
		if (w > 0 && w < 100) {
			weight = w;
		} else {
			cout << "请将set函数的参数设置为一个大于0而小于100的数字，否则默认返回0";
			weight = 0;
		}

	}
	int show() {
		return weight;
	}

};
int main() {
	Human Tom;
	Tom.set(80);
	cout << "汤姆的体重为：" << Tom.show() << endl;
	Human Mike;
	Mike.set(160);
	cout << "迈克的体重为：" << Mike.show() << endl;

	return 0;

}
```

#### 3.2 结果

```
汤姆的体重为：80
请将set函数的参数设置为一个大于0而小于100的数字，否则默认返回0迈克的体重为：0
```

#### 3.3 说明

* 我们看到输出的结果与使用关键字public是一样的，那么为什么要这么麻烦的设置私有数据成员，然后公有函数来访问呢？
* 这是为了提高代码的安全性，防止错误的输入和输出。比如说我们输入了一个超过取值范围的数，又或者说有的时候我们要控制用户所输入的数值的范围，比如说在本例中我们要控制用户输入一个大于0而小于100的数字，那么就可以在接口函数set中设定；
* 判断参数w是否大于0而小于100，假如满足这两个条件，那么将参数赋给私有成员weight，否则输出一行提示信息，然后将weight的值清0.
* 建议一般情况下，我们都将类的数据成员设置为私有，而使用类的公有函数来访问它们。这样的好处是数据的赋值与读取分开操作，赋值函数不需要考虑读取函数是如何工作的，读取函数中代码的改变也不会影响到赋值函数。
* 赋值函数不用因读取函数中代码的改变而改动自己的代码。而且由于将数据成员私有以后，各个对象不可以直接访问并修改数据，无形中又提高了数据的安全性，因此设置私有数据成员可以使程序更容易维护，并且避免一些不应有的错误。