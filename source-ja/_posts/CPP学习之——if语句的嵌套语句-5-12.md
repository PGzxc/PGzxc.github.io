---
title: CPP学习之——if语句的嵌套语句(5.12)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 语句
abbrlink: d447b193
date: 2019-10-28 21:41:11
---
## 一 前言

上节课我们学习了if语句的三种形式，假设我们在一个if语句中再添加一个if语句或多个if语句，那么我们叫它if语句嵌套，本节课我们就来学习这种高级if语句——if语句的嵌套.  

<!--more-->

## 二 代码及结果分析

### 2.1 代码



```
#include<iostream>
using namespace std;

int main()
{
	cout<<"请输入一个整数：\n";
	int x;
	cin>>x;
    if(x>1)
         if(x<100) cout<<"x大于1小于100\n";
         else cout<<"x大于或者等于100\n";
    else
    	 if(x<1)cout<<"x小于1\n";
    	 else cout<<"x等于1\n";

 return 0;
}
```

### 2.3 结果(输入50)

```
请输入一个整数：
50
x大于1小于100
```