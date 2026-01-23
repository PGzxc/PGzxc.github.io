---
title: C++开发之——日期时间
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 日期时间
abbrlink: edde52d8
date: 2018-02-24 16:15:02
---
# C++日期&时间  
C++ 标准库没有提供所谓的日期类型。C++ 继承了 C 语言用于日期和时间操作的结构和函数。为了使用日期和时间相关的函数和结构，需要在 C++ 程序中引用 <ctime> 头文件。

有四个与时间相关的类型：clock_t、time_t、size_t 和 tm。类型 clock_t、size_t 和 time_t 能够把系统时间和日期表示为某种整数。

结构类型 tm 把日期和时间以 C 结构的形式保存，tm 结构的定义如下：  

	struct tm 
	{
		int tm_sec;   // 秒，正常范围从 0 到 59，但允许至 61	
		int tm_min;   // 分，范围从 0 到 59
		int tm_hour;  // 小时，范围从 0 到 23
		int tm_mday;  // 一月中的第几天，范围从 1 到 31
		int tm_mon;   // 月，范围从 0 到 11
		int tm_year;  // 自 1900 年起的年数
		int tm_wday;  // 一周中的第几天，范围从 0 到 6，从星期日算起
		int tm_yday;  // 一年中的第几天，范围从 0 到 365，从 1 月 1 日算起
		int tm_isdst; // 夏令时
	}

<!--more--> 

下面是 C/C++ 中关于日期和时间的重要函数。所有这些函数都是 C/C++ 标准库的组成部分，您可以在 C++ 标准库中查看一下各个函数的细节。 
![][1]  
![][2]  
# 当前日期和时间  
下面的实例获取当前系统的日期和时间，包括本地时间和协调世界时（UTC）。  
## 实例  

	#include <iostream>
	#include <ctime> 
	using namespace std;
	int main( )
	{
		// 基于当前系统的当前日期/时间
		time_t now = time(0);
		// 把 now 转换为字符串形式
		char* dt = ctime(&now);
		cout << "本地日期和时间：" << dt << endl;
		// 把 now 转换为 tm 结构
		tm *gmtm = gmtime(&now);
		dt = asctime(gmtm);
		cout << "UTC 日期和时间："<< dt << endl;
	}
当上面的代码被编译和执行时，它会产生下列结果：  

	本地日期和时间：Sat Feb 24 16:22:59 2018 
	UTC 日期和时间：Sat Feb 24 08:24:09 2018
# 使用结构 tm 格式化时间  
tm 结构在 C/C++ 中处理日期和时间相关的操作时，显得尤为重要。tm 结构以 C 结构的形式保存日期和时间。大多数与时间相关的函数都使用了 tm 结构。下面的实例使用了 tm 结构和各种与日期和时间相关的函数。

在练习使用结构之前，需要对 C 结构有基本的了解，并懂得如何使用箭头 -> 运算符来访问结构成员。  
## 实例 

	#include <iostream>
	#include <ctime> 
	using namespace std;
	int main( )
	{
		// 基于当前系统的当前日期/时间
		time_t now = time(0);
		cout << "1970 到目前经过秒数:" << now << endl;
		tm *ltm = localtime(&now);
		// 输出 tm 结构的各个组成部分
		cout << "年: "<< 1900 + ltm->tm_year << endl;
		cout << "月: "<< 1 + ltm->tm_mon<< endl;
		cout << "日: "<<  ltm->tm_mday << endl;
		cout << "时间: "<< ltm->tm_hour << ":";
		cout << ltm->tm_min << ":";
		cout << ltm->tm_sec << endl;
	}
当上面的代码被编译和执行时，它会产生下列结果：  

	1970 到目前经过秒数:1519460759
	年: 2018
	月: 2
	日: 24
	时间: 16:25:59
	Press any key to continue



 

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-time-1.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-time-2.png 

