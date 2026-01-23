---
title: Web前端高频面试题——性能与优化(11)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 466f4097
date: 2025-10-29 09:06:33
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
1.首屏优化：SSR、预渲染、骨架屏、BigPipe
2.图片优化：懒加载、WebP、雪碧图、CDN
3.长列表优化：虚拟滚动
4.Bundle 优化：Tree-shaking、Code splitting、按需加载
5.指标监控：Web Vitals（LCP、FID、CLS）、Lighthouse
6.内存优化：泄漏排查、闭包管理
7.JS 优化：事件委托、节流防抖
8.移动端优化：viewport、手势优化、多屏幕适配
```

### 三 面试题解答(仅供参考)

### 3.1 首屏优化

#### 技术对比

|  技术   |        定义         |        优势         |     缺点     |      适用场景      |
| :-----: | :-----------------: | :-----------------: | :----------: | :----------------: |
|   SSR   | 服务端生成完整 HTML |  首屏快、SEO 友好   | 服务器压力大 |    动态内容页面    |
| 预渲染  | 构建时生成静态 HTML | 兼顾 SEO 和加载速度 |  数据非实时  | 静态页面(如营销页) |
| 骨架屏  |  加载前展示占位 UI  |  提升用户感知体验   |  需额外开发  |  内容加载慢的页面  |
| BigPipe | 分块传输和渲染页面  |  优先渲染关键内容   |   实现复杂   |      复杂页面      |

#### 高频面试题

1、SSR、预渲染、骨架屏、BigPipe 如何提升首屏性能？

```
SSR：服务端渲染 HTML，减少客户端 JS 解析时间，适合动态内容。
预渲染：构建时生成静态 HTML，兼顾 SEO 和速度，适合固定内容。
骨架屏：用占位 UI（如 CSS 动画或组件）减少等待焦虑，适合长加载页面。
BigPipe：分块渲染，优先展示核心内容，降低 TTFB，适合复杂页面。
总结：结合 SSR 和骨架屏可显著提升首屏体验，需配合缓存优化服务器压力。
```

2、如何优化前端首屏加载速度？

```
使用 SSR（如 Next.js/Nuxt.js）或 预渲染（如 prerender-spa-plugin）加速首屏。
引入 骨架屏（如 Ant Design Skeleton）提升感知体验。
结合 BigPipe 分块加载和 CDN 加速静态资源。
示例：Next.js 的 SSR + CDN 可将首屏时间缩短 30%-50%。
```

### 3.2 图片优化

#### 技术对比

|  技术  |           定义           |           优势           |     缺点     |                实现方式                |
| :----: | :----------------------: | :----------------------: | :----------: | :------------------------------------: |
| 懒加载 |      视口内加载图片      |       减少首屏请求       | 需兼容性处理 | loading="lazy" 或 IntersectionObserver |
|  WebP  |     高压缩比图片格式     | 体积小 20%-50%、支持透明 |  需回退格式  |          picture+ ImageMagick          |
| 雪碧图 |    合并小图为一张大图    |      减少 HTTP 请求      |  维护成本高  |        CSS background-position         |
|  CDN   | 分布式服务器加速资源加载 | 降低延迟、减轻服务器压力 |   配置成本   |           阿里云 OSS、AWS S3           |

#### 高频面试题

1、如何优化前端图片加载性能？

```
懒加载：用 loading="lazy" 或 IntersectionObserver 延迟非视口图片加载。
WebP：转换图片为 WebP 格式，体积减小 20%-50%，用 <picture> 提供回退。
雪碧图：合并小图标减少 HTTP 请求，现代可替换为 Icon Font/SVG。
CDN：通过分布式服务器加速图片分发。
示例：结合 WebP 和懒加载，图片加载时间可降低 30%-50%。
```

2、懒加载、WebP、雪碧图、CDN 的具体实现？

```
懒加载：<img loading="lazy"> 或 IntersectionObserver 检测视口。
WebP：用 ImageMagick 转换，<picture><source type="image/webp"> 兼容。
雪碧图：用 Sprite Generator 合并，CSS 设置 background-position。
CDN：托管到阿里云 OSS，配置域名加速。
总结：HTTP/2 减弱雪碧图作用，WebP 和 CDN 是现代首选。
```

### 3.3 长列表优化

1、如何优化长列表渲染性能？

```
使用 虚拟滚动，仅渲染视口内列表项，动态加载/卸载 DOM，降低内存和渲染开销。结合节流优化滚动事件。

实现：react-window、vue-virtual-scroll-list 或 IntersectionObserver 手动实现。
示例：渲染万级数据时，虚拟滚动可将 DOM 节点数从数千降至几十，提升性能数倍。
```

2、虚拟滚动的原理和实现？

```
原理：监听滚动事件，计算视口范围，动态更新 DOM 节点，复用现有节点。
实现：用 react-virtualized 或手动通过 IntersectionObserver + 动态 DOM 操作。
优势：减少 DOM 数量，降低 Layout/Paint 开销，适合大数据列表。
```

### 3.4 Bundle 优化

#### 技术对比

|      技术      |             定义             |       优势       |                实现方式                 |
| :------------: | :--------------------------: | :--------------: | :-------------------------------------: |
|  Tree-shaking  |        移除未使用代码        | 减小 Bundle 体积 | ESM + Webpack/Rollup (mode: production) |
| Code Splitting | 拆分代码为多个小块，按需加载 | 减少首屏加载时间 |      import() 或 SplitChunksPlugin      |
|    按需加载    |    仅加载当前页面所需模块    | 避免加载冗余代码 |     babel-plugin-import（如 AntD）      |

#### 高频面试题

1、如何减少前端代码包体积？

```
Tree-shaking：用 ESM 移除死代码，配置 Webpack mode: production。
Code Splitting：通过 import() 或 SplitChunksPlugin 实现动态加载。
按需加载：用 babel-plugin-import 加载 Ant Design 等库的特定模块。
示例：动态导入 + 按需加载可将 Bundle 体积减少 20%-40%。
```

2、Tree-shaking、Code Splitting、按需加载的原理？

```
Tree-shaking：基于 ESM 静态分析，移除未引用代码，需避免副作用代码。
Code Splitting：拆分 Chunk，路由或动态 import() 按需加载。
按需加载：仅导入所需模块（如 AntD Button），减少冗余代码。
总结：结合使用可优化 TTI（交互时间）和首屏加载。
```

### 3.5 指标监控

#### 核心指标对比

| 指标 |       定义       | 理想值  |         改进方法         |
| :--: | :--------------: | :-----: | :----------------------: |
| LCP  | 最大内容绘制时间 | < 2.5s  |  SSR、CDN、优化资源加载  |
| FID  |   首次输入延迟   | < 100ms | 减少主线程阻塞、事件委托 |
| CLS  |   累积布局偏移   |  < 0.1  |    固定图片/广告宽高     |

#### 高频面试题

1、如何监控和优化前端性能？

```
监控：用 Web Vitals（LCP/FID/CLS）通过 web-vitals 包采集，Lighthouse 审计性能/SEO/可访问性。
优化：SSR 加速 LCP，节流/防抖优化 FID，固定尺寸防 CLS，结合 CDN 和代码分割。
示例：用 Lighthouse 检测后优化 LCP，可将加载时间降至 2s 内。
```

2、Web Vitals 和 Lighthouse 的核心指标及改进？

```
1、Web Vitals：
 -LCP：优化服务器响应、CSS/JS 加载、CDN。
 -FID：减少 JS 执行时间，用事件委托/节流。
 -CLS：为图片/广告设固定宽高，避免异步偏移。

2、Lighthouse：评估性能/SEO/可访问性，优化 TTI/TBT，关注 Web Vitals 评分。
总结：结合 Chrome Performance API 和 Lighthouse 报告，针对性优化。
```

### 3.6 内存优化

1、如何排查前端内存泄漏？

```
排查：用Chrome DevTools Memory面板，记录Heap Snapshot，分析对象引用；Performance 面板检查内存增长。
常见原因：未移除事件监听器、定时器、DOM 引用、闭包长期持有变量。
解决：用 removeEventListener 清理监听，clearInterval 清除定时器，React 中用 useEffect 清理函数。
示例：检查未释放的 DOM 引用可定位内存泄漏。
```

2、闭包如何影响内存及管理？

```
影响：闭包保留外部变量引用，可能导致内存未释放。
优化：避免不必要闭包，组件销毁时置空引用（如 variable = null 或 useEffect 清理）。
示例：React useEffect 返回清理函数释放闭包引用，防止泄漏。
```

### 3.7 JS 优化

#### 技术对比

|   技术   |            定义            |       应用场景       |            实现方式             |
| :------: | :------------------------: | :------------------: | :-----------------------------: |
| 事件委托 |    父元素监听子元素事件    | 动态列表、大量子元素 | addEventListener + event.target |
|   节流   |    固定时间间隔执行一次    |     滚动、resize     |         时间戳或定时器          |
|   防抖   | 延迟执行，重复触发重新计时 |  搜索输入、表单验证  |    setTimeout + clearTimeout    |

#### 高频面试题

1、如何优化 JavaScript 性能？

```
事件委托：减少监听器，适合动态 DOM。
节流：限制高频事件（如滚动）执行频率。
防抖：合并多次触发（如搜索输入）为一次。
示例：长列表滚动用事件委托 + 节流，性能提升显著。
```

2、事件委托、节流、防抖的原理及场景？

```
事件委托：利用事件冒泡，父元素监听子元素事件，减少内存占用，适合动态列表。
节流：每隔固定时间（如 100ms）执行一次，适合滚动/resize。
防抖：延迟执行（如 300ms），适合搜索输入/表单验证。
实现：委托用 event.target 判断，节流用时间戳，防抖用 setTimeout。
```

### 3.8 移动端优化

1、如何优化移动端前端性能？

```
Viewport：设置 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 确保正确缩放。
手势优化：用 touchstart/touchmove + passive: true 提升滑动流畅度，移除 300ms 点击延迟（FastClick 或 user-scalable=no）。
多屏适配：用 rem/vw + 媒体查询，结合 Tailwind CSS 实现响应式。
示例：Hammer.js 优化滑动，Tailwind CSS 适配多屏。
```

2、Viewport、手势优化、多屏幕适配的实现？

```
Viewport：<meta name="viewport"> 控制缩放/布局。
手势优化：用 touch 事件 + Hammer.js，passive: true 防阻塞，禁用缩放（user-scalable=no）。
多屏适配：rem/vw 单位，@media 查询，srcset 自适应图片。
总结：结合 Tailwind 和 srcset 实现高效适配。
```
