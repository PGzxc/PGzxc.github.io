---
title: CPP学习之——指针对数值的操作(8.7)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: 727eaff4
date: 2019-11-09 08:46:54
---
## 一 概述

* 你通过某人的地址找到了某人的家，那么你完全可以对他家的各种东西进行操作，比如说：打碎他家的       窗户，摔破他家的电视机等等
* 同理，计算机通过间接运算符"*"号访问并且读取到改地址的数据，那么它就可以修改这些数据

<!--more-->

## 二 代码及结果

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	typedef unsigned short int ut;
	ut i = 5;
	ut *p = 0;
	p = &i;
	cout << "i=" << i << endl;
	cout << "*p=" << *p << endl;
	cout << "用指针来修改存放在i中的数据。。" << endl;
	*p = 90;
	cout << "i=" << i << endl;
	cout << "*p=" << *p << endl;
	cout << "用i来修改存放在i中的数据。。" << endl;

	i = 9;
	cout << "i=" << i << endl;
	cout << "*p=" << *p << endl;
	return 0;

}
```

### 2.2 输出结果

```
i=5
*p=5
用指针来修改存放在i中的数据。。
i=90
*p=90
用i来修改存放在i中的数据。。
i=9
*p=9
```