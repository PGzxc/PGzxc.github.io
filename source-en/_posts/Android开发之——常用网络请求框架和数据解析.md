---
title: Android开发之——常用网络请求框架和数据解析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - 网络请求
  - 数据解析
abbrlink: f0a6ffda
date: 2026-02-13 08:15:31
---
## 一 概述

```
在 Android 应用开发中，网络层通常由 网络请求库 + 数据解析库 两部分组成。
合理的选择和组合，直接影响项目的可维护性、性能和扩展性。
```

<!--more-->

## 二 Android 常用网络请求库

### 2.1 OkHttp(网络层事实标准)

```
1-定位：底层 HTTP 通信库
2-作者：Square

3-核心能力：
-支持HTTP/HTTPS
-同步/异步请求
-连接池、缓存机制
-拦截器体系(非常关键)
-WebSocket 支持

4-典型使用场景：
-所有网络请求的底层
-Retrofit 的核心依赖
-文件上 /下载
-WebSocket 实时通信

5-结论：
OkHttp 是 Android 网络开发的“地基”，几乎不可替代。
```

### 2.2 Retrofit(最主流的上层网络框架)

```
1-定位：RESTful API 封装框架
2-底层：OkHttp

3-核心特点：
-接口 + 注解定义请求
-自动拼接 URL 和参数
-支持多种 Converter(Gson/Moshi/Kotlinx)
-与 RxJava、Coroutine 深度集成

4-优势：
-代码简洁、结构清晰
-接口定义标准化
-易维护、易测试

5-说明：
当前 Android 项目首选方案
```

### 2.3  Volley(逐渐淘汰)

```
1-定位：请求队列框架（Google）

2-特点：
-请求调度简单
-适合轻量请求

3-不足：
-扩展性差
-大文件支持不佳
-不适合复杂项目

4-结论：新项目基本不再推荐。
```

### 2.4 Ktor Client(Kotlin/KMP常用)

```
1-定位：Kotlin 原生网络客户端

2-特点：
-协程原生支持
-插件化设计
-跨平台(Android/iOS/Desktop/Web)

3-适用场景：
-Kotlin Multiplatform（KMP）
-Compose Multiplatform 项目

4-说明：
KMP 项目首选网络库
```

### 2.5 WebSocket 库

```
1-常见实现方式：
-OkHttp WebSocket
-STOMP/Socket.IO(基于业务需求)

2-使用场景：
-即时聊天
-实时推送
-弹幕/直播互动
```

## 三 Android 常用数据解析方式

### 3.1 JSON(绝对主流格式)

```
目前 Android 与后端交互中，90% 以上使用 JSON。
```

### 3.2 Gson(使用最广)

```
1-作者：Google

2-特点：
-上手简单
-容错性强
-Retrofit 默认支持

3-优点：
-对字段缺失 / 多余不敏感
-学习成本低

4-缺点：
-反射多，性能一般
-Kotlin 空安全支持一般

5-说明：
老项目/快速开发常用
```

### 3.3 Moshi(现代 Android 首选)

```
1-作者：Square

2-特点：
-Kotlin 友好
-支持 codegen（编译期生成）
-Retrofit 官方推荐之一

3-优点：
-性能优于 Gson
-对 Kotlin data class 支持好
-空安全更合理

4-说明：
新项目强烈推荐
```

### 3.4 kotlinx.serialization(Kotlin 官方)

```
1-定位：Kotlin 原生序列化方案

2-特点：
-编译期生成代码(无反射)
-跨平台支持
-类型安全

3-优点：
-性能好
-KMP 项目首选

4-缺点：
-对后端字段变化较敏感
-注解侵入性稍高
```

### 3.5 XML 解析(较少)

```
1-使用场景：
-老系统接口
-RSS / SOAP

2-常见方式：
-PullParser
-SAX
-DOM

3-说明：
现代 Android 项目较少使用
```

## 四 网络库 + 解析库的常见组合

### 4.1 传统 Android 项目

```
Retrofit + OkHttp + Gson
Retrofit + OkHttp + Moshi（推荐）
```

### 4.2 Kotlin / 协程项目

```
Retrofit + OkHttp + Moshi
Retrofit + OkHttp + kotlinx.serialization
```

### 4.3 KMP 项目

```
Ktor Client + kotlinx.serialization
```

## 五 选型建议

|     场景      |           推荐方案           |
| :-----------: | :--------------------------: |
|   传统项目    |   Retrofit + OkHttp + Gson   |
|    新项目     |  Retrofit + OkHttp + Moshi   |
| Kotlin / 协程 |  Retrofit + OkHttp + Moshi   |
|  跨平台 KMP   | Ktor + kotlinx.serialization |
|   实时通信    |       OkHttp WebSocket       |

## 六 面试高频问题总结

```
1.OkHttp 和 Retrofit 的关系
2.Gson 和 Moshi 的区别
3.JSON 解析性能对比
4.协程网络请求如何实现
5.网络层如何封装
6.Token 失效如何处理
7.网络异常统一处理方案
```

## 七 总结一句话

```
OkHttp 负责网络通信，Retrofit 负责接口规范，解析库负责数据映射，Repository 负责业务解耦。
```

