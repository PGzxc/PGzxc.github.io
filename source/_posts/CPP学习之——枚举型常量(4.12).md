---
title: CPP学习之——枚举型常量(4.12)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 枚举
abbrlink: c9cdda80
date: 2019-10-26 11:05:15
---
## 一 前言

枚举型常量可以使你用文字来替代数字，这样做可以使程序变得更加易懂

<!--more-->

## 二 代码及显示

### 2.1 代码

```
#include<iostream>
using namespace std;

int main() {

	enum num {
		zero=100, one, two=200, three, four
	};
    cout<<zero<<"\t"<<one<<"\t"<<two<<"\t"<<three<<"\t"<<four;
	return 0;
}
```

### 2.2 代码分析

* 关键字enum将其后的num声明为枚举型，然后我们为num定义了5个值：zero,one,two,three,four，它们分别代表0、1、2、3、4.
* 最后是分号";"，表示该枚举类型enum定义结束
* 从上面的例子中可以看出，枚举类型的第一个常量值默认为0，其他依次增加



### 2.3 延伸

* 第一个常量zero被赋为100
* 第二个常量one的值，我们没有指定，它自动为101
* 第三个常量two被赋为200
* 第四个常量three自动为201
* 第五个常量four自动为202

## 三 练习
### 3.1 代码

```
#include<iostream>
using namespace std;

int main() {

	enum day {
		Sunday, Monday, Tuesday, Wednesday, Thurday, Friday, Saturday
	};
	day today;
	today = Monday;
	if (today == Sunday || today == Saturday) {
		cout << "週末休息\n";
	} else
		cout << "工作日\n";
	return 0;
}
```

### 3.2 分析

* 这个程序通过英文单词：Sunday, Monday, Tuesday, Wednesday, Thurday, Friday, Saturday来代替0、1、2、3、4、5、6可以使我们很清楚地了解程序的意思
* 这就是枚举常量的作用，它可以使程序的可读性增强