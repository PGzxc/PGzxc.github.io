---
title: CPP学习之——for循环(7.7-10)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - for循环
abbrlink: 9c001c7a
date: 2019-11-08 22:17:49
---
## 一 概述

本文主要讲述for循环相关的内容点：for循环，条件为空的for循环，for循环嵌套    

<!--more-->

## 二 示例 一 

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {

	int count = 0, many;
	cout << "你想看几次？";
	cin >> many;
	for (; count < many; count++) 
	{
		cout << "问君能有几多愁，恰似一江春水向东流" << endl;
	}
	cout << "程序执行完毕，再见！";
	return 0;
}
```

### 2.2 输出结果

```
你想看几次？1
问君能有几多愁，恰似一江春水向东流
程序执行完毕，再见！
```

## 三 示例二

### 3.1 代码

```
#include<iostream>
using namespace std;
int main() {

	for (int x = 0, y = 0, z = 0; x < 3; x++, y++, z++) 
	{
		cout << "x:" << x << ",y:" << y << ",z:" << z << endl;
	}

	return 0;
}
```

### 3.2 输出结果

```
x:0,y:0,z:0
x:1,y:1,z:1
x:2,y:2,z:2
```

## 四 示例三

### 4.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	int a, b;
	char c;
	cout << "多少行?";
	cin >> a;
	cout << "多少列?";
	cin >> b;
	cout << "什么字？";
	cin >> c;
	for (int i = 0; i < a; i++) 
	{
		for (int j = 0; j < b; j++) 
		{
			cout << c;
		}
		cout << endl;
	}
	return 0;
}
```

### 4.2 输出结果

```
多少行?2
多少列?2
什么字？a
aa
aa
```

