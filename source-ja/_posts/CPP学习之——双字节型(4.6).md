---
title: CPP学习之——双字节型(4.6)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 双字节型
abbrlink: 2b240d3a
date: 2019-10-26 10:56:34
---
## 一 前言

我们知道char型变量可存储一个字节的字符，它用来保存英文字符与标点符号是可以的，但是存储汉字、韩文与日文却是不可以，因为汉字、韩文与日文都占据两个字节，为了解决这个问题，C++又提供了wchar_t类型，也就是双字节类型，又叫宽字符类型。


<!--more-->
## 二 代码

```
#include<iostream>
#include<locale>
using namespace std;

int main()
{
   setlocale(LC_ALL,"chs");
   wchar_t wt[]=L"中";
   wcout<<wt<<endl;
   return 0;
}

```


## 三 代码说明

* L"中"：大写字母L告诉编译器为"中"字分配两个字节的空间
* 由于"中"是个汉字，所以我们需要调用一个函数来讲本机的语言设置为中文简体
* LC_ALL表示设置所有的选项，包括金融货币、小数点、时间日期格式、语言、字符串的使用习惯等等。
* chs：因为计算机的使用者来自不同的国家，所以要设置一下计算机的地域。
* setlocale函数在头文件locale中定义，因此我们要添加头文件locale
* 使用wcout替代cout来输出宽字符。
