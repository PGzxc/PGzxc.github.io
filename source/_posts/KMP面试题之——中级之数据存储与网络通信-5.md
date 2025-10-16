---
title: KMP面试题之——中级之数据存储与网络通信(5)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: e737470c
date: 2025-10-16 10:01:11
---
## 一 概述

```
1.如何在 KMP 中实现网络请求？
2.如何在 shared 层实现本地存储？
3.如何配置多平台数据库？(SQLite+SQLDelight)
4.如何处理网络缓存与数据持久化？
5.如何实现多平台加密存储(KMP Encrypted Preferences)？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 KMP网络请求

1、核心考点

```
跨平台共享网络层（Ktor）
JSON 序列化与错误封装
Engine 区别与平台适配
```

2、实现要点—Gradle 配置

```
kotlin {
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-core:3.2.3")
                implementation("io.ktor:ktor-client-content-negotiation:3.2.3")
                implementation("io.ktor:ktor-serialization-kotlinx-json:3.2.3")
            }
        }
        val androidMain by getting {
            dependencies { implementation("io.ktor:ktor-client-okhttp:3.2.3") }
        }
        val iosMain by getting {
            dependencies { implementation("io.ktor:ktor-client-darwin:3.2.3") }
        }
    }
}
```

3、实现要点—HttpClient 配置

```
val httpClient = HttpClient {
    install(Logging) { level = LogLevel.ALL }
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true; isLenient = true })
    }
    install(HttpTimeout) { requestTimeoutMillis = 15_000 }
}
```

4、实现要点—封装统一 API 层

```
class ApiService(private val client: HttpClient, private val baseUrl: String) {
    suspend fun getArticles(): List<Article> =
        client.get("$baseUrl/articles").body()
}
```

5、实现要点—架构示意

```
shared/
 ├── commonMain/
 │   ├── data/network/ApiClient.kt
 │   └── data/repository/
 ├── androidMain/ → OkHttp Engine
 └── iosMain/     → Darwin Engine
```

6、面试延伸

```
错误封装：NetworkResult<T>
HTTPS 证书校验与 Pinning
MockEngine 单元测试支持
```

### 2.2 shared 层实现本地存储

1、 核心考点

```
跨平台 Key-Value 存储
JSON 对象序列化
Flow 实时监听与数据同步
```

2、推荐方案

|         场景         |         推荐库         |       特点        |
| :------------------: | :--------------------: | :---------------: |
|     简单键值存储     | multiplatform-settings |    轻量、快速     |
|    JSON/对象存储     |         KStore         | 支持 Flow、序列化 |
| 自定义路径或特殊需求 |   expect/actual 实现   |     灵活可控      |

3、示例（KStore）

```
val tokenStore = KStore(
    fileName = "token.json",
    serializer = stringSerializer(),
)

suspend fun saveToken(token: String) = tokenStore.set(token)
suspend fun readToken(): String? = tokenStore.get()
```

4、平台存储路径

|  平台   |    实际存储位置     |
| :-----: | :-----------------: |
| Android |  Context.filesDir   |
|   iOS   | NSDocumentDirectory |
| Desktop |   User home 目录    |

5、替代方案

```
multiplatform-settings（轻量首选）
KStore（支持 Flow 监听、JSON 对象）
expect/actual 自定义实现（更灵活）
```

### 2.3 多平台数据库

1、核心考点

```
类型安全 SQL
expect/actual 驱动工厂
与网络层协同缓存
```

2、实现结构

```
shared/
 ├── data/db/
 │   ├── Database.sq
 │   ├── DatabaseDriverFactory.kt
 │   └── ArticleDao.kt
```

3、配置 Gradle

```
plugins { id("app.cash.sqldelight") version "2.1.0" }

sqldelight {
    databases {
        create("AppDatabase") { packageName.set("com.example.db") }
    }
}
```

4、定义表结构 (AppDatabase.sq)

```
CREATE TABLE Article(
  id INTEGER NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);
```

5、驱动工厂实现

```
// commonMain
expect class DatabaseDriverFactory { fun createDriver(): SqlDriver }

// androidMain
actual class DatabaseDriverFactory(private val context: Context) {
    actual fun createDriver() = AndroidSqliteDriver(AppDatabase.Schema, context, "app.db")
}

// iosMain
actual class DatabaseDriverFactory {
    actual fun createDriver() = NativeSqliteDriver(AppDatabase.Schema, "app.db")
}
```

6、Repository 封装

```
class ArticleRepository(factory: DatabaseDriverFactory) {
    private val db = AppDatabase(factory.createDriver())

    fun getAll() = db.articleQueries.selectAll().executeAsList()
    fun insert(article: Article) =
        db.articleQueries.insert(article.id, article.title, article.content)
}
```

### 2.4 网络缓存与数据持久化

1、核心考点

```
Repository 分层与缓存策略
Flow 流式数据合并
离线优先逻辑
```

2、Repository 示例

```
class ArticleRepository(
    private val api: ApiClient,
    private val dao: ArticleDao
) {
    suspend fun getArticles(forceRefresh: Boolean = false): List<Article> {
        if (!forceRefresh) {
            val cached = dao.getAll()
            if (cached.isNotEmpty()) return cached
        }

        val networkData = api.getArticles()
        dao.insertAll(networkData)
        return networkData
    }
}
```

3、常见缓存策略

|     策略      |              描述               |
| :-----------: | :-----------------------------: |
|  Cache First  |  优先使用缓存，网络更新再覆盖   |
| Network First |   优先请求网络，失败回退缓存    |
|  Dual Update  | 同时请求，UI 先展示缓存，再刷新 |
| Hybrid (Flow) |   使用 Flow 合并本地 + 网络源   |

4、常用组合

```
网络层：Ktor
数据库：SQLDelight
存储层：KStore / Preferences
流式更新：Flow.combine()
```

### 2.5 多平台加密存储

1、核心考点

```
expect/actual 跨平台安全封装
使用系统安全机制：Android Keystore、iOS Keychain
```

2、实现方案

```
// commonMain
expect class SecureStorage {
    fun put(key: String, value: String)
    fun get(key: String): String?
}

// androidMain
actual class SecureStorage {
    private val prefs = EncryptedSharedPreferences.create(
        "secure_prefs",
        MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC),
        context,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )
    actual fun put(key: String, value: String) = prefs.edit().putString(key, value).apply()
    actual fun get(key: String): String? = prefs.getString(key, null)
}

// iosMain
actual class SecureStorage {
    actual fun put(key: String, value: String) {
        val data = value.encodeToByteArray().toNSData()
        KeychainHelper.save(key, data)
    }
    actual fun get(key: String): String? =
        KeychainHelper.load(key)?.toByteArray()?.decodeToString()
}
```

3、扩展方案

```
第三方库：KVault, Kissme, multiplatform-secure-storage
自定义 AES 加密 (Crypto.kt)
结合 Json.encodeToString() 序列化对象
```

## 三 总结

|  知识点  |           推荐库           |           面试考察点            |
| :------: | :------------------------: | :-----------------------------: |
| 网络请求 |            Ktor            | Engine 区别 / 错误处理 / 序列化 |
| 本地存储 |     KStore / Settings      |       存储路径、同步策略        |
|  数据库  |         SQLDelight         |   Schema 生成 / DriverFactory   |
| 缓存策略 |     Flow + Repository      |      离线缓存、数据一致性       |
| 加密存储 | expect/actual + Secure API |        平台安全实现差异         |

