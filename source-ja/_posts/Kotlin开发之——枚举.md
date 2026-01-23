---
title: Kotlin开发之——枚举
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 枚举
abbrlink: c2a97752
date: 2017-12-20 00:44:21
---
# Kotlin中枚举

- 枚举就是将有限的可能取值一一列举出来，从而只限于从列举出来的范围内取值。
- 在Kotlin中声明枚举用enum和class两个关键字
- 在Kotlin中，enum是所谓的软关键字，当它写在关键字class前面时，它就有了特殊的含义
- 枚举类并不仅仅是值得列表，我们可以在枚举类中声明属性和方法
- 在创建最后一个枚举常量时用分号，分号的作用是将枚举常量列表和方法定义分开
<!--more-->

# 示例
## 枚举简单使用
	enum class Traffic(val time:Int) //time属性
	{
    	RED(10),YELLOW(5),GREEN(30);
    	fun getTrafficTime()=time  //方法
	}
	fun main(args:Array<String>)
	{
   		println(Traffic.RED.getTrafficTime())
	}
## 枚举之when表达式

	enum class Traffic()
	{
    	RED,YELLOW,GREEN;
	}
	fun  getTrafficLight(traffic: Traffic)=
        when(traffic)
		{
            Traffic.RED ->"红"
            Traffic.GREEN ->"绿"
            Traffic.YELLOW -> "黄"
        }
	fun main(args:Array<String>)
	{
   	 	println(getTrafficLight(Traffic.RED))
	}