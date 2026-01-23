---
title: Kotlin开发之——伴生对象
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 伴生对象
abbrlink: ab85ccc6
date: 2017-12-23 01:08:44
---
# 前言
伴生对象又叫同伴对象(Companion Object);   
Kotlin没有静态方法(static method)，可以使用同伴对象替代。   
如果在类中声明了一个同伴对象，那么只需要使用类名就可以调用同伴对象的成员了。     

<!--more-->

# 示例  

## 作为工具类  

	class Util 
	{
    	companion object 
		{
        	val element: String = "HelloWorld"
        	fun sayHello() 
			{
            	System.out.println(element)
        	}
    	}
	}

	class Main 
	{
    	init 
		{
        	System.out.println(Util.element)
        	Util.sayHello()
    	}
	}
	fun main(args:Array<String>)
	{
   		Main()
	}
输出结果： 
 
	HelloWorld
	HelloWorld
## 作为成员

	fun main(args: Array<String>) 
	{
    	Test.instance.test()
    	Test.test1()
	}
	class  Test
	 {
    	fun test()
	 	{
     	   println("伴生对象的静态调用对象，通过对象再调用方法")
     	}
     	companion object  Factory
		{ // 伴生对象
        	var instance =Test()
        	fun  test1()
			{
            	println("伴生对象的静态调用方法")
        	}
    	}
	}
输出结果：   

	伴生对象的静态调用对象，通过对象再调用方法
	伴生对象的静态调用方法

