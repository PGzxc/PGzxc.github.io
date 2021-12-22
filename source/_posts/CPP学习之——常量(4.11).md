---
title: CPP学习之——常量(4.11)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 常量
abbrlink: f80b6922
date: 2019-10-26 11:03:44
---
## 一 概念

常量，顾名思义，其值是不能改变的，你可以对常量进行初始化，但是此后你就不能再对其进行赋值。  

<!--more-->

## 二 代码及说明

### 2.1 代码

```
#include<iostream>
using namespace std;

int main() {
	const double PI = 3.1415926;
	PI=0;
	return 0;
}
```

### 2.2 显示结果

```
 error: assignment of read-only variable 'PI'
```

### 2.3 说明

* const double PI = 3.1415926—该语句定义了一个double型常量并将它的值初始化为3.1415926，这样这个PI的值就不能再改变了
* PI=0 该语句试图将PI的值赋为0，但是由于PI已经定义为常量，因此赋值失败