---
title: React Native高频面试题——Web前端基础(1)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: cd6f0dbe
date: 2025-10-09 09:33:27
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
1.HTML5 / CSS3
2.ES6+ 语法 & JS 基础
3.TypeScript / JSX 基础
4.React 基础语法
```

### 三 面试题解答(仅供参考)

### 3.1 HTML5、CSS3

1、HTML5 有哪些新特性？

```
-语义化标签：<header>, <article>, <section> 等，提升结构清晰度。
-表单增强：新增 <input type="email|date"> 等类型，支持更丰富输入。
-多媒体：<video>, <audio>，简化音视频嵌入。
-本地存储：localStorage, sessionStorage, IndexedDB，支持客户端数据存储。
-图形绘制：Canvas（2D/3D 绘图）, SVG（矢量图形）。
-实时通信：WebSocket（双向通信）, SSE（服务器推送）。
-地理定位：Geolocation API，获取用户位置。
```

2、语义化标签的意义？

```
提升 SEO 和 无障碍访问（屏幕阅读器）。
增强代码 可读性 和 可维护性。
```

3、CSS 盒模型

```
组成：content + padding + border + margin。
标准盒模型：宽度 = content；box-sizing: border-box：宽度 = content + padding + border
```

4、Flexbox 与 Grid 区别？

```
Flexbox：一维布局，适合行/列对齐，灵活分配空间。
Grid：二维布局，适合复杂网格结构，控制行/列同时布局。
```

5、如何实现响应式设计？

```
媒体查询：@media 适配不同设备。
相对单位：rem, em, vw, vh 动态调整尺寸。
布局工具：Flexbox 和 Grid 自适应布局。
图像优化：srcset 提供不同分辨率图片。
Viewport：<meta name="viewport"> 确保移动端适配。
```

6、CSS 选择器优先级

```
优先级：!important > 内联 > ID > 类/伪类 > 元素/伪元素。
建议：避免滥用 !important，保持样式可控。
```

7、本地存储方式对比？

```
LocalStorage：长期存储（5–10MB），不随请求发送。
SessionStorage：会话期间有效，页面关闭失效。
Cookie：容量小（约 4KB），随请求发送，适合身份认证。
```

8、`display: none` vs `visibility: hidden`？

```
display: none：移除元素，不占空间。
visibility: hidden：隐藏元素，仍占空间。
```

9、BFC（块级格式化上下文）

```
1、定义：独立的渲染区域，内部元素不影响外部。
2、触发方式：overflow: hidden, float, display: flow-root 等。
3、应用场景：
-清除浮动。
-防止外边距折叠。
-避免浮动元素覆盖。
```

### 3.2 ES6+ 语法&JS 基础

1、var、let、const 的区别？

```
var：函数作用域，存在提升。
let：块级作用域，无提升（暂时性死区）。
const：块级作用域，声明时需初始化，引用地址不可变。
```

2、箭头函数和普通函数的区别？

```
1、箭头函数：
-无独立 this 和 arguments，继承外层作用域。
-不可作为构造函数。
-适合回调函数。

2、普通函数：有独立 this，支持构造函数。
```

3、Promise 与 async/await？

```
Promise：管理异步操作，状态：pending, fulfilled, rejected，解决回调地狱。
async/await：基于 Promise 的语法糖，异步代码更像同步，可读性更高。
```

4、解构赋值的作用？

```
作用：从数组/对象快速提取值，支持默认值和重命名。
优势：简化代码，提升可读性。
```
5、闭包是什么？作用与风险？

```
1、定义：函数与其词法作用域的组合，可访问外层变量。
2、作用：
-实现私有变量。
-延长变量生命周期。

3、风险：滥用可能导致内存泄漏。
```
6、原型和原型链？

```
原型：对象通过 __proto__ 指向构造函数的 prototype。
原型链：属性查找沿 __proto__ 向上，直到 null。
作用：实现属性和方法共享。
```

7、事件循环机制？

```
机制：JS 单线程，任务分为宏任务（setTimeout）和微任务（Promise.then）。
执行顺序：每次循环清空微任务队列，再执行一个宏任务。
```

### 3.3 TS / JSX 基础

1、JavaScript vs TypeScript

```
1、JavaScript：动态弱类型，灵活但易出错。

2、TypeScript：
JS 超集，添加静态类型、接口、泛型。
优势：类型检查、可维护性强、IDE 智能提示、支持最新 ES 特性。
```

2、接口（Interface） vs 类型别名（Type）？

```
1、Interface：
-适合定义对象/类/函数结构。
-支持声明合并。

2、Type：
-可定义联合类型、元组等，灵活性更高。
-不支持声明合并。
```

3、JSX 是什么？本质是什么？

```
1、定义：React 语法扩展，允许在 JS 中写类 HTML 代码。
2、本质：编译为 React.createElement() 调用。
3、与 HTML 区别：
-属性用驼峰命名（如 onClick）。
-class 用 className。
-支持嵌入 JS 表达式 {}。
```

### 3.4 React 基础语法

1、React 的核心概念？

```
组件化：UI 拆分为独立组件。
Props：只读，传递数据。
State：管理组件内部状态。
虚拟 DOM：优化渲染性能。
单向数据流：数据从父到子传递。
生命周期：通过 useEffect 等 Hooks 管理。
```

2、函数组件 vs 类组件？

```
1、函数组件：
-使用 Hooks（如 useState, useEffect）管理状态和副作用。
-代码更简洁，推荐使用。

2、类组件：
-使用 this.state 和生命周期方法。
-代码较复杂，逐渐被取代。
```

3、setState 的特点？

```
异步更新：批量合并多次调用，减少渲染。
回调方式：使用 setState(prev => prev + 1) 获取最新状态。
```

4、常用 Hooks？

```
useState：管理状态。
useEffect：处理副作用（如数据获取、订阅）。
useMemo / useCallback：缓存值/函数，优化性能。
useContext：跨组件共享数据。
```

5、受控组件 vs 非受控组件？

```
受控组件：表单值由 React state 控制，同步更新。
非受控组件：表单值由 DOM 管理，通过 ref 获取。
```

6、React 性能优化手段？

```
避免重复渲染：使用 React.memo, PureComponent。
缓存优化：useMemo, useCallback 缓存值/函数。
列表优化：为列表项设置唯一 key。
懒加载：路由或组件按需加载。
```

