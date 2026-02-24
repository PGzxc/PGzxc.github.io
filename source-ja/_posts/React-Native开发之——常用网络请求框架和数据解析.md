---
title: React Native开发之——常用网络请求框架和数据解析
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
  - 网络请求
  - 数据解析
abbrlink: 237d6341
date: 2026-02-24 10:01:19
---
## 一 概述

```
在 React Native 开发中，网络层主要依托 JavaScript 生态 + 原生桥接能力。
整体思路与 Web 类似，但需要兼顾 移动端性能、网络稳定性与跨平台一致性。
```

<!--more-->

## 二 RN 常用网络请求库

### 2.1 fetch(内置，基础能力)

```
1-来源：WHATWG Fetch API
2-定位：RN 内置网络能力

3-特点：
-无需额外依赖
-Promise 风格
-跨平台一致（iOS/Android）

4-不足：
-无拦截器
-错误处理较原始
-请求取消支持一般

5-说明：
适合简单请求 / Demo
```

### 2.2 Axios(最主流)

```
1-定位：Promise 风格 HTTP 客户端
2-地位：RN / Web 通用事实标准

3-核心能力：
-请求 / 响应拦截器
-请求取消（AbortController）
-超时、重试
-自动 JSON 转换

4-优势：
-Web / RN 通用
-生态成熟
-学习成本低

5-说明：
RN 项目首选网络库
```

### 2.3  apisauce(Axios 二次封装)

```
1-定位：对 Axios 的规范化封装

2-特点：
-统一返回结构
-错误友好
-更偏业务层

3-说明：
偏团队规范型项目
```

### 2.4 react-query / TanStack Query(请求管理)

```
1-常见方案：
-原生 WebSocket（RN 内置）
-socket.io-client
-STOMP

2-使用场景：
-即时聊天
-实时推送
-实时协作
```

## 三 RN 常用数据解析方式

### 3.1 JSON(绝对主流)

```
RN 与后端交互 几乎 100% 使用 JSON。
```

### 3.2 原生 JSON.parse / JSON.stringify

```
1-代码
const data = JSON.parse(responseText);

2-特点：
-无依赖
-性能可接受
-手动映射

3-说明：
最基础、最常见
```

### 3.3 手写 Model 映射(常见)

```
1-代码
interface User {
  id: number;
  name: string;
}

2-结合 TypeScript 使用：
-接口定义数据结构
-编译期类型检查

3-说明：
RN 项目主流方式
```

### 3.4 class-transformer / io-ts(较少)

```
1-定位：运行时 / 编译期数据校验

2-适用场景：
-对数据安全要求高
-接口字段复杂

3-说明：
大型或金融类项目
```

### 3.5 GraphQL 数据解析(部分项目)

```
1-库：
-Apollo Client
-Relay

2-特点：
-强类型
-按需获取数据
-前端驱动接口结构
```

## 四 网络库 + 解析方式的常见组合

### 4.1 小型项目 / Demo

```
fetch + JSON.parse
```

### 4.2 流 RN 项目

```
Axios + TypeScript interface
```

### 4.3  数据驱动型项目

```
Axios + react-query
```

### 4.4 GraphQL 项目

```
Apollo Client + 自动生成类型
```

## 五 RN 网络层常见封装思路

### 5.1 分层结构(推荐)

```
UI (Component)
 ↓
Hooks / Store
 ↓
Service(Api)
 ↓
Axios / fetch
```

### 5.2  Axios 拦截器统一处理

```
Header 注入(Token)
日志打印
错误统一转换
重试机制
```

### 5.3 服务端状态管理

```
缓存接口数据
控制刷新时机
避免重复请求
```


## 六 RN 面试高频关注点

```
1.fetch 和 Axios 区别
2.RN 网络请求线程模型
3.网络异常如何处理
4.Token 刷新方案
5.react-query 的作用
6.WebSocket 使用场景
7.RN 与 Web 网络差异
```

## 七 总结一句话

```
Axios 负责网络能力，TypeScript 负责数据约束，Query 库负责请求生命周期管理。

推荐组合：
-新项目：Axios + TypeScript
-复杂业务：Axios + TanStack Query
```

