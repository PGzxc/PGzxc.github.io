---
title: CPP学习之——string字符串是否为空和交换字符串内容(18.11)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 347b65fa
date: 2019-12-24 22:07:00
---
## 一 概述

本节课主要讲述下面内容：

* 判断string型字符串是否为空
* swap交换两个字符串的内容

<!--more-->

## 二 判断string型字符串是否为空

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str="";
	if(str.empty())
	{
		cout<<"字符串为空！";
	}else
		cout<<str;
	return 0;
}
```

### 2.2 输出内容

```
字符串为空！
```

## 三 swap交换两个字符串的内容

### 3.1 char型数组交换

```
#include<iostream>
#include<cstring>
#include<algorithm>
using namespace std;
int main()
{
	char ch1[15]="abcd";
	char ch2[15]="1234";
	swap(ch1,ch2);
	cout<<ch1<<endl;
	cout<<ch2<<endl;
	return 0;
}
```

### 3.2 string型字符串交换

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string str1="1234";
	string str2="abcd";
	str1.swap(str2);
	cout<<str1<<endl;
	cout<<str2<<endl;
	return 0;
}
```

### 3.3 输出结果

```
abcd
1234
```