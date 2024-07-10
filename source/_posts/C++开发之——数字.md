---
title: C++开发之——数字
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 数字
abbrlink: 7e29074c
date: 2018-02-24 10:33:17
---
# C++数字  
通常，当我们需要用到数字时，我们会使用原始的数据类型，如 int、short、long、float 和 double 等等。这些用于数字的数据类型，其可能的值和数值范围，我们已经在 C++ 数据类型一章中讨论过。  
<!--more-->
# C++ 定义数字
我们已经在之前章节的各种实例中定义过数字。下面是一个 C++ 中定义各种类型数字的综合实例：   

## 实例

	#include <iostream>
	using namespace std; 
	int main ()
	{
		// 数字定义
		short  s;
		int    i;
		long   l;
		float  f;
		double d;
		// 数字赋值
		s = 10;      
		i = 1000;    
		l = 1000000; 
		f = 230.47;  
		d = 30949.374;
   
		// 数字输出
		cout << "short  s :" << s << endl;
		cout << "int    i :" << i << endl;
		cout << "long   l :" << l << endl;
		cout << "float  f :" << f << endl;
		cout << "double d :" << d << endl;
		return 0;
	}

当上面的代码被编译和执行时，它会产生下列结果：  

	short  s :10
	int    i :1000
	long   l :1000000
	float  f :230.47
	double d :30949.4

# C++ 数学运算
在 C++ 中，除了可以创建各种函数，还包含了各种有用的函数供您使用。这些函数写在标准 C 和 C++ 库中，叫做内置函数。您可以在程序中引用这些函数。   
C++ 内置了丰富的数学函数，可对各种数字进行运算。下表列出了 C++ 中一些有用的内置的数学函数。  
为了利用这些函数，您需要引用数学头文件 <cmath>。    
![][1]  
下面是一个关于数学运算的简单实例：  
## 实例  

	#include <iostream>
	#include <cmath>
	using namespace std; 
	int main ()
	{
		// 数字定义
		short  s = 10;
		int    i = -1000;
		long   l = 100000;
		float  f = 230.47;
		double d = 200.374;
		// 数学运算
		cout << "sin(d) :" << sin(d) << endl;
		cout << "abs(i)  :" << abs(i) << endl;
		cout << "floor(d) :" << floor(d) << endl;
		cout << "sqrt(f) :" << sqrt(f) << endl;
		cout << "pow( d, 2) :" << pow(d, 2) << endl;
		return 0;
	}

当上面的代码被编译和执行时，它会产生下列结果：  

	sin(d) :-0.634939
	abs(i)  :1000
	floor(d) :200
	sqrt(f) :15.1812
	pow( d, 2 ) :40149.7

# C++ 随机数  
在许多情况下，需要生成随机数。关于随机数生成器，有两个相关的函数。一个是 rand()，该函数只返回一个伪随机数。生成随机数之前必须先调用 srand() 函数。  
下面是一个关于生成随机数的简单实例。实例中使用了 time() 函数来获取系统时间的秒数，通过调用 rand() 函数来生成随机数：  
## 实例 

	#include <iostream>
	#include <ctime>
	#include <cstdlib> 
	using namespace std;
	int main ()
	{
		int i,j;
		// 设置种子
		srand( (unsigned)time( NULL ) );
		/* 生成 10 个随机数 */
		for( i = 0; i < 10; i++ )
		{
     		// 生成实际的随机数
      		j= rand();
      		cout <<"随机数： " << j << endl;
		}
		return 0;
	}

当上面的代码被编译和执行时，它会产生下列结果：  

	随机数： 1748144778
	随机数： 630873888
	随机数： 2134540646
	随机数： 219404170
	随机数： 902129458
	随机数： 920445370
	随机数： 1319072661
	随机数： 257938873
	随机数： 1256201101
	随机数： 580322989





[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-function.png