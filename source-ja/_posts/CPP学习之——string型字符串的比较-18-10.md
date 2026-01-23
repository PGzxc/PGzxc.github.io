---
title: CPP学习之——string型字符串的比较(18.10)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 字符串
abbrlink: 8fe49bec
date: 2019-12-24 22:01:31
---
## 一 概述

本节课讲述string型字符串的比较  

<!--more-->

## 二 示例演示及结果输出

### 2.1 代码

```
#include<iostream>
#include<cstring>
using namespace std;
int main()
{
	string s1="155";
	string s2="52";
	char c[]="34";
	 int i,j,k,l,m,n;
	 i=s1.compare(s2);
	 j=s2.compare(c);
	 k=s1.compare(0,2,s2);
	 l=s1.compare(1,1,s2,0,1);
	 m=s1.compare(1,1,c,0,1);
	 n=s1.compare(1,1,c,1);
	 cout<<s1<<":"<<s2<<"="<<i<<endl;
	 cout<<s2<<":"<<c<<"="<<j<<endl;
	 cout<<s1[0]<<s1[1]<<":"<<s2<<"="<<k<<endl;
	 cout<<s1[1]<<":"<<s2[0]<<"="<<l<<endl;
	 cout<<s1[1]<<":"<<c[0]<<"="<<m<<endl;
	 cout<<s1[1]<<":"<<c[0]<<"="<<n<<endl;
	return 0;
}
```

### 2.2 输出结果

```
52:34=1
15:52=-1
5:5=0
5:3=1
5:3=1
```

### 2.3 输出说明

* string型字符串的比较的方法是compare