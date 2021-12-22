---
title: CPP学习之——定义一个对象(6.6)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 对象
abbrlink: 68e2bc5
date: 2019-11-05 22:15:31
---
## 一 概述

* 定义一个对象非常简单，你只需要写下类名，空一格，然后敲入你要定义的对象名即可。  
* 类只是一个抽象的名词，而对象则是实际的个体，比如说人类是泛指所有的人，而麦克却是一个具体的人，是一个活生生的叼着卷烟坐在沙发上看电视的人。而且你绝对不会把麦克跟黛妮混淆，因为它们的数据有着本质的不同，麦克是个男性，黛妮是个女性，麦克身高一米九零，而黛妮只有一米六零。

<!--more-->

## 二 代码及结果

### 2.1 代码

```
#include<iostream>
using namespace std;

class Human {

public:
	void get_stature() {cout << stature << endl;}
	void GetWeight();
	void SetStature(int x) {stature = x;}
	void SetWeight(int x);
private:
	int stature;
	int weight;

};

void Human::GetWeight()
{
  cout<<weight;
}
void Human::SetWeight(int x)
{
  weight=x;
}
int main() {

	Human Mike;
	Mike.get_stature();
	//Mike.stature=2;
	Mike.SetStature(8);
	cout<<"迈克的身高";
	Mike.get_stature();
	Mike.SetWeight(80);
	cout<<"迈克的体重";
	Mike.GetWeight();
	return 0;
}
```

### 2.2 输出结果

```
0
迈克的身高8
迈克的体重80
```