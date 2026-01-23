---
title: Android面试题——NDK
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: c01fd845
date: 2025-08-17 08:46:26
---
## 一 概述

```
Android NDK(JNI)常见面试题，涵盖基础概念、核心机制、常见源码问题以及进阶问题
```

<!--more-->

## 二 基础概念

### 2.1 什么是 NDK？

```
1、概念
 NDK(Native Development Kit)是Android提供的使用 C/C++ 编写本地代码 的工具包
 用于在 Android 中编写 C / C++ 代码

2、优势：
 提高性能（计算密集型、图像处理、音视频等）
 可复用已有 C/C++ 库
 访问底层系统接口
```

### 2.2 什么是 JNI？

```
1、概念
 JNI(Java Native Interface)是 Java 与原生代码交互机制

2、作用：
Java 调 C/C++，C/C++ 调 Java 都通过 JNI
```

### 2.3 NDK 和 JNI 的关系？

```
NDK 提供编译环境、工具链
JNI 是 Java ↔ C/C++ 的接口规范
NDK 可以调用 JNI，也可以直接编译库
```

## 三 JNI 基础问题

### 3.1 如何在 Java 调用 C/C++ 方法？

```
1、在 Android 中调用本地方法
public class NativeLib {
    static { System.loadLibrary("native-lib"); }
    public native String stringFromJNI();
}

2、C/C++ 端实现
extern "C"
JNIEXPORT jstring JNICALL
Java_com_example_NativeLib_stringFromJNI(JNIEnv* env, jobject thiz) {
    return env->NewStringUTF("Hello JNI");
}
```

### 3.2 JNI 类型映射？

| Java 类型 | JNI 类型  |  C/C++ 类型   |
| :-------: | :-------: | :-----------: |
|    int    |   jint    |      int      |
|   long    |   jlong   |   long long   |
|   float   |  jfloat   |     float     |
|  double   |  jdouble  |    double     |
|  boolean  | jboolean  | unsigned char |
|  String   |  jstring  |  const char*  |
|  Object   |  jobject  |    jobject    |
|   int[]   | jintArray |     jint*     |

### 3.3 JNI 方法命名规则？(JNI 函数签名规则)

```
1、规则
Java_<包名>_<类名>_<方法名>(JNIEnv* env, jobject obj, ...)
下划线 _ 表示分隔符，特殊字符需转义

2、示例
Java_com_example_app_MainActivity_add(JNIEnv* env, jobject thiz, jint a, jint b)
```

### 3.4 Java 访问 Native 数组？

```
jint* array = env->GetIntArrayElements(jintArray arr, nullptr);
// 处理完
env->ReleaseIntArrayElements(arr, array, 0);
```

### 3.5 JNIEnv 与 jobject

```
JNIEnv* env → JNI 接口指针，调用 Java 方法
jobject → 调用本地方法的对象引用
```

## 四 NDK 构建与使用

### 4.1 构建方式

```
CMake：推荐方式，Gradle 配合 CMake 构建
ndk-build：传统方式，使用 Android.mk / Application.mk
```

### 4.2 **Android.mk / Application.mk**（ndk-build）

```
Android.mk → 描述模块
Application.mk → 设置 APP_ABI、NDK 编译选项
```

### 4.3 CMake 配置示例

```
cmake_minimum_required(VERSION 3.18.1)
add_library(native-lib SHARED native-lib.cpp)
find_library(log-lib log)
target_link_libraries(native-lib ${log-lib})
```

### 4.4 Gradle 配置示例

```
externalNativeBuild {
    cmake {
        path "CMakeLists.txt"
    }
}
```

## 五 内存与线程问题

### 5.1 JNI 内存管理

```
Java 对象在 C/C++ 中用 jobject 表示
使用全局引用 NewGlobalRef 避免对象被 GC
释放引用：DeleteGlobalRef
```

### 5.2 局部引用

```
默认存在函数栈中，函数结束后释放
局部引用过多可能导致 局部引用溢出
```

### 5.3 线程问题

```
C++ 新线程调用 JNI，需要先 AttachCurrentThread

用完 DetachCurrentThread
```

## 六 性能与优化

### 6.1 性能优化建议

```
避免频繁跨 JNI 调用
大数组 / 大对象尽量使用 Get<Type>ArrayElements 一次性操作
使用全局缓存的类、方法 ID
```

### 6.2 获取类与方法 ID

```
jclass clazz = env->FindClass("com/example/MyClass");
jmethodID mid = env->GetMethodID(clazz, "methodName", "(I)V");
env->CallVoidMethod(obj, mid, 123);
```

### 6.3 为什么 C++ 比 Java 快？

```
直接操作内存
可使用 SIMD、多线程优化
避免 JVM 运行时开销
```

## 七 常见面试题

### 7.1 什么情况下要用 NDK？

```
高性能计算（音视频、图像处理）
使用已有 C/C++ 库
游戏开发 / 引擎开发
```

### 7.2 为什么要用 NDK？

```
性能关键模块（音视频、图形处理、算法库）
底层代码复用
防止 Java 反编译
```

### 7.3 NDK 的缺点？

```
调试难度大
JNI 交互复杂，容易出错
APK 体积增大
多平台适配复杂（arm, arm64, x86）
```

### 7.4 JNI 内存管理问题？

```
本地创建对象需手动释放
通过 DeleteLocalRef 回收局部引用
使用 NewGlobalRef 创建全局引用并手动释放
```

### 7.5 如何在 C++ 调用 Java 方法？

```
jclass clazz = env->GetObjectClass(obj);
jmethodID mid = env->GetMethodID(clazz, "callback", "(Ljava/lang/String;)V");
env->CallVoidMethod(obj, mid, env->NewStringUTF("Hello"));
```

### 7.6 跨线程调用 Java 方法

```
需要用 AttachCurrentThread() 附加到 JVM
调用完成后用 DetachCurrentThread() 分离
```

### 7.7 JNI 常见坑

```
局部引用过多导致溢出
异常未处理
多线程访问 JNIEnv（每线程独立）
字符串转换（UTF-8 与 Unicode）
```

### 7.8 NDK 如何优化性能

```
减少 JNI 调用次数（批量处理数据）
使用 direct ByteBuffer 减少内存拷贝
使用多线程处理复杂计算
```

### 7.9 JNI 方法调用效率低的原因？

```
频繁调用 JNI（跨越 Java ↔ C 层）
每次 FindClass / GetMethodID 过多
大对象在 JNI 中频繁拷贝
```

### 7.10 如何避免内存泄漏？

```
删除全局引用
释放局部引用
正确管理线程 attach/detach
```

### 7.11 NDK 与 Java 的调试方式？

```
ndk-stack 分析 crash
Android Studio 支持 Native Debugging
logcat 输出日志 __android_log_print
```

### 7.12 JNI 多线程调用问题

```
必须 attach 到当前线程
使用全局引用传递对象
避免在子线程频繁 FindClass
```

## 八 进阶问题

### 8.1 Java 调用 C++ STL 容器

```
可以使用 std::vector、std::string 等
注意传递数据给 Java 时要转换成 JNI 类型
```

### 8.2 如何调试 NDK

```
Android Studio → LLDB 调试
使用 ndk-stack 查看崩溃栈
打日志 __android_log_print()
```

### 8.3 NDK 与 ART/Dalvik 的区别

```
NDK 是本地代码，不依赖 JVM 字节码
ART/Dalvik 是虚拟机，执行 Java 字节码
```

### 8.4 JNI 层调用顺序

```
Java → JNI → C/C++ → 可能调用回 Java
注意线程安全和对象生命周期
```

## 九 面试高频陷阱

```
FindClass 必须在 attach 的线程中调用
不能直接在 C++ 中持有局部引用跨函数或跨线程使用
没有释放全局引用导致 Activity 无法回收
数组未 Release → 内存泄漏
```

## 10 面试记忆口诀

```
NDK 写性能，JNI 通消息
局部引用及时删，全局引用别忘记
线程调用先 attach，调用结束 detach 回
少跨越，多批量，减少 JNI 调用次数
```

