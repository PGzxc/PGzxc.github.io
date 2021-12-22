---
title: CPP学习之——引用就是别名常量(9.3)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 引用
abbrlink: 57fdcbf4
date: 2019-11-16 22:46:16
---
## 一 概述

引用就像中国古代的女人一样，一旦嫁给某个，就要跟他一辈子，因此假如你定义了某个变量的别名，那么该别名就永远属于这个变量，它会衷心耿耿地跟随该变量，即使中间有别的变量来收买它，它也不会更换自己的主人。不过它会收下该变量的金钱，从而导致它的主人也被牵连. 

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
	int b = 888;
	ra = b;
	cout << "&a:" << &a << endl;
	cout << "&ra:" << &ra << endl;
	cout << "&b:" << &b << endl;
	cout << "a:" << a << endl;
	cout << "ra:" << ra << endl;
	cout << "b:" << b << endl;
	ra = 1;
	cout << "a:" << a << endl;
	cout << "ra:" << ra << endl;
	cout << "b:" << b << endl;
	return 0;
}
```

### 2.2 输出结果

```
&a:0x22fe34
&ra:0x22fe34
&a:0x22fe34
&ra:0x22fe34
&b:0x22fe30
a:888
ra:888
b:888
a:1
ra:1
b:888
```

### 2.3 说明

* 在这个实例中，我们将ra定义为a的别名。这样ra这个别名就只属于变量a，它不会变成b的别名
* 变量b只能将自己的值赋给这个ra，它不能改变ra的地址，比如说它不能让ra变成自己的别名
* 因此这个ra又可看作是个别名常量，它是a的别名这个身份我们无法更正，我们能改变的只是它所引用的值