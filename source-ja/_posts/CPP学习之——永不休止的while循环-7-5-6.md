---
title: CPP学习之——永不休止的while循环(7.5-6)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - while循环
abbrlink: f13c5b60
date: 2019-11-08 22:16:42
---
## 一 概述

本文主要讲述永不休止的while循环和do...while循环   

<!--more-->

##  二 while循环

### 2.1 代码

```
#include<iostream>
using namespace std;

int main() {

	int s = 0;
	while (1) 
	{
		int n;
		cout << "请输入一个数字：";
		cin >> n;
		cout << "您输入的数字时：" << n << endl;
		s++;
		if (s > 3) 
		{
			break;
		}

	}
	cout << "该程序执行了" << s << endl;
	return 0;
}
```

### 2.2 结果

```
请输入一个数字：1
您输入的数字时：1
请输入一个数字：
```

## 三 do..while循环

### 3.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	int many;
	cout << "你想看几次？";
	cin >> many;
	do 
	{
		cout << endl << "问君能有几多愁，恰似一江春水向东流" << endl;
		many--;
	} while (many > 0);
	cout << "程序执行完毕，再见。";
	return 0;
}
```

### 3.2 结果

```
你想看几次？0

问君能有几多愁，恰似一江春水向东流
程序执行完毕，再见。
```

