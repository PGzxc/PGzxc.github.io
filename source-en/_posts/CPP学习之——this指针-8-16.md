---
title: CPP学习之——this指针(8.16)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 指针
abbrlink: 8b0b566e
date: 2019-11-14 21:56:29
---
## 一 概述

学习在发新课本时一般都要将自己的名字写在课本上，以说明该课本是自己的，避免与别的学生混淆。同样，对象也要在属于自己的成员身上写下自己的名字，以证明该成员是自己的成员，而不是别的对象的成员。   

this变量帮助对象做到这一点，this变量记录每个对象的内存地址，然后通过间接访问运算符"->"访问该对象的成员   

<!--more-->

## 二 代码及输出

### 2.1 代码

```
#include<iostream>
using namespace std;
class A {

private:
	int i;
public:
	void set(int x) 
	{
		this->i = x;
		cout << "this变量保存的内存:\t" << this<<endl;
	}
	int get() const {return i;}

};
int main() 
{
	A a;
	a.set(9);
	cout << "对象a的内存地址:\t" << &a << endl;
	cout << a.get() << endl;

	A b;
	b.set(999);
	cout << "对象b的内存地址：\t" << &b << endl;
	cout << b.get() << endl;
	return 0;
}
```

### 2.2 输出结果

```
this变量保存的内存:	0x22fe40
对象a的内存地址:	0x22fe40
9
this变量保存的内存:	0x22fe30
对象b的内存地址：	0x22fe30
999
```

### 2.3 说明

* 这说明this变量记录每个单独的对象的内存地址，而this指针则指每个单独的对象。因此不同的对象输出的this变量的内存地址也不同
* 默认情况下，this指针可以省略不写
* this指针可以省略不写。比如this->i=x；假如我们写i=x;编译器会自动在成员变量i前面加上this指针，用来表示这个i成员是属于某个对象的

## 三 总结

* 由于this指针保存了对象的地址，因此你可以通过该指针直接读取某个对象的数据，它的作用将会在后面的重载运算符中得到演示，现在我们只需要知道this变量保存的是对象的地址，那么this指针就是指向对象的指针。另外this指针的创建与删除由编译器来完成，你不需要操心