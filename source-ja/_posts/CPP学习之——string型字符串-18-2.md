---
title: CPP学习之——string型字符串(18.2)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 58e3ebec
date: 2019-12-23 21:25:01
---
## 一  概述

char型字符串是C语言风格的字符串，它使用数组来保存字符串的，但是到了C++时代，由于诞生了类，出现了一种C++风格的字符串，也就是string型字符串  

<!--more-->

## 二 string型字符串

### 2.1 概念

* 这种风格的字符串是用string类来定义字符串的，因此要使用这个string类，我们必须在程序开头添加头文件string，string这个类存在于名字空间std中，这样我们就必须使用using std::string指令，或者直接用std::string来访问它
* string类在定义隐藏掉了字符串的数组性质，因此您在使用string类定义字符串时，不用考虑如何将字符串存放在数组中，string类已经为你做好了这一步，你要做的，就是像定义一个整形变量那样使用它

### 2.2 string字符串定义

```
string str;
```

* 由于string是个类，那么string定义的字符串就可看作是string类的一个对象，或者我们可以这么说：C++风格的字符串就是用对象来保存字符串的

## 三 char型字符数组和string型字符串的不同

### 3.1 代码演示及输出

#### 3.1.1 代码

```
#include<iostream>
#include<string>
using namespace std;
//using std::string;

int main() {

	string str = "string型字符串";
	char ch[] = "char型字符串";
	cout << str << endl;
	cout << ch << endl;
	cout << "请输入“狗”的英文单词：" << endl;
	cin >> str;
	if (str == "dog") {
		cout << "狗：" << str << endl;
		cout << str << "的第1个字符是：" << str[0] << endl;
	} else
		cout << "输入错误" << endl;
	cout << "请输入“猪”的英文单词：" << endl;
	cin >> ch;
	if (ch == "pig") {
		cout << "猪：" << ch << endl;
		cout << ch << "的第1个字符是：" << ch[0] << endl;
	} else
		cout << "输入错误" << endl;

	return 0;
}
```

#### 3.1.2 输出结果

```
string型字符串
char型字符串
请输入“狗”的英文单词：
dog
狗：dog
dog的第1个字符是：d
请输入“猪”的英文单词：
pig
输入错误
```

#### 3.1.2 结果说明

* string型字符串输入时是正确的
* char型数组输入时，验证错误

### 3.2 char数组输出修改

#### 3.2.1 check函数

```
bool check(char ch[],char ch1[])
{
	bool quit=false;
	for(int i=0;i<strlen(ch1);i++)
	{
		if(ch[i]!=ch1[i])
		{
			quit=true;
			break;
		}
	}
	if(quit==false)
	{
		return true;
	}
	else
		return false;
}
```

#### 3.2.2 函数说明

* 该变量以后作为检测的依据，为真时表示应当返回0，为假时返回1
* 将if (ch == "pig") 的比较替换为if (check(ch,"pig")) 

### 3.3  char数组输出修改二

#### 3.3.1 函数替换说明

* 将if (check(ch,"pig")) 替换为strcmp函数，if (strcmp(ch,"pig")==0)

#### 3.3.2 strcmp函数说明

strcmp函数用来比较两个字符串是否相等   

* 假如str1<str2，返回一个小于0的数字，如-1
* 假如str1=str2，返回0
* 假如str1<str2，返回一个大于0的数组，如1

#### 3.3.3 总结

* 使用strcmp函数后，代码明显简化了不少，但是再简化也不如string类的字符串，由于string类的成员函数中重载了比较运算符(==)之类的关系运算符，因此string类允许你使用运算符对它的字符串对象进行比较，这是string型字符串与char型字符串数组的第一个区别