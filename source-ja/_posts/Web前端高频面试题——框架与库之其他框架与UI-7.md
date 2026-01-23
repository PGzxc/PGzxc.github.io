---
title: Web前端高频面试题——框架与库之其他框架与UI(7)
categories:
  - 面试相关
  - Web前端面试题
tags:
  - Web前端面试题
abbrlink: 6dbfbdfe
date: 2025-10-25 08:39:25
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
1.AngularJS
2.UI 框架：Element UI/Plus、Vant、Bootstrap、Tailwind CSS、HeadlessUI、RadixUI、ShadcnUI
3.数据可视化：ECharts、D3.js、Three.js
4.GIS 技术：OpenLayers、GeoServer、ArcGIS、QGIS
```

### 三 面试题解答(仅供参考)

### 3.1 AngularJS

1、AngularJS 是什么？其主要特点和优势？

```
1、概念：AngularJS 是 Google 维护的开源前端框架，用于构建动态单页面应用(SPA)。
2、核心特点：双向数据绑定、依赖注入(DI)、MVC/MVVM 架构、指令系统、模块化(angular.module())。
3、优势：开发效率高、测试友好、社区活跃；
4、缺点：大数据场景性能较差，不如 React/Vue。
```

2、关键概念与角色(MVVM 视角)

```
1、$scope：
Model 与 View 的桥梁，存储数据和方法。$rootScope 是所有 $scope 的根，避免全局污染。

2、Controller：
ViewModel，处理业务逻辑和数据绑定。

3、Directive：
 View 层扩展 HTML(如 ng-if、ng-repeat)，实现组件化。
 创建自定义指令：.directive() 配置 restrict、template、scope 和 link 函数。
 
4、Service/Factory：
 Model 层，提供可复用服务(如 $http)。
 Service 用 new 实例化，Factory 返回对象/函数；
 两者均为单例，支持 DI。
```

3、双向数据绑定原理

```
1、通过脏检查(Dirty Checking)：
$scope 上设置 $watch 监听器，事件触发 $digest 循环遍历检查变化，更新 DOM。
$apply() 从外部进入 Angular 体系。

2、缺点：性能开销大；
3、优化：用单向绑定 (::)、减少 $watch。
4、示例：ng-model 绑定输入到 $scope，实现实时同步。
```

4、常见指令区别(ng-if vs ng-show/ng-hide)

```
ng-if 条件 true 时创建 DOM(节省资源，但重建慢)；
ng-show/ng-hide 始终存在 DOM，仅切换 display(切换快，但内存高)。
ng-if 适合条件内容，ng-show 适合频繁切换。
```

5、如何创建自定义过滤器？

```
使用 .filter() 定义工厂函数，返回转换逻辑(如 reverse 过滤器)。
在模板中：{{ text | reverse }}。
用于视图数据格式化，不改原数据。
```

6、AngularJS 与 Angular 的区别？

|  对比项  | AngularJS (1.x) |       Angular (2+)        |
| :------: | :-------------: | :-----------------------: |
|   语言   |   JavaScript    |        TypeScript         |
|   架构   |    MVC/MVVM     |      基于组件的架构       |
| 数据绑定 | $scope 双向绑定 | 单向 + 双向绑定(模板语法) |
|   性能   |  较低(脏检查)   |  高(变更检测、虚拟 DOM)   |
|  模块化  |   模块系统弱    |     NgModule 强模块化     |
|   路由   |     ngRoute     |      @angular/router      |

### 3.2 UI 框架
#### 3.2.1 UI 框架—Element UI/Plus(Vue 生态)

1、Element UI 和 Element Plus 的区别？

```
Element UI 基于 Vue 2.x，适用于桌面端；
Element Plus 基于 Vue 3.x，支持 Composition API、TypeScript，更高性能和树摇优化。
两者组件类似，但 Plus 提供更好国际化支持。
```

2、如何在项目中使用 Element UI/Plus？

```
npm install element-plus；
导入组件（如 import { ElButton } from 'element-plus'）；
在 main.js 全局注册；
按需引入减少体积。
表单验证：用 rules 和 prop 绑定。
```

3、如何修改 el-input 样式？

```
使用 /deep/ 或 >>> 穿透（如 .el-input__inner { height: 40px; }），或在组件 scoped 样式中添加。
避免直接改全局 CSS。
```

4、Element UI 如何做表单验证？

```
通过 rules 对象定义规则(如 required: true)，结合 ref 表单组件调用 validate() 方法。
在循环中：为每个 input 动态生成 name 和 prop。
```
#### 3.2.2 UI 框架—Vant((Vue/React 移动端)

1、特点？

```
轻量（组件 ~1KB）、主题定制、国际化。
优化：按需加载、Tree Shaking；
适配 rem 单位。
缺点：复杂页面 DOM 多。
```

2、按需引入

```
babel-plugin-import 配置；
import Button from 'vant/lib/button'。
```

#### 3.2.3 UI 框架—Bootstrap(HTML/CSS/JS)

1、Bootstrap 的网格系统如何工作？

```
基于 12 列响应式布局：row 容器 + col-- 类（如 col-md-6 为中等屏占 6 列）。
移动优先：小屏先定义，逐步扩展。
示例：内容。
```

2、为什么使用 Bootstrap？

```
移动优先、响应式设计、浏览器兼容好、易上手。
需添加 viewport meta 标签确保移动友好。
```

#### 3.2.4 UI 框架—Tailwind CSS(原子化 CSS)

1、Tailwind CSS 是什么？如何安装？

```
实用优先 CSS 框架，使用类名（如 bg-blue-500）快速构建 UI。

安装：
npm i -D tailwindcss；npx tailwindcss init 配置 content；@tailwind base; 等指令导入 CSS。

优势：无命名冲突、易定制。
```

2、Tailwind 的优点和缺点？

```
优点：响应式强、主题可扩展（tailwind.config.js）。
缺点：HTML 类名多，学习曲线陡。
```

#### 3.2.5 UI 框架—HeadlessUI、RadixUI、ShadcnUI(无样式组件)

1、Headless UI 是什么？如何使用？

```
无样式、完全可访问的 React UI 组件库，与 Tailwind 集成。

示例：
-import { Menu } from '@headlessui/react'；
-用 render props 控制状态（如 open）。

优势：自定义 UI，焦点管理好。
```

2、Radix UI 和 Shadcn UI 的区别？

```
Radix UI：低级无头组件库，专注可访问性和 API（如 Popover.Root）。
Shadcn UI：基于 Radix + Tailwind 的组件集合，非库而是代码分发（CLI 添加组件）。
两者强调开源、可组合。
```

#### 3.2.6 常见框架与面试题对比

|           框架            |  生态定位   |                       特点                        |
| :-----------------------: | :---------: | :-----------------------------------------------: |
| Element UI / Element Plus |  Vue 生态   |      完整的企业级组件库，常用于后台管理系统       |
|           Vant            | Vue / React |        轻量级移动端组件库，适合 H5、小程序        |
|         Bootstrap         | HTML/CSS/JS |             老牌 UI 框架，响应式布局              |
|       Tailwind CSS        | 原子化 CSS  |           高度可定制，无需自定义样式类            |
|        HeadlessUI         | Vue / React |       无样式组件，结合 Tailwind 构建灵活 UI       |
|   Radix UI / Shadcn UI    | React 生态  | 无样式 + 可访问性(A11y)最佳实践，适合现代设计体系 |

### 3.3 数据可视化

#### 3.3.1 数据可视化—ECharts

1、如何初始化图表？

```
echarts.init(dom).setOption({ title, xAxis, yAxis, series: [{ type: 'bar', data }] }
支持动态更新 data。
```

2、原理

```
基于 Canvas/SVG，底层 ZRender
```

3、如何优化性能？

```
lazyUpdate、减少 setOption、数据下采样、dataZoom 分段加载、dispose() 销毁实例、resize() 适配。
避免定时器内存泄漏。
```

#### 3.3.2 数据可视化—D3.js

1、数据绑定如何实现？

```
d3.selectAll().data().enter().append()；
处理 enter/update/exit。
示例：attr('x', (d, i) => i * 30)。
```

2、比例尺是什么？

```
映射数据域(domain)到像素范围(range)，如 d3.scaleLinear().domain([0, 100]).range([0, 500]);。
类型：线性、对数、序数。
```

#### 3.3.3 数据可视化—Three.js

1、基本组件有哪些？

```
1、基本组件：
场景（Scene）、相机（PerspectiveCamera）、渲染器（WebGLRenderer）。

2、示例：
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
renderer.render(scene, camera);。
```

2、如何优化渲染性能？

```
减少绘制调用（合并几何体）、视锥体裁剪、LOD（细节层次）。
用 Web Workers 后台计算。
```

#### 3.3.4 常见框架

|   框架   |      应用场景       |           优点           |
| :------: | :-----------------: | :----------------------: |
| ECharts  |   统计图、BI 系统   |  配置化高、支持地图/3D   |
|  D3.js   |   自定义复杂交互    |       灵活但门槛高       |
| Three.js | 3D 建模、WebGL 场景 | 实现 3D 动画与可视化效果 |

### 3.4 GIS 技术

#### 3.4.1 GIS 技术—OpenLayers(Web 地图库)

1、如何加载瓦片地图？

```
import Map from 'ol/Map'; 
import View from 'ol/View'; 
import TileLayer from 'ol/layer/Tile'; 
import OSM from 'ol/source/OSM'; 

new Map({ layers: [new TileLayer({ source: new OSM() })], 
view: new View({ center: [0, 0], zoom: 2 }) });。

支持 WMS/WMTS。
```

2、自定义控件如何实现？

```
通过 CSS 样式和属性调整位置，如 .ol-zoom { top: 10px; left: 10px; }。
自定义坐标系用 Projection 类。
```

#### 3.4.2 GIS 技术—GeoServer(地图服务)

1、如何发布地图服务？

```
登录 Web 界面，创建 Workspace/Store/Layer；
支持 Shapefile/PostGIS。
发布 WMS/WFS 服务。
解决中文乱码：设置 UTF-8 编码。
```

2、特点和数据支持？

```
开源 J2EE 实现 OGC 标准（WMS/WFS）。
支持 PostGIS、Shapefile、Oracle Spatial。
优势：易共享地理数据、安全控制。
```

#### 3.4.3 GIS 技术—ArcGIS/QGIS

1、功能和与 QGIS 区别？

```
ArcGIS：商业 GIS 软件，全功能（地图制作、空间分析）。
QGIS：开源免费，支持插件扩展。ArcGIS 更强大但收费，QGIS 社区活跃、易上手。
```

2、叠加分析是什么？

```
将多图层叠加分析空间关系（如缓冲区交集）。
在 ArcGIS 用 Spatial Analyst 工具；在 QGIS 用 Processing Toolbox。
```

#### 3.4.4 常见框架

|    技术    |     类型      |              用途              |
| :--------: | :-----------: | :----------------------------: |
| OpenLayers |  Web 地图库   | 开源、轻量，支持矢量/瓦片/交互 |
| GeoServer  | 地图服务发布  | 基于 Java，可发布 WMS/WFS 服务 |
|   ArcGIS   | 商业 GIS 平台 |    完整生态，API 强大但闭源    |
|    QGIS    |    桌面端     |    开源 GIS 编辑与分析工具     |

