---
title: Kotlin开发之——数据类
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 数据类
abbrlink: 107a5f4d
date: 2017-12-23 10:39:44
---
# 前言 

如果想让我们的类成为一个方便的数据容器，我们需要重写三个通用的对象方法：toString、equals和hashCode，像IntelliJ IDEA这样的IDE都会帮助我们自动生成并验证是否正确一致地实现了这三个方法。   
在Kotlin中，我们无需生成这三个方法，如果我们对类添加了修饰符data，编译器会为我们自动生成必要的方法     
<!--more-->

- equals方法用于实例的比较 
- hashCode方法用于在基于hash的容器中，比如HashMap，使用hash code作为键
- toString方法用于按照类中声明所有字段的顺序生成类的字符串表示 
- equals和hashCode方法检查是否所有属性的值都是相等的
- hashCode方法会返回一个依赖所有属性的hash code的值
- 没有声明在主要构造器中的属性不会参与相等性检查和hash code计算
- 编译器为数据类自动生成的有用方法并不仅仅是equals、hashcode和toString这三个  
# 数据类 

## 定义数据类   
Kotlin可以创建一个只包含数据的类，关键字为data  

	data class User(val name: String, val age: Int)
编译器会自动的从主构造函数中根据所有声明的属性提取一下函数：  

- equals()/hashCode()
- toString()//格式如："User(name=John,age=42)"
- componentN() functions对应于属性按声明顺序排列
- copy()函数 

如果这些函数在类中已经被明确定义了，或者从超类中继承而来，就不会生成。为了保证生成代码的一致性以及有意义，数据类需要满足一下条件：  

- 主构造函数至少包含一个参数
- 所有的主构造函数的参数必须标识为val或者var
- 数据类不可以声明为abstract，open，sealed或者inner
- 数据类不能继承其他类(但是可以实现接口)

	fun copy(name: String = this.name, age: Int = this.age) = User(name, age)
## 复制
复制使用copy函数，我们可以使用该函数复制对象并修改部分属性，对于上文的User类，其实现会类似于下面这样：  

	fun copy(name: String = this.name, age: Int = this.age) = User(name, age)
## 实例  
使用copy类复制User数据类，并修改age属性

	data class User(val name: String, val age: Int)

	fun main(args: Array<String>)
	{
    	val jack = User(name = "Jack", age = 1)
    	val olderJack = jack.copy(age = 2)
    	println(jack)
    	println(olderJack)

	}
输出结果：
  
	User(name=Jack, age=1)
	User(name=Jack, age=2)






