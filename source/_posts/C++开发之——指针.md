---
title: C++开发之——指针
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: a2e9ec0a
date: 2018-02-24 13:03:50
---

# C++指针 
学习 C++ 的指针既简单又有趣。通过指针，可以简化一些 C++ 编程任务的执行，还有一些任务，如动态内存分配，没有指针是无法执行的。所以，想要成为一名优秀的 C++ 程序员，学习指针是很有必要的。

正如您所知道的，每一个变量都有一个内存位置，每一个内存位置都定义了可使用连字号（&）运算符访问的地址，它表示了在内存中的一个地址。请看下面的实例，它将输出定义的变量地址：  

<!--more-->  

## 实例  

	#include <iostream> 
	using namespace std; 
	int main ()
	{
		int  var1;
		char var2[10];
		cout << "var1 变量的地址： ";
		cout << &var1 << endl;
		cout << "var2 变量的地址： ";
		cout << &var2 << endl;
		return 0;
	}

当上面的代码被编译和执行时，它会产生下列结果：  

	var1 变量的地址： 0xbfebd5c0
	var2 变量的地址： 0xbfebd5b6  
通过上面的实例，我们了解了什么是内存地址以及如何访问它。接下来让我们看看什么是指针。  
# 什么是指针？  
指针是一个变量，其值为另一个变量的地址，即，内存位置的直接地址。就像其他变量或常量一样，您必须在使用指针存储其他变量地址之前，对其进行声明。指针变量声明的一般形式为：  

	type *var-name;  
在这里，type 是指针的基类型，它必须是一个有效的 C++ 数据类型，var-name 是指针变量的名称。用来声明指针的星号 * 与乘法中使用的星号是相同的。但是，在这个语句中，星号是用来指定一个变量是指针。以下是有效的指针声明：  

	int    *ip;    /* 一个整型的指针 */
	double *dp;    /* 一个 double 型的指针 */
	float  *fp;    /* 一个浮点型的指针 */
	char   *ch;    /* 一个字符型的指针 */  
所有指针的值的实际数据类型，不管是整型、浮点型、字符型，还是其他的数据类型，都是一样的，都是一个代表内存地址的长的十六进制数。不同数据类型的指针之间唯一的不同是，指针所指向的变量或常量的数据类型不同。  

## C++ 中使用指针
使用指针时会频繁进行以下几个操作：定义一个指针变量、把变量地址赋值给指针、访问指针变量中可用地址的值。这些是通过使用一元运算符 * 来返回位于操作数所指定地址的变量的值。下面的实例涉及到了这些操作：  
### 实例  

	#include <iostream>
	using namespace std;
	int main ()
	{
		int  var = 20;   // 实际变量的声明
		int  *ip;        // 指针变量的声明
		ip = &var;       // 在指针变量中存储 var 的地址
		cout << "Value of var variable: ";
		cout << var << endl;
		// 输出在指针变量中存储的地址
		cout << "Address stored in ip variable: ";
		cout << ip << endl;
		// 访问指针中地址的值
		cout << "Value of *ip variable: ";
		cout << *ip << endl;
		return 0;
	}  
当上面的代码被编译和执行时，它会产生下列结果：  

	Value of var variable: 20
	Address stored in ip variable: 0xbfc601ac
	Value of *ip variable: 20

### C++ 指针详解
在 C++ 中，有很多指针相关的概念，这些概念都很简单，但是都很重要。下面列出了 C++ 程序员必须清楚的一些与指针相关的重要概念：  
![][1]
 
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-point.png