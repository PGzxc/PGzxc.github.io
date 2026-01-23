---
title: CPP学习之——全局变量(3.6)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 变量
abbrlink: 3cef0fe8
date: 2019-10-26 10:46:52
---
## 一 概述
在任一函数外部定义的变量称为全局变量，这种变量对程序中的任何函数均有效，包括main()函数  


<!--more-->

## 二 代码

```
#include<iostream>
using namespace std;
void swap(int ,int);
int x=3,y=4;
int main()
{
	int x=3000,y=4000;
	cout<<"在main函数中，调用swap函数之前，x的值为："<<x<<",y的值为："<<y<<endl;
	swap(x,y);
	cout<<"在main函数中，调用swap函数之后，x的值为："<<x<<",y的值为："<<y<<endl;
	return 0;
}
void swap(int x,int y)
{

	cout<<"在swap函数中，调用swap函数之前，x的值为："<<x<<",y的值为："<<y<<endl;
	int z;
	z=x;
	x=y;
	y=z;
	cout<<"在swap函数中，调用swap函数之后，x的值为："<<x<<",y的值为："<<y<<endl;

}
```

## 三 输出结果

```
在main函数中，调用swap函数之前，x的值为：3000,y的值为：4000
在swap函数中，调用swap函数之前，x的值为：3000,y的值为：4000
在swap函数中，调用swap函数之后，x的值为：4000,y的值为：3000
在main函数中，调用swap函数之后，x的值为：3000,y的值为：4000
```

## 四 结论

* 成员变量：函数调用前后，变量的值未发生变化
* 成员变量会被局部变量覆盖