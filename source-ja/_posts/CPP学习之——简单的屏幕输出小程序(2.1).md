---
title: CPP学习之——简单的屏幕输出小程序(2.1)
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 小程序
abbrlink: ec739744
date: 2019-10-21 21:29:38
---
## 一 创建项目并编译运行(Eclipse为例)
* 工具栏依次点击：File->New->C/C++ Project，打开项目创建窗口  
![][1]

<!--more-->
* 在模板选择框中，选择"C++ Managed Build"，点击下一步
![][2]
* 输入项目的名称，项目类型，编译工具链等
![][3]
* 创建src项目源码存放文件夹  
![][4]
* 在src源码目录上右键，创建cpp源码文件
![][5]
* 在弹出框中输入源码的文件名，点击确定
![][6]
* 输入如图所示内容  
![][7]
* 依次点击编译，并运行
![][8]


## 二 程序代码
	# include<iostream>
	int main()
	{
		std::cout<<"hello world\n";
		int x;
		std::cin>>x;
		std::cout<<x;
    	return 0;
	}


## 三 程序说明

### 3.1 #include<iostream>说明

* 在程序的第一行，有个字符"#"，这是个预处理标志，用来对文本进行预处理操作。在这里要说明一下预处理标志，预处理标志表示该行代码要最先进行处理，所以，它要在编译器编译代码之前运行
* "#"号后面的include是个预处理指令，它后面也跟了一对尖括号，表示将尖括号内的文件在这里读入
* 文件"iostream"(输入输出流)是个标准库，它包含了众多的成员函数，库中每个函数都有其自身的作用，比如本课中的cout对象，它就是标准库函数中的一部分。

### 3.2 int main()说明
* 在程序的第二行，声明了一个main函数，main函数的意思是"主函数"，每个C++程序都有一个main函数，函数是指实现一个或多个功能的代码块。在这里main函数实现了输出功能。
* 每个函数都需要标明其返回值类型，因此在本程序中main函数的返回值被标明为int，也就是说在main函数结束后要向操作系统返回一个整数。
* 要注意的是：main函数与普通的函数还是有着本质上的区别的，比如说：一般函数都是由其他函数调用或者激活，但是main函数却是在程序开始时便自动执行。

### 3.3 std::cout，std::cin
* 使用了标准库函数中的cout对象来输出一行信息。要注意cout的用法，它的后面要跟一个左移运算符"<<","<<"后面的所有内容都会被输出在屏幕上，如果要输出字符的话，请务必要用双引号引起来，这里输出了一段字符"hello world",在该段语句的结尾处，也就是字符串"hello world"的后面使用了一个格式符号"\n"，该格式符的作用是换行并将光标定位到第二行的开头。
* 在这里需要说明一下：在标准库函数中还有一个cin对象，它用来接受键盘输入，它的使用方法与cout相反，cin后面加右移运算符">>"，要注意该右移运算符">>"与cout的左移运算符"<<"是正好相反的.

## 3.4 return 0
* 向操作系统返回一个值，由于该main函数被声明为一个整形，因此这里返回一个0





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-create-new-project-cpp.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-cpp-managed-build-select.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-cpp-project-params.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-new-folder-src.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-new-source-cpp-file.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-cpp-source-create.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-source-file-content-console.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-eclipse-simple-app-build-run.gif