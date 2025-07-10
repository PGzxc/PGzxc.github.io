---
title: Android面试题——掘金-Kotlin相关面试题(7.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 919cf5f2
date: 2025-04-07 11:06:19
---
## 一 概述

```
1）可变参数
2）Object关键字
3）密封类
4）伴生类
5）数据类
6）协程
7）Flow
8）chanel
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 可变参数

```
在 Kotlin 中，可变参数（vararg） 是指函数可以接收 不定数量的参数，
类似 Java 的 ... 语法（例如：String... args）

1-基础语法
fun printAll(vararg strings: String) {
    for (s in strings) {
        println(s)
    }
}

printAll("A", "B", "C")
// 输出：A B C

2-可变参数位置要求
-vararg 只能有一个，且通常在最后一个参数
-若不在最后，可以与其他参数一起配合使用：
fun log(tag: String, vararg messages: String) {
    for (msg in messages) {
        println("[$tag] $msg")
    }
}

log("Debug", "msg1", "msg2")

3-传入数组时使用 * 展开运算符
val arr = arrayOf("A", "B", "C")
printAll(*arr)  // 注意加 *
```

### 2.2 Object关键字

```
在 Kotlin 中，object 关键字非常强大，是实现 单例、伴生对象、匿名对象、对象表达式 等的重要工具。
下面详细讲解：

一、object 的几种用法
1.1 单例对象（Singleton）
特点：
-程序启动时懒加载
-线程安全
-等价于 Java 的饿汉式单例
示例：
object NetworkManager {
    fun request() {
        println("Requesting...")
    }
}
1.2 伴生对象（Companion Object）
用于定义类级别的成员，类似 Java 的静态成员：
Kotlin 类本身没有 static 关键词，companion object 是实现静态行为的替代方案。
示例
class User {
    companion object {
        const val TAG = "User"
        fun create(): User = User()
    }
}

User.create()

1.3 匿名对象（Object Expression）
用于临时创建一个对象（实现接口或继承类）
val listener = object : View.OnClickListener {
    override fun onClick(v: View?) {
        println("Clicked")
    }
}

1.4 对象声明 + 接口实现（类似策略模式）
interface Logger {
    fun log(msg: String)
}

object FileLogger : Logger {
    override fun log(msg: String) {
        println("Write $msg to file")
    }
}
二 面试延伸点
object 是 Kotlin 实现单例的一种原生支持方式，线程安全、懒加载。
我常用它实现工具类（如 LogUtil、NetManager）、全局对象、配置中心等。
在需要静态行为时，我会使用 companion object，而不是传统 Java 的 static。
```

### 2.3 密封类

```
1.概念
Kotlin 中的 密封类（sealed class） 是一种受限继承的抽象类，
常用于表示一组有限且确定的类型状态，比如 UI 状态、网络请求结果、操作反馈等。

2.一句话理解
密封类是一种用来表达「状态集合」的工具，编译器会强制你处理所有可能的子类，搭配 when 使用非常安全、简洁。

3.密封类语法
sealed class Result
data class Success(val data: String) : Result()
data class Failure(val error: Throwable) : Result()
object Loading : Result()
```

### 2.4 伴生类

```
在 Kotlin 中，伴生对象（Companion Object） 是用于模拟 Java 中 static 行为的机制。
Kotlin 没有 static 关键字，但通过 companion object，你可以定义类级别的属性和方法。
```

### 2.5 数据类

```
一、概念
Kotlin 中的 数据类（data class） 是一种用于封装数据的特殊类，它自动为我们生成了一系列常用方法，
例如 equals()、hashCode()、toString()、copy()、componentN() 等，大大简化了模型类的编写。

二、基本语法
data class User(val name: String, val age: Int)

编译器会自动生成：
-equals() / hashCode()
-toString()：User(name=Jack, age=18)
-copy()：用于克隆并修改部分属性
-component1()、component2()：用于解构声明

三、使用示例
val user1 = User("Alice", 25)
val user2 = user1.copy(age = 30)  // 克隆并修改 age
println(user2)  // 输出：User(name=Alice, age=30)

四、注意事项
-data class 必须有一个主构造函数，且至少包含一个参数
-所有参数默认会参与 equals()、hashCode() 等方法
-不能是 abstract、open、sealed、inner 的

五、常见场景
-Retrofit 接口模型（如 UserBean）
-UI 展示数据模型（如 FeedItem、CardModel）
-跨组件传参（可序列化）
```

### 2.6 协程

一、概念

```
Kotlin 协程（Coroutine）是 Kotlin 提供的一种轻量级并发解决方案，
用来替代传统的线程/回调，让异步代码写起来像同步一样简洁清晰，
是现代 Android 开发中的核心技能之一。
```

二、协程的核心概念

|      术语      |                             解释                             |
| :------------: | :----------------------------------------------------------: |
|    suspend     |     声明一个挂起函数，可被挂起并在稍后恢复，不会阻塞线程     |
| CoroutineScope |                协程作用域，决定协程的生命周期                |
|     launch     |          启动一个协程，不会阻塞当前线程（返回 Job）          |
|     async      |   启动协程并返回结果（返回 Deferred，配合 `await()` 使用）   |
|  withContext   |              切换协程上下文，如从 IO 切到 Main               |
|   Dispatcher   | 协程调度器，控制代码在哪个线程上运行（如 `IO`, `Main`, `Default`） |

三、协程的基本使用

```
// 示例：在后台执行网络请求，然后切回主线程更新 UI
lifecycleScope.launch {
    val result = withContext(Dispatchers.IO) {
        api.getUserInfo()
    }
    textView.text = result.name
}
```

四、常用协程作用域

|        作用域         |   生命周期绑定    |          常用于          |
| :-------------------: | :---------------: | :----------------------: |
|      GlobalScope      |     应用级别      |     全局协程，不推荐     |
|    lifecycleScope     | Activity/Fragment |   UI 控制类中安全使用    |
|    viewModelScope     |     ViewModel     | 业务处理、网络、数据库等 |
| CoroutineScope 自定义 |     手动管理      |   工具类、仓库层等场景   |

五、挂起函数（`suspend`）

```
suspend fun getUser(): User {
    return api.getUser()
}
注意：只能在协程或挂起函数中调用挂起函数！
```

六、错误处理

```
1.try.catch
viewModelScope.launch {
    try {
        val user = getUser()
    } catch (e: Exception) {
        // handle error
    }
}
2.或者使用 CoroutineExceptionHandler：
val handler = CoroutineExceptionHandler { _, throwable ->
    Log.e("TAG", "Error: ${throwable.message}")
}

viewModelScope.launch(handler) {
    // your coroutine code
}
```

七、并发执行（`async/await`）

```
val job1 = async { loadFromNetwork() }
val job2 = async { loadFromCache() }

val result1 = job1.await()
val result2 = job2.await()
```

### 2.7 Flow

一、概念

```
Kotlin 的 Flow 是一种异步数据流处理工具，
它属于协程的一部分，适用于异步事件流、数据响应式编程、背压处理等场景，
相比 RxJava 更加轻量、简洁、原生支持协程。
```

二、什么是 Flow？

```
Flow 是一个可以发射（emit）多个值的 冷流（cold stream），
类似于 RxJava 中的 Observable，但和协程完美结合。
```

三、基本用法

```
fun simpleFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(1000)  // 模拟异步操作
        emit(i)      // 发射数据
    }
}
```

四、Flow 的特点

|     特性     |                     描述                      |
| :----------: | :-------------------------------------------: |
|     冷流     |       只有在 `collect` 时才真正执行逻辑       |
|   挂起函数   |    `collect` 是挂起函数，必须在协程中调用     |
|   背压处理   |        天然支持挂起暂停，不会压垮线程         |
| 生命周期安全 | 搭配 `lifecycleScope` / `viewModelScope` 使用 |

五、操作符常用示例

|    操作符     |              作用              |         示例代码         |
| :-----------: | :----------------------------: | :----------------------: |
|      map      |            数据变换            |     .map { it * 2 }      |
|    filter     |            过滤数据            |    .filter { it > 0 }    |
|    onEach     |      每个值执行副作用操作      | .onEach { println(it) }  |
|     catch     |            异常处理            | .catch { e -> emit(-1) } |
|    flowOn     |          切换发射线程          | .flowOn(Dispatchers.IO)  |
| collectLatest | 如果新值来了，取消旧的收集逻辑 |    用于响应式 UI 场景    |

六、异常处理

```
flow {
    emit(1)
    throw RuntimeException("Oops")
}.catch { e ->
    emit(-1)  // 捕获异常后发默认值
}.collect {
    println(it)
}
```

### 2.8 chanel

一、说明

```
Kotlin 中的 Channel 是一种用于在多个协程之间进行通信的工具，它是一个 热流（Hot Stream），用于传递数据。
与 Flow 不同，Channel 需要显式地进行发送和接收操作，并且是 协程间的消息传递机制。
```

二、Channel 基本概念

```
-Channel 是协程间的数据传递通道。
-发送（send）：生产者向 Channel 中发送数据。
-接收（receive）：消费者从 Channel 中接收数据。
-协程间通信：Channel 是协程间通信的工具，可以实现同步或异步的数据传递。
```

三、Channel 基本使用

```
一、 创建 Channel
val channel = Channel<Int>()  // 创建一个 Channel，类型是 Int

二、发送数据
launch {
    channel.send(42)  // 向 Channel 中发送数据
}

三、 接收数据
launch {
    val value = channel.receive()  // 从 Channel 中接收数据
    println("Received value: $value")
}

四、关闭 Channel
如果不再需要使用 Channel，可以关闭它
channel.close()  // 关闭 Channel，之后再发送数据会抛出异常
```

四、Channel 与 Flow 的区别

|    特性    |                    Channel                    |                Flow                |
| :--------: | :-------------------------------------------: | :--------------------------------: |
|  使用场景  |               协程间的数据传递                |  数据流（如网络请求，实时数据等）  |
| 发送和接收 | 手动控制发送（`send()`）和接收（`receive()`） |      自动收集（`collect()`）       |
|  数据发射  |            **热流**：数据立即发射             | **冷流**：只有在收集时才会开始发射 |
|  支持背压  |   支持背压控制，通过 `Channel` 的缓冲区控制   |            自动管理背压            |


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)