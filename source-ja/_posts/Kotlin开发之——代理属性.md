---
title: Kotlin开发之——代理属性
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 代理属性
abbrlink: f655a5da
date: 2017-12-23 18:07:23
---
# 概述
所谓委托模式，就是为了其他对象提供一种代理以控制对这个对象的访问，在java开发过程中，是继承模式之外的很好的解决问题的方案。    
对于Kotlin而言，其直接支持委托模式，从而避免为了实现模式而不得不写那些常规的代码。又不得不赞叹，Kotlin的优雅、简洁。  
<!--more-->
# by
Kotlin中，委托的实现依靠关键字by,by表示将抽象主题的实例(by后边的实例)保存在代理类实例的内部，比如SportsManager类集成于ISports接口，并可以ISports接口的所有的public方法委托给一个指定的对象。 

	interface ISports 
	{
    	fun doSports()
	}

	class SwimForSports: ISports
	{
    	override fun doSports() 
		{
        	println("do swim")
    	}
	}

	class SportsManager(sport: ISports): ISports by sport

	fun main(args: Array<String>) 
	{
    	val swimSports: SwimForSports = SwimForSports()
    	SportsManager(swimSports).doSports()// Log：do swim
	}
在SportsManager声明中，by字句表示，将sport保存在SportsManaer的对象内部，而且编译器将会生成继承自ISports接口的所有方法，并将调用转发给sport。

# 委托属性
## 概述
所谓的委托属性，就是对其属性值的操作不再依赖于其自身的gettter()/setter()方法，是将其委托给一个代理类，从而每个使用类中的该属性可以通过代理类同一管理，再也不用在每个类中，对其声明重复的操作方法。  

## 定义语法
定义语法：  

	val/var <property name>:<Type> by<expression>

- var/val：属性类型(可读/只读)
- name：属性名称
- Type：属性的数据类型
- expression：代理类
by关键字之后的表达式就是委托，属性的get()方法(以及set()方法)将被委托给这个对象的getValue()和setValue()方法。属性委托不必实现任何借口，但必须提供getValue()函数(对于var属性，还需要setValue()函数)。  

## 使用场景

- 延迟加载属性(lazy property)：属性只在初次访问时才会计算
- 可观察属性(observale property)：属性发生变化时，可以向上监听器发送通知
- 将多个属性保存在一个map内，而不是保存在独立的域内

## 标准类库
Kotlin标准库中，已经自定义了一系列标准委托，包括了大部分有用的委托。  

### 延迟加载(lazy)
lazy()是一个函数，接受一个Lambda表达式作为参数，返回一个Lazy类型的实例，这个实例可以作为一个委托，实现延迟加载属性(lazy property)；第一次调用get()，将会执行lazy()函数受到的Lambda表达式，然后会记住这次执行的结果，以后所有对get()的调用都只会简单地返回以前记住的结果。  

	val no: Int by lazy {20}
	val c = 200
	fun main(args: Array<String>) 
	{	
    	val b = 200
	    println(no) // Log : 200
	    println(no) // Log : 200
	}
现声明了两个Top-level属性no和c，其中no为延迟加载属性(委托属性)。现在b打了断点，从下图可以清晰的看出，此时c已经被初始化，而no并未被初始化，直到println(no)调用时，no才被初始化。从那以后每次调用no,都会取得其值。   
![lazy][1]
注：   
1. var类型属性不能设置为延迟加载属性，因为在lazy中并没有setValue（..）方法
2. lazy操作是线程安全的。如果不在考虑多线程问题或者想提高更多的性能，也可以使用lazy(lazyThreadSafeMode.NONE){...}

在LazyThreadSafetyMode中声明了几种，[lazy]实例在多个线程之间同步访问的形式：   

- SYNCHRONIZED:锁定，用于确保只有一个线程可以初始化[lazy]实例
- PUBLICATION:初始化函数可以在并发访问未初始化的[lazy]实例值时调用几次，但只有第一个返回的值将会被用作[lazy]实例的值。
- NONE:没有锁用于同步对[lazy]实例值的访问；如果从多个线程访问实例，是线程安全地带。次模式应仅在高性能至关重要，并且[lazy]实例被保存永远不会从多个线程初始化时调用。  

### 可观察属性(Observable)
Delegates.observable()函数接受两个参数；第一个是初始化值，第二个是属性值变化事件的响应器(handler)。这种形式的委托，采用了观察者模式，其会检测可观察属性的变化，当被观察属性的setter()方法被调用的时候，响应器(handler)都会被调用(在属性赋值处理完成之后)并自动执行执行的Lambda表达式，同时响应器会收到三个参数：被赋值的属性，赋值前的旧属性值即赋值后的新属性值。  

	var name: String by Delegates.observable("wang", 
	{
    	kProperty, oldName, newName ->
    	println("kProperty：${kProperty.name} | oldName:$oldName | newName:$newName")
	})

	fun main(args: Array<String>) 
	{
    	println("name: $name") // Log：nam：wang
	    name = "zhang" // Log：kProperty：name | oldName:wang | newName:zhang
	    name = "li" // Log：kProperty：name | oldName:zhang | newName:li
	}

在这个例子中，Delegates.observalbe(wang,hanler)，完成了两项工作，一是：将name初始化(name=wang);二是检测name属性值的变化，每次变化时，都会打印其赋值前的旧属性值，以及复制后的新属性值。   

### Vetoable  
Delegates.vetoable()函数接受两个参数：第一个是初始化值，第二个是属性值变化事件的响应器(handler)，是可观察属性(Observable)的一个特例，不同的是在响应器指定的自动执行的lambda表达式在保存新值之前做了一些条件判断，来决定是否将新值保存。  

	var name: String by Delegates.vetoable("wang", 
	{
    	kProperty, oldValue, newValue ->
    	println("oldValue：$oldValue | newValue：$newValue")
    	newValue.contains("wang")
	})

	fun main(args: Array<String>) 
	{
    	println("name: $name")
    	println("------------------")
    	name = "zhangLing" 
    	println("name: $name") 
    	println("------------------")
    	name = "wangBing" 
    	println("name: $name") 
	}

打印输出:  
 
	name: wang
	------------------
	oldValue：wang | newValue：zhangLing
	name: wang
	------------------
	oldValue：wang | newValue：wangBing
	name: wangBing

代码示例中的委托，在给name赋值时，只有字符串中含有"wang"时，将新值赋值给name，第一次给name赋值"zhangling"时，lambda表达式的返回值为false，此时没有对name成功赋值。而第二次，赋值"wangbing"时，lambda表达式的返回值为true，成功赋值。 

### Not NULL 
在实际开发时，我们可能会设置可为null的var类型属性，在我们使用时，肯定是对其赋值，假如不赋值，必然要报NullPointException。一种解决方案是，我们可以在使用它时，在每个地方不管是不是null，都做null检查，这样我们就保证了在使用它时，保证它不是null，这样无形中添加了很多重复的代码。    
在Kotlin中，委托又帮我们做了一件善事，不用去写这些重复的代码，Not Null委托会含有一个可null的变量并会在我们设置这个属性的时候分配一个真实的值。如果这个值在被获取之前没有被分配，它就会抛出一个异常。  
这个在单利App这个例子中很有用：   

	class App : Application() 
	{
    	companion object 
		{
        	var instance: App by Delegates.notNull()
    	} 
    	override fun onCreate() 
		{
        	super.onCreate()
        	instance = this
    	}
	}

参考：   
[Kotlin-代理属性(by)][2]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-lazy.png
[2]: http://blog.csdn.net/IO_Field/article/details/53374809



