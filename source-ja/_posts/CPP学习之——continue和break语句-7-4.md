---
title: CPP学习之——continue和break语句(7.4)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 循环中断
abbrlink: 1102065a
date: 2019-11-08 22:15:29
---
## 一 概述

本文主要讲述C++中的两个关键字：continue和break，并对循环语句的作用  

<!--more-->

## 二 代码及结果

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int i = 0;
	while (i < 3) 
	{
		i++;
		if (i == 1) 
		{
			break;
			//continue
		}
		cout << "i的值为：" << i << endl;
	}
	cout << "执行结束后i的值为：" << i << endl;
	return 0;
}
```

### 2.2 结果

#### 2.2.1 当关键字为continue时

```
i的值为：2
i的值为：3
执行结束后i的值为：3
```

#### 2.2.2 当关键字为break时

```
执行结束后i的值为：1
```
