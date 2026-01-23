---
title: Kotlin开发之——嵌套类，内部类和匿名内部类
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 内部类
abbrlink: '31685994'
date: 2017-12-23 11:58:06
---
# 实例
和Java编程类似，在Kotlin编程也有嵌套类和内部类及匿名内部类。   
开始编写一个案例，来了解这三者，代码如下：  
<!--more-->
	fun main(args: Array<String>) 
	{
		//调用嵌套类中的方法
    	Test.Nested().nestedTest()
    	var instance = Test()
   		//调用内部类中的方法
    	instance.Inner().innerTest()
     	//采用对象表达式来创建接口对象，即匿名内部类的实例。
    	instance.setInterFace(object : TestInterFace 
		{
        	override fun test() 
			{
            	println("对象表达式创建匿名内部类的实例")
        	}
    	})
	}
	class Test 
	{
    	var v = "成员属性"
		// 一个在类中嵌套的类
		//引用不到外层嵌套类的成员
    	class Nested 
		{
        	fun nestedTest() 
			{
            	println("类可以嵌套其他类中")
        	}
    	}
    	/**
    	 * inner标记一个类是内部类
     	 * 可以引用外部类的成员
     	 * 采用this@类名方式，获取到外部类的this对象
     	 */
    	inner class Inner 
		{
        	fun innerTest() 
			{
            	var t = this@Test //获取外部类的成员变量
            	println("内部类可以引用外部类的成员，例如：" + t.v)
        	}
    	}
    	fun setInterFace(test: TestInterFace) 
		{
        	test.test()
    	}
	}
	/**
	 * 定义接口
	 */
	interface TestInterFace 
	{
    	fun test()
	}

输出结果： 

	类可以嵌套其他类中
	内部类可以引用外部类的成员，例如：成员属性
	对象表达式创建匿名内部类的实例
# 结论
- 类中可以嵌套类，创建嵌套类对象方式：外部类名.嵌套类()，嵌套类引用不了外部类的成员，这和java类似，相当于隐式的外部类
- 用inner标记的嵌套类是内部类，创建内部类的对象的方式：外部类名().Inner()。可以引用外部类的成员，引用外部类的this对象的方式：var v=this@外部类名
- 通过对象表达式来创建匿名内部类，可以避免重写抽象类的子类和接口的实现类，这和java中你匿名内部类的是接口和抽象类的延伸一致。    


参考：  
[Kotlin编程之嵌套类，内部类，匿名内部类][1]

[1]: http://blog.csdn.net/hexingen/article/details/72824084


