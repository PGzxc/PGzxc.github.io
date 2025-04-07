---
title: Android面试题——掘金-JetPack之Protocol Buffers(3.13)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 5969e5a8
date: 2025-04-07 09:54:28
---
## 一 概述-ProtoBuf

```
Protocol Buffers（简称 ProtoBuf）是一种 高效、轻量的序列化数据格式，
比 JSON 和 XML 速度更快，适用于 网络通信、数据存储 等场景。
Android 中的 Proto DataStore 也使用了 ProtoBuf 进行数据序列化。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 ProtoBuf？它的作用是什么？

```
1.概念
ProtoBuf（Protocol Buffers）是 Google 开源的序列化协议，用于 高效地序列化和反序列化数据，

其特点：
✅ 比 JSON / XML 更小、更快、更高效
✅ 跨平台，支持多种语言（Java、Kotlin、C++、Python 等）
✅ 可扩展性强，支持版本兼容
✅ 适用于网络通信（gRPC）、数据存储（DataStore）
```

### 2.2 ProtoBuf 依赖

```
在 build.gradle 添加依赖
dependencies {
    implementation 'com.google.protobuf:protobuf-javalite:3.21.7'
}
```

### 2.3 定义 `.proto` 文件

```
在 app/src/main/proto/ 目录下创建 user.proto：

syntax = "proto3";  // 版本号，使用 proto3 语法

option java_package = "com.example.protobuf";  // 生成 Java 代码的包名
option java_multiple_files = true;  // 让每个 message 生成独立的 Java 文件

message User {
  string name = 1;
  int32 age = 2;
  repeated string hobbies = 3;  // repeated 表示数组
}
```

### 2.4 编译 Proto 文件

```
1.在 app/build.gradle 中启用 protobuf 插件：

plugins {
    id 'com.google.protobuf' version '0.9.1'
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.21.7"
    }
    generateProtoTasks {
        all().each { task ->
            task.builtins {
                java {
                    option 'lite'  // 生成 Lite 版本，适用于 Android
                }
            }
        }
    }
}

2.然后 Sync Gradle，会自动生成 User 类，路径在：
app/build/generated/source/proto/
```

### 2.5 使用 ProtoBuf 读写数据

```
1.创建 User 对象
val user = User.newBuilder()
    .setName("John")
    .setAge(25)
    .addHobbies("Basketball")
    .addHobbies("Reading")
    .build()
2.序列化（转换为 ByteArray）
val userBytes = user.toByteArray()

3.反序列化（从 ByteArray 解析对象）
val user = User.parseFrom(userBytes)
```

### 2.6 在 Proto DataStore 中使用 ProtoBuf

```
1.创建 Serializer
object UserSerializer : Serializer<User> {
    override val defaultValue: User = User.getDefaultInstance()

    override suspend fun readFrom(input: InputStream): User {
        return User.parseFrom(input)
    }

    override suspend fun writeTo(t: User, output: OutputStream) {
        t.writeTo(output)
    }
}

2.创建 DataStore
val Context.userDataStore: DataStore<User> by dataStore(
    fileName = "user_prefs.pb",
    serializer = UserSerializer
)

3.存储数据
suspend fun saveUser(user: User) {
    context.userDataStore.updateData { currentUser ->
        currentUser.toBuilder()
            .setName(user.name)
            .setAge(user.age)
            .build()
    }
}

4.读取数据
val userFlow: Flow<User> = context.userDataStore.data
lifecycleScope.launch {
    userFlow.collect { user ->
        Log.d("DataStore", "用户：${user.name}, 年龄：${user.age}")
    }
}
```

### 2.7 ProtoBuf vs JSON 对比

|   对比项   |      ProtoBuf      |      JSON      |
| :--------: | :----------------: | :------------: |
|  数据格式  |       二进制       |      文本      |
|  文件大小  |       ✅ 更小       |     ❌ 更大     |
| 序列化速度 |       ✅ 更快       |     ❌ 较慢     |
|  解析速度  |       ✅ 更快       |     ❌ 较慢     |
|   可读性   |      ❌ 不可读      |     ✅ 可读     |
|   跨平台   |   ✅ 支持多种语言   |    ✅ 也支持    |
|  适用场景  | ✅ 高性能存储、gRPC | ✅ Web API 传输 |

### 2.8 ProtoBuf 适用于哪些情况？

```
✅ 高性能数据存储（DataStore）
✅ 高效网络通信（gRPC）
✅ 二进制传输，节省流量（IoT、音视频）
✅ 支持多语言（Android、iOS、后端通信）
```

### 2.9 总结

```
ProtoBuf 是 比 JSON 更高效的序列化方案：

✅ 体积小、序列化速度快
✅ 适用于高性能存储（Proto DataStore）
✅ 适用于网络通信（gRPC）
✅ 适用于多语言开发（跨平台）
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)