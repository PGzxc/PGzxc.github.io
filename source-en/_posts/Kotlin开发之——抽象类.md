---
title: Kotlin开发之——抽象类
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 抽象类
abbrlink: d28e39ab
date: 2017-12-22 12:12:09
---
# 简述  
对于面向对象编程来说，抽象是它的一个特征之一。在kotlin中可以通过抽象类和接口来完成抽象。抽象类和接口有很多相似之处，又有不同之处。  
<!--more-->

# 抽象类

## 抽象方法  
抽象方法是一种特殊的方法：它只有声明，而没有具体的实现。抽象方法的声明格式：     

	abstract class Person
	{
    	abstract fun doSwim()
	} 


- 抽象方法必须用abstract关键字进行修饰
- 抽象方法不用手动添加open，默认被open修饰
- 抽象方法没有具体的实现
- 含有抽象方法的类成为抽象类，必须由abstract关键字修饰

## 抽象属性  
抽象属性就是在var或val前被abstract修饰，抽象属性的声明格式为：   

	abstract class Person
	{
    	abstract var addr:String
    	abstract val weight:Float
	}  


- 抽象属性在抽象类中不能被初始化
- 在子类没有主构造函数，要对抽象属性，手动初始化。如果子类中有主构造函数，抽象属性可以在主构造函数中声明   

## 例子 
 
	abstract class Person(name:String,age:Int)
	{
    	abstract var addr : String
    	abstract val weight : Float
    	abstract fun doSwim()
	}

	class Student(name : String, age : Int, var no : String, var score : Int, override var addr: String, override val weight: Float) : Person(name, age)
	 {
    	override fun doSwim() 
		{
        	println("doSwim")
    	}
	}

## 抽象类   
含有抽象方法的类，称为抽象类。在抽象类中，不仅可以有抽象方法，同时可以有具体实现的方法。   

	abstract class Person(var name : String, var age : Int) : Any() 
	{
    	abstract var addr : String
    	abstract val weight : Float
    	abstract fun doSwim()

    	fun doFly() 
		{
        	println("doFly")
    	}

    	fun doEach() 
		{
        	println("doEach")
    	}
	}
抽象类和普通类，主要有三点区别： 
 
- 抽象方法必须为public或者protected(因为如果为private，则不能被子类继承，子类便无法实现该方法)，缺省情况下默认为public
- 抽象类不能用来创建对象
- 如果一个类继承于一个抽象类，则子类必须实现父类的抽象方法。如果子类没有实现父类的抽象方法，则必须将子类也定义为abstract类。如果抽象类中没有抽象属性，再实现子类中必须将抽象属性初始化，除非子类也为抽象类。   

# 抽象类和接口的差异  
## 语法层面上的区别   
- 接口不能保存状态，可以有属性但必须是抽象的，而抽象类型可以有属性。   
- 一个类只能继承一个抽象类，而一个类却可以实现多个接口。    

## 设计层面上的区别   

- 抽象类是对一种事物的抽象，即对类的抽象，而接口是对行为的抽象。抽象类是对整个类整体的抽象，包括属性，行为，但是接口确实对类局部行为进行抽象。   

	举个例子，飞机和鸟是不同类的事物，但是它们都有一个共性，就是都会飞。那只是一个行为特性，并不是对一类事物的抽象描述。此时可以将飞机设计为一个接口Fly，包含方法fly()，然后Airplane和Bird分别根据自己的需要实现这个接口。然后至于有不同种类的分级，比如战斗机，民用飞机等直接继承Airplane既可，对于鸟也是类似的，不同种类的鸟直接继承某个抽象类，则子类必定是抽象类的种类，而接口实现则是有没有，具备不具备的关系，比如鸟能否飞(或者是否具备飞行这个特点)，能飞行则可以实现这个接口，不能飞行就不实现这个接口。   
- 设计层面不同，抽象类作为很多子类的父类，它是一种模板设计。而接口是一种行为规范，它是一种辐射式设计。
     
	什么是模板设计？最简单例子，大家都用过ppt里面的模板，如果用模板A设计了pptB和pptC，pptB和pptC公共的部分就是模板A了，如果它们的公共部分需要改动，则只需要改动模板A就可以了，不需要重新对pptB和pptC进行改动。而辐射式设计，可以直接在抽象类中添加具体的实现，子类可以不进行变更；而对于接口则不行，如果接口进行了变更，则所有实现这个接口的类都必须进行相应的改动。  

 
