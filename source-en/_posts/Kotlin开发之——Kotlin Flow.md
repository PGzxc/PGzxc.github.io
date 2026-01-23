---
title: Kotlin开发之——Kotlin Flow
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
  - Flow
abbrlink: e7cc69c6
date: 2023-03-26 13:32:43
---
## 一 概述

* Kotlin中Flow的概念
* Kotlin Flow学习准备事项
* Flow的操作

<!--more-->

## 二 Kotlin中Flow的概念

### 2.1 Flow是什么

* Flow是Kotlin中的`异步流`，类似于RxJava中的事件流
* Kotlin中suspend挂起函数是处理返回单个值的情况
* 而Kotlin中Flow是处理返回多个异步计算的值

### 2.2 冷流和热流

一个异步数据流，通常包含三部分：

```
上游
操作符
下游
```

说明：

* 冷流，即下游无消费行为时，上游不会产生数据，只有下游开始消费，上游才从开始产生数据
* 热流，即无论下游是否有消费行为，上游都会自己产生数据

### 2.3 Flow操作符

* Flow默认为冷流，即下游有消费时，才执行生产操作
* 操作符也被分为两类——中间操作符和末端操作符
* 中间操作符不会产生消费行为，返回依然为Flow
* 末端操作符，会产生消费行为，即触发流的生产

## 三 Kotlin Flow学习准备事项

### 3.1 具备知识点

* Kotlin基础
* Gradle项目依赖添加

### 3.2 项目依赖

grale依赖添加

```
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.2'
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.
```

在文件中，导入开发工具包

```
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
```

## 四 Flow的操作

### 4.1 Flow的创建

#### flow

通过flow{}构造器，可以快速创建Flow，在flow中，可以使用emit来生产数据（或者emitAll生产批量数据），示例如下。

```
fun simple(): Flow<String> = flow {
    for (i in 0..3) {
        emit(i.toString())
    }
}
```

#### flowOf

与listOf类似，Flow可以通过flowOf来产生有限的已知数据

```
fun simple(): Flow<Int> = flowOf(1,2,3)
```

#### asFlow

asFlow用于将List转换为Flow

```
fun simple(): Flow<Int> = listOf<Int>(1,2,3).asFlow()
```

#### emptyFlow(创建一个空流)

```
fun simple(): Flow<Int> = emptyFlow()
```

### 4.2 末端操作符

末端操作符在调用之后，创建Flow的代码才会执行，这点和Sequence非常类似

#### collect

代码1(将flow作为一个函数调用)：

```
import kotlinx.coroutines.flow.*

fun simple(): Flow<Int> = flow {
    for (i in 0..3) {
        emit(i)
    }
}

suspend fun main() {
    simple().collect { value -> println(value) }
}
```

代码2(作为一个整体调用)：

```
suspend fun main() {
    flow<Int> {
        for (i in 0..3) {
            emit(i)
        }
    }.collect { value -> println(value) }
}
```

#### collectIndexed

带下标的collect，下标是Flow中的emit顺序。

```
suspend fun main() {
  flowOf(4, 5, 6).collectIndexed { index, value -> println("$index  $value") }
}
```

#### collectLatest

collectLatest用于在collect中取消未来得及处理的数据，只保留当前最新的生产数据

```
suspend fun main() {
    //短时间范围内 会覆盖前一个数据
    flow {
        emit(7)
        delay(50)
        emit(8)
    }.collectLatest {
        println( "collecting $it")
        delay(100)
        println("collected $it")
    }
}
```

打印结果

```
collecting 7
collecting 8
collected 8
```

#### toCollection、toSet、toList

这些操作符用于将Flow转换为Collection、Set和List

```
suspend fun main() {
    val set= mutableSetOf<Int>()
    val setCollection = flowOf(1,2,3).toSet(set)
    setCollection.forEach { value-> println(value) }
    //setCollection.forEach(::println)
}
```

#### launchIn

在指定的协程作用域中直接执行Flow

```
flow {
        for (i in 0..3) {
            println("emit value---$i")
            emit(i.toString())
        }
    }.launchIn(MainScope())
```

#### last、lastOrNull、first、firstOrNull

返回Flow的最后一个值（第一个值），区别是last为空的话，last会抛出异常，而lastOrNull可空。

```
fun simple(): Flow<Int> = flow {
    for (i in 0..3) {
        emit(i)
    }
}

suspend fun main() {
    simple().toCollection(Collections.EMPTY_LIST).last();
}
```

### 4.3 状态操作符

状态操作符不做任何修改，只是在合适的节点返回状态。

* onStart：在上游生产数据前调用
* onCompletion：在流完成或者取消时调用
* onEach：在上游每次emit前调用
* ~~onEmpty~~：流中未产生任何数据时调用
* catch：对上游中的异常进行捕获
* retry、retryWhen：在发生异常时进行重试，retryWhen中可以拿到异常和当前重试的次数

代码

```
flow {
        for (i in 0..3) {
            emit(i)
        }
        //emit(listOf<String>()[1])
    } .onStart {
        println( "onStart...")
    }.onEach {
        println( "onEach $it")
    }.onCompletion {
        println( "onCompletion...")
    }.retryWhen { cause, attempt ->
        attempt < 3
    }.catch {
        println( "catch $it")
    }.collect {
        println( "collect $it")
    }
```

正常情况下打印结果：

```
onStart...
onEach 0
collect 0
onEach 1
collect 1
onEach 2
collect 2
onEach 3
collect 3
onCompletion...
```

异常情况下打印结果

```
onStart...
onCompletion...
0
onStart...
onCompletion...
1
onStart...
onCompletion...
2
onStart...
onCompletion...
3
catch java.lang.IndexOutOfBoundsException
```

另外，onCompletion也可以监听异常，代码如下所示

```
.onCompletion { exception ->
    Log.d("xys", "Result---$exception")
}
```

### 4.4 Transform操作符

与RxJava一样，在数据流中，我们可以利用操作符对数据进行各种变换，以满足操作流的不同需求。

#### map、mapLatest、mapNotNull

map操作符将Flow的输入通过block转换为新的输出

```
fun simple(): Flow<Int> = flow {
    for (i in 0..3) {
        emit(i)
    }
}.map {
    it * it
}

suspend fun main() {
    simple().collect { value -> println(value) }
}
```

#### transform

transform操作符与map操作符有点一样，但又不完全一样，map是一对一的变换，而transform则可以完全控制流的数据，进行过滤、 重组等等操作都可以。

```
suspend fun main() {
    flow {
        for (i in 0..3) {
            emit(i)
        }
    }.transform{
        println("transform $it")
        if (it == 1){
            emit("hello")
        }
    }.collect {
        println("collect $it")
    }

}
```

打印结果

```
transform 0
transform 1
collect hello
transform 2
transform 3
```

#### transform

使用transform，我们可以在执行长时间运行的异步请求之前发出一个字符串，然后再发出一个响应：

```
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

suspend fun performRequest(request: Int): String {
    delay(1000) // imitate long-running asynchronous work
    return "response $request"
}

fun main() = runBlocking<Unit> {
    (1..3).asFlow() // a flow of requests
        .transform { request ->
            emit("Making request $request") 
            emit(performRequest(request)) 
        }
        .collect { response -> println(response) }
}
```

打印结果

```
Making request 1
response 1
Making request 2
response 2
Making request 3
response 3
```

### 4.5 过滤操作符

#### filter、filterInstance、filterNot、filterNotNull

过滤操作符可以按条件、类型或者对过滤取反、取非空等条件进行操作

```
suspend fun main() {
    flowOf(1,2,3)
        .filter {
            it > 1
        }.collect {
          println(it)
        }
}
```

#### drop、dropWhile、take、takeWhile

这类操作符可以丢弃前n个数据，或者是只拿前n个数据。带while后缀的，则表示按条件进行判断。

```
suspend fun main() {
    flowOf(1,3,4,5,2)
        .drop(2)
        .collect {
          println(it)
        }
}
```

#### debounce

debounce操作符用于防抖，指定时间内的值只接收最新的一个

```
suspend fun main() {
    flow {
        emit(1)
        delay(90)
        emit(2)
        delay(90)
        emit(3)
        delay(1010)
        emit(4)
        delay(1010)
        emit(5)
    }.debounce(1000).collect {
       println(it)
    }
}
```

打印结果

```
3
4
5
```

#### sample

sample操作符与debounce操作符有点像，但是却限制了一个周期性时间，sample操作符获取的是一个周期内的最新的数据，可以理解为debounce操作符增加了周期的限制。

```
flow {
        repeat(10) {
            emit(it)
            delay(50)
        }
    }.sample(100)
```

#### distinctUntilChangedBy

去重操作符，可以按照指定类型的参数进行去重。

### 4.6 组合操作符

组合操作符用于将多个Flow的数据进行组合

#### combine、combineTransform

combine操作符可以连接两个不同的Flow。

```
suspend fun main() {
    val flow1 = flowOf(1, 2).onEach { delay(10) }
    val flow2 = flowOf("a", "b", "c").onEach { delay(20) }
    flow1.combine(flow2) { i, s -> i.toString() + s }.collect {
        println("Flow combine: $it")
    }
}
```

打印结果

```
Flow combine: 1a
Flow combine: 2a
Flow combine: 2b
Flow combine: 2c
```

可以发现，当两个Flow数量不同时，始终由Flow1开始，用其最新的元素，与Flow2的最新的元素进行组合，形成新的元素。

#### flatMapMerge

该操作同时收集所有传入流，并将它们的值合并到一个流中，以便尽快发出

```
fun requestFlow(i: Int): Flow<String> = flow {
    emit("$i: First")
    delay(500) // wait 500 ms
    emit("$i: Second")
}

fun main() = runBlocking<Unit> {
    val startTime = currentTimeMillis() // remember the start time
    (1..3).asFlow().onEach { delay(100) }
        .flatMapMerge { requestFlow(it) }
        .collect { value -> // collect and print
            println("$value at ${currentTimeMillis() - startTime} ms from start")
        }
}
```

打印结果

```
1: First at 156 ms from start
2: First at 269 ms from start
3: First at 373 ms from start
1: Second at 659 ms from start
2: Second at 785 ms from start
3: Second at 879 ms from start
```

#### zip

zip操作符会分别从两个流中取值，当一个流中的数据取完，zip过程就完成了。

```
suspend fun main() {
    val flow1 = flowOf(1, 2).onEach { delay(10) }
    val flow2 = flowOf("a", "b", "c").onEach { delay(20) }
    flow1.zip(flow2) { i, s -> i.toString() + s }.collect {
        println( "Flow zip: $it")
    }
}
```

打印结果：

```
Flow zip: 1a
Flow zip: 2b
```

### 4.7 线程切换—flowOn

#### flowOn指定线程

在Flow中，可以简单的使用flowOn来指定线程的切换，flowOn会对上游，以及flowOn之前的所有操作符生效。

```
suspend fun main() {
    flow {
        for (i in 0..3) {
            println("Emit Flow in ${Thread.currentThread().name}")
            emit(i)
        }
    }.map {
        println("Map Flow in ${Thread.currentThread().name}")
        it * it
    }.flowOn(Dispatchers.IO).collect {
        println("Collect Flow in ${Thread.currentThread().name}")
        println("Result---$it")
    }
}
```

这种情况下，flow和map的操作都将在子线程中执行

#### flowOn指定线程后，调用map

而如果是这样，这样map就会执行在主线程了。同时，你也可以多次调用flowOn来不断的切换线程，让前面的操作符执行在不同的线程中

```
suspend fun main() {
    flow {
        for (i in 0..3) {
          println("Emit Flow in ${Thread.currentThread().name}")
            emit(i)
        }
    }.flowOn(Dispatchers.IO).map {
        println( "Map Flow in ${Thread.currentThread().name}")
        it * it
    }.collect {
        println("Collect Flow in ${Thread.currentThread().name}")
        println("Result---$it")
    }
}
```

### 4.8 取消Flow

Flow也是可以被取消的，最常用的方式就是通过withTimeoutOrNull来取消，代码如下所示。

```
suspend fun main() {
    withTimeoutOrNull(2500) {
        flow {
            for (i in 1..5) {
                delay(1000)
                emit(i)
            }
        }.collect {
            println("Flow: $it")
        }
    }
}
```

输出结果：

```
Flow: 1
Flow: 2
```

这样当输出1、2之后，Flow就被取消了。Flow的取消，实际上就是依赖于协程的取消。

## 五 参考

* [简书—kotlin-Flow](http://events.jianshu.io/p/366ba7c35ee0)
* [Kotlin官网—Asynchronous Flow](https://kotlinlang.org/docs/flow.html)