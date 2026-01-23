---
title: Kotlin开发之——类与对象
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 类与对象
abbrlink: b079d41a
date: 2017-12-19 22:55:45
---
# 类与对象的关系
对象是对问题领域中事物的抽象   
对象的特征：  
 
- 世间万物皆对象
- 每个对象都是唯一的
- 对象具有属性和行为
- 对象具有状态
- 对象都属于某个类，每个对象都是某个类的实例
<!--more-->

# Kotlin类和对象

## 类的定义
Kotlin类可以包含：
   
- 构造函数
- 初始化代码块
- 函数
- 属性
- 内部类
- 对象声明

Kotlin中使用关键字class 声明类，后面紧跟类名：  

	class Runoob  //类名是Runoob
	{
	   //大括号内是类体构成	
	}
我们也可以定义一个空类：   

	class Empty
可以在类中定义成员函数：   
	
	class Runoob()
	{
      	fun foo(){println("Foo")} //成员函数	
	}
## 类的属性
### 属性定义
类的属性可以用关键字var声明为可变的，否则使用只读关键字val声明为不可变。  

	class Runoob
	{
     	var name:String="Mike"
	 	var url:String="www.baidu.com"
		var city:String="beijing"
	}
我们可以像使用普通函数那样使用构造函数创建类实例：  

	val site=Runoob() //Kotlin中没有new关键字

要使用一个属性只要用名称引用它既可
	
	site.name  //使用 .号引用
	site.url
Kotlin中的类可以有一个主构造器以及一个或多个次构造器，主构造器是类头部的一部分，位于类名称之后：  

	class Person constructor(name:String){}

如果主构造器没有任何注解，也没有任何可见度修饰符，那么constructor关键字可以省略。   

	class Person(name:String){}
### 主构造器
主构造器中不能包含任何代码，初始化代码可以放在初始化代码段中，初始化代码段使用init关键字作为前缀。

	class Person construcotr(name:String)
	{
      init
	   {
       	 System.out.println("name is $name")
	   }
	}

### 次构造器
类也可以有二级构造器，需要加前缀constructor

	class Person(val name:String)
	{
       constructor(name:String,age:Int)：this(name){}
	}

### 抽象类
抽象类是面向对象编程的特征之一，类本身或类中的部分成员，都可以声明为abstract的。抽象成员在类中不存在具体的实现。   
注意：无需对抽象类或抽象成员标注open注解  

	open class Base
	 {
    	open fun f() {}
	 }

	abstract class Derived : Base() 
	{
    	override abstract fun f()
	}
### 嵌套类
我们可以把类嵌套在其他类中，看以下实例： 
  
	class Outer 
	{                  // 外部类
    	private val bar: Int = 1
    	class Nested {// 嵌套类
        fun foo() = 2
   		 }
	}

	fun main(args: Array<String>) 
	{
    	val demo = Outer.Nested().foo() // 调用格式：外部类.嵌套类.嵌套类方法/属性
    	println(demo)    // == 2
	}	

### 内部类
内部类使用 inner 关键字来表示。

内部类会带有一个对外部类的对象的引用，所以内部类可以访问外部类成员属性和成员函数。  

	class Outer {
   	 	private val bar: Int = 1
   	 	var v = "成员属性"
    	/**嵌套内部类**/
    	inner class Inner {
        fun foo() = bar  // 访问外部类成员
        fun innerTest() {
            var o = this@Outer //获取外部类的成员变量
            println("内部类可以引用外部类的成员，例如：" + o.v)
        }
    	}
	}

	fun main(args: Array<String>)
	 {
   		 val demo = Outer().Inner().foo()
    	 println(demo) //   1
    	 val demo2 = Outer().Inner().innerTest()   
   		 println(demo2)   // 内部类可以引用外部类的成员，例如：成员属性
	 }

参考：   
[Kotlin 类和对象][1]

[1]: http://www.runoob.com/kotlin/kotlin-class-object.html