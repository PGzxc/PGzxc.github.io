---
title: Kotlin开发之——可见性修饰符
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 可见性修饰符
abbrlink: fa1b585f
date: 2017-12-23 09:50:15
---
# 可见性修饰符
可见性修饰符用于对其修饰对象的适用范围。在Kotlin中，存在private、protected、internal以及public等四种修饰符，它们可用于修饰类、对象、接口、构造器、函数、属性以及属性的设置方法等。   
注：属性的取值方法永远与属性本身的可见度一致，因此不需要修饰符修饰。   
在不同的作用范围内，修饰符的意义有一定的差别，下面从包、类和接口、模块(Model)等三个范围内看   
<!--more-->
## 包 

在Kotlin中，包级别的定义称为top-level，即直接定义在包内，可定义函数、属性、类、对象及接口。  

- public :默认修饰符，被其修饰的在任何位置都能访问
- private：只能在当前源文件内使用
- internal：在同一模块内使用
- protected：无效修饰符，只用于类和接口内  

示例：   

	// file name: example.kt
	package foo
	private fun foo() {} // 只在 example.kt 文件内可访问
	public var bar: Int = 5 // 这个属性在任何地方都可以访问
	private set // 但它的设值方法只在 example.kt 文件内可以访问
	internal val baz = 6 // 在同一个模块(module)内可以访问

## 类和接口

- public：默认修饰符，被其修饰的在任何位置都能访问
- private：表示只在这个类(以及它的所有成员)之内可以访问
- protected：在当前类极其子类内访问
- internal:在同一模块内使用 

示例：    

	open class Outer 
	{
    	private val a = 1
    	protected val b = 2
    	internal val c = 3
    	val d = 4 // 默认为 public
    	protected class Nested 
		{
    	    public val e: Int = 5
    	}
	}

	class Subclass : Outer()
	 {
    	// a 不可访问
    	// b, c 和 d 可以访问
    	// Nested 和 e 可以访问
	}

	class Unrelated(o: Outer)
	 {
    	// o.a, o.b 不可访问
    	// o.c 和 o.d 可以访问(属于同一模块)
    	// Outer.Nested 不可访问, Nested::e 也不可访问
	}
## 构造器
一般在类的主构造器都不适用修饰符修饰，即默认使用public修饰符。但在实际开发时，主构造器可能被其他修饰符修饰。比如在创建单利模式时，为了防止在外部调用主构造器，主构造器就是使用private修饰符修饰。当使用其他修饰符修饰构造器时，需要明确添加一个constructor关键字。  

	class C private constructor(a: Int) { ... }
## 模块(Model)
一个模块(module)是指一起编译的一组Kotlin源代码文件：   

- 一个IntelliJ IDEA模块
- 一个Maven工程或Gradle工程
- 通过Ant任务的一次调用编译的一组文件   

## 局部声明 
局部变量，局部函数以及局部类，都不能指定可见修饰符。  

