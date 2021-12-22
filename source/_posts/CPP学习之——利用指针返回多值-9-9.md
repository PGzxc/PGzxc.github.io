---
title: CPP学习之——利用指针返回多值(9.9)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 引用
abbrlink: 79ab33e0
date: 2019-11-16 22:48:56
---
## 一 概述

我们知道函数只能返回一个值，那么假如有的时候我们需要函数返回多个值该怎么办？  

指针或者引用可以帮助我们解决这个问题，我们使用别名或指针的方式传递给函数一个以上的变量，在函数体中将需要返回的值赋给这些变量，由于使用引用或者指针传递变量允许函数改变原来的变量。因此这些在函数体中被修改的变量均可以看做是已经被函数返回的值。  

<!--more-->

## 二 示例一 

### 2.1 代码

```
#include<iostream>
using namespace std;
int func(int a,int *b,int *c)
{
	cout<<"func函数中，计算前...\n";
	cout<<"a:"<<a<<endl<<"b:"<<*b<<endl<<"c:"<<*c<<endl;
    a=a+1;
	*b=(*b)*(*b);
	*c=(*c)*(*c)*(*c);
	cout<<"func函数中，计算后...\n";
	cout<<"a:"<<a<<endl<<"b:"<<*b<<endl<<"c:"<<*c<<endl;
	return a;
};
int main()
{
	int a=1,b=2,c=3;
	cout<<"主程序，调用func函数前...\n";
	cout<<"a:"<<a<<endl<<"b:"<<b<<endl<<"c:"<<c<<endl;
	func(a,&b,&c);
	cout<<"主程序，调用func函数后...\n";
	cout<<"a:"<<a<<endl<<"b:"<<b<<endl<<"c:"<<c<<endl;

	return 0;
}
```

### 2.2 输出结果

```
主程序，调用func函数前...
a:1
b:2
c:3
func函数中，计算前...
a:1
b:2
c:3
func函数中，计算后...
a:2
b:4
c:27
主程序，调用func函数后...
a:1
b:4
c:27
```

### 2.3 说明

我们也可以把a作为返回的判断值，把\*b和\*c作为运算的返回值，用该种方法我们可以实现回报执行程序时的非法操作信息

## 三 示例二 

### 3.1 代码

```
#include<iostream>
using namespace std;
int func(int a, int *b, int *c);
int main() 
{
	int a, b, c;
	int check;
	cout << "请输入要进行运算的数字：";
	cout << "您输入的数据将作为圆的半径和正方形的边长：";
	cin >> a;
	check = func(a, &b, &c);
	if (check) 
	{
		cout << "输入的数字超过计算范围! \n";
	} else 
	{
		cout << "圆的面积为：" << b << endl;
		cout << "正方形的面积为：" << c << endl;
	}

}
int func(int a, int *b, int *c) 
{
	if (a > 20000) 
	{
		a = 1;
	} 
	else 
	{
		*b = a * a * 3.14;
		*c = a * a;
		a = 0;
	}
	return a;
}
```

### 3.2 输出结果

```
请输入要进行运算的数字,您输入的数据将作为圆的半径和正方形的边长：200
圆的面积为：125600
正方形的面积为：40000
```

### 3.3  说明

但是我们要注意的是：这两个值不是通过返回机制来得到的，而是通过改变函数指针参量\*b和\*c所指向的内存区域中的值来实现的

## 四 用引用来写

### 4.1 代码

```
#include<iostream>
using namespace std;
int func(int a, int &b, int &c);
int main() 
{
	int a, b, c;
	int check;
	cout << "请输入要进行运算的数字,";
	cout << "您输入的数据将作为圆的半径和正方形的边长：";
	cin >> a;
	check = func(a, b, c);
	if (check) {
		cout << "输入的数字超过计算范围! \n";
	} else {
		cout << "圆的面积为：" << b << endl;
		cout << "正方形的面积为：" << c << endl;
	}

}
int func(int a, int &b, int &c) 
{
	if (a > 20000) 
	{
		a = 1;
	} else 
	{
		b = a * a * 3.14;
		c = a * a;
		a = 0;
	}
	return a;
}
```

### 4.2 输出结果

```
请输入要进行运算的数字,您输入的数据将作为圆的半径和正方形的边长：200
圆的面积为：125600
正方形的面积为：40000
```

### 4.3 说明

这个程序运行后的结果与上面的结果是相同的，但是很明显，采用别名的方式传递参数使程序更加命了和易于掌握