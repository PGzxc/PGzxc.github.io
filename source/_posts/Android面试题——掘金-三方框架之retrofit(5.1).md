---
title: Android面试题——掘金-三方框架之retrofit(5.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: b2c7aea5
date: 2025-04-07 10:31:15
---
## 一 概述

```
Retrofit 面试题汇总
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Retrofit 是什么？它的核心作用是什么？

```
Retrofit 是 Square 开源的一个 网络请求框架，
基于 OkHttp 封装，简化了 HTTP 请求的调用方式，
通过注解定义 API 接口，更符合 RESTful 设计风格。
```

### 2.2 Retrofit 和 OkHttp 的关系？

```
-Retrofit 是一个 基于 OkHttp 的封装库。
-Retrofit 负责构建请求接口、解析响应数据（支持 JSON、XML、Proto 等）；
-OkHttp 负责真正的 底层网络请求、连接复用、缓存、拦截器、DNS 等。

Retrofit = 接口封装 + 数据转换
OkHttp = 网络请求引擎
```

### 2.3 Retrofit 的请求流程是怎样的？

```
-使用 @GET/@POST/... 注解定义接口；
-Retrofit 利用动态代理（Proxy）将接口方法转换为 OkHttp 请求；
-通过 CallAdapterFactory 转为实际调用对象（如 Call、LiveData、RxJava 等）；
-执行网络请求（同步或异步）；
-使用 Converter 将响应结果转换为目标对象（如 JSON → Java Bean）
```

### 2.4 Retrofit 支持哪些注解？（常见）

```
-请求方式：@GET、@POST、@PUT、@DELETE…
-路径参数：@Path、@Query、@QueryMap
-请求体：@Body、@Field、@FormUrlEncoded、@Multipart、@Part
-头部参数：@Header、@Headers
-全局配置：@Url 动态设置完整 URL
```

### 2.5 Retrofit 的数据转换是如何实现的？

```
通过 Converter.Factory 实现数据转换：
-JSON（默认）：GsonConverterFactory、MoshiConverterFactory
-XML：SimpleXmlConverterFactory
-ProtoBuf：ProtoConverterFactory
-自定义格式：可实现 Converter<ResponseBody, T> 接口自定义解析逻辑。
```

### 2.6 Retrofit 支持哪些返回类型？

```
通过 CallAdapter.Factory 支持以下返回值类型：
-原生：Call<T>
-协程：suspend fun
-RxJava：Observable<T>、Single<T> 等
-Kotlin Flow、LiveData 也支持

你也可以自定义 CallAdapter.Factory 来支持任意异步框架
```

### 2.7 Retrofit 是否支持文件上传和下载？

```
支持！
-上传文件：使用 @Multipart + @Part MultipartBody.Part
-下载文件：使用 @Streaming 防止内存占用过大，边下边存。
```

### 2.8 Retrofit 中如何添加通用参数或 Header？

```
-通过 @Header 或 @Query 注解传入；
-统一配置：自定义 OkHttp Interceptor 添加 token、device_id 等：
val interceptor = Interceptor { chain ->
    val request = chain.request().newBuilder()
        .addHeader("Authorization", "Bearer token")
        .build()
    chain.proceed(request)
}
```

### 2.9 Retrofit 的动态代理原理？

```
Retrofit 使用 Java 的 动态代理（Proxy） 实现接口的调用：

-在 create(Service::class.java) 时，会创建一个代理对象；
-当调用接口方法时，代理对象会拦截调用；
-解析方法注解 → 构造 Request → 执行 OkHttp 请求。

核心类：ServiceMethod.parseAnnotations、RequestFactory、HttpServiceMethod
```

### 2.10 Retrofit 是否线程安全？

```
Retrofit 实例是线程安全的，但不建议频繁创建。
推荐使用单例模式（如 Dagger、Hilt 中注入）。
```

### 2.11  Retrofit 如何实现请求重试？

```
可以通过 OkHttp 的 Interceptor 实现重试逻辑：
class RetryInterceptor(val maxRetry: Int) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var retryCount = 0
        var response: Response? = null
        var request = chain.request()

        while (response == null || !response.isSuccessful && retryCount < maxRetry) {
            response = chain.proceed(request)
            retryCount++
        }

        return response
    }
}
```

### 2.12  Retrofit 如何处理错误（错误码、异常）？

```
-HTTP 错误（如 4xx/5xx）：通过 response.isSuccessful 判断
-网络异常（如超时、断网）：通过 onFailure(Throwable t)
-业务错误（如 code != 0）：通过自定义响应结构处理
```

### 2.13 总结

|  知识点  |                  内容                   |
| :------: | :-------------------------------------: |
| 核心架构 | Retrofit + OkHttp + 动态代理 + 注解解析 |
|  扩展性  |    支持自定义 Converter、CallAdapter    |
|  适配性  |      支持协程、RxJava、LiveData 等      |
|   性能   |         基于 OkHttp，高效、稳定         |
|   场景   |  REST API、文件上传下载、动态参数拼接   |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)