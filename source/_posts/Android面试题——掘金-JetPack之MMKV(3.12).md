---
title: Android面试题——掘金-JetPack之MMKV(3.12)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 35529ce4
date: 2025-04-07 09:53:18
---
## 一 概述—MMKV(高性能键值存储)

```
MMKV 是 微信开源的高性能键值存储组件，基于 mmap 机制，
比 SharedPreferences 速度快 10~100 倍，用于替代 SharedPreferences
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 MMKV？它的作用是什么？

```
1.概念
MMKV（Memory-Mapped Key-Value）是 微信开源的高性能 Key-Value 存储库，
用于 替代 SharedPreferences，

2.其核心特性：
✅ 基于 mmap 机制，读写速度快（比 SharedPreferences 快 10~100 倍）
✅ 支持多进程读写
✅ 支持加密存储
✅ 支持数据持久化
✅ 支持原子读写，数据安全
```

### 2.2 MMKV 依赖

```
dependencies {
    implementation 'com.tencent:mmkv:1.3.2'
}
```

### 2.3 MMKV 初始化

```
在 Application 中初始化
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        MMKV.initialize(this)
    }
}
```

### 2.4 MMKV 基本用法

```
1.存储数据
val mmkv = MMKV.defaultMMKV()

// 存储基本数据类型
mmkv.putInt("age", 25)
mmkv.putString("name", "John")
mmkv.putBoolean("isLogin", true)

2.读取数据
val age = mmkv.getInt("age", 0)
val name = mmkv.getString("name", "Default Name")
val isLogin = mmkv.getBoolean("isLogin", false)

3.存储对象（序列化）：MMKV 支持 Parcelable 和 JSON 存储对象。
3.1 方法 1：存 Parcelable
data class User(val name: String, val age: Int) : Parcelable

val user = User("John", 25)
mmkv.encode("user", user)

// 读取对象
val user: User? = mmkv.decodeParcelable("user", User::class.java)

3.2 方法 2：存 JSON
val gson = Gson()
val userJson = gson.toJson(user)
mmkv.putString("user_json", userJson)

// 读取对象
val userJson = mmkv.getString("user_json", "")
val user = gson.fromJson(userJson, User::class.java)
```

### 2.5 MMKV 多进程支持

```
MMKV 默认不支持多进程，如果需要多进程存储，必须使用：
val mmkvMultiProcess = MMKV.mmkvWithID("myMMKV", MMKV.MULTI_PROCESS_MODE)
```

### 2.6 MMKV 支持加密

```
val mmkv = MMKV.mmkvWithID("secureMMKV", MMKV.SINGLE_PROCESS_MODE, "my_secret_key")
```

### 2.7 MMKV 数据迁移

```
从 SharedPreferences 迁移

val oldSP = getSharedPreferences("my_prefs", MODE_PRIVATE)
val mmkv = MMKV.defaultMMKV()
mmkv.importFromSharedPreferences(oldSP)
oldSP.edit().clear().apply()
```

### 2.8 MMKV 和 SharedPreferences 对比

|   对比项   |             MMKV             | SharedPreferences  |
| :--------: | :--------------------------: | :----------------: |
|  存储机制  |         ✅ mmap 机制          |     ❌ 基于 XML     |
|  读写速度  |     ✅ 比 SP 快 10~100 倍     |      ❌ 速度慢      |
| 多进程支持 |            ✅ 支持            |    ❌ 默认不支持    |
|  存储对象  |   ✅ 支持 Parcelable / JSON   | ❌ 仅支持 Key-Value |
|  数据安全  |        ✅ 支持加密存储        |      ❌ 无加密      |
|  适用场景  | ✅ 适用于大规模存储，快速读写 | ❌ 适用于小型配置项 |

### 2.9 MMKV 适用于哪些情况？

```
✅ 替代 SharedPreferences（用户设置、Token 存储）
✅ 存储大规模 Key-Value 数据（类似缓存）
✅ 高频读写场景（如 IM 消息、计数、状态存储）
✅ 多进程共享数据
```

### 2.10 总结

```
MMKV 是 比 SharedPreferences 更快、更强大的存储方案：
✅ mmap 存储，读写速度快
✅ 支持多进程
✅ 支持加密
✅ 支持对象存储
✅ 适用于高频读写 / 大量数据存储
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)