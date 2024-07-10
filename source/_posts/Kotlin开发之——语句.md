---
title: Kotlin开发之——语句
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 语句
abbrlink: 12be44e3
date: 2017-12-20 09:39:18
---
# 目录

![目录][2]
<!--more-->

# 语句详解
## if语句

在Kotlin中的if语句和Java还是有一定区别的，它比Java更灵活，除了能实现Java写法外，还可以实现表达式(三元运算符)及作为一个快的运用。
### 传统写法(同Java写法一样)
例如：   

	fun main(args:Array<String>)
	{
    	var num = 2
    	if (num== 2){
        println("num == $num => true")
    	}else{
        println("num == $num => false")
    	}
	}
输出结果为： num==2
### Kotlin中的三元运算符

在Kotlin中其实是不存在三元运算符(condition?then:else)这种操作的。那是因为if语句的特性(if表达式会返回一个值)故而不需要三元运算符。

	//在Java中可以这么写，但是Kotlin中直接会报错。   
	//var numB: Int = (numA > 2) ? 3 : 5
    //kotlin中直接用if..else替代。例：
    val num=8
    var numB: Int = if ( num > 2 ) 3 else 5  // 当num大于2时输出numB的值为5，反之为3
    println("numB = > $numB")
输出结果为：numB = >5   
由上可以看出，Kotlin中的if可以作为一个表达式并返回一个值。   

### 作为一个块结构，并且最后一句表达式为块的值  
例如：  

	var numA: Int = 2
	var numC: Int = if (numA > 2)
	{
    	numA++
    	numA = 10
    	println("numA > 2 => true")
    	numA
	}else if (numA == 2)
	{
    	numA++
    	numA = 20
    	println("numA == 2 => true")
    	numA
	}else
	{
    	numA++
    	numA = 30
    	println("numA < 2 => true")
    	numA
	}

	// 根据上面的代码可以看出，每一个if分支里面都是一个代码块，并且返回了一个值。根据条件numC的值应该为20
	println("numC => $numC") 
输出结果为：

	numA == 2 => true
	numC => 20

## for语句
- Kotlin废除了Java中的for(初始值;条件;增减步长)这个规则。但是Kotlin中对于for循环语句新增了其他的规则，来满足刚提到的规则。
- for循环提供迭代器用来遍历任何东西
- for循环数组被编译为一个基于索引的循环，它不会创建一个迭代器对象

### 增减表示
#### until表示递增
关键字：until   
范围：until[m,n]=>即大于m小于n  
 
例：   

	// 循环5次，且步长为1的递增
  	for (i in 0 until 5)
	 {
    	print("i => $i \t")
  	 }

输出结果为： i => 0  i => 1  i => 2  i => 3  i => 4     

#### downTo表示递减 

关键字：downTo    
范围：downTo[m,n]=>即大于m小于n
   
例：

		// 循环5次，且步长为1的递减
    	for (i in 15 downTo 11)
		{
       		 print("i => $i \t")
    	} 
   
输出结果为： i => 15     i => 14     i => 13     i => 12     i => 11     

#### 符号（' .. '） 表示递增的循环的另外一种操作
使用符号( '..')   
范围：..[n,m]=> 即大于等于n，小于等于m   
和until的区别，一是简便性。二是范围的不同。

例： 
  
	for (i in 20 .. 25)
	{
  	  print("i => $i \t")
	}
#### 设置步长
关键字：step   

例：

	for (i in 10 until 16 step 2)
	{
    	print("i => $i \t")
	}
输出结果为： i => 10     i => 12     i => 14  
### 迭代表示
- for循环提供了一个迭代器来遍历任何东西
- for循环数组被编译为一个基于索引的循环，它不会创建一个迭代器对象

#### 遍历字符串

例:   

	for (i in "abcdefg")
	{
        print("i => $i \t")
    } 
输出结果为：i => a  i => b  i => c  i => d  i => e  i => f  i => g     

#### 遍历数组
例：   

	var arrayListOne = arrayOf(10,20,30,40,50)
    for (i in arrayListOne)
	{
        print("i => $i \t")
    }
输出结果为：i => 10     i => 20     i => 30     i => 40     i => 50    
#### 使用数组的indices属性遍历

例：   

	var arrayListTwo = arrayOf(1,3,5,7,9)
    for (i in arrayListTwo.indices)
	{
        println("arrayListTwo[$i] => " + arrayListTwo[i])
    }
输出结果为： 
 
	arrayListTwo[0] => 1
	arrayListTwo[1] => 3
	arrayListTwo[2] => 5
	arrayListTwo[3] => 7
	arrayListTwo[4] => 9   
#### 使用数组的withIndex()方法遍历
例：   

	var arrayListTwo = arrayOf(1,3,5,7,9)
    for ((index,value) in arrayListTwo.withIndex())
	{
        println("index => $index \t value => $value")
    }
输出结果为：   

	index => 0   value => 1
	index => 1   value => 3
	index => 2   value => 5
	index => 3   value => 7
	index => 4   value => 9
#### 使用列表或数组的扩展函数遍历   
- 数组或列表有一个成员或扩展函数iterator()实现了Itetator<T>接口，且该接口提供了next()与haxNext()两个成员或扩展函数
- 其一般和while循环一起使用 

可以查看Array.kt这个类，可以看见其中的iterator()这个函数，而这个函数实现了Iterator接口。   

	public operator fun iterator(): Iterator<T>

查看Iterator.kt这个接口类，这个接口提供了hasNext()函数和next函数

	public interface Iterator<out T> 
	{
		public operator fun next(): T
		public operator fun hasNext(): Boolean
	}
例：   

	var arrayListThree = arrayOf(2,'a',3,false,9)
	var iterator: Iterator<Any> = arrayListThree.iterator()
	while (iterator.hasNext())
	{
    	println(iterator.next())
	}
输出结果为：
   
	2
	a
	3
	false
	9
终上所述就是for循环语句常用的用法。   

## when语句
- 在kotlin中已经废除了java中的switch语句。而新增了when(exp){}语句。
- when语句不仅可以替换switch语句，而且比switch语句更加强大

### when语句实现switch语句功能
例：   
	when(5)
	{
    	1 -> {println("1")}
    	2 -> println("2")
    	3 -> println("3")
    	5 -> {println("5")}
    	else -> {println("0")}
	}
输出结果为：5
### 和逗号结合使用，相当于switch语句中的不使用break跳转语句
例：    

	when(1)
	{
       // 即x = 1,2,3时都输出1。
    	1 , 2 , 3 -> {println("1")}
    	5 -> {println("5")}
    	else -> {println("0")}
	}
输出结果为： 1
### 条件可以使用任意表达式，不仅局限于常量
相当于if表达式的用法。   

例：   
	
	var num:Int = 5
    when(num > 5)
	{
        true -> {println("num > 5")}
        false ->{println("num < 5")}
        else -> {println("num = 5")}
    }
输出结果为：num<5

### 查值是否存在于集合或数组中
- 操作符 in(在)，!in（不在）
- 限定：只使用与数值类型

例：   

	var arrayList = arrayOf(1,2,3,4,5)
    when(1)
	{
        in arrayList.toIntArray() -> 
		 	{
            	println("1 存在于 arrayList数组中")
       		}
        in 0 .. 10 -> println("1 属于于 0~10 中")
        !in 5 .. 10 -> println("1 不属于 5~10 中")
        else -> 
		{
            println("都错了 哈哈！")
        }
    }
输出结果为：元素`1`存在于 arrayList数组中

### 检查值是否为指定类型的值
- 操作符： is（是），!is（不是）
- 值得注意的是：Kotlin的只能转换可以访问类型的方法和属性

例：   

	when("abc")
	{
    	is String -> println("abc是一个字符串")
   	 	else -> {println("abc不是一个字符串")}
	}
	// 智能转换
	var a: Int = 2
	when(a)
	{
    	!is Int -> {println("$a 不是一个Int类型的值")}
    	else -> 
		{
        	a = a.shl(2)
        	println("a => $a")
    	}
	}
输出结果为：
   
	abc是一个字符串
	a => 8
### 不使用表达式的when语句  
表示为最简单的布尔表达式  
例： 
 
	var array = arrayOfNulls<String>(3)
    when
	{
        true -> 
				{
            		for (i in array)
					{
                		print(" $i \t")
            		}
            		println()
        		}
       	else -> {}
    }
输出结果为：null    null    null 

综上所述，为Kotlin中when控制语句的常见用法。可以看出它的强大。以及便利性。不仅可以替代掉Java语句中的swicth语句。甚至可以替换掉if语句。   

## while语句  
- 其同Java中的while循环一样。在此不做累述。
- 定义格式：while(exp){ 其中exp为表达式...}  

例：  

	var num = 5
	var count = 1
	while (num < 10)
	{
   	 	println("num => $num")
   		println("循环了$count 次")
    	count++
    	num++
	}
输出结果：
  
	num => 5
	循环了1 次
	num => 6
	循环了2 次
	num => 7
	循环了3 次
	num => 8
	循环了4 次
	num => 9
	循环了5 次
## do...while语句
- 其同Java中的do...while循环一样。在此不做累述。
- 定义格式：do(exp){ // 其中exp为表达式...}(while)

例：   
	
	var num = 11
    var count = 1
    do {
        	println("num => $num")
        	println("循环了$count 次")
        	count++
        	num++
    	}
	while (num < 10)
输出结果：  
 
	num => 11
	循环了1 次

## 跳转语句（return、break、continue）
### return语句
默认情况下，从最近的封闭函数或匿名函数返回。

例：  
	fun returnExample()
	{
    	var str: String = ""
    	if (str.isBlank())
		{
        	println("我退出了该方法")
        	return
    	}
	}
输出结果：
   
	我退出了该方法
### break语句
作用：终止最近的闭合循环。
例：

	var count: Int = 1
	for (i in 1 until 10)
	{
    	if (i == 5)
		{
        	println("我在第$i 次退出了循环")
       	 	break
    	}
    	count++
	}
	println("我循环了多少次：count => $count")
输出结果为：   

	我在第5 次退出了循环
	我循环了多少次：count => 5
### continue语句
前进到最近的封闭循环的下一个步骤(迭代)。
例：  

	for (i in 2 until 7)
	{
        if (i == 5)
		{
            println("我跳过了第$i 次循环")
            continue
        }
        println("i => $i")
    }
输出结果：
  
	i => 2
	i => 3
	i => 4
	我跳过了第5 次循环
	i => 6
# 总结
不管对于任何一门编程语言，都有最基本的条件逻辑控制语句，而其语句是学习一门编程语言的基础。所以请各位大佬认真并且跟着代码敲一遍。特别是for语句和when语句这两个点。因为这两个点都和Java语言很大的改动。当然，if语句中的三元运算符也是值得注意的   

参考：   

[Kotlin——最详细的控制语句详解][1]

[1]: https://www.cnblogs.com/Jetictors/archive/2017/10/24/7721886.html
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-sentence.png