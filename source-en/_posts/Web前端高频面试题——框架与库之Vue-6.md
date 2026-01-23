---
title: Web前端高频面试题——框架与库之Vue(6)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 841637eb
date: 2025-10-24 08:49:18
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
1.Vue2 vs Vue3
2.响应式原理：Object.defineProperty vs Proxy
3.组件通信：props、emit、provide/inject、Vuex/Pinia
4.虚拟 DOM 与 Diff 算法
5.Vue Router：Hash / History 原理
6.Composition API vs Options API
7.性能优化：keep-alive、异步组件、虚拟滚动
```

### 三 面试题解答(仅供参考)

### 3.1 Vue2 vs Vue3

1、Vue2 与 Vue3 有哪些主要区别？

|     对比项      |              Vue2               |                    Vue3                     |
| :-------------: | :-----------------------------: | :-----------------------------------------: |
|   响应式实现    |      Object.defineProperty      |    Proxy（支持动态属性、数组、Map/Set）     |
|    代码组织     | Options API(data、methods 分散) |      Composition API(逻辑集中、可复用)      |
|    性能优化     |          全量依赖追踪           |    静态提升、PatchFlag、Block Tree 优化     |
| TypeScript 支持 |            支持较弱             |           原生支持，类型推导更优            |
|    架构设计     |            单体核心             |    模块化(runtime-core、reactivity 分离)    |
|     新特性      |               无                | Teleport、Suspense、Fragments、多根节点模板 |

2、Vue3 的优势及迁移原因

```
-更高效：Proxy 响应式性能更高，编译时优化（如静态提升、PatchFlag）减少运行时开销。
-更灵活：Composition API 提升代码复用性和可维护性，适合复杂逻辑。
-现代生态：原生 TypeScript 支持，兼容 Pinia 等新工具，适配大型项目。
-企业迁移：为长期维护、性能提升和生态兼容，需注意插件迁移成本。
```

3、Vue3 新特性

```
-Composition API：逻辑按功能组织，便于复用。
-Teleport：传送组件到任意 DOM 位置。
-Suspense：处理异步组件加载，显示 fallback。
-响应式 API：ref（基本类型）、reactive（对象），更灵活。
```

### 3.2 响应式原理

1、Vue2 的响应式原理是什么？它使用 Object.defineProperty 的局限性有哪些？

```
1、通过 Object.defineProperty 劫持对象属性 getter/setter，实现依赖收集和更新派发。

2、局限性：
-无法检测数组长度变化(如 push/pop)或对象新增/删除属性。
-需递归遍历嵌套对象，性能开销大。
-不支持 Map/Set 等新类型。
```

2、Vue3 响应式原理？

```
1、使用 Proxy 拦截整个对象，支持新增/删除属性、数组变化及 Map/Set，初始化性能更优。

2、优势：
-非入侵式，无需递归遍历属性。
-支持更多操作（如 delete、has），覆盖广泛场景。
-深度监听更高效。
```

3、处理 Vue2 局限性

```
使用 Vue.set 添加属性，Vue.delete 删除属性。
数组操作用 splice 等方法。
复杂场景用深拷贝或自定义 watcher。
推荐迁移到 Vue3，彻底解决局限性。
```

### 3.3 组件通信

1、Vue 组件间有哪些通信方式？适用场景如何？

|         通信方式          |   方向   |           适用场景           |
| :-----------------------: | :------: | :--------------------------: |
|           props           | 父 → 子  |         数据单向下传         |
|           emit            | 子 → 父  |   子组件触发事件通知父组件   |
|          v-model          |   双向   |      父子组件值双向绑定      |
|     provide / inject      | 任意层级 | 跨层级依赖注入(如配置、主题) |
| 事件总线 (mitt/ EventBus) |   任意   |  非父子通信(Vue3 推荐 mitt)  |
|  全局状态(Vuex / Pinia)   |   任意   |       复杂全局状态管理       |

2、provide/inject 与 props 的区别？何时使用？

```
provide/inject 用于跨层级通信（如祖先提供，后代注入），非响应式（Vue3 可通过 reactive 实现响应）；props 限于父子，易追踪。
provide/inject 适合配置注入或主题传递，不适合频繁数据变化。
```

3、Vuex 和 Pinia 的区别？在 Vue3 中为什么推荐 Pinia？

```
Vuex 是官方状态管理，模块化但 boilerplate 多；
Pinia 更轻量，支持 Composition API、无 mutations（直接修改 state）、更好 TypeScript 支持。
Pinia 在 Vue3 中更流行，因其简洁和模块化
```


### 3.4 虚拟 DOM 与 Diff 算法

1、什么是虚拟 DOM？Vue 如何使用它？

```
虚拟 DOM 是真实 DOM 的 JS 对象表示，用于高效更新。
Vue 通过 render 函数生成 VNode 树，比较新旧树差异，只更新变化部分。
```

2、Vue 的 Diff 算法原理是什么？

```
1、原理：
同层比较，根节点类型相同则 patch 属性和子节点；
子节点通过 key 优化列表复用；
采用双端比较（oldStart/newStart 指针）找出最小操作。

2、Vue3 优化：

-静态提升：编译时提取静态节点，减少运行时 diff。
-PatchFlag：标记动态内容，仅比较变化部分。
-Block Tree：跳过静态子树，提升效率。
-Fragment：支持多根节点，减少包裹层。
```

3、虚拟 DOM 的优缺点？

```
1、优点：批量更新减少 DOM 操作，提高性能；跨平台。
2、缺点：初次渲染慢，内存占用。Vue 通过优化 Diff 缓解。
```

### 3.5 Vue Router

1、Vue Router 的 Hash 和 History 模式区别是什么？

```
Hash 使用 # 符号模拟 URL 变化（如 #/home），基于 hashchange 事件，不需服务器配置；
History 使用真实 URL(如/home)，基于 popstate 和 pushState，需要服务器重定向到 index.html 以防 404。
```

2、Hash 和 History 的原理及适用场景？

```
1、Hash 原理：
监听 hashchange，不发请求；适合简单部署。

2、History 原理：
HTML5 History API 操作浏览器历史；
适合 SEO 和美观 URL，但需后端支持（如 Nginx rewrite）
```

3、如何在项目中切换路由模式？

```
在 router 配置中设置 mode: 'history' 或 'hash'；
History 模式需配置服务器（如 Apache .htaccess）。
```

4、Vue Router 的两种模式有什么区别？底层原理是什么？

|  模式   | URL 形式 |           原理           |             特点              |
| :-----: | :------: | :----------------------: | :---------------------------: |
|  Hash   | /#/path  |      监听hashchange      |   无需服务器配置，兼容性好    |
| History |  /path   | 使用pushState / popstate | URL 美观，需后端支持 404 回退 |

面试加分点

```
Vue Router 实现本质是 监听 URL 变化（hash 或 popstate） → 匹配路由表 → 渲染对应组件。
```

### 3.6 Composition API vs Options API

1、主要区别

|  对比项  |     Options API      |       Composition API        |
| :------: | :------------------: | :--------------------------: |
|   写法   |  data、methods 分散  | setup() 函数，逻辑按功能分组 |
| 可复用性 |    mixins 易冲突     |   composable 函数清晰复用    |
| 类型支持 |  TypeScript 支持弱   |     原生支持 TypeScript      |
| 逻辑组织 | 分散，复杂组件难维护 |       高内聚，逻辑清晰       |

2、何时选择 Composition API？它的优势？

```
-逻辑复用性强，易抽取为 composable。
-TypeScript 友好，类型推导更优。
-适合复杂组件，逻辑清晰可维护。
```

3、如何在 Composition API 中使用 ref 和 reactive？

```
-ref：用于基本类型，访问需 .value。
-reactive：用于对象，返回响应式代理。
-选择：基本类型用 ref，复杂对象用 reactive。
```


### 3.7 性能优化

1、Vue 项目中常见的性能优化手段有哪些？

|     场景     |                  优化手段                  |            说明             |
| :----------: | :----------------------------------------: | :-------------------------: |
| 组件频繁切换 |               \<keep-alive>                |   缓存组件实例，保留状态    |
|  首屏加载慢  | 异步组件 defineAsyncComponent + 路由懒加载 |    减少初次 bundle 大小     |
| 大量列表渲染 |      虚拟滚动（vue-virtual-scroller）      | 只渲染可视区，降低 DOM 开销 |
|  响应式滥用  |    合理使用 shallowRef/ shallowReactive    |    减少深层依赖追踪成本     |
|   静态资源   |           CDN 加速 / 图片懒加载            |        优化加载速度         |
|   编译优化   |    静态提升 + PatchFlag(Vue3 自动支持)     |    减少运行时 diff 开销     |

2、什么是异步组件？如何实现？

```
异步组件使用 defineAsyncComponent(() => import('./Comp.vue')) 懒加载，
减少初次 bundle 大小，提升加载速度。适合非核心组件。
```

3、虚拟滚动在 Vue 中的应用？性能优势？

```
虚拟滚动只渲染可视区元素（如 vue-virtual-scroller），处理长列表。
优势：减少 DOM 节点，降低内存和渲染开销。
结合 Intersection Observer 实现。
```

