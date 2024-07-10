---
title: C++开发之——运算符
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 运算符
abbrlink: 7f39d735
date: 2018-02-21 10:49:19
---
# C++运算符
运算符是一种告诉编译器执行特定的数学或逻辑操作的符号。C++ 内置了丰富的运算符，并提供了以下类型的运算符： 

- 算术运算符
- 关系运算符
- 逻辑运算符
- 位运算符
- 赋值运算符
- 杂项运算符

<!--more-->

本章将逐一介绍算术运算符、关系运算符、逻辑运算符、位运算符、赋值运算符和其他运算符。

## 算术运算符
下表显示了 C++ 支持的算术运算符。
假设变量 A 的值为 10，变量 B 的值为 20，则：
![][1]
### 实例
请看下面的实例，了解 C++ 中可用的算术运算符。  
复制并黏贴下面的 C++ 程序到 test.cpp 文件中，编译并运行程序。  

	#include <iostream>
	using namespace std; 
	int main()
	int a = 21;
	int b = 10;
	int c;
	c = a + b;
	cout << "Line 1 - c 的值是 " << c << endl ;
	c = a - b;
	cout << "Line 2 - c 的值是 " << c << endl ;
	c = a * b;
	cout << "Line 3 - c 的值是 " << c << endl ;
	c = a / b;
	cout << "Line 4 - c 的值是 " << c << endl ;
	c = a % b;
	cout << "Line 5 - c 的值是 " << c << endl ;
 
	int d = 10;   //  测试自增、自减
	c = d++;
	cout << "Line 6 - c 的值是 " << c << endl ;
 
	d = 10;    // 重新赋值
	c = d--;
	cout << "Line 7 - c 的值是 " << c << endl ;
	return 0;
	}

当上面的代码被编译和执行时，它会产生以下结果：

	Line 1 - c 的值是 31
	Line 2 - c 的值是 11
	Line 3 - c 的值是 210
	Line 4 - c 的值是 2
	Line 5 - c 的值是 1
	Line 6 - c 的值是 10
	Line 7 - c 的值是 10

## 关系运算符
下表显示了 C++ 支持的关系运算符。  
假设变量 A 的值为 10，变量 B 的值为 20，则：    
![][2]
### 实例
请看下面的实例，了解 C++ 中可用的关系运算符。  
复制并黏贴下面的 C++ 程序到 test.cpp 文件中，编译并运行程序。  

	#include <iostream>
	using namespace std;
	int main()
	{
		int a = 21;
		int b = 10;
		int c ;
 
		if( a == b )
   		{
      		cout << "Line 1 - a 等于 b" << endl ;
   		}
   		else
   		{
      		cout << "Line 1 - a 不等于 b" << endl ;
   		}
   		if ( a < b )
   		{
      		cout << "Line 2 - a 小于 b" << endl ;
   		}
   		else
   		{
      		cout << "Line 2 - a 不小于 b" << endl ;
   		}
   		if ( a > b )
   		{
      		cout << "Line 3 - a 大于 b" << endl ;
   		}
   		else
   		{
			cout << "Line 3 - a 不大于 b" << endl ;
   		}
   		/* 改变 a 和 b 的值 */
		a = 5;
		b = 20;
		if ( a <= b )
		{
			cout << "Line 4 - a 小于或等于 b" << endl ;
   		}
		if ( b >= a )
		{
			cout << "Line 5 - b 大于或等于 a" << endl ;
		}
			return 0;
		}

当上面的代码被编译和执行时，它会产生以下结果： 

	Line 1 - a 不等于 b
	Line 2 - a 不小于 b
	Line 3 - a 大于 b
	Line 4 - a 小于或等于 b
	Line 5 - b 大于或等于 a

## 逻辑运算符
下表显示了 C++ 支持的关系逻辑运算符。  
假设变量 A 的值为 1，变量 B 的值为 0，则：
![][3]  
### 实例

	#include <iostream>
	using namespace std;

	int main()
	{
		int a = 5;
		int b = 20;
		int c ;
		if ( a && b )
   		{
      		cout << "Line 1 - 条件为真"<< endl ;
   		}
   		if ( a || b )
   		{
      		cout << "Line 2 - 条件为真"<< endl ;
   		}
   		/* 改变 a 和 b 的值 */
		a = 0;
		b = 10;
		if ( a && b )
		{
			cout << "Line 3 - 条件为真"<< endl ;
		}
		else
		{
			cout << "Line 4 - 条件不为真"<< endl ;
   		}
		if ( !(a && b) )
   		{
      		cout << "Line 5 - 条件为真"<< endl ;
   		}
   			return 0;
		}

当上面的代码被编译和执行时，它会产生以下结果：  

	Line 1 - 条件为真
	Line 2 - 条件为真
	Line 4 - 条件不为真
	Line 5 - 条件为真

## 位运算符
位运算符作用于位，并逐位执行操作。&、 | 和 ^ 的真值表如下所示：  
![][4] 
 
假设如果 A = 60，且 B = 13，现在以二进制格式表示，它们如下所示：  
A = 0011 1100  
B = 0000 1101

-----------------

A&B = 0000 1100  
A|B = 0011 1101  
A^B = 0011 0001  
~A  = 1100 0011

下表显示了 C++ 支持的位运算符。假设变量 A 的值为 60，变量 B 的值为 13，则：
![][5]  
### 实例
请看下面的实例，了解 C++ 中可用的位运算符。  
复制并黏贴下面的 C++ 程序到 test.cpp 文件中，编译并运行程序。  
 
	#include <iostream>
	using namespace std; 
	int main()
	{
		unsigned int a = 60;      // 60 = 0011 1100  
		unsigned int b = 13;      // 13 = 0000 1101
		int c = 0;           
		c = a & b;             // 12 = 0000 1100
		cout << "Line 1 - c 的值是 " << c << endl ;
		c = a | b;             // 61 = 0011 1101
		cout << "Line 2 - c 的值是 " << c << endl ;
		c = a ^ b;             // 49 = 0011 0001
		cout << "Line 3 - c 的值是 " << c << endl ;
		c = ~a;                // -61 = 1100 0011
		cout << "Line 4 - c 的值是 " << c << endl ;
		c = a << 2;            // 240 = 1111 0000
		cout << "Line 5 - c 的值是 " << c << endl ;
		c = a >> 2;            // 15 = 0000 1111
		cout << "Line 6 - c 的值是 " << c << endl ;
		return 0;
	}

当上面的代码被编译和执行时，它会产生以下结果：  
  
	Line 1 - c 的值是 12
	Line 2 - c 的值是 61
	Line 3 - c 的值是 49
	Line 4 - c 的值是 -61
	Line 5 - c 的值是 240
	Line 6 - c 的值是 15
## 赋值运算符
下表列出了 C++ 支持的赋值运算符：  
![][6]  
### 实例
请看下面的实例，了解 C++ 中可用的赋值运算符。  
复制并黏贴下面的 C++ 程序到 test.cpp 文件中，编译并运行程序。  

	#include <iostream>
	using namespace std; 
	int main()
	{
		int a = 21;
		int c ;
		c =  a;
		cout << "Line 1 - =  运算符实例，c 的值 = : " <<c<< endl ;
		c +=  a;
		cout << "Line 2 - += 运算符实例，c 的值 = : " <<c<< endl ;
		c -=  a;
		cout << "Line 3 - -= 运算符实例，c 的值 = : " <<c<< endl ;
		c *=  a;
		cout << "Line 4 - *= 运算符实例，c 的值 = : " <<c<< endl ;
		c /=  a;
		cout << "Line 5 - /= 运算符实例，c 的值 = : " <<c<< endl ;
		c  = 200;
		c %=  a;
		cout << "Line 6 - %= 运算符实例，c 的值 = : " <<c<< endl ; 
		c <<=  2;
		cout << "Line 7 - <<= 运算符实例，c 的值 = : " <<c<< endl ;
		c >>=  2;
		cout << "Line 8 - >>= 运算符实例，c 的值 = : " <<c<< endl ;
		c &=  2;
		cout << "Line 9 - &= 运算符实例，c 的值 = : " <<c<< endl ;
		c ^=  2;
		cout << "Line 10 - ^= 运算符实例，c 的值 = : " <<c<< endl ;
		c |=  2;
		cout << "Line 11 - |= 运算符实例，c 的值 = : " <<c<< endl ;
		return 0;
	}

当上面的代码被编译和执行时，它会产生以下结果：  

	Line 1 - =  运算符实例，c 的值 = 21
	Line 2 - += 运算符实例，c 的值 = 42
	Line 3 - -= 运算符实例，c 的值 = 21
	Line 4 - *= 运算符实例，c 的值 = 441
	Line 5 - /= 运算符实例，c 的值 = 21
	Line 6 - %= 运算符实例，c 的值 = 11
	Line 7 - <<= 运算符实例，c 的值 = 44
	Line 8 - >>= 运算符实例，c 的值 = 11
	Line 9 - &= 运算符实例，c 的值 = 2
	Line 10 - ^= 运算符实例，c 的值 = 0
	Line 11 - |= 运算符实例，c 的值 = 2
## 杂项运算符
下表列出了 C++ 支持的其他一些重要的运算符。  
![][7]  
## C++ 中的运算符优先级
运算符的优先级确定表达式中项的组合。这会影响到一个表达式如何计算。某些运算符比其他运算符有更高的优先级，例如，乘除运算符具有比加减运算符更高的优先级。

例如 x = 7 + 3 * 2，在这里，x 被赋值为 13，而不是 20，因为运算符 * 具有比 + 更高的优先级，所以首先计算乘法 3*2，然后再加上 7。

下表将按运算符优先级从高到低列出各个运算符，具有较高优先级的运算符出现在表格的上面，具有较低优先级的运算符出现在表格的下面。在表达式中，较高优先级的运算符会优先被计算。  
![][8]  
### 实例  
请看下面的实例，了解 C++ 中运算符的优先级。

复制并黏贴下面的 C++ 程序到 test.cpp 文件中，编译并运行程序。

对比有括号和没有括号时的区别，这将产生不同的结果。因为 ()、 /、 * 和 + 有不同的优先级，高优先级的操作符将优先计算。  

	#include <iostream>
	using namespace std; 	
	int main()
	{
		int a = 20;
		int b = 10;
		int c = 15;
		int d = 5;
		int e;
		e = (a + b) * c / d;      // ( 30 * 15 ) / 5
		cout << "(a + b) * c / d 的值是 " << e << endl ;
		e = ((a + b) * c) / d;    // (30 * 15 ) / 5
		cout << "((a + b) * c) / d 的值是 " << e << endl ;
		e = (a + b) * (c / d);   // (30) * (15/5)
		cout << "(a + b) * (c / d) 的值是 " << e << endl ;
		e = a + (b * c) / d;     //  20 + (150/5)
		cout << "a + (b * c) / d 的值是 " << e << endl ;
		return 0;
	}

当上面的代码被编译和执行时，它会产生以下结果：

	(a + b) * c / d 的值是 90
	((a + b) * c) / d 的值是 90
	(a + b) * (c / d) 的值是 90
	a + (b * c) / d 的值是 50










[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-perator.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-relate-operate.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-logat-operate.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-byte-operate.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-byte-2.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-equals-operate.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-more-operate.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-prority-operate.png