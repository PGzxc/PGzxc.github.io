---
title: Android面试题——掘金-JetPack之DataStore(3.11)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 1528fce7
date: 2025-04-07 09:52:27
---
## 一 概述-DataStore(数据存储)

```
DataStore 是 Jetpack 提供的现代数据存储方案，用于 替代 SharedPreferences，
支持 Kotlin 协程 / Flow，提供 类型安全 和 高效存储 体验。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 DataStore？它的作用是什么？

```
DataStore 是用于存储key-value数据（类似 SharedPreferences）或对象数据（类似Room）的Jetpack组件。

✅ 基于 Kotlin Flow（流式存储，异步获取数据）
✅ 支持 Preferences DataStore（Key-Value 存储）
✅ 支持 Proto DataStore（存储对象，支持 Protobuf 序列化）
✅ 不会阻塞主线程（Room 级别的性能）
✅ 避免 SharedPreferences 线程阻塞、数据不安全等问题
```

### 2.2 DataStore 依赖

```
dependencies {
    // Preferences DataStore（Key-Value 存储）
    implementation "androidx.datastore:datastore-preferences:1.0.0"

    // Proto DataStore（对象存储）
    implementation "androidx.datastore:datastore-core:1.0.0"
}
```

### 2.3 Preferences DataStore（Key-Value 存储）

```
1.概念
适用于存储简单数据，如用户设置、主题模式、开关状态等。

2.步骤
2.1 创建 DataStore
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

2.2 存储数据
suspend fun saveTheme(isDarkMode: Boolean) {
    val THEME_KEY = booleanPreferencesKey("dark_mode")
    context.dataStore.edit { preferences ->
        preferences[THEME_KEY] = isDarkMode
    }
}

2.3 读取数据
val THEME_KEY = booleanPreferencesKey("dark_mode")
val themeFlow: Flow<Boolean> = context.dataStore.data
    .map { preferences -> preferences[THEME_KEY] ?: false }

lifecycleScope.launch {
    themeFlow.collect { isDarkMode ->
        Log.d("DataStore", "主题模式：$isDarkMode")
    }
}
```

### 2.4 Proto DataStore（对象存储，类似 Room）

```
1.说明
适用于存储复杂数据对象（如 User、Settings）

2.步骤
2.1 添加 Protobuf 依赖
dependencies {
    implementation "androidx.datastore:datastore-core:1.0.0"
    implementation "com.google.protobuf:protobuf-javalite:3.21.7"
}
在 app/src/main/proto 目录下创建 user.proto

syntax = "proto3";
option java_package = "com.example.datastore";
option java_multiple_files = true;

message User {
  string name = 1;
  int32 age = 2;
}

2.2 创建 Serializer
object UserSerializer : Serializer<User> {
    override val defaultValue: User = User.getDefaultInstance()

    override suspend fun readFrom(input: InputStream): User {
        return User.parseFrom(input)
    }

    override suspend fun writeTo(t: User, output: OutputStream) {
        t.writeTo(output)
    }
}

2.3 创建 DataStore
val Context.userDataStore: DataStore<User> by dataStore(
    fileName = "user_prefs.pb",
    serializer = UserSerializer
)

2.4 存储数据
suspend fun saveUser(user: User) {
    context.userDataStore.updateData { currentUser ->
        currentUser.toBuilder()
            .setName(user.name)
            .setAge(user.age)
            .build()
    }
}

2.5 读取数据
val userFlow: Flow<User> = context.userDataStore.data
lifecycleScope.launch {
    userFlow.collect { user ->
        Log.d("DataStore", "用户：${user.name}, 年龄：${user.age}")
    }
}
```

### 2.5 DataStore 与 SharedPreferences 对比

|   对比项   |             DataStore             |      SharedPreferences      |
| :--------: | :-------------------------------: | :-------------------------: |
|  线程安全  |     ✅ 基于 Flow，不阻塞主线程     | ❌ 可能导致 ANR（主线程 IO） |
|  数据类型  | ✅ 支持对象存储（Proto DataStore） |     ❌ 仅支持 key-value      |
|  存储方式  |         ✅ 基于文件 + 协程         |         ❌ 基于 XML          |
| 数据一致性 |       ✅ 事务操作，数据安全        |       ❌ 可能数据丢失        |
|  适用场景  |  ✅ 长期存储、用户设置、数据同步   |    ❌ 仅适用于少量配置项     |

### 2.6  DataStore 适用于哪些情况？

```
✅ 替代 SharedPreferences（用户设置、主题、Token 存储）
✅ 长期存储小型数据对象（如 User、Config）
✅ 数据同步（Flow 监听数据变化）
✅ 避免 SharedPreferences 线程阻塞问题
```

### 2.7 迁移 SharedPreferences 到 DataStore

```
val dataStore: DataStore<Preferences> = context.createDataStore(
    name = "settings",
    migrations = listOf(SharedPreferencesMigration(context, "old_prefs"))
)
```

### 2.8 总结

```
DataStore是Android推荐的本地存储方案，适用于存储key-value数据或对象，替代SharedPreferences：

✅ 线程安全，不阻塞 UI
✅ 支持 Flow，数据实时监听
✅ 支持对象存储（Proto DataStore）
✅ 比 SharedPreferences 更安全、更高效
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)