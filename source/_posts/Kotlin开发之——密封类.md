---
title: Kotlin开发之——密封类
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 密封类
abbrlink: d13d0da4
date: 2017-12-22 18:37:17
---
# 前言   
Kotlin的密封类是Java中没有的新概念，并为此开辟了另一片可能性新的世界。   
密封类允许你表达约束层次结构，其中对象只能是给定类型之一。也就是说，我们有一个具有特定数量的子类的类。最后，我们得到的结论是非常类似枚举的概念。所不同的是，在枚举中，我们每个类型只有一个对象；而在密封类中，同一个类可以拥有几个对象。   

这种差异允许密封类的对象可以保持状态。这给我们带来一些优势，它也为函数性概念敞开了大门。    
<!--more-->

# 密封类   
## 密封类的声明  
要声明一个密封类，需要将sealed修饰符放在类名之前，密封类可以有子类，但所有的子类声明都必须嵌套在密封类的声明部分之内。      
## 举例  

	sealed class Operation 
	{
    	class Add(val value: Int) : Operation()
    	class Substract(val value: Int) : Operation()
    	class Multiply(val value: Int) : Operation()
    	class Divide(val value: Int) : Operation()
	}

	fun execute(x: Int, op: Operation) = when (op) 
	{
    	is Operation.Add -> x + op.value
    	is Operation.Substract -> x - op.value
    	is Operation.Multiply -> x * op.value
    	is Operation.Divide -> x / op.value
	}

	fun main(args:Array<String>)
	{
    	println("Operation.Add=${execute(2,Operation.Add(3))}")
    	println("Operation.Multiply=${execute(3,Operation.Multiply(2))}")
	}
输出结果：   

	Operation.Add=5
	Operation.Multiply=6

    

