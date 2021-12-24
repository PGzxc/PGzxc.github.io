---
title: Kotlin开发之——常用操作符
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 操作符
abbrlink: b6266d42
date: 2017-12-21 17:18:54
---
# 前言 
熟悉Kotlin中常出现的一些操作符的用法，有助于我们快速入门Kotlin，下面将列举Kotlin中常用的一些操作符。  
 
- ?操作符 
- ?:操作符
- !!操作符
- ==与===
- ::操作符
- @符合
- as?操作符
- ：操作符
- """操作符
- is类型判断符
<!--more-->

# 实例分析  
## ?操作符  
?操作符表示这个对象可能为空    
	
	//在变量类型后面加上问号，代表该变量是可空变量  
	var name: String? = "zhangsan"
	
	/**
	*如果str不能转为Int类型，则返回null
	*/
	fun parseInt(str: String): Int? 
	{ 
  		// (代码略)
	}
	//如果 b非空，就返回 b.length ，否则返回 null，这个表达式的类型是 Int? 
	b?.length 
## ?:操作符
如果 ?: 左侧表达式非空，elvis操作符就返回其左侧表达式，否则返回右侧表达式。请注意，当且仅当左侧为空时，才会对右侧表达式求值。   

    //类型后面加?表示可为空
    var age: String? = null
	//age为空返回-1
    val ages2 = age?.toInt() ?: -1
## !!操作符  
如果!!左侧非空返回该值，否则抛出NPE(空指针)异常   

	//类型后面加?表示可为空
	var age: String? = "23" 
	//抛出空指针异常
	val ages = age!!.toInt()
## ==与===
==判断值是否相等，===判断值及引用是否完全相等。   

	val num: Int = 128;
	val a:Int? = num
	val b:Int? = num
	println(a == b)
	print(a === b)
输出结果： 
  
	true
	false

## ::操作符
::表示当前

	startActivity(Intent(this@KotlinActivity, MainActivity::class.java))
## @符合
限定this的类型  

	class User 
	{
    	inner class State
		{
        	fun getUser(): User
			{
            	//返回User
            	return this@User
        	}
        	fun getState(): State
			{
            	//返回State
            	return this@State
        	}
    	}
	}
## as?操作符   
当使用 as 转型的时候，可能会经常出现 ClassCastException。 所以，现在可以使as?安全转型，当转型不成功的时候，它会返回 null。  

注：在使用intent传值的时候，会出现空字符串不能用as强制转型，这是应该使用as?    

	val m: Int? = a as? Int
## ：操作符
用于类的继承，变量的定义   

- 类型和超类型之间的冒号前要有一个空格 
- 实例和类型之间的冒号前不要空格

	//定义全局变量时
	var str: String? = null
	//类的继承与变量定义
	class TestActivity<T : Serializable>(str: String) : Activity{}

## """操作符

三引号的形式用来输入多行文本，也就是说在三引号之间输入的内容将被原样保留，之中的单号和双引号不用转义，其中的不可见字符比如/n和/t都会被保留。  

	val str = """
        one
        two
            """

## is类型判断符
检查某个实例是否是某个类型，如果判断出属于某个类型，那么判断后的分支中可以直接可当该类型使用，无需显示转换   

	fun getStringLength(obj: Any): Int? 
	{
        //obj在&&右边自动动转换成"String"类型
        if (obj is String && obj.length > 0)
            return obj.length
        return null
    }

