---
title: Kotlin开发之——构造函数
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 构造函数
abbrlink: 70b0c843
date: 2017-12-22 11:21:24
---
# 前言   
Java中的构造函数在Kotlin中被称为构造器，Kotlin中使用关键字"constructor"声明构造器，kotlin的类能有一个主要的构造器与多个次要的构造器，也可以没有次构造器。主构造器出现在类名的后面参数是可选的。   
<!--more-->

# 实例   
## 常规用法   
默认用法   

	class Person constructor(name:String)
	{
		//body
	}
如果主构造器没有注解或可见修饰符"constructor"关键字可以省略  

	class Person(name:String)
	{
		//body
	}

如果有注解或可见修饰符，需加constructor关键字  

	class  Person  public constructor(name:String)
	{
		//body
	}

## 构造函数中的属性  

### 在主构造函数中声明后可以当做全局变量使用  

	class  Person(var name:String)
	{
    	//初始化块中使用
    	init 
		{
        	val leng=name.length
    	}
    	//属性声明
    	val leng=name.length
    	//在主构造函数中已经声明，可当全局变量使用
    	fun test()
		{
        	val leng=name.length
    	}
	}
注：  
1. 函数的声明可以是val也可以是var
2. 当不在主构造函数中声明又想当全局变量使用，可在类中声明，主函数中声明是简化了其写法。  

	class Person(name:String)
	{
    	val name=name
    	val leng=name.length
    	fun test()
		{
        	val leng=name.length
    	}
	}
### 当不在主函数中声明时，只能在初始化块以及属性声明中使用   

	class  Person( name:String)
	{
    	//初始化块中使用
    	init 
		{
        	val leng=name.length
    	}
    	//属性声明
    	val leng=name.length
    	//在主构造函数中已经声明，可当全局变量使用
    	fun test()
		{
        	val leng=name.length
    	}
	}
注：此时test函数中的name没有初始化   

## 次构造函数  
### this关键字 
1. 次构造函数不能有声明val 或var
2. 如果类有一个主构造函数(无论有无参数)，每个次构造函数需要直接或间接委托给主构造函数，用this关键字。  


		class Person 
		{
    		constructor() {}
    		constructor(name: String):this() {}
			constructor(name: String, age: Int) : this(name) {}
		}
### super关键字 
如果子类有主构造器可以在class header中初始化基类(父类)，如果该类没有主构造器由其他的构造器通过super关键字直接或间接初始化基类(父类)：  

	open class Person(name:String)
	class Worker:Person
	{
    	constructor(name:String):super(name)
	}


