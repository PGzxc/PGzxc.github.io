---
title: CPP学习之——使用typedef简化函数指针的声明(17.8)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 特殊类
abbrlink: ace972d6
date: 2019-12-16 20:37:25
---
## 一 概述

本节课主要讲述使用typedef替换指针，并演示其基本使用  

<!--more-->

## 二 简化形式

```
typedef void(*p)(float&x,float&y);
```

## 三 示例演示及结果输出

### 3.1 代码

```
#include<iostream>
using namespace std;
typedef void(*p)(float&x,float&y);
void square(float&x,float&y){x=x*x;y=y*y;}
void cube(float&x,float&y){x=x*x*x;y=y*y*y;}
void print(p vp,float&x,float&y)
{
	cout<<"执行函数前"<<endl;
	cout<<"x:"<<x<<"\t"<<"y:"<<y<<endl;
	vp(x,y);
	cout<<"执行函数后"<<endl;
	cout<<"x:"<<x<<"\t"<<"y:"<<y<<endl;
}
void swap(float&x,float&y){float z;z=x;x=y;y=z;}
int main()
{
	float a=2,b=3;
	char choice='0';
	int i;
	//void (*p[5])(float&x,float&y);
	p vp;
	for( i=0;i<5;i++)
	{
		cout<<"(0)退出(1)正方(2)立方(3)交换x和y的值：";
		cin>>choice;
		bool quit=false;
		switch(choice)
		{
		case '0':
			quit=true;
			break;
		case '1':
			vp=square;
			break;
		case '2':
			vp=cube;
			break;
		case '3':
			vp=swap;
			break;
		default:
			vp=0;
			break;
		}
		if(quit)
			break;
		if(vp==0)
		{
			cout<<"请输入一个从0到3之间的数字"<<endl;
			i=i-1;
			continue;
		}
		print(vp,a,b);
	}
	return 0;
}
```

### 3.2 输出结果

```
(0)退出(1)正方(2)立方(3)交换x和y的值：1
第1次执行，到第5次结束
初始值
长：2宽：3
现在调用函数指针数组p[0]所指向的函数...
运算后
长：4宽：9
(0)退出(1)正方(2)立方(3)交换x和y的值：
```
