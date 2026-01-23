---
title: Android面试题——掘金-JNI&NDK(8.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 3db1013a
date: 2025-04-07 11:07:44
---
## 一 概述

```
Android JNI（Java Native Interface）和 NDK（Native Development Kit）
相关面试题主要涉及与原生代码（C/C++）的交互、性能优化、内存管理等方面。
以下是一些常见的 JNI/NDK 面试题及其详细解释：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 JNI？它有什么作用？

```
1.概念
JNI（Java Native Interface） 是 Java 与其他编程语言（特别是 C/C++）之间的接口，
它允许 Java 代码调用本地（native）代码，并允许本地代码访问 Java 类和对象。

2.JNI 的主要作用是：
-允许 Java 程序调用 C/C++ 等本地语言编写的代码。
-解决 Java 本身无法高效实现的某些功能，比如高性能计算、访问系统底层资源等。
-可以在 Android 中调用硬件加速、优化性能，或者使用某些第三方库。
```

### 2.2 什么是 NDK？它与 JNI 的关系是什么？

```
1.NDK概念
NDK（Native Development Kit） 是 Android 提供的一套工具，
允许开发者使用 C/C++ 编写 Android 应用的部分代码。
它通过 JNI 机制将原生代码与 Java 层代码连接起来。

2.JNI 与 NDK 的关系：
-NDK 是一个工具集，包含编译器和库，用于构建和管理本地代码。
-JNI 是一种接口，定义了 Java 和本地代码之间的交互规则。
-使用 NDK 时，开发者会通过 JNI 在 Java 层和 C/C++ 层之间进行通信。
```

### 2.3 在 Android 中，如何调用本地（C/C++）代码？

```
调用本地代码的基本步骤
1.编写本地方法声明：在 Java 中声明使用 native 关键字的本地方法。
public native String getStringFromNative();

2.加载本地库：使用 System.loadLibrary() 加载包含本地代码的共享库。
static {
    System.loadLibrary("native-lib");
}

3.实现本地方法：在 C/C++ 中实现这些本地方法，并使用 JNI 提供的函数与 Java 交互
JNIEXPORT jstring JNICALL
Java_com_example_myapplication_MainActivity_getStringFromNative(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, "Hello from native code!");
}

4.编译本地代码：通过 NDK 编译工具将 C/C++ 代码编译成共享库（.so 文件）
5.与 Java 层交互：调用本地方法即可实现 Java 和 C/C++ 代码的互操作。
```

### 2.4 JNI 中常用的数据类型映射是什么？

| Java 类型 |    C/C++ 类型     |
| :-------: | :---------------: |
|  boolean  | jboolean（1字节） |
|   byte    |  jbyte（1字节）   |
|   char    |  jchar（2字节）   |
|   short   |  jshort（2字节）  |
|    int    |   jint（4字节）   |
|   long    |  jlong（8字节）   |
|   float   |  jfloat（4字节）  |
|  double   |  jdoubl（8字节）  |
|  String   |      jstring      |
|  Object   |      jobject      |

### 2.5 如何在 JNI 中处理异常？

```
在 JNI 中，Java 异常通常是通过 JNIEnv 对象捕获的。处理异常的基本步骤如下：
1.检查异常：在本地方法中通过 (*env)->ExceptionCheck(env) 检查是否发生了异常。
2.清除异常：如果发生异常，可以通过 (*env)->ExceptionClear(env) 清除异常。
3.抛出异常：可以通过 (*env)->ThrowNew() 抛出新的异常。

2.示例代码
if ((*env)->ExceptionCheck(env)) {
    (*env)->ExceptionClear(env);  // 清除异常
    // 处理异常情况
}
```

### 2.6 如何在 JNI 中操作 Java 对象？

```
JNI 提供了多种函数来操作 Java 对象，包括：
1.获取对象字段：
jfieldID fieldId = (*env)->GetFieldID(env, clazz, "fieldName", "Ljava/lang/String;");
jstring fieldValue = (*env)->GetObjectField(env, obj, fieldId);

2.调用对象方法：
jmethodID methodId = (*env)->GetMethodID(env, clazz, "methodName", "()V");
(*env)->CallVoidMethod(env, obj, methodId);

3.创建对象：
jclass cls = (*env)->FindClass(env, "com/example/MyClass");
jmethodID constructor = (*env)->GetMethodID(env, cls, "<init>", "()V");
jobject obj = (*env)->NewObject(env, cls, constructor);
```

### 2.7 如何管理 JNI 中的内存？

```
JNI 中有一些内存管理的方法，通常涉及到以下几点：

1.局部引用和全局引用：
-局部引用：默认情况下，JNI 中的对象是局部引用，在方法结束时会自动释放。
-全局引用：通过 NewGlobalRef 创建全局引用，避免在调用过程中被垃圾回收器回收，适用于跨方法传递对象。

2.删除引用：
-局部引用会在 JNI 方法执行完毕时自动释放，但为了防止内存泄漏，最好显式删除不再使用的引用。
-使用 DeleteLocalRef() 删除局部引用。

3.手动管理内存：
malloc 和 free 可用于手动分配和释放内存。
```

### 2.8 NDK 中的 `Android.mk` 和 `CMakeLists.txt` 文件有什么区别？

```
1-Android.mk：
这是传统的 NDK 构建文件，用于描述如何编译和链接 C/C++ 源文件。
适用于较旧的构建系统。

2-CMakeLists.txt：
是基于 CMake 的构建文件，支持更加灵活和现代化的构建系统，特别适合跨平台开发。
CMake 允许使用标准的 CMake 命令来控制项目构建。

3.在 Android 项目中，推荐使用 CMake，因为它支持更多的平台和构建选项。
```

### 2.9 如何调试 JNI 中的本地代码？

```
调试 JNI 本地代码的常见方法包括：
1.使用 Android Studio 调试：
可以通过 ndk-build 或 CMake 构建项目并启用本地调试，使用 Android Studio 的调试工具。

2.使用 GDB 调试：
通过 GDB 调试器在命令行中调试 C/C++ 代码。

GDB 指的是 GNU 调试器(GNU Debugger)，是一个功能强大的命令行调试工具，
广泛用于 C/C++ 原生代码的调试，包括 Android 上用 NDK 写的 native 层代码（如 .so 动态库）
```

### 2.10 NDK 中的性能优化技巧有哪些？

```
-减少 JNI 调用次数：JNI 调用有一定的性能开销，尽量减少 Java 和本地代码之间的交互次数。
-使用局部引用：避免创建不必要的全局引用。
-优化内存管理：注意对象的生命周期和内存分配，避免内存泄漏。
-合理使用并发：充分利用线程和并发计算来提高性能。
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)