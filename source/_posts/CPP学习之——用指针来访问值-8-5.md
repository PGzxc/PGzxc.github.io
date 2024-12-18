---
title: CPP学习之——用指针来访问值(8.5)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: 809e1cc0
date: 2019-11-09 08:44:46
---
## 一 概述

* 我们在得到了某人的地址后，就可以根据该地址找到此人的家并见到此人。同理，指针的运算符"*"也可以为我们做到这些
* 运算符"*"被称为间接引用运算符，当使用星号“\*”时，就读取它后面变量中所保存的地址处的值

<!--more-->

## 二 代码及输出

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	int a = 1;
	int *p;
	p = &a;
	cout <<"*p:"<< *p<<endl;
	cout <<"p:"<< p<<endl;
	cout <<"a:"<< a<<endl;
	cout <<"&a:"<<&a<<endl;
	return 0;
}
```

### 2.2 结果

```
*p:1
p:0x22fe34
a:1
&a:0x22fe34
```

### 2.3 代码说明

* 指针变量p前面的间接运算符*的含义是：存储在此地处的 值
* *p的意思就是读取该地址处的值
* 由于p存储的是a的地址，因此执行的结果是输出a的值