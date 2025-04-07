---
title: Android面试题——掘金-三方框架之Okhttp(5.2)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: f85dcc5a
date: 2025-04-07 10:32:10
---
## 一 概述

```
OkHttp 面试题汇总
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 OkHttp 是什么？主要作用是什么？

```
1.概念
OkHttp 是 Square 开源的一个高性能、功能强大的 HTTP 客户端，支持 HTTP/1.1 和 HTTP/2。

2.主要作用：
-发起网络请求（同步、异步）
-自动处理连接复用、GZIP 压缩
-支持拦截器机制、自定义请求头
-支持缓存机制、DNS、HTTPS、代理等
```

### 2.2 OkHttp 请求流程是怎样的？

```
1.流程
Request → OkHttpClient → Call → Dispatcher → Interceptor Chain → RealCall → 网络

2.内部核心流程：
-构建 Request；
-封装成 Call；
-交由 Dispatcher 调度（线程池）；
-依次通过拦截器链（Interceptor Chain）；
-最终通过 Socket 发出请求；
-读取 Response。
```

### 2.3 OkHttp 的拦截器有哪些？作用是什么？

```
1.拦截器按职责分为两类：

1.1 应用层（Application Interceptor）：
-添加公共参数、签名、日志打印
-请求前修改/拦截
-全局 Header 添加

1.2 网络层（Network Interceptor）：
-操作原始请求和响应
-可查看原始响应头（不经过缓存）
-常用于下载进度监听

2.内置拦截器链包括：
-RetryAndFollowUpInterceptor（重试/重定向）
-BridgeInterceptor（添加头部、GZIP等）
-CacheInterceptor（缓存控制）
-ConnectInterceptor（建立连接）
-CallServerInterceptor（发送请求、读取响应）
```

### 2.4 同步请求和异步请求的区别？

```
1.概念
-execute()：同步执行，阻塞线程；
-enqueue()：异步执行，回调在子线程或主线程（可结合 Handler）

2.示例
val request = Request.Builder().url(url).build()
client.newCall(request).enqueue(object : Callback {
    override fun onResponse(call: Call, response: Response) { }
    override fun onFailure(call: Call, e: IOException) { }
})
```

### 2.5 OkHttp 的连接复用机制？

```
-使用 连接池（ConnectionPool），默认最多复用 5 个连接、每个连接存活 5 分钟；
-同一主机端口的请求可以复用 TCP 连接（HTTP/1.1 keep-alive 或 HTTP/2 多路复用）；
-避免重复建立连接，提升性能。
```

### 2.6 OkHttp 的缓存机制？

```
1.概念
OkHttp 支持基于 HTTP 协议的缓存机制，遵循 Cache-Control、Etag、Last-Modified 等字段。

2.缓存机制
2.1 本地缓存通过 Cache 实现，需要设置缓存路径与大小
val cacheDir = File(context.cacheDir, "okhttp_cache")
val cache = Cache(cacheDir, 10L * 1024 * 1024)
val client = OkHttpClient.Builder().cache(cache).build()
2.2 可通过 CacheInterceptor 控制是否读取/使用缓存。
```

### 2.7 如何取消一个正在执行的请求？

```
1.方式1
val call = client.newCall(request)
call.cancel()
2.方式2
也可以用 tag 批量取消：
val request = Request.Builder().url(url).tag("login").build()
call.cancel()
```

### 2.8 如何设置请求超时？

```
OkHttpClient.Builder()
    .connectTimeout(10, TimeUnit.SECONDS) // 连接超时
    .readTimeout(30, TimeUnit.SECONDS)    // 读取超时
    .writeTimeout(15, TimeUnit.SECONDS)   // 写入超时
    .build()
```

### 2.9  如何设置拦截器？区别是？

```
1.示例
client = OkHttpClient.Builder()
    .addInterceptor(logInterceptor)            // 应用拦截器
    .addNetworkInterceptor(progressInterceptor) // 网络拦截器
    .build()
2.概念
-addInterceptor：应用层，处理整体逻辑、重试、日志等；
-addNetworkInterceptor：只作用于网络请求（实际连接才会执行）。
```

### 2.10 OkHttp 如何支持 HTTPS？

```
1.概念
-支持自签名证书或双向认证（SSL）；
-设置 SSLSocketFactory + HostnameVerifier 实现。

2.示例
client = OkHttpClient.Builder()
    .sslSocketFactory(sslContext.socketFactory, trustManager)
    .hostnameVerifier { hostname, session -> true }
    .build()
```

### 2.11 OkHttp 如何监听上传 / 下载进度？

```
-上传进度：自定义 RequestBody；
-下载进度：通过 ResponseBody 包装监听 source().read(...) 的字节数。

可借助三方库：ProgressManager、Okio 拦截器等。
```

### 2.12 OkHttp 是如何实现请求重试的？

```
内置拦截器 RetryAndFollowUpInterceptor 会根据请求失败的原因进行自动重试或重定向：

-连接失败会重试；
-302/307 响应自动重定向；
-默认最多重试 20 次，防止死循环。
```

### 2.13 OkHttp 线程模型是怎样的？

```
1.概念
-异步请求由 Dispatcher 使用线程池执行（ExecutorService）；
-限制并发请求数（默认同时请求数 64、每主机5）；
-可配置 dispatcher：

2.示例
client = OkHttpClient.Builder()
    .dispatcher(Dispatcher().apply {
        maxRequests = 64
        maxRequestsPerHost = 5
    })
    .build()
```

### 2.14 OkHttp 如何调试？常见工具有哪些？

```
-使用 HttpLoggingInterceptor 打印请求日志；
-使用 Charles / Fiddler 抓包分析；
-使用 Stetho 结合 Chrome 查看请求；
-使用 OKHttpProfiler 插件查看请求轨迹
```

### 2.15 总结

|  关键能力  |             对应点             |
| :--------: | :----------------------------: |
|  拦截器链  |      核心职责拆分，易扩展      |
|   连接池   |          减少连接开销          |
|  缓存机制  |     提升访问速度，节省流量     |
|  线程调度  |   Dispatcher 控制并发请求数    |
| 自定义能力 | 支持各种拦截器、证书、安全控制 |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)