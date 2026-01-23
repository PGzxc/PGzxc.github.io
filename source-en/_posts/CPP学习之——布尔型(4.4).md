---
title: CPP学习之——布尔型(4.4)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 布尔型
abbrlink: f44e164c
date: 2019-10-26 10:53:23
---
## 一 前言
* 布尔型可表示两个逻辑值，1和0，即真或者假
* 在C++中true用来代表1，false用来代表0

<!--more-->

## 二 代码

```
#include<iostream>
using namespace std;

int main()
{
   bool check,select=true;
   cout<<"check的值为："<<check<<",select的值为："<<select<<endl;
   check=true;
   select=0;
   cout<<"check的值为："<<check<<",select的值为："<<select<<endl;
	return 0;
}

```

## 三 结果

```
check的值为：0,select的值为：1
check的值为：1,select的值为：0
```

## 四 结论

* 未初始化的布尔型值为0
* 布尔型值，false 代表0
* 布尔型值，true代表1