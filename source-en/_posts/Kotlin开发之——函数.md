---
title: Kotlin开发之——函数
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 函数
abbrlink: d03ec40e
date: 2017-12-19 09:14:06
---
# 前言
无论函数还是方法我们这里统称函数，Koltin中的函数要比Java中丰富的多，我们这篇文章来了解下Kotlin中的各类函数。   
本文将按一下方式展开  

- 函数声明
- 函数参数
- 函数返回值
- 函数调用
- 函数范围
- 函数
<!--more-->

# 函数构成

## 函数声明

在Kotlin中使用关键字fun定义函数，函数的基本组成部分包括：名称、参数、返回值和函数体；   
Kotlin中的函数决定了一个对象能够接收到什么样的信息，如下：

 	fun methodName(parm:paramType):ReturnType{
	 }

- 返回类型(ReturnType)：描述的是调用函数之后从函数返回的值
- 参数列表(param)：给出了要传递给函数的信息的类型和名称
- 函数名(methodName)和参数列表(param)作为函数的唯一的标识符

## 函数的参数
函数参数的定义使用Pascal标记法，也就是name:type的格式，多个参数之间使用逗号分隔，每个参数都必须明确指定类型 
   
	fun methodName(param1:paramType,param2:paramType){
	 ...
	}

### 默认参数  
数可以指定默认值的参数称为默认参数；   
当参数省略时，就会使用默认值，与其他语言相比，这种功能使得我们可以减少大量的重载(overload)函数定义

		fun main(args:Array<String>){
     	 //使用默认值
	  	doSwim();//打印“do swim”
	  	//使用传递的参数
	  	doSwin("just do it");//打印“just do it”
	
		}
		fun doSwim(sprots:String="do swim"){
	   	println(sprots)	
		}
参数默认值的定义方法，在参数类型之后，添加=和默认值

### 指定参数    
调用函数时，可以通过参数名来指定参数。当函数参数很多或者存在默认参数时，指定参数名是一种非常便利的功能。    

有这样一个函数：  
  
	fun register(name:String,no:Int=1001,sex:Int=0){
	  println("name:$name,no:$no,sex:$sex")	
	}
当我们采用默认方式调用时，如果未设定的参数，位于参数列表的第一个，我们可以这样调用  

	resister("li")
其实际上相当于   

	register("li",1001,0)

如果我们不需要指定所有的参数，只是修改部分默认的参数值，我们可以这样：    

	register(name="wang",no=1003)
### 不定数量参数
如果在函数被调用以前，函数的参数(通常是参数中的最后一个)个数不能够确定，可以采用不定参数的方式，定义函数参数列表。比如在创建List时，创建以前并不知道预添加至List中多少数据。    
	
 	fun <T> asList(vararg ts:T):List<T>{
	 val result=ArrayList<T>()
	 for(t in ts)  
	 result.add(t)
      return result
	}

调用时，可以向这个函数传递不定数量达到参数：
   
	val list=asList(1,2,3)
	
在一个函数中只可以声明一个参数为vararg。与Java不同的是，在Kotlin中标记为vararg的参数不一定是最后一个。如果标记为vararg的参数不是最后一个，那么vararg参数之后的其他参数，可以使用命名语法来传递参数值或者参数类型是函数，可以在括号之外传递一个Lambda表达式。   

	fun main(args: Array<String>) 
	{
      specialty("苹果", "橘子", addr = "AAA")
	}

	fun specialty(vararg fruits: String, addr: String) 
	{
    	for (fruit in fruits)
		 {
        	println("fruit:$fruit, addr: $addr")
    	 }
	}
// Log    
fruit:苹果, addr: AAA   
fruit:橘子, addr: AAA

## 函数返回值
### 明确指定返回值类型
如果一个函数体由多行语句组成的代码段，那么必须明确指定返回值类型，除非函数的的返回值为Unit   
### Unit返回值
如果一个函数不返回任何有意义的结果值,那么它的返回类型为Unit .Unit 类型只有唯一的一个值Unit，在函数中,不需要明确地返回这个值    

对于返回值为Unit的函数，Unit可以省略。  

	fun register(name: String, no: Int = 1001, sex: Int = 0): Unit 
	{
       println("name: $name, no:$no, sex: $sex")
	}
上例中的代码等价于: 
  
	fun register(name: String, no: Int = 1001, sex: Int = 0) 
	{
    	println("name: $name, no:$no, sex: $sex")
	}
### 单表达式函数返回值
如果一个函数的函数体只有一个表达式，函数体可以直接写在 “=”之后，也就是这样： 
  
	fun double(x: Int): Int = x * 2
如果编译器可以推断出函数的返回值类型, 那么返回值的类型定义是可省略：  

	fun double(x: Int) = x * 2

## 函数调用
### 传统函数调用
函数的调用使用传统方式： 
 
	var result=double(2)
调用类的成员函数时，使用点号标记法(dot notation): 

	Sample().foo()//创建一个Sample类的实例，然后调用这个实例的foot函数

### 中缀标记法(infix notaion)

使用中缀标记法(infix notation)来调用函数，但函数需要满足一下条件：  

- 是成员函数或是扩展函数
- 只有单个参数
- 使用infix关键字标记

	class Person(var name: String, var age: Int) 
	{
      //使用infix 关键字标记，该函数可被中缀标记法法调用
      infix fun printName(addr: String) 
		{
        	println("addr: $addr, name: $name")
    	}
	}

	fun main(args: Array<String>) 
	{
    	val person: Person = Person("Jone", 20)
		//使用中缀标记法调用扩展函数
    	person printName("AA-BB") // Log: addr: AA-BB, name: Jone
		//上面的语句等价于
    	person.printName("AA-BB")
	}
## 函数范围
在Kotlin中，函数不仅仅能够被定义为top_level，即包下的函数，还可以被定义为局部函数，成员函数，以及扩展函数。函数的定义方式不同，其作用于也不尽相同，淡然函数的作用于还与修饰符相关
- public：默认修饰符，被其修饰的在任何位置都能被访问
- private：只能在当前源文件内使用
- internal：在同一模块内使用
- protected：无效修饰符，只用于类和接口内

# 函数
## 局部函数
所谓局部函数，就是定义在函数体内的函数

	fun dfs(graph: Graph)
	 {
    	fun dfs(current: Vertex, visited: Set<Vertex>) 
		  {
        	if (!visited.add(current)) return
        	for (v in current.neighbors)
            dfs(v, visited)
    	  } 
    	dfs(graph.vertices[0], HashSet())
	 }
局部函数可以访问外部函数中的局部变量(也就是闭包)，因此，在上面的例子中，visited可以定义为一个局部变量。

## 成员函数

成员函数就是指定义在类或者对象内的函数

	class Sample()
	{
	  fun foo(){println("foo")}				
	}
对成员函数的调用使用点号标记法。  
Sample().foo() //创建Sample类的实例，并调用foot函数

## 扩展函数

扩展类的函数，即Extension Function，可以已有类中添加新的方法，比继承更加简洁和优雅

	fun receiverType.functionName(parsms){
	...
	}
### 尾递归函数

Kotlin支持一种称为尾递归(tail recursion)的函数编程方式。这种编程方式，到底是用来干什么的呢？这种方式是基于函数表达式和递归函数，来实现某些基本循环的算法，采用这种方式可以有效的避免栈溢出的危险。  

当函数被关键字tailrec修饰，同时满足尾递归(tail recursion)的函数式编程的形式时，编译器就会对代码进行优化，消除函数的递归调用，产生一段基于循环实现的，快速而且高效的代码。

	tailrec fun plus(start: Int, end: Int, result: Int): Int = if (start >= end) result else plus(start+1, end, start + result) 
	// Test
	fun main(args: Array<String>) 
	{
    	println(plus(0, 10, 0)) // 打印结果 45
	}
上面的代码计算了从start到end之间的所有数的和，并将和与初始值相加后返回。编译器优化产生的代码等价于下面这种传统方式编写的代码：   

	fun plus(start: Int, end: Int, result: Int): Int
	 {
   	 	var res = result
    	var sta = start
    	while (sta < end) 
		  {
        	res += sta
        	sta++
    	  }

   	 	return res
	 }
注：  

- 要符合tailrec修饰符的要求，函数必须在她执行的所有操作的最后一步，递归调用它自身
- 如果递归调用后还有其他逻辑代码，不能使用尾递归
- 尾递归不能用在try/catch/finally结构内
- 尾递归目前只能用在jvm环境内

## 高阶函数

所谓的高阶函数，是一种特殊的函数，它接受函数作为参数，或者返回一个函数。   

	fun test(a: Int, b: Int, sumSom: (Int, Int, Int) -> Int): Int 
	{
    	if (a > b) 
		  {
        	return sumSom(0, a, 0)
    	  } else 
		  {
        	return sumSom(0, b, 0)
    	  }
	 }
	tailrec fun sumSom(start: Int, end: Int, result: Int): Int 
	 {
   		 var res = result
    	 var sta = start
    	 while (sta <= end) 
	      {
       	 	res += sta
        	sta++
   		  }
    	return res
	  }

	// 测试类
	fun main(args: Array<String>) 
	{
    	println(test(10, 9, ::sumSom)) // Log:55
	}
从上诉代码，在函数test中，sumSome参数是一个函数类型：（Int,Int,Int）->Int，其是一个函数，接收3个Int参数，返回值是一个Int类型的值。在test中，对传入的参数a，b进行判断，然后执行sumSom()函数并执行结果返回。

## 函数类型(Function Type)

对于一个接收另一个函数作为自己参数的函数，我们必须针对这个参数指定一个函数类型。比如，前面提到的test函数，它的定义如下：
   
	fun test(a: Int, b: Int, sumSom: (Int, Int, Int) -> Int): Int 
	{
    	if (a > b) 
		  {
        	return sumSom(0, a, 0)
   		  } else 
		  {
        	return sumSom(0, b, 0)
    	   }
	}
参数sumSom的类型是(Int,Int,Int)->Int，也就是说，它是一个函数，接受三个Int类型参数，并且返回一个Int.

## Lambda 表达式

Lambda表达式，或者匿名函数，是一种“函数字面值(function literal)”，也就是，一个没有声明的函数，但是立即作为表达式传递出去

	max(strings,{a,b->a.length()<b.length()})

函数max是一个高阶函数，也就是说，它接受一个函数值作为第二个参数。第二个参数是一个表达式，本身又是另一个函数，也就是说，它是一个函数字面量。作为函数，它等价于：   

	fun compare(a:String,b:String):Boolean=a.length()<b.length()
Lambda表达式的完整语法显示，就是说，函数类型的字面值，如下：   

	 var sum={x:Int,y:Int->x+y}
- Lambda表达式用大括号括起
- 它的参数(如果存在的话)定义在->之前(参数类型可以省略)
- (如果存在->的话)函数体定义在->之后

如果Lambda表达式只有一个唯一参数，在Kotlin中可以自行判断出Lambda表达式的参数定义，此时允许我们省略唯一一个参数的定义，并且会为我们隐含地定义这个参数，使用的参数名为it 

 	ints.filter{it>0}//这个函数字面值的类型是"(it:Int)->Boolean"

## 匿名函数
匿名函数看起来与通常的函数声明很类似，区别在于省略了函数名，函数体可以是一个表达式(如上例)，也可以是多条语句组成的代码段：   

	fun(x:Int,y:Int):Int
	{
	 return x+y
	}
参数和返回值类型的声明与通常的函数一样，但如果参数类型可以通过上下文推断得到，那么类型声明可以省略： 

 	ints.filter(fun(item)=item>0)
对于匿名函数，返回值类型的自动推断方式与通常的函数一样：如果函数体是一个表达式，那么返回值类型可以自动推断得到，如果函数体是多条语句组成的代码段，则返回类型必须明确指定(否则被认为是Unti)

参考:   
[ Kotlin-函数][1]
[1]: http://blog.csdn.net/io_field/article/details/53365834