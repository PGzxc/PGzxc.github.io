---
title: Web前端高频面试题——HTML&CSS(1)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 8d4570fa
date: 2025-10-20 08:19:26
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
1.HTML5 新特性：语义化标签、音视频、Canvas、WebSocket、LocalStorage 等
2.语义化意义：可读性、SEO、无障碍化
3.常见标签：行内元素 vs 块级元素
4.BFC(块级格式化上下文)：概念、触发方式
5.CSS3 新特性：Flex、Grid、动画、过渡、变量
6.定位：relative/absolute/fixed/sticky 区别
7.元素显示模式：inline、inline-block、block
8.布局与适配：响应式布局方案、rem/em/vw/vh/px 区别与应用
9.CSS 优先级：权重计算方式
10.CSS 预处理/架构：Less、Sass、Stylus、BEM
11.页面架构和布局：组件化/模块化/工程化思想
12.性能优化：减少重排重绘、合并样式、压缩、CDN
```

### 三 面试题解答(仅供参考)

### 3.1 HTML5 新特性

1、HTML5 的主要新特性有哪些？

```
语义化标签：<header>、<footer>、<article> —> 提高可读性、SEO、无障碍支持
多媒体：<audio>、<video> —> 原生支持音视频播放
图形：<canvas>（JS绘图）、<svg>（矢量图）
存储：localStorage、sessionStorage、IndexedDB —>  本地大容量存储
通信：WebSocket —> 全双工实时通信
表单增强：<input type="email/date/range">
```

2、语义化标签 / 音视频 / Canvas / WebSocket / LocalStorage 的作用和场景？

```
语义化：结构清晰、SEO 友好（如 <article> 包裹文章）
音视频：无需 Flash，原生 <video src="xx" controls>
Canvas：JS 动态绘图，游戏、图表
WebSocket：实时通信（聊天室/股票推送）
LocalStorage：持久化键值存储(5MB+)，适合离线应用
```

3、HTML5 离线缓存如何实现？

```
旧方案：Application Cache + manifest（已废弃）
新方案：PWA + Service Worker（动态缓存、离线支持）
```

### 3.2 语义化意义

1、什么是 HTML 语义化？为什么重要？

```
定义：用合适标签表达内容含义(如 <nav> 代替 <div>)
意义：提高可维护性、利于 SEO、方便读屏器解析、无样式时也有清晰结构
应用：博客用 <article> + <section>；导航用 <nav>
```

### 3.3 行内 vs 块级元素

1、行内元素和块级元素的区别？

|      特性      |  块级元素  |   行内元素   | inline-block |
| :------------: | :--------: | :----------: | :----------: |
|      排列      |  独占一行  |   同行排列   |   同行排列   |
|      宽高      |   可设置   |   不可设置   |    可设置    |
| margin/padding |   全支持   | 垂直方向无效 |    全支持    |
|      示例      | div、p、ul | span、a、em  | img、button  |

2、如何转换显示模式？

```
通过 display: block/inline/inline-block。
```

### 3.4 BFC(块级格式化上下文)

1、什么是 BFC？如何触发？有什么作用？

```
概念：独立渲染区域，内部布局不影响外部
触发：overflow≠visible、float≠none、display:inline-block/flex/grid、position:absolute/fixed
作用：清除浮动、避免 margin 重叠、防止文字环绕
```

### 3.5 CSS3 新特性

1、CSS3 的核心新特性有哪些？

```
布局：Flex（一维）、Grid（二维）
动效：transition（过渡）、@keyframes/animation（动画）
样式：变量 --var、圆角 border-radius、阴影 box-shadow
增强选择器：:nth-child()、:not()
```

2、Flex 和 Grid 有什么区别？

```
Flex：一维布局（单行/列），适合导航、居中
Grid：二维布局，适合整体页面网格
```

3、transition 和 animation 区别？

```
transition：事件触发，一次性
animation：可自动执行，可循环
```

### 3.6 定位

1、relative/absolute/fixed/sticky区别及应用？

| 定位方式 |    参考点    | 脱离文档流 |    场景    |
| :------: | :----------: | :--------: | :--------: |
| relative |     自身     |     否     |  元素微调  |
| absolute | 最近定位祖先 |     是     | 弹窗、下拉 |
|  fixed   |     视口     |     是     |  固定导航  |
|  sticky  |   滚动阈值   |     否     |  吸顶效果  |


### 3.7 元素显示模式

1、block、inline、inline-block 的区别？

```
block：独占一行，可设宽高
inline：不独占，宽高无效，margin/padding 垂直方向无效
inline-block：不独占，可设宽高，常用于按钮/导航
```

### 3.8 布局与适配

1、如何实现响应式布局？

```
1、方法：
媒体查询 @media、流式布局 %、Flex/Grid、栅格系统

2、单位：
px：绝对像素，精确控制
em：相对父元素字体
rem：相对根元素字体，常用于移动端
vw/vh：视口百分比，全屏自适应
```

2、常见的响应式布局方案有哪些？

```
流式布局（百分比宽度）
媒体查询（@media screen and (max-width:768px)）
弹性布局（Flex、Grid）
栅格系统（12 列布局）
相对单位（rem、vw/vh）
```

### 3.9 CSS 优先级

1、CSS 优先级如何计算？

```
内联样式：1000
ID 选择器：100
类/伪类/属性选择器：10
标签/伪元素：1
继承/通配符：0
规则：!important > 内联 > ID > 类 > 标签
```

### 3.10 CSS 预处理/架构

1、什么是 CSS 预处理器？常见的有哪些？

```
定义：对 CSS 增强，支持变量、嵌套、mixin
工具：Less（轻量）、Sass（强大，支持函数/循环）、Stylus（简洁）
```

2、BEM 命名规范是什么？

```
Block__Element--Modifier，例如 .btn__icon--large
作用：避免冲突，模块化，适合大型项目
```

### 3.11 页面架构和布局

1、HTML/CSS 工程化思想是什么？

```
组件化：复用 UI（如按钮组件）
模块化：CSS Modules / Scoped CSS，避免污染
工程化：Webpack/PostCSS 自动构建、代码分离、压缩优
```

### 3.12 性能优化

1、如何优化 HTML/CSS 性能？

```
减少重排/重绘：使用 transform/opacity 替代 top/left；批量修改 DOM；will-change 优化动画
资源优化：合并压缩 CSS，CDN 加速
图片优化：雪碧图、懒加载、WebP
加载优化：CSS 置顶、JS 底部、异步加载
```

2、如何减少重排和重绘？

```
使用 transform 和 opacity 代替 top/left 修改位置
合并 DOM 操作，使用 DocumentFragment 或 requestAnimationFrame
避免频繁读取布局属性（如 offsetTop、clientWidth）
批量修改样式（修改 class，而不是逐个修改 style）
```

3、CSS 层面的常见优化方式有哪些？

```
压缩合并样式表
使用 CDN 加速
图片优化（雪碧图、懒加载、WebP）
CSS 动画优先（开启 GPU 合成层）
```

