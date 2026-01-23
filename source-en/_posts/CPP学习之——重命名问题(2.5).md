---
title: CPP学习之——重命名问题(2.5)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 重命名
abbrlink: 96b567db
date: 2019-10-21 21:35:08
---
## 一 前言
上一节通过讲解iostream与iostream.h的区别引出了标准命名空间std，又从标准命名空间了解到所有的标准库函数都在标准命名空间std中定义，而C++之所以引入名字空间这个概念，是为了避免重名问题，比如说避免重复的函数名或者变量名引起的冲突。  

<!--more-->

## 二 代码 

### 2.1 代码一
```
	#include<iostream>
	using namespace std;

	namespace a
	{
		int b=5;
	}
	namespace c
	{
		int b=8;
	}

	int main()
	{
		int b=9;
    	cout<<"main方法中变量b=="<<b<<endl;
    	cout<<"自定义空间 a中变量b=="<<a::b<<endl;
    	cout<<"自定义空间 b中变量b=="<<c::b<<endl;

    	return 0;
	}

```

注：结果   

	main方法中变量b==9
	自定义空间 a中变量b==5
	自定义空间 b中变量b==8   


### 2.2 代码二

```   
	#include<iostream>
	using namespace std;

	namespace a
	{
		int b=5;
	}
	namespace c
	{
		int b=8;
	}

	int main()
	{
		using namespace a;
		using namespace c;
		int b=9;
    	//cout<<"main方法中变量b=="<<b<<endl;
    	//cout<<"自定义空间 a中变量b=="<<a::b<<endl;
    	//cout<<"自定义空间 b中变量b=="<<c::b<<endl;
		cout<<b<<endl;
    	return 0;
	}   
	  
```	

注：结果 

	9

### 2.3 代码三 


	#include<iostream>
	using namespace std;

	namespace a
	{
		int b=5;
	}
	namespace c
	{
		int b=8;
	}

	int main()
	{
		using namespace a;
		using namespace c;
		//int b=9;
    	//cout<<"main方法中变量b=="<<b<<endl;
    	//cout<<"自定义空间 a中变量b=="<<a::b<<endl;
    	//cout<<"自定义空间 b中变量b=="<<c::b<<endl;
		cout<<b<<endl;
    	return 0;
	}  



注：结果  


	error: reference to 'b' is ambiguous   

原因：   

	编译器不知道输出哪个b，因此终止编译并显示一条错误信息


## 三 代码说明
### 3.1 代码说明


注：这样我们就有了三个名字为b的变量名，但是它们的值都是不一样的。假如我们不采用名字空间的话，显示，我们是不能这么定义的：   

* int b=5;  
* int b=8;
* int b=9;

### 3.2 原因说明
但是假如程序很大，而且不是一个人缩写的时候，这样的情况会出现很多，C++的解决方法是采用名字空间，本节的程序采用了名字空间后，三个同名的变量b由于处于不同的空间中，因为它们不会产生冲突