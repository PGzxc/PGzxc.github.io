---
title: Kotlin开发之——异常处理
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 异常处理
abbrlink: 88a0dc83
date: 2017-12-20 12:10:12
---
# 异常处理概述

- Kotlin的异常处理机制与Java和其他编程语言的异常处理机制非常相似
- 当我们创建异常的实例时，无需使用new关键字
- 与Java不同的是，Kotlin中的throw是一个表达式
<!--more-->

# 异常实例分析

## 简单异常

	val percent=185
    if(percent !in 0..100)
	 {
      	 throw IllegalArgumentException("异常")
     }

## 异常捕获

- 和Java相同，Kotlin使用try结构及catch和finally子句处理异常
- 与java最大的不同在于，kotlin中没有throws语句
- Kotlin并不区分检查异常和非检查异常
- 无需指定一个函数可能会抛出的异常，甚至可能会无需处理任何异常

		fun readNumber(reader:BufferedReader):Int?
		{
			try 
		  	{
        		val line = reader.readLine()
        		return Integer.parseInt(line)
    	  	}catch (e:Exception)
		  	{
        		return null
    	  	}finally 
		  	{
        		reader.close()
    	  	}
		}

