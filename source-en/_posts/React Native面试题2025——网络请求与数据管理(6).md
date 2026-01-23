---
title: React Native面试题2025——网络请求与数据管理(6)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: ad7928d5
date: 2025-04-10 10:10:24
---
## 一 概述

1. 如何在 React Native 中进行网络请求？请比较 `fetch` 和 `Axios` 的使用。
2. 如何处理 React Native 中的错误和网络请求失败的情况？
3. 如何在 React Native 中使用 Redux 或 MobX 进行全局状态管理？它们如何与异步操作（如 API 请求）结合使用？
4. 如何在 React Native 中实现离线数据存储（例如使用 `AsyncStorage` 或数据库）？

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 如何在 React Native 中进行网络请求？请比较 `fetch` 和 `Axios` 的使用。

```
在 React Native 中，进行网络请求常用的方式是通过 fetch 或 Axios。它们都可以用来发送 HTTP 请求（如 GET、POST 等），并处理响应。

一、使用 fetch 进行网络请求
fetch 是浏览器原生的 API，也被 React Native 内置支持，使用起来非常简单。

示例：使用 fetch
fetch('https://api.example.com/data')
  .then(response => response.json())  // 解析响应为 JSON
  .then(data => console.log(data))     // 处理成功的返回数据
  .catch(error => console.error('错误:', error));  // 错误处理
特点：
-内置在 React Native 中，无需安装额外依赖。
-需要手动处理响应的状态码（如 404、500 等）和错误。
-默认返回的是一个 Promise，需要使用 .then() 或 async/await 来处理异步操作。
-对于 POST 请求，需要手动设置请求头和请求体。

POST 请求示例：
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),  // 请求体
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('错误:', error));

二、使用 Axios 进行网络请求
Axios 是一个基于 Promise 的 HTTP 客户端库，适用于浏览器和 Node.js。
它提供了比 fetch 更为强大的功能，特别是在处理请求和响应时。

示例：使用 Axios

import axios from 'axios';

axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))  // 处理成功的返回数据
  .catch(error => console.error('错误:', error));  // 错误处理
特点：
-需要额外安装：npm install axios。
-自动解析响应数据为 JSON，避免了 fetch 中手动调用 .json() 的步骤。
-可以全局设置请求头、超时、请求拦截器、响应拦截器等，提供更灵活的配置。
-支持取消请求，适合处理复杂的请求场景。

POST 请求示例：
axios.post('https://api.example.com/data', {
  key: 'value',
})
  .then(response => console.log(response.data))
  .catch(error => console.error('错误:', error));
  
总结：
-fetch 是内置的，简单直接，适合简单的网络请求。缺点是需要手动处理错误和响应解析。
-Axios 提供了更多功能，如请求拦截器、自动解析 JSON、请求取消等，适合复杂的请求场景。  
```

### 2.2 如何处理 React Native 中的错误和网络请求失败的情况？

```
-网络请求失败处理：使用 try/catch 或 .catch() 捕获网络请求的错误，并根据错误类型显示友好的错误信息。
-错误边界：React 的错误边界可以捕获组件中的 JavaScript 错误，并防止应用崩溃。
-用户提示：使用 Alert、Toast 或 Modal 提示用户网络错误或应用异常。
-重试机制：为网络请求失败实现自动重试功能。
```

### 2.3 如何在 React Native 中使用 Redux 或 MobX 进行全局状态管理？它们如何与异步操作（如 API 请求）结合使用？

```
Redux：
适用于需要全局状态管理和复杂数据流的应用，通过中间件 redux-thunk 结合异步操作。
数据流是单向的，状态通过 action 更新。

MobX：
更简单和直观的状态管理，基于观察者模式。
它通过 makeAutoObservable 自动管理状态的变化，并支持直接在 store 中进行异步操作。
```

### 2.4 如何在 React Native 中实现离线数据存储（例如使用 `AsyncStorage` 或数据库）？

```
-AsyncStorage：适合存储小型、简单的数据，简单易用，但不适合存储大量结构化数据。
-SQLite：适合存储结构化数据，通过 SQL 语句灵活查询，适合复杂的离线数据管理。
-WatermelonDB：适合需要高性能、大量数据的场景，支持复杂数据模型和查询，适合离线数据库应用。
```

