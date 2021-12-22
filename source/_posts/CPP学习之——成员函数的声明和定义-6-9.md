---
title: CPP学习之——成员函数的声明和定义(6.9)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 函数
abbrlink: fbd3de51
date: 2019-11-05 22:18:21
---
## 一 概述

* 前面几节为了便于学习的缘故，将成员函数的声明和定义结合在一起，其实每个成员函数都有它的声明部分与定义部分。 
* 声明部分仅仅是说明该函数的参数类型以及返回值类型，如：void show();该语句声明了一个返回void值并且没有参数的show函数。

<!--more-->

## 二 代码及结果

#### 2.1 代码一

```
#include<iostream>
using namespace std;
void show();

void show() {
	cout << "hello world \n";
}
;
int main() {
	show();
	return 0;

}
```

#### 2.2 代码二

```
#include<iostream>
using namespace std;

class Human {

private:
	int weight;
public:
	void set(int w);
	int show() {
		return weight;
	}

};
void Human::set(int w) {
	if (w > 0 && w < 100) {
		weight = w;
	} else {
		cout << "请将set函数的参数设置为一个大于0而小于100的数字，否则默认返回0";
		weight = 0;
	}

}
int main() {
	Human Tom;
	Tom.set(80);
	cout << "汤姆的体重为：" << Tom.show() << endl;
	Human Mike;
	Mike.set(160);
	cout << "迈克的体重为：" << Mike.show() << endl;

	return 0;

}
```

#### 2.3 说明

* ：：域运算符，说明set函数属于Human类