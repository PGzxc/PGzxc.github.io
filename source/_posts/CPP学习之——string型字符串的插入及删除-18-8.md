---
title: CPP学习之——string型字符串的插入及删除(18.8)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: d8c7968e
date: 2019-12-23 21:31:44
---
## 一 概述

本节课主要讲述string型字符串的插入函数(insert) 及删除

<!--more--> 

## 二 string型字符串的插入

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="12789";
	string str2="3456";
	str1.insert(2,str2,0,4);
	cout<<str1<<endl;
	return 0;
}
```

### 2.2 输出结果

```
123456789
```

## 三  string型字符串的删除

### 3.1 代码

```
#include<iostream>
using namespace std;
int main()
{
	string s("give me");
	cout<<"原始字符串为："<<s<<endl;
	s.erase(2,2);
	cout<<"现在字符串为："<<s<<endl;
	s.erase(2);
	cout<<"现在字符串为："<<s<<endl;
	s.erase();
	cout<<"现在字符串为："<<s<<endl;
	return 0;
}
```

### 3.2 输出结果

```
原始字符串为：give me
现在字符串为：gi me
现在字符串为：gi
现在字符串为：
```

### 3.3 输出说明

* erase函数是用来操作string的，将各[数组元素](https://baike.baidu.com/item/数组元素/10982862)的值清除
* c.erase(p)---从c中删除迭代器p指定的元素
* c.erase(b,e)---从c中删除迭代器对b和e所表示的范围中的元素，返回e
