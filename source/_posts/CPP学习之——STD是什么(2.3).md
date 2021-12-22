---
title: CPP学习之——STD是什么(2.3)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - STD
abbrlink: a5a3181
date: 2019-10-21 21:33:20
---
## 一 概述
前面我们在使用显示输出内容到控制台或输入键盘内容到控制台时，总是使用到了std，那么std究竟是什么呢？   

std::是个名称控件标识符，C++标准库中的函数或者对象都是在命名控件std中定义的，所以我们要使用标准库中的函数或者对象都要用std来限定。  

<!--more-->

## 二 std函数调用

### 2.1 std::cout
* 接下来就很好理解了，对象cout是标准库所提供的一个对象，而标准库在名字控件中被指定为std，所以在使用cout的时候，前面要加上std::。这样编译器就会明白我们调用的cout是名字控件std中的cout.
* 至于为什么将cout放到名字控件std中，是因为像cout这样的对象，在实际操作中或许会有好多个，比如说你自己也有可能会不小心定义了一个对象叫cout，那么这两个cout对象就会产生冲突，关于这个问题第五节课还要说明，这里就不再多说了。

## 三 std在什么时候使用
### 3.1 那么std都是在什么时候使用？
* 一般来说，std都是要调用c++标准库时使用。
* 如：使用标准库文件iostream时，要写上std；关于这一点，第五节还有详细的讲述。

### 3.2 不重复输入std::
* 最后，有木有一种简便的方法，不用重复地输入std::?
* 当然有，如果在使用标准库文件iostream时，不喜欢重复地使用std，我们可以用一种类似通告的形式来告诉编译器我们将使用标准库函数cout和endl.



## 四 示例
### 4.1 标准库用法

#### 4.1.1 示例
	#include <iostream>
	using std::cout;
	using std::endl;

	int main() 
	{
		cout << "!!!Hello World!!!" << endl; // prints !!!Hello World!!!
		return 0;
	}

#### 4.1.2 说明

注： 细心的用户发现，在main函数的上面使用了两行语句：  

* using std::cout;
* using std::endl;

那么，cout和endl前面就不用加std::了

### 4.2 名字空间用法
#### 4.2.1 示例
	#include <iostream>
	using namespace std;

	int main() 
	{
		cout << "!!!Hello World!!!" << endl; // prints !!!Hello World!!!
		return 0;
	}  

#### 4.2.2 说明
注：其实，我们还有更加简便的方法  

* 就是直接使用using namespace std 来代替using std::cout和using std::endl
* using namespace std告诉编译器我们将要使用名字空间std中的函数或者对象
* 所以，cout和endl前面不用注明它们是std这个名字空间中的cout和endl.