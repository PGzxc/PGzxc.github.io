---
title: CPP学习之——局部变量(3.5)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 变量
abbrlink: 264ac319
date: 2019-10-26 10:45:52
---
## 一 概述
在函数内部声明的变量为局部变量，局部变量的意思即该变量只存活在该函数中，假如该函数调用结束，那么该变量的寿命也结束了。    

<!--more-->

## 二 代码

```
#include<iostream>
using namespace std;
void swap(int,int);

int main()
{
    int x=3,y=4;
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
在main函数中，调用swap函数之前，x的值为：3,y的值为：4
在swap函数中，调用swap函数之前，x的值为：3,y的值为：4
在swap函数中，调用swap函数之后，x的值为：4,y的值为：3
在main函数中，调用swap函数之后，x的值为：3,y的值为：4
```



## 四 结论

* 局部变量：函数调用前后，变量的值未发生变化
