---
title: Web前端高频面试题——浏览器与性能(3)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 4a55ccba
date: 2025-10-22 09:41:13
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.渲染机制：HTML/CSS 渲染机制、JS 执行机制、浏览器循环系统
2.渲染流程：DOM + CSSOM → Render Tree → Layout → Paint → Composite
3.重排 vs 重绘
4.缓存策略：强缓存、协商缓存
5.首屏优化：SSR、预渲染、骨架屏、BigPipe
6.跨域解决方案：CORS、JSONP、代理、postMessage
7.Web Worker/Service Worker
8.安全防御：XSS、CSRF、点击劫持
9.浏览器存储：cookie、localStorage、sessionStorage、IndexedDB
```

### 三 面试题解答(仅供参考)

### 3.1 渲染机制

1、浏览器的渲染机制是怎样的？HTML、CSS、JS 如何影响渲染？

```
1、浏览器渲染机制包括以下步骤：

HTML解析：生成 DOM 树（Document Object Model）。
CSS解析：生成 CSSOM 树（CSS Object Model）。
JS执行：通过 DOM/CSSOM API 操作页面，JS 单线程运行，依赖事件循环处理异步任务。
渲染树：DOM 树和 CSSOM 树结合生成 Render Tree（仅包含可见元素）。
布局（Layout）：计算元素位置和大小（Reflow）。
绘制（Paint）：将元素绘制为像素，生成图层。
合成（Composite）：将图层合成为最终图像。

2、JS 执行与事件循环：

-JS 单线程，同步任务直接执行，异步任务分宏任务(setTimeout、DOM事件)和微任务(Promise、MutationObserver)。
-事件循环(Event Loop)：每次宏任务后清空微任务队列，再取下一个宏任务。

3、影响：CSSOM 阻塞渲染，JS 可能阻塞 HTML 解析(可用 async/defer 优化)。
```

### 3.2 渲染流程

1、重排和重绘的区别？如何减少重排？

```
1、流程
-DOM + CSSOM：HTML 生成 DOM 树，CSS 生成 CSSOM 树。
-Render Tree：DOM 和 CSSOM 结合，剔除不可见元素（如 display: none）。
-Layout（回流）：计算元素位置和大小。
-Paint（重绘）：绘制元素像素，生成图层。
-Composite（合成）：GPU 加速合成图层，显示屏幕。

2、关键点：CSSOM 和 JS 可能阻塞渲染，优化需减少阻塞资源。
```

### 3.3 重排 vs 重绘

1、重排和重绘的区别是什么？如何减少重排？

```
1、概念
重排(Reflow)：DOM 几何属性（如 width、position）变化，触发布局重新计算，成本高。
重绘(Repaint)：样式变化（如 color）不影响布局，仅重新绘制。

2、区别：重排触发重绘，重绘不一定触发重排；重排开销更大。

3、减少重排：
批量修改样式：用 class 替换逐条内联样式。
离线操作 DOM：使用 DocumentFragment 或虚拟 DOM。
使用 transform/opacity：避免触发布局的动画。
缓存布局属性：避免频繁读取 offsetWidth 等。
```

### 3.4 缓存策略

1、强缓存和协商缓存的区别？如何配置？

```
1、强缓存：直接使用本地缓存，无需请求服务器。
 -实现：Cache-Control: max-age=秒数 或 Expires。
 -特点：返回 200（from cache）。

2、协商缓存：向服务器验证资源是否更新。
 -实现：ETag/If-None-Match 或 Last-Modified/If-Modified-Since。
 -特点：未修改返回 304，否则返回新资源。

3、区别：强缓存不发请求，优先级高于协商缓存。

4、配置：
 -强缓存：Cache-Control: max-age=31536000。
 -协商缓存：服务器返回 ETag 或 Last-Modified。
```

### 3.5 首屏优化

1、如何优化首屏加载速度？SSR、预渲染、骨架屏、BigPipe 的作用？

```
1、目标：缩短用户看到首屏内容的时间。

2、方案：
-SSR（服务端渲染）：服务端生成 HTML，首屏快，SEO 友好，但服务器压力大。
-预渲染：构建时生成静态 HTML，适合固定内容，首屏快但动态内容需处理。
-骨架屏：加载时显示占位 UI，提升用户体验，用 CSS/HTML 实现。
-BigPipe：分块传输 HTML，优先渲染关键内容。

3、其他：
-压缩资源（JS/CSS/图片）。
-懒加载非首屏资源。
-使用 async/defer 加载 JS，启用 CDN 和 HTTP/2。
```

### 3.6 跨域解决方案

1、什么是跨域？有哪些跨域解决方案？

```
1、跨域：浏览器同源策略限制不同源（协议、域名、端口）资源访问。

2、解决方案：
-CORS：服务器设置 Access-Control-Allow-Origin，支持复杂/简单请求。
-JSONP：利用 <script> 无跨域限制，仅支持 GET，安全性低。
-代理：同源服务器转发请求（Nginx/Node.js）。
-postMessage：HTML5 API，适用于 iframe/window 通信。
```

### 3.7 Web Worker / Service Worker

1、Web Worker 和 Service Worker 的区别和用途？

```
1、Web Worker：

-用途：独立线程运行 JS，处理复杂计算（如图像处理），避免阻塞主线程。
-特点：无 DOM 访问，通过 postMessage 通信。
-示例：new Worker('worker.js')。

2、Service Worker：

-用途：后台拦截网络请求，支持离线缓存、PWA，需 HTTPS。
-特点：拦截 fetch 请求，生命周期包括 install、activate、fetch。
-示例：navigator.serviceWorker.register('sw.js')。

3、区别：Web Worker 专注计算，Service Worker 专注网络和缓存。
```

### 3.8 安全防御

1、前端如何防御 XSS、CSRF 和点击劫持？

```
1、XSS（跨站脚本攻击）：
 -攻击：注入恶意脚本窃取数据。
 -防御：转义输出（用 textContent）、使用 CSP、框架自动转义。

2、CSRF（跨站请求伪造）：
 -攻击：伪造用户请求执行恶意操作。
 -防御：CSRF Token、SameSite Cookie（Strict/Lax）、验证 Referer。

3、点击劫持：
 -攻击：通过透明 iframe 诱导点击。
 -防御：设置 X-Frame-Options: DENY 或 CSP frame-ancestors。
```

### 3.9 浏览器存储

1、cookie、localStorage、sessionStorage、IndexedDB 的区别和使用场景？

|    存储方式    |   容量    |        生命周期        |    访问方式     |         使用场景         |
| :------------: | :-------: | :--------------------: | :-------------: | :----------------------: |
|     Cookie     |   ~4KB    |     可设置过期时间     |  客户端/服务端  |  用户认证、跟踪用户行为  |
|  localStorage  |  ~5-10MB  |     永久(手动清除)     |  客户端(同源)   |  持久化存储(如用户设置)  |
| sessionStorage |  ~5-10MB  | 页面会话(关闭标签失效) |  客户端(同源)   |   临时数据(如表单数据)   |
|   IndexedDB    | 较大(~GB) |     永久(手动清除)     | 客户端(异步API) | 复杂数据存储(如离线应用) |

区别：

```
Cookie：随请求自动发送，适合服务端交互。
localStorage/sessionStorage：简单键值存储，客户端操作，sessionStorage生命周期短。
IndexedDB：支持复杂查询，适合大数据量存储。
```
