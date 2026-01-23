---
title: CPP学习之——while语句(7.2-3)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - while
abbrlink: acf8790c
date: 2019-11-08 22:14:22
---
## 一 概述

本文练习while在实际场景中的应用

<!--more-->

## 二 示例一

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int i = 1;
	while (i < 10) 
	{
		cout << "*";
		i++;
	}
	cout << "\n程序结束" << endl;
	cout << "*********" << endl;
	return 0;
}
```

### 2.2 结果

```
*********
程序结束
*********
```

### 三 示例二

### 3.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int i;
	cout << "请输入一个数字：";
	cin >> i;
	while (100 > i && i > 0) 
	{
		cout << "i:" << i << endl;
		i++;
	}
	return 0;

}

```

### 3.2 结果

```
请输入一个数字：6
i:6


i:99
```

## 四 示例三

### 4.1 代码

```
#include<iostream>
using namespace std;
int main() {

	char choice = 'y';
	while (choice == 'y' || choice == 'Y') 
	{
		cout << endl << "问君能有几多愁，恰似一江春水向东流" << endl;
		cout << "再看一遍？是按Y，否按N:";
		cin >> choice;
	}
	cout << "程序执行完毕，再见。";
	return 0;

}
```

### 4.2 结果

```
问君能有几多愁，恰似一江春水向东流
再看一遍？是按Y，否按N:
```

## 五 示例四 

### 5.1 代码

```
#include<iostream>
using namespace std;
int main()
{
	int count,many;
	cout<<"你想看几次？";
	cin>>many;
	while(count<many)
	{
		cout<<endl<<"问君能有几多愁，恰似一江春水向东流"<<count<<endl;
		count++;
	}
 cout<<"程序执行结束，再见。";
 return 0;
}
```

### 5.2 结果

```
你想看几次？
```