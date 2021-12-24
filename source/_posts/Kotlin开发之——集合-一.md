---
title: Kotlin开发之——集合(一)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 集合
abbrlink: 9a5220a7
date: 2017-12-20 16:27:47
---
# 概述
集合类存放地点都是对象的引用，而非对象本身，处于表达式上的便利，我们称集合中的对象就是指集合中对象的引用。   

集合的分类：   

- Set(集)
- List(列表)
- Map(映射)

在kotlin中，明确的区分了可变和只读的集合(list，set，map等)，明确的确定了集合的可读性，有助于良好的编程，以及便于Bug的规避。
<!--more-->

# 几个概念

## Iterable
Iterable接口是最基本的接口，声明了Kotlin中集合的通用方法。

	fun iterator():Iterator<T> //返回该集合的元素的迭代器

## MutableIterable  

MutableIterable接口集成于Iterable接口，并重写了iterable方法，从该接口继承的类可以表示为可以被迭代并且支持在迭代期间移除元素的元素序列。  

	fun iterator():MutableIterator<T> //返回该集合的元素的迭代器  

## Collection  

Collection<E>接口继承与Iterable接口，是集合的通用接口，但仅封装了对集合的只读方法，如果想添加或者删除集合，需调用MutableCollection接口的方法。  

### 成员属性 
val size:Int 集合中元素的数量

### 函数

- isEmpty() //判断集合是否为空
- fun contains(E):Boolean //判断集合中是否包含某一元素
- fun containsAll(Collection<E>):Boolean //判断集合中是否包含某一集合
- fun iterator():Iterator<E> //返回该只读集合的元素的迭代器

### MutableCollection<E>
mutableCollection<E> 继承于Iterable<E>,Collection<E>接口，封装了添加或移除集合中元素的方法。  

- fun add(E):Boolean //向集合中添加元素。添加成功返回true，否则返回false.
- fun addAll(Collection):Boolean //向集合中添加一个集合；添加成功返回true，否则返回false.
- fun remove(E):Boolean //移除集合中的元素。移除成功返回true，否则返回false
- fun removeAll(Collection):Boolean //移除集合中的一个集合。移除成功返回true，否则返回false
- fun retainAll(Collection):Boolean //判断集合中是否包含一个集合。如果包含返回true，否则返回false.
- fun clean():Unit //将集合中的元素清空

## Set
### 概述
Set是最简单的一种集合。集合中的对象不按特定的方式排序，并且没有重复的对象   
Kotlin没有专门的语法用来创建set，可以使用标准库中的方法，比如setOf(),mutableSetOf()

- emptySet():Set -创建一个空的只读Set
- setOf(vararg T):Set -创建一个只读Set
- mutableSetOf(varag elements):MutableSet-创建一个可变Set

### Set API
查询操作

- val size:Int -集合中元素的数量
- fun isEmpty():Boolean -判断集合是否为空
- fun contains(E):Boolean -判断集合中是否包含某一元素
- fun iterator()：Iterator -返回该只读集的元素的迭代器
### 批量操作

 	fun containsAll(Collection<E>):Boolean -判断集合中是否包含某一集合

### 只读Set

例：  

	val setTea: Set<String> = setOf("E", "F", "B", "C", "A", "D", "F", "B")

    for (item in setTea) 
	{
        print(item)
    }
打印结果： EFBCAD  
从示例代码中，我们可以清晰的看出：   
1.Set中没有重复的对象
2.Set中对象不按特定的方式排序

上面提到了，Set中不能存放重复的对象，对于Kotlin中标准的数据类型，比如基本数据类型，String都有了相应的判定方式，如果我们自定义了类，该如何判断对象是不是重复的呢？ 

	data class Book(var name: String, var page: Int, var author: String) 
	{
		override fun hashCode(): Int 
		{
        	return this.name.hashCode()
    	}

    	override fun equals(other: Any?): Boolean 
		{
        	if (other is Book) 
			{
            	return this.page == other.page
        	}
        	return super.equals(other)
    	}
	}
现自定义了一个Book类，同时重写了hashCode()和equals()两个函数，其中，Book实例的hashCoe()返回值为name属性的hashCode()值，而equals()函数判断两个Book实例是否相等的标准为page属性。  

	val bookA = Book("A", 20, "Jone")
	val bookB = Book("A", 21, "Green")
	val bookC = Book("C", 20, "Mark")
	val bookD = Book("D", 22, "Node")
	val bookE = Book("A", 20, "Blue")

	var setBook = setOf(bookA, bookB, bookC, bookD, bookE)
	println(setBook.size)
	for (item in setBook) 
	{
    	println("item:$item , hashCode: ${item.hashCode()}")
	}
输出结果：  

	4
	item:Book(name=A, page=20, author=Jone) , hashCode: 65
	item:Book(name=A, page=21, author=Green) , hashCode: 65
	item:Book(name=C, page=20, author=Mark) , hashCode: 67
	item:Book(name=D, page=22, author=Node) , hashCode: 68

先不看Log打印，我们先往SetBook中添加的元素，根据我们刚才自定义Book的类，我们可以分析得到。   

1.bookA,bookB,bookE的name都是“A”，也就是说它们的hashCode()值都是一样的。    
2.bookA,bookC,bookE的page都是20，也就是说它们三个是相等的。  

现在看Log打印，在setBook中有4个元素bookA,bookB,bookC,bookD,再从上面分析的可以认为，bookA和bookE是重复的。  

对于Set而言，存入Set的每个元素都必须是唯一的，因为Set不保存重复元素。刚才的问题也就呼之欲出了，在Kotlin中，判断两个对象的是否重复标准是hashCode()和equals()两个参考值，也就是说只有两个对象的hashCode值一样与equals()为真时，才认为是相同的对象。所以自定义的类必须要重写hashCode()和equals()两个函数。   

### 可变Set  
#### 概述   
MutableSet接口继承于Set,MutableCollection，对于Set的扩展，添加了对元素添加和删除的操作。   

#### 常用API  
1. 查询操作     
	
	fun iterator():MutableIterator -返回集合元素的迭代器

2. 元素操作  
	
	fun add(E):Boolean -向集合中添加元素。添加成功，返回true;否则返回false
	fun remove(E):Boolean -移除集合中的元素。移除成功返回true,否则返回false 
3. 批量操作

	fun addAll(Collection):Boolean -向集合中添加一个集合。添加成功返回true，否则返回false

	fun removeAll(Collection):Boolean -移除集合中的一个集合。移除成功，返回true，否则返回false  

	retainAll(Collection):Boolean -判断集合中是否包含一个集合。如果包含返回true。否则返回false  

	fun clean():Unit -将集合中的元素清空  

示例：   

	var setMulable = mutableSetOf(bookA, bookB, bookC, bookD, bookE)
	setMulable.add(Book("Add", 20, "Floor"))
	println(setMulable.remove(bookA)) 
	println(setMulable.remove(bookE))
	for (item in setBook) 
	{
    	println("item:$item , hashCode: ${item.hashCode()}")
	}

输出结果： 

	true
	false
	item:Book(name=A, page=21, author=Green) , hashCode: 65
	item:Book(name=C, page=20, author=Mark) , hashCode: 67
	item:Book(name=D, page=22, author=Node) , hashCode: 68
	item:Book(name=Add, page=20, author=Floor) , hashCode: 65665  

#### 与Java比较
在java中，Set接口有两个主要的实现类HashSet和TreeSet:   

- HashSet:该类按照哈希算法来存取集合中的对象，存取速度比较快 
- TreeSet:该类实现了SortedSet接口，能够对集合中的对象进行排序
- LinkedHashSet:具有hashSet的查询速度，且内部使用链表维护元素的	顺序(插入的次序)   

Kotlin并没有HashSet，TreeSet和LinkHashSet。假如，实际开发过程中，如果用到了这三个中某一个Set，比如想通过hashCode来存取对象，此时该如何是好呢？鉴于与java的兼容性，JB大神们已经为我们封装了生成的HashSet，TreeSet或者LinkedHashSet的函数，我们可以用Java中的这三个类。   

	fun hashSetOf(vararg elements:T):java.util.HashSet
	fun linkedSetOf(vararg elements:T):java.util.LinkedHashSet
	sortedSetOf(comparator:java.util.Comparator,vararg elements:T):java.util.TreeSet
	fun sortedSetOf(vararg elements:T):java.util.TreeSet      


## List 

### 概述  
List的特征是其元素以线性方式存储，集合中可以存放重复对象   

### 常用API 

#### List
List<E> 接口继承于Collection<E> 接口，元素以线性方式存储，集合中可以存放重复元素。  

1. 查询操作

	val size:Int -集合中元素的数量   
 	fun isEmpty():Boolean -判断集合是否为空
	fun contains(E):Boolean -判断集合中是否包含某一元素
	fun iterator():Iterator -判断该只读集合的元素的迭代器 

2. 批量操作

	fun containsAll(Collection<E>):Boolean -判断集合中是否包含某一集合  
3. 查询操作操作

	fun get(int):E -查询集合中某一位置的元素

4. 搜索操作

	fun indexOf(E):Int -返回列表中指定元素首次出现的索引，如果元素不包含在列表中，则返回-1    
	fun lastIndexOf(E):Int -返回列表中指定元素最后一次出现的索引，如果元素不包含在列表中，则返回-1  

5. 迭代器

	fun listIterator():ListIterator -返回一个集合的迭代器  
	fun listIterator(Int):ListIterator -从指定位置开始，返回集合的迭代器   
	fun subList(fromindex:Int,toIndex:Int):Int -返回次列表中指定的[fromindex](包含)和[toindex](不包括)之间的集合

#### MutableList  
MutalbeList<E> 接口继承于List<E>,MutableCollection<E>，是对只读集合的扩展，增加了对集合的添加及删除元素的操作 。  

1. 修改操作

	fun add(E):Boolean -向集合中添加元素。添加成功返回true,否则返回false   
	fun remove(E):Boolean -移除集合中的元素。移除成功返回true,否则返回false
2. 批量操作  

	fun addAll(Collection):Boolean -向集合中添加一个集合。添加成功返回true,否则返回false   
	fun removeAll(Collection):Boolean -移除集合中的一个集合。移除成功返回true，否则返回false    
	retainAll(Collection):Boolean -判断集合中是否包含一个集合。如果包含返回true，否则返回false   
	fun clear():Unit -将集合中的元素清空   
3. 索引操作   

	fun set(int,E):E -用指定的元素替换此列表中指定位置的元素，返回该位置的元素。  
	fun add(int,E):Unit -在指定位置添加一个元素   
	fun removeAt(Int):E -移除指定索引处的元素   
#### 相关操作  

与Set一样，Kotlin并没有提供创建List的函数，如果想创建一个List，可以调用标准库中的方法，listOf(),mutableListOf()   

##### listOf   

listOf()是使用ArrayList实现的，返回的list是只读的，其内存效率更高。在开发过程中，可以尽可能的多用只读List，可以在一定程度上提高内存效率。    

	val bookA = Book("A", 20, "Jone")
	val bookB = Book("B", 21, "Green")
	val bookC = Book("C", 22, "Mark")
	val bookD = Book("D", 23, "Node")
	val bookE = Book("E", 24, "Blue")

	val listBook = listOf<Book>(bookA, bookB, bookC, bookD, bookE)  

创建了一个只读List，我们可以做一下操作    

1. 索引检索    


	  
	listBook.get(0)// 获取位置0处的元素   
 	listBook.indexOf(bookA)// 获取bookA第一次出现的位置 
	listBook.lastIndexOf(bookB)// 获取bookA最后一次出现的位置  

2. 遍历List   

	2.1 扩展函数foreach    
	
	 	listBook.forEach (::println )
	2.2 for循环
	
	 	for (book in listBook) 
		{
   			 println(book)
		}

	 2.3 迭代器

		while (iterator.hasNext()) 
		{
   			 println(iterator.next())
		}

##### toList   

	class Controller 
	{
    	private val _items = mutableListOf<String>()
    	val items: List<String> get() = _items.toList()
	}
toList是一个扩展函数，其只是单纯的赋值list内的内容，从而返回的是一个只读的List.   
## Map  
Map是一种把键对象和值对象映射的集合，它的诶一个元素都包含一对键对象和值对象。Map没有继承于Collection接口。从Map集合中检索元素时，只要给出键对象，就会返回对应的值对象。   

Kotlin中，与list，set一样的是，Map也分为只读map和可变两种Map。  

Kotlin中，创建Map时，需调用标准库中的系列函数，如mapOf(),multableMapOf()   

### Entry  
entry  

### Pair  
pair类用来存储两个值，这两个值可以是任何类型的，可以用于任何场景，比如Map,list.   
Pair类有扩展函数to，可以快速创建Pair类的实例  

	infix fun  

### 相关操作  

#### 创建Map  
1. 基于Pair扩展函数to   

	val bookA = Book("A", 20, "Jone")
	val bookB = Book("A", 21, "Green")
	val bookC = Book("C", 20, "Mark")
	val bookD = Book("D", 22, "Node")
	val bookE = Book("A", 20, "Blue")


	val map= mapOf<Int, Book>(1 to bookA, 2 to bookB, 3 to bookC, 4 to bookD, 5 to bookE)

	var mapMutable = mutableMapOf(1 to bookA, 2 to bookB, 3 to bookC, 4 to bookD, 5 to bookE)  
2. 基于Pair   

	val mapPair = mapOf(Pair(1, bookA), Pair(1, bookB))  

3. 创建一个空的Map  

	val mapEmpty = emptyMap<Int, Book>()  

4. HashMap  

	val hashMap = hashMapOf(1 to bookA, 2 to bookB)
5. LinkedHashMap  

	val linkedHashMap = linkedMapOf(1 to bookA, 2 to bookB)
注：   

- HashMap:Map基于散列表的实现。插入和查询“键值对”的开销是固定的。可以通过构造器容量capacity和负载因子 load factor，以调整容器的性能。 
- LinkedHashMap:类似于HashMap，但是迭代遍历它时，取得“键值对”的顺序是其插入序列，或者是最近最少使用(LRU)的次序。只比HashMap慢一点。而在迭代访问时反而更快，因为它使用链表维护内部次序。  
- mapOf和mutableMapOf()创建的Map是基于java的LinkedHashMap.  
- Kotlin现在并不支持TreeMap，WeakHashMao，identifyHashMap  

#### 查询操作  

1. 判断映射中元素的数量  

	var mapMutable = mutableMapOf(1 to bookA, 2 to bookB, 3 to bookC, 4 to bookD, 5 to bookE)
	val size = mapMutable.siz // size = 5
2. Map元素中Key的集合 

	val setKey = map.keys 
	setKey.forEach(::print) // Log: 1,2,3,4,5

	var setMutableKey = mapMutable.keys 
	setMutableKey.forEach(::print) // Log: 1,2,3,4,5 

3. Map中元素的集合

	val setValues = map.values
	setValues.forEach(::println)
	// Log
	// Book(name='A', page=20, author='Jone')
	// Book(name='A', page=21, author='Green')
	// Book(name='C', page=20, author='Mark')
	// Book(name='D', page=22, author='Node')


	var setMutableValues = mapMutable.values
	setMutableValues.forEach(::println)
	// Log
	// Book(name='A', page=20, author='Jone')
	// Book(name='A', page=21, author='Green')
	// Book(name='C', page=20, author='Mark')
	// Book(name='D', page=22, author='Node')

4. Map中元素的键/值对的集合

	val setEntry = map.entries
	setEntry.forEach{
    	println("key: ${it.key} , value: ${it.value}")
	}    

	var setMutableEntry = mapMutable.entries
	setMutableEntry.forEach{
    	println("key: ${it.key} , value: ${it.value}")
	}

	//Log
	key: 1 , value: Book(name='A', page=20, author='Jone')
	key: 2 , value: Book(name='A', page=21, author='Green')
	key: 3 , value: Book(name='C', page=20, author='Mark')
	key: 4 , value: Book(name='D', page=22, author='Node')
	key: 5 , value: Book(name='A', page=20, author='Blue')
注:  

1. 不管Map还是MutableMap获取到的键、值或者键值对的set，都是只读的。即便是MutableMap获取到的是MutableSet，其也是只读的，因为在Map或者MultableMap中，将这些set设置为了只读常量。  
2. 使用keySet()抽取key序列，将map中的所有values生成一个Set，使用values()抽取value序列，将map中的所有values生成一个Collection。为什么一个生成Set，一个生成Collection?那是因为，key总是独一无二的，value允许重复。

	1. 判断Map是否为空  
		
		map.isEmpty()
	2. 判断map是否包含某个key
	
		map.containsKey(2)
	3. 判断Map是否包含某个元素  
		
		map.containsValue(bookA)
	4. 查询Map中指定key的元素，若存在，返回元素之，否则返回null

	 	map.get(2)

#### 元素操作  

- 添加元素 

	// 将指定的[value]与映射中指定的[key]关联
	val valuePut: Boo = mapMutable.put(6, bookE)

- 移除元素

	// 移除映射中指定Key的元素，
	// 返回被移除的元素，若指定的Key的元素不存在，返回null
	val valueRemove: Book = mapMutable.remove(6, bookE)
- 清空整个映射

	map.clear()- 清空映射

参考：   
[Kotlin-集合详解(一)][1]


[1]: http://blog.csdn.net/io_field/article/details/53407829


	








 






