---
title: CPP学习之——循环语句的老祖宗——goto语句(7.1)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - goto
abbrlink: '9e041738'
date: 2019-11-08 22:12:23
---
## 一 概述

goto语句也称为无条件转移语句，其一般格式如下： goto 语句标号； 其中语句标号是按[标识符](https://baike.baidu.com/item/标识符/7105638)规定书写的符号， 放在某一语句行的前面，标号后加[冒号](https://baike.baidu.com/item/冒号/998617)(：)。语句标号起标识语句的作用，与goto 语句配合使用。

<!--more-->

## 二 代码及显示

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int i = 1;
	number: i++;
	cout << "*";
	if (i < 10) {goto number;}
	cout << endl << "程序结束" << endl;
	cout << "*********";
	return 0;
}
```

### 2.2 结果

```
*********
程序结束
*********
```

## 三 参考

* [goto语句][1]



[1]:https://baike.baidu.com/item/goto%E8%AF%AD%E5%8F%A5/7603004?fr=aladdin