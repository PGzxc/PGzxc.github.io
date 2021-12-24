---
title: Kotlin开发之——集合(二)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 集合
abbrlink: 3563bbc5
date: 2017-12-20 22:05:41
---
# 概述  
自从Java8支持Lambda表达式以来，Lambda表达式是实现大量函数特性的基础，让Java开发越来越趋向于流程式开始。   
在Kotlin中，对Lambda表达式有完美搭档支持，有因为扩展这一特性，Kotlin也走在了函数式编程的前言。对于集合，Kotlin提供的不同类型集合，在标准库中，对这些集合实现了一些扩展以这种方式对集合操作。熟练的函数式编程的集成，是对相关函数有一定的认识和了解。话不多说，先看集合的这些操作到底有哪些？具体实现的功能？   
<!--more-->

# 集合接口 
- Iterable：父类。任何类继承这个接口就表示可以遍历序列的元素。
- MutableIterable:在迭代期间移除项目的迭代
- Collection:这个类表示元素的反省集合。我们可以访问函数；返回集合尺寸，集合是否为空，包含一项或一组。由于集合是不可变的，这类集合的所有方法只能请求数据。 
- MutableCollection:支持添加和移除元素的Collection.它提供额外的函数，如：add，remove或clear等等。
- List:或许这是最常用的集合。这表示有序的Collection。由于是有序的，我们可以用get函数，按照项目的位置请求项目。
- MutableList:支持添加和移除元素的List
- Set:不支持重复元素的无需元素集合
- MutableSet:支持添加和移除元素的Set
- Map：key-value(键-值)对集合。在映射表map中key(键)是唯一的，就是说在一个映射表中不能有两对有相同的key.
- MutableMap:支持添加和移除元素的map.

# List/Set操作

	val bookA = Book("A", 20, "Jone")
	val bookB = Book("B", 21, "Green")
	val bookC = Book("C", 22, "Mark")
	val bookD = Book("D", 23, "Node")
	val bookE = Book("E", 24, "Blue")

	val listBook = listOf<Book>(bookA, bookB, bookC, bookD, bookE)
# 聚合操作
所谓的聚合操作就是从值集合计算得出单个值

## any 
如果集合中至少有一个元素与指定条件相符，则返回true;否则返回false.在any的函数体内，指定判断元素的条件。

函数参数类型：   

	predicate:(T)->Boolean 
返回值  
	
	Boolean 
示例代码：  

	val any_22: Boolean = listBook.any { it.page > 22 }
	val any_33: Boolean = listBook.any { it.page > 33 }
	println("any_22: $any_22, any_33: $any_33") 
打印输出： any_22: true, any_33: false

## all
如果集合中所有元素与指定条件相符，则返回true；否则返回false;在all的函数体内，指定判断元素的条件；

函数参数类型：  

	predicate:(T)->Boolean  
返回值：  

	Boolean  
示例代码：   

	al all_20: Boolean = listBook.all { it.page >= 20 }
	val all_22: Boolean = listBook.all { it.page > 22 }
	println("all_20: $all_20, all_22: $all_22") 
输出结果：Log: all_22: true, all_33: false
## count
返回集合与指定条件相符的元素个数。在count的函数体内，指定判断元素的条件。如果不指定条件，返回集合中所有元素的个数。  
函数参数类型：  

	predicate:(T)->Boolean 
返回值：  
	
	Int
示例代码：  

	al count: Int = listBook.count {it.page > 23}
	println("count: $count")
  
## fold
将对集合从第一个到最后一个元素的操作结果进行累加，并加上初始值。
函数参数类型： 

	R:初始值
	operation:(T,R)->R

返回值：  

	R
示例代码：  

	val fold = listBook.fold(0, ::ops)
	println("fold: $fold") // Log:  fold: 110

	fun ops(total: Int, book: Book): Int
	 {
   	 	var t = total
    	t += book.page
    	println("total: $t, book: $book")
    	return  t
	 }
打印输出：  

	total: 20, book: Book(name='A', page=20, author='Jone')
	total: 41, book: Book(name='B', page=21, author='Green')
	total: 63, book: Book(name='C', page=22, author='Mark')
	total: 86, book: Book(name='D', page=23, author='Node')
	total: 110, book: Book(name='E', page=24, author='Blue')
	fold: 110
## foldRight
与fold类似，不同的是从最后一个元素到第一个元素。另外，传递的函数的参数类型也不一样，哪里不同，可以对比下ops和opsRight两个函数的参数的参数类型。   

函数参数类型：  
	
	R:初始值
	operation:(T,R)->R
返回值：  
	
	R
示例代码：  

	val foldRight = listBook.foldRight(0, ::opsRight)
	println("foldRight: $foldRight")

	fun opsRight(book: Book,total: Int): Int 
	{
    	var t = total
    	t += book.page
    	println("total: $t, book: $book")
    	return  t
	}
打印输出： 
 
	total: 24, book: Book(name='E', page=24, author='Blue')
	total: 47, book: Book(name='D', page=23, author='Node')
	total: 69, book: Book(name='C', page=22, author='Mark')
	total: 90, book: Book(name='B', page=21, author='Green')
	total: 110, book: Book(name='A', page=20, author='Jone')
	foldRight: 110
## forEach
对每个元素执行指定的操作，实际效果就是对集合的遍历
示例代码：  

	listBook.forEach (::println)
输出结果：  

	book: Book(name='A', page=20, author='Jone')
	book: Book(name='B', page=21, author='Green')
	book: Book(name='C', page=22, author='Mark')
	book: Book(name='D', page=23, author='Node')
## forEachIndexed
与forEach类似，不同的是在遍历元素的同时获得元素的索引 

示例代码：  

	listBook.forEachIndexed
	{
		index, book ->
   	 	run {
        println("index: $index, book: $book")
    	}
	}
输出结果： 
 
	index: 0, book: Book(name='A', page=20, author='Jone')
	index: 1, book: Book(name='B', page=21, author='Green')
	index: 2, book: Book(name='C', page=22, author='Mark')
	index: 3, book: Book(name='D', page=23, author='Node')
	index: 4, book: Book(name='E', page=24, author='Blue')
## maxBy
返回使指定函数产生最大值的第一个员。如果没有元素，则返回null。其接受的参数类型为函数参数。

函数参数类型：  
	
	selector:(T)->R
返回值：  

	T?
示例代码： 
 
	val pageMax: Book? = listBook.maxBy (::maxPage)
	println("pageMax:$pageMax")

	fun maxPage(book: Book?): Int 
	{
    	return book!!.page
	}
输出结果：  

	pageMax:Book(name='E', page=24, author='Blue')

## minBy
返回使指定函数产生最小值的第一个元素。如果没有元素，则返回null。
函数参数类型： 

	selector: (T) -> R
返回值：  
	
	T？
示例代码：  

	val pageMin: Book? = listBook.minBy (::selectorPage)
	println("pageMin:$pageMin")

	fun selectorPage(book: Book?): Int
	 {
    	return book!!.page
	 }
输出结果：  
pageMin:Book(name='A', page=20, author='Jone')  
## none
如果没有元素与指定条件相符，则返回true；否则，返回false。
函数参数类型： 

	predicate: (T) -> Boolean
返回值：  

	Boolean 
示例代码：

	val none: Boolean = listBook.none { it.page > 50 }
	println("none: $none") // Log：true
输出结果：  

	true 
## reduce
与fold类似，不同的是其结果不包括初始值，只是将对集合从第一个元素到最后一个元素的操作结果进行累加。 

	public inline fun <S, T: S> Iterable<T>.reduce(operation: (S, T) -> S): S 
	{
    	val iterator = this.iterator()
    	if (!iterator.hasNext()) throw UnsupportedOperationException("Empty collection can't be reduced.")
    	var accumulator: S = iterator.next()
    	while (iterator.hasNext()) 
		{
        	accumulator = operation(accumulator, iterator.next())
    	}
    	return accumulator
	}
与fold不同的是，其函数类型也不一样，从reduce源码可以看出，其接受的两个参数分别是list的数据类型T和它的父类S，最后改函数参数的返回值类型也是S。也就是说reduce最后返回的应该是S的一个实例。此时我们可以自定义一个函数或者是将T类的“+”运算符重载。下面的示例中，我们可以自定义一个函数pageReduce;

	fun pageReduce(bookTotal: Book, book: Book): Book 
	{
    	bookTotal.page += book.page
    	return bookTotal
	}

	val pageReduce = listBook.reduce (::pageReduce)
	println(pageReduce)
	println(listBook[0])
输出结果：  

	// Log1
	Book(name='A', page=110, author='Jone')
	// Log2
	Book(name='A', page=110, author='Jone')
注：  
仔细观察Log，其name是“A”，也就是说这应该是第一个元素对象的name；然后再看Log2，第一个元素的page值已经修改为了110？为什么会这样呢？   
看源码有这一段代码：  

	var accumulator: S = iterator.next()
	while (iterator.hasNext()) 
	{
   		accumulator = operation(accumulator, iterator.next())
	}
这是把集合中的第一个元素赋值给结果值accumulaor，这样的话结果值的引用是指向的集合中的第一个元素。在循环中，函数operation修改了accumulator的值，也就意味着集合中第一个元素的值被修改了。这样再次调用集合中的元素时，应该是修改后的值。既然这样在使用reduce时，是否应该暂时保存原集合，值得深思一下？  
## reduceRight
与reduce不同的是从最后一个元素与其前面的元素按照某一个条件相加，直到第一个元素，并将求出的值返回。

	val pageReduceRight = listBook.reduceRight (::pageReduceRight)
	println(pageReduceRight)
	println(listBook[4])

输出结果： 
 
	// Log1
	Book(name='E', page=110, author='Blue')
	// Log2
	Book(name='E', page=110, author='Blue')
注：  
与reduce不同的是，reduceRight是通过iterator.previous()将集合中的最后一个元素赋值给accumulator，实际的效果就是循环调用operation以后，集合的最后一个元素的值被修改成计算后的值。其处理方式与reduce一致。原集合都应该做临时保存数据。  
## sumBy  
返回集合中元素进行转换函数产生值的综合，其返回值类型为Int 
函数参数类型：  
	
	selector:(T)-Int  
返回值：  

	List
示例代码：  

	val sumBy:Int = listBook.sumBy(Book::page)
	println(sumBy) // Log
# 筛选操作
## drop
返回集合中除去前N项的所有元素。 

函数参数类型：Int
返回值： List
示例代码： 
 
	val listDrop = listBook.drop(2)
	listDrop.forEach(::println)
输出结果：  

	Book(name='C', page=22, author='Mark')
	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
## dropLast
返回集合中除去最后N项的所有元素  
函数参数类型：Int
返回值：List
示例代码：  

	val listDropLast = listBook.dropLast(2)
	listDropLast.forEach(::println)
输出结果：  

	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
## dropWhile
返回所有元素列表，除去第一个不满足条件元素的以前的所有元素。如果所有元素都满足条件，将返回一个空的list。这看着好别扭，很难懂，我们看它的源码，到底是怎么回事？

	public inline fun <T> Iterable<T>.dropWhile(predicate: (T) -> Boolean): List<T> 
	{
    	var yielding = false
    	val list = ArrayList<T>()
    	for (item in this)
        if (yielding)
            list.add(item)
        else if (!predicate(item)) 
		{
            list.add(item)
            yielding = true
        }
    	return list
	 }
dropWhile接收一个函数参数，其返回值是Boolean。看源码中定了一个yielding，其用来判断是否向返回的列表中添加元素的判断条件。  

	if (yielding)
    list.add(item)
	else if (!predicate(item)) 
	{
    	list.add(item)
    	yielding = true
	}
由于yielding的默认值是false，也就是说期初并不怎么往List中添加数据，下面再看另外一个判断条件，当元素满足指定条件时，也不会忘List中添加数据。当第一个不满足的条件的元素出现时，向list添加该不满足条件的元素，同时将yielding添加至list。以后的所有的元素都将被添加至list，此时条件函数已经失效了，不在作为判断标准。也就是说条件函数只是用来哪一个元素为第一个不满足条件，并以此为期间添加原list中后面所有的元素。  
函数参数类型： predicate:(T)->Boolean   
返回值：List   
示例代码：
  
	val listDropWhile = listBook.dropWhile {it.page < 23}
	listDropWhile.forEach(::println)
输出结果：  

	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
## dropLastWhile
返回集合中的所有元素，除去第一个不满足条件的元素，而判断顺序为从最后一个元素依次到第一个元素，如果所有元素都满足条件，返回一个空list.   
函数参数类型：precicate:(T)->Boolean  
返回值：List   
示例代码：
   
	val listDropLastWhile = listBook.dropLastWhile { it.page > 23 }
	listDropLastWhile.forEach(::println)
输出结果：  

	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
	Book(name='D', page=23, author='Node')
## filter
返回所有与指定条件相符的元素列表，如果所有元素都不满足指定条件，返回一个空List   
函数参数类型： predicate:(T)->Boolean   
返回值：List   
示例代码：  
 
	val listFilter = listBook.filter { it.page > 22 }
	listFilter.forEach(::println)
输出结果：  

	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
## filterNot
返回与指定条件不符的所有元素列表，如果所有元素都满足指定条件，返回一个空list  
函数参数类型 :predicate:(T)->Boolean   
返回值：List   
示例代码：
   
	val listFilterNot = listBook.filterNot { it.page > 22 }
	listFilterNot.forEach(::println)
输出结果：  

	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
## filterNotNull
返回所有元素列表，但不包括Null元素  

返回值：List  
示例代码：  

	val listFilterNotNull = listBook.filterNotNull()
	listFilterNotNull.forEach(::println)
## Slice 
返回指定索引的元素列表  
函数参数类型：Iterable   
返回值： List  
示例代码：  

	val listSlice = listBook.slice(listOf(2,4))
	listSlice.forEach(::println)
输出结果：  

	Book(name='C', page=22, author='Mark')
	Book(name='E', page=24, author='Blue')
## take  
返回前N个元素列表 

函数参数类型：Int  
返回值：List  
示例代码：  

	val listTake = listBook.take(2)
	listTake.forEach(::println)
输出结果：  

	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	
## takeLast
返回最后N个元素列表
函数参数类型：Int  
返回值：List  
示例代码：  

	val listTakeLast = listBook.takeLast(2) 
	listTakeLast.forEach(::println) 
输出结果：  

	Book(name=’D’, page=23, author=’Node’) 
	Book(name=’E’, page=24, author=’Blue’)
## takeWhile 
返回满足指定条件的第一个元素列表
函数参数类型： predicate:(T)->Boolean   
返回值：List  
示例代码：
  
	val listTakeWhile = listBook.takeWhile { it.page < 22 }
	listTakeWhile.forEach(::println)
输出结果： 
 
	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
## takeLastWhile
返回一个元素列表，返回的元素的列表是第一个不满足条件的元素的后边的所有元素。也就是意味着，如果最后一个元素不满足条件，将返回一个空list.  
函数参数类型：predicate:(T)->Boolean  
返回值：List   
示例代码：  

	val listTakeLastWhile = listBook.takeLastWhile { it.page > 22 }
	listTakeLastWhile.forEach(::println)
输出结果：
  
	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')

# 映射操作
## flatMap
通过遍历，将每个元素转化为一个新的对象，并创建一个新集合，把新的对象添加到新的集合并返回新的集合列表。    
函数参数类型：transform:(T)->iterable:List    
返回值：List   
示例代码：
  
	val listFlatMap = listOf(20, 30, 40).flatMap { it ->  mutableListOf(Book("A-" + it, it, "B- " + it))}
	listFlatMap.forEach (::println)
输出结果：
  
	Book(name='A-20', page=20, author='B- 20')
	Book(name='A-30', page=30, author='B- 30')
	Book(name='A-40', page=40, author='B- 40'

## groupBy
返回一个映射表，该表包括经指定函数对原始集合中元素进行分组后的元素。  
函数参数类型：keySelector:(T)->K   
返回值：Map  
## Map
返回一个列表，该列表包含对原始集合中每个元素进行转化后结果。    
函数参数类型： transform:(T)->R   
返回值：List  
示例代码：   

	val listMap = listOf(20, 30, 40).map { Book("A-" + it, it, "B- " + it) }
	listMap.forEach(::println)  
输出结果： 
 
	Book(name='A-20', page=20, author='B- 20')
	Book(name='A-30', page=30, author='B- 30')
	Book(name='A-40', page=40, author='B- 40')
## mapIndexed
返回一个列表，该列表包含了对原始集合中每个元素进行转换后结果和它们的索引。   
函数参数类型：transform:(Int,T)->R  
返回值：List   
示例代码： 
 
	val listMapIndexed = listOf(20, 30, 40).mapIndexed { index, it -> Book("A-" + index, it, "B- " + index) }
	listMapIndexed.forEach(::println)
输出结果：  

	Book(name='A-0', page=20, author='B- 0')
	Book(name='A-1', page=30, author='B- 1')
	Book(name='A-2', page=40, author='B- 2')
## mapNotNull
返回一个列表，该领包含对原始集合中非null元素转化后的结果。  
函数参数类型： transform:(T)->R?  
返回值：List  
示例代码： 
  
	val listMapNotNull = listOf(20, 30, 40)
        .mapNotNull (::mapNoNull)
	listMapNotNull.forEach(::println)

	fun mapNoNull(page: Int) : Book? 
	{
    	if (page == 20) 
		{
        	return null
    	} else 
		{
        	return Book("A-" + page, page, "B- " + page)
    	}
	}
输出结果： 
 
	Book(name='A-30', page=30, author='B- 30')
	Book(name='A-40', page=40, author='B- 40')
# 元素操作 
## contains  
在集合中如果找到指定元素，则返回true   
参数类型：T实例   
返回值：Boolean   
实例代码： 
  
	val contains = listBook.contains(bookA)
	val contains_ = listBook.contains(bookF)
	println("contains: $contains, contains_: $contains_") 
输出结果：  

	contains: true, contains_: false  
## elementAt  
返回指定索引位置的元素。如果索引超出这个集合的范围，则抛出indexOutBoundsException.  
参数类型： Int，索引位置  
返回值： T  
实例代码： 
 
	val bookIn = listBook.elementAt(2)
	println(bookIn)
输出结果： 
  
	Book(name='C', page=22, author='Mark')

## elementAtOrElse  
返回指定索引位置的元素。如果索引超出这个集合的范围，则返回调用默认函数的结果。  
函数参数类型：   
	
	index:Int  
	函数参数类型：defaultValue:(Int)->T
返回值： T  
实例代码：
  
	val out = listBook.elementAtOrElse(7){index -> Book("A-" + index, index, "B- " + index)}
	println(out)
输出结果：
  
	Book(name='A-7', page=7, author='B- 7')

## elementAtOrNull
返回索引位置的元素。如果索引超出这个集合的范围，则返回null.  
## first  
返回与指定条件相符的第一个元素。如果没有元素满足这个条件，则抛出异常NoSuchElementException   
函数参数类型： predicate:(T)-Boolean  
返回值：T  
示例代码： 
  
	val first = listBook.first{ it.page > 23}
	println(first)
输出结果： Book(name='D', page=23, author='Node')  
## firstOrNull  
返回与指定条件相符的第一个元素。如果没有找到符合的元素，则返回null.  
函数参数类型： predicate:(T)->Boolean  
返回值：T？  
## indexOf  
返回第一个元素的索引。如果集合没有包含元素，则返回-1  
参数类型： T：元素的数据类型   
返回值：Int   
示例代码：  
 
	val index = listBook.indexOf(bookA)
	val index_ = listBook.indexOf(bookF)
	println("index: $index, index_: $index_")
输出结果：  
index: 0, index_: -1  
## indexOfFirst  
返回第一个与指定条件相符的元素索引。如果集合没有包含这样的元素，则返回-1   
函数参数类型： predicate:(T)->Boolean  
返回值：int   
示例代码：
   
	val indexFirst = listBook.indexOfFirst { it.page > 23 }
	val indexFirst_ = listBook.indexOfFirst { it.page > 30 }
	println("indexFirst: $indexFirst, indexFirst_: $indexFirst_")
输出结果： indexFirst: 4, indexFirst_: -1
## last  
返回与指定条件相符的最后一个元素。  
函数参数类型： predicate:(T)->Boolean  
返回值：T  
示例代码：  

	val last = listOf(1, 3, 3, 4, 2, 3).last { it == 3 }
	println("last: $last")
输出结果： 
 
	last: 3
## lastIndexOf
返回最后一个满足条件的元素索引。如果集合没有包含满足条件的元素，则返回-1  
函数参数类型： -T：元素的数据类型  
返回值：  int   
示例代码： 

	val lastIndexOf = listOf(1, 3, 3, 4, 2, 3).last { it == 3 }
	val lastIndexOf_ = listOf(1, 3, 3, 4, 2, 3).last { it == 6 }
	println("lastIndexOf: $lastIndexOf, lastIndexOf_: $lastIndexOf_") 
输出结果：  Book(name='E', page=24, author='Blue')  
## single  
返回与指定条件相符的单一元素。如果没有或有多个相符的元素，则抛出异常illegalArgumentException  
函数参数类型：  predicate:(T)->Boolean  
返回值：T    
示例代码：
  
	val single = listBook.single { it.page == 22 }
	println(single)
输出结果： Book(name='C', page=22, author='Mark')  
## singleOrNull 
返回与指定条件相符的单一元素。如果没有找到这样元素或有找到多个这样元素，则返回null。  
函数参数类型：predicate:(T)->Boolean  
返回值：T  
# 生成操作 
## partition  
将元素集合拆分一对集合，一个集合包含判断条件为true的元素，另一个集合包含判断条件为false的元素。  
函数参数类型： predicate:(T)->Boolean  
返回值：pair  
## plus 
返回一个列表，该列表包含原始集合的所有元素和指定集合的所有元素。由于函数名称原因，我们可以使用“+”操作符。执行操作以后，原集合中元素列表并未改变。  
函数参数类型：  

1. 变种1：  

		T：元素的数据类型实例
2. 变种2

		Array：元素的数据类型的集合 
返回值类型： List<T>  
实例代码：  

	val plus = listBook.plus(bookF)
	println("plus")
	plus.forEach(::println)
	println("原list")
	listBook.forEach(::println)
输出结果： 
 
	plus
	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
	Book(name='F', page=25, author='Teaphy')
	原list
	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
## zip 
返回一个列表，该列表由两个集合中相同索引元素建立的元素对。这个列表长度为最短集合的长度为准。

在新的Kotlin版本中，去掉了merge操作符，其功能被保存下来了，作为了zip的一个变种。该变种将接受两个参数，其中一个参数为预建立配对的集合，另一个参数为函数参数，这个函数参数完成了，两个两个集合的配对元素结合，并生成新的元素。然后在将其加入新建的一个集合，最后将新建的集合返回。  

1. 变种 

	参数类型：other:Iterable
	返回值类型：List  
# 排序操作

## reverse
返回逆序元素列表 
实例代码  

	println("reverse")
	reverse.forEach(::println)
	println("原list")
	listBook.forEach(::println)
输出结果： 
 
	reverse
	Book(name='E', page=24, author='Blue')
	Book(name='D', page=23, author='Node')
	Book(name='C', page=22, author='Mark')
	Book(name='B', page=21, author='Green')
	Book(name='A', page=20, author='Jone')
	原list
	Book(name='A', page=20, author='Jone')
	Book(name='B', page=21, author='Green')
	Book(name='C', page=22, author='Mark')
	Book(name='D', page=23, author='Node')
	Book(name='E', page=24, author='Blue')
## sortBy 
返回所有元素列表，其元素通过特定的比较器分类排序
函数参数类型：crossinline selector:(T)->R?  
返回值类型：List   
实例代码：
  
	val sort = listBook.sortedBy { - it.page }
	sort.forEach(::println)
输出结果：
  
	Book(name='E', page=24, author='Blue')
	Book(name='D', page=23, author='Node')
	Book(name='C', page=22, author='Mark')
	Book(name='B', page=21, author='Green')
	Book(name='A', page=20, author='Jone')
## sortDescendingBy
返回所有元素的分类排序列表，其顺序为通过特定排序函数结果的降序。  
参数类型：crossinline selector:(T)->R?  
返回值类型：List   
实例代码  
 
	val sortedByDescending = listBook.sortedByDescending { it.page }
	sortedByDescending.forEach(::println)
输出结果：  

	Book(name='E', page=24, author='Blue')
	Book(name='D', page=23, author='Node')
	Book(name='C', page=22, author='Mark')
	Book(name='B', page=21, author='Green')
	Book(name='A', page=20, author='Jone')	


