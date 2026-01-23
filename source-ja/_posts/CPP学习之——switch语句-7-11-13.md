---
title: CPP学习之——switch语句(7.11-13)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - switch
abbrlink: b7d9e9ad
date: 2019-11-08 22:18:45
---
## 一 switch格式

```
switch (变量) 
{
	case 1:语句;
		break;
	case 2:语句;
		break;
	case 999:语句;
		break;
	default:语句;
	}
```

<!--more-->

## 二 示例一

### 2.1 代码

```
#include<iostream>
using namespace std;
int main() {
	int choice;
	cout << "请输入一个整数：";
	cin >> choice;
	switch (choice) 
	{

	case 0:
		cout << "您输入的是零";
		break;
	case 1:
		cout << "您输入的是壹";
		break;
	case 2:
		cout << "您输入的是贰";
		break;
	case 3:
		cout << "您输入的是叁";
		break;
	case 4:
		cout << "您输入的是肆";
		break;
	case 5:
		cout << "您输入的是伍";
		break;
	case 6:
		cout << "您输入的是陆";
		break;
	case 7:
		cout << "您输入的是柒";
		break;
	case 8:
		cout << "您输入的是捌";
		break;
	case 9:
		cout << "您输入的是镹";
		break;
	default:
		cout << "您输入的不是0到9之间的有效数字。";

	}
	cout <<endl<< "程序执行结束" << endl;
	return 0;
}
```

### 2.2 输出结果

```
请输入一个整数：0
您输入的是零
程序执行结束
```

## 三 示例二 

### 3.1 代码

```
#include<iostream>
using namespace std;
int main() 
{
	bool quit=false;
	for(;;)
	{
		   char choice;
			cout << "(0)零(1)壹(2)贰(3)叁(4)肆(5)伍(6)陆(7)柒(8)捌(9)镹(q)退出：";
			cin >> choice;
			switch (choice) 
			{
			case '0':
				cout << "您输入的是零";
				break;
			case '1':
				cout << "您输入的是壹";
				break;
			case '2':
				cout << "您输入的是贰";
				break;
			case '3':
				cout << "您输入的是叁";
				break;
			case '4':
				cout << "您输入的是肆";
				break;
			case '5':
				cout << "您输入的是伍";
				break;
			case '6':
				cout << "您输入的是陆";
				break;
			case '7':
				cout << "您输入的是柒";
				break;
			case '8':
				cout << "您输入的是捌";
				break;
			case '9':
				cout << "您输入的是镹";
				break;
			case 'q':
				quit=true;
				break;
			default:
				cout << "您输入的不是0到9之间的有效数字。";
			}
			if(quit==true){
				break;
			}
	}
	cout <<endl<< "程序执行结束" << endl;
	return 0;
}
```

### 3.2 输出结果

```
(0)零(1)壹(2)贰(3)叁(4)肆(5)伍(6)陆(7)柒(8)捌(9)镹(q)退出：1
您输入的是壹(0)零(1)壹(2)贰(3)叁(4)肆(5)伍(6)陆(7)柒(8)捌(9)镹(q)退出：q

程序执行结束
```

## 四 总结

* 假如想要无条件的跳转到某条语句执行，用goto语句
* 假如想要对某种条件进行判断，为真或假分别执行不同的语句，用if语句
* 假如需要检测的条件很多，用if..else语句
* 假如是对数字或者字符进行检测并且需要检测的条件又很多，用switch语句
* 假如能够确定循环的次数，用for语句
* 假如不能确定循环的次数，用while语句
* 假如循环体中的语句至少要执行一次，那么用do..while语句
* 另外，continue可以使循环又一次重新开始，而break可以使循环直接结束