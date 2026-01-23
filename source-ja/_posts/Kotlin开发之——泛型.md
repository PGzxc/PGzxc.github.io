---
title: Kotlin开发之——泛型
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 泛型
abbrlink: d7ebd6b2
date: 2017-12-23 00:00:32
---
# 概述
一般类和函数，只能使用具体的类型：要么是基本类型，要么是自定义的类。如果要编写可以应用于多种类型的代码，这种刻板的约束对代码的限制很大。而OOP的多态采用了一种泛化的机制，在SE5中，java引用了泛型。   

泛型即"参数化类型"。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量数，此时类型也定义成参数形式(可以称之为类型形参)，然后在使用/调用时传入具体的类型(类型实参)。 

在Kotlin中，依然可以使用泛型，解耦类与函数与所用类型之间的约束，甚至是使用方法都与Java一致。   
<!--more-->
# 泛型  

## 泛型类  
声明一个泛型类   

	class Box<T>(t: T) 
	{
    	var value = t
	} 
通常，要创建这样一个类的实例，我们需要指定类型参数：  

	val box: Box<Int> = Box<Int>(1) 

但是，如果类型参数可以通过推断得到，比如通过构造器参数类型或是通过其他手段推断得到，此时允许省略类型参数：  

	val box = Box(1) // 1 的类型为 Int, 因此编译器知道我们创建的实例是 Box&lt;Int> 类型

## 泛型函数
泛型函数与其所在的类是否是泛型没有关系。泛型函数使得该函数能够独立于其所在类而产生变化。在<Think in java>有这么一句话：无论何时只要你能做到，你就应该尽量使用泛型方法，也就是说如果使用泛型方法可以取代整个类泛型化，那么久应该只是用泛型方法，因为它可以使事情更明白。这种泛型使用思想，在Kotlin中依然可以延续。   

下面我们生命一个泛型函数doPrintln，当T是一个int类型时，打印其个位的值；如果T是String类型，将字母全部大写输出；如果是其他类型，打印"T is not int and String"   

	fun main(args: Array<String>) 
	{
    	val age = 23
    	val name = "Jone"
    	val person = true

    	doPrintln(age) // 打印：3
    	doPrintln(name) // 打印：JONE
    	doPrintln(person) // 打印：T is not Int and String
	}

	fun <T> doPrintln(content: T) 
	{
    	when (content) 
		{
        	is Int -> println(content % 10) 
        	is String -> println(content.toUpperCase())
        	else -> println("T is not Int and String")
    	}
	}
注：   

- 类型参数放在函数名称之前
- 如果在调用处明确地传入了类型参数，那么类型参数应该放在函数名称之后。如果不传入类型参数，编译器会根据传入的值自动推断类型参数。  

## 类型协变
在类型声明时，使用协变注解修饰符(in或者out)。于这个注解出现在类型参数的声明处，因此我们称之为声明处的类型变异。如果在使用泛型时，使用了该类型编译了会有什么效果呢？  

假设我们有一个泛型接口Source<in T,out R>，其中T由协变注解in修饰，R由协变注解Out修饰。  

	internal interface Source<in T, out R> 
	{
    	fun mapT(t: T): Unit
    	fun nextR(): R
	}

- in T:来确保Source的成员函数只能消费T类型，而不能返回T类型
- out R：来确保Source的成员函数只能返回R类型，而不能消费R类型 

从上面的解释中，我们可以清楚的知道了协变注解in和out的用意，其实际上是类型参数在该类或者接口的用途，是用来消费的还是用来返回的，对其做了相应的限定。  

## 类型投射  
上面我们已经了解到了协变注解in和out的用意，下面我们将会用in和out，做一件有意义的事，看下面的代码

	fun copy(from: Array<out String>, to: Array<Any>) 
	{
   	 	// ...
	}

	fun fill(dest: Array<in String>, value: String) 
	{
    	// ...
	}
对于copy函数中，from的泛型参数使用了协变注解out修饰，意味着该参数不能在该函数中消费，也就是说在该函数中禁止对该参数进行任何操作  

对于fill函数中，dest的泛型参数使用了协变注解In修饰，Array<in String>与java的Array<？ super String> 相同，也就是说，你可以使用CharSequrence数组或者Object数组作为fill()函数的参数。   

这种声明在Kotlin中称为类型投射(type projection)，类型投射的主要用于对参数做了相对于的限定，避免了对该参数类的不安全操作。   

## 星号投射 
有些时候, 你可能想表示你并不知道类型参数的任何信息, 但是仍然希望能够安全地使用它. 这里所谓”安全地使用”是指, 对泛型类型定义一个类型投射, 要求这个泛型类型的所有的实体实例, 都是这个投射的子类型.  

对于这个问题, Kotlin 提供了一种语法, 称为 星号投射(star-projection):   

- 假如类型定义为 Foo<out T> , 其中 T 是一个协变的类型参数, 上界(upper bound)为 TUpper ,Foo<> 等价于 Foo<out TUpper> . 它表示, 当 T 未知时, 你可以安全地从 Foo<> 中 读取TUpper 类型的值.
- 假如类型定义为 Foo<in T> , 其中 T 是一个反向协变的类型参数, Foo<> 等价于 Foo<inNothing> . 它表示, 当 T 未知时, 你不能安全地向 Foo<> 写入 任何东西.
- 假如类型定义为 Foo<T> , 其中 T 是一个协变的类型参数, 上界(upper bound)为 TUpper , 对于读取值的场合, Foo<*> 等价于 Foo<out TUpper> , 对于写入值的场合, 等价于 Foo<in Nothing> .

如果一个泛型类型中存在多个类型参数, 那么每个类型参数都可以单独的投射. 比如, 如果类型定义为interface Function<in T, out U> , 那么可以出现以下几种星号投射:  

- Function<*, String> , 代表 Function<in Nothing, String> ;
- Function<Int, *> , 代表 Function<Int, out Any?> ; 
- Function<, > , 代表 Function<in Nothing, out Any?> .

参考：   
[Kotlin-泛型][1]
[Kotlin 泛型][2]

[1]: http://blog.csdn.net/io_field/article/details/53574222
[2]: http://www.runoob.com/kotlin/kotlin-generics.html







