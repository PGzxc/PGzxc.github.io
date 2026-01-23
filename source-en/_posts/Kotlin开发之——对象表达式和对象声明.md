---
title: Kotlin开发之——对象表达式和对象声明
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 对象表达式
abbrlink: 3cd1c591
date: 2017-12-23 11:24:53
---
# 概述  
在java中，不管是为了实现接口或者抽象类类，我们总是习惯使用匿名内部类。最熟悉的例子，莫过于对单击事件的监听，也就是这样写：  

	btn.setOnClickListener(new OnClickListener{//处理单击事件逻辑});
尽管该匿名类只能被使用一次，这样，我们没有必要再去实现OnClickListener接口并创建一个类，从而简化了代码。可是，在kotlin中，并没有匿名类这一概念。巧妇无米之炊啊，碰到监听事件或者回调，是不是得老老实实的写一个实现类呢？尽管Kotlin没有匿名内部类，恰巧其用object一个简单的关键字，解决了这一个问题。下面我们来看看神奇的object有什么魔法效果呢？  
<!--more-->

# 对象表达式
在kotlin中，object的神奇之对象表达式，什么是对象表达式呢？我们把它认为是一个匿名内部类的实例，该匿名类可以继承自某个类或者多个接口。不过，我们需要通过object关键字将其声明，表示这是一个对象。对于文章开始的单击事件监听我们可以这么写：  

	btn.setOnClickListener(object : OnClickListener{// 处理单击事件逻辑});
注：  

- 如果被继承的基类中为有参构造器且没有无参构造器时，那么必须向构造器传递适当的参数，否则编译器会报错。
- 对象表达式内的代码可以访问创建这个对象的代码范围内的变量，与Java不同的是，被访问的变量不需要被限制为final变量  

		val a = 10
		val listener = object : Info("submit"),IClickListener 
		{
    		override fun doClick() 
			{
        		println("a:$a")
    		}
		}
		listener.doClick() // 打印 a:10
- 只需要对象，而不需要继承任何有价值的基类，可以简单些：  

		val adHoc = object
		{
    		var x: Int = 0
    		var y: Int = 0
		}
		print(adHoc.x + adHoc.y)

# 对象声明
当关键字object之后指定了一个名称，那么它就不再是对象表达式，而是一个对象声明。此时对象不再是表达式，看作类的变种更为合适吧，不能再将其赋值给一个变量。在使用它时，只需要它的名字引用既可。   

	object MyInfo: Info("submit"),IClickListener
	{
    	override fun doClick() 
		{
            println("MyInfo do click, $text") // Log: MyInfo do click, , submit
    	}
	}
	fun main(args: Array<String>) 
	{
    	MyInfo.doClick()
	}
注：   
- 对象声明不可以是局部的(也就是说，不可以直接嵌套在函数之内)，但可以嵌套在另一个对象声明之内，或者嵌套在另一个非内部类(non-inner class)内
- 被声明的对象可以被指定基类(类，接口)
- 对象声明不能指定构造函数
- 与对象表达式相似，如果被继承的基类中为有参构造器且没有午餐构造器时，那么必须向构造器传递适当的参数，否则编译器会报错。   

参考：   
[ Kotlin-对象表达式，对象声明及伴随对象][1]

[1]: http://blog.csdn.net/IO_Field/article/details/52937646


