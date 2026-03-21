---
title: 电子书实战之——完整电子书App架构图(2)
categories:
  - 技术实践
  - 项目实践
  - Android项目
tags:
  - 电子书实战
abbrlink: 8a7a4025
date: 2026-03-21 08:16:41
---
## 一 概述

```
-适用于 Android / iOS / Flutter / RN / HarmonyOS
-同时支持 TXT / EPUB / PDF / HTML
-支持 在线 + 离线 + 多阅读模式
```

<!--more-->

## 二 整体架构总览(分层)

```
┌─────────────────────────────────────┐
│            Presentation 层            │
│  ReaderPage / Catalog / Settings UI  │
└───────────────▲─────────────────────┘
                │
┌───────────────┴─────────────────────┐
│            Reader Engine 层           │
│  排版 | 分页 | 渲染 | 翻页 | 跳转     │
└───────────────▲─────────────────────┘
                │
┌───────────────┴─────────────────────┐
│           Content Parser 层           │
│ TXT | EPUB | PDF | HTML 解析          │
└───────────────▲─────────────────────┘
                │
┌───────────────┴─────────────────────┐
│         Content Source / Cache        │
│ 在线API | 本地文件 | 缓存管理          │
└───────────────▲─────────────────────┘
                │
┌───────────────┴─────────────────────┐
│           Data / Storage 层           │
│ DB | File | Progress | Style          │
└─────────────────────────────────────┘
```

## 三 模块级详细架构图

### 3.1 UI / Presentation 层

1、Tree层

```
UI Layer
│
├── ReaderPage
│   ├── ContentView
│   ├── PageController
│   └── GestureHandler
│
├── CatalogPage
│   ├── ChapterList
│   └── Search
│
├── SettingsPage
│   ├── FontSetting
│   ├── ThemeSetting
│   └── ReadModeSetting
│
└── DownloadManagerPage
```

2、说明

```
1、职责
-页面展示
-手势响应（点击/翻页/滑动）
-不处理业务逻辑 

2、UI 只关心：显示什么，不关心怎么来
```

### 3.2 Reader Engine(阅读引擎层)

1、说明

```
1、整个电子书 App 的核心

2、核心职责
-分页 / 排版
-样式控制
-翻页逻辑
-目录 / 进度跳转

3、阅读体验好坏，80% 决定于这一层
```

2、Tree层

```
ReaderEngine
│
├── LayoutEngine
│   ├── TextLayout
│   ├── ImageLayout
│   └── Pagination
│
├── RenderEngine
│   ├── TextRenderer
│   ├── WebRenderer
│   └── PdfRenderer
│
├── PageController
│   ├── NextPage
│   ├── PrevPage
│   └── JumpTo
│
└── StyleManager
    ├── FontSize
    ├── LineHeight
    ├── Theme
    └── NightMode
```

### 3.3 Content Parser(内容解析层)

1、Tree层

```
ContentParser
│
├── TxtParser
│   ├── ChapterSplit
│   └── TextNormalize
│
├── EpubParser
│   ├── Unzip
│   ├── Manifest
│   ├── TOCParser
│   └── HtmlExtractor
│
├── PdfParser
│   └── PageExtractor
│
└── HtmlParser
    └── DOMCleaner
```

2、说明

```
1、输入 / 输出
输入：原始文件 / 网络内容
输出：标准章节结构 + 内容片段

2、统一数据模型
data class Chapter(
  val id: String
  val title: String
  val content: String
  val resourcePath: String?
)
```

### 3.4 Content Source & Cache(在线 / 离线)

1、Tree层

```
ContentRepository
│
├── RemoteDataSource
│   ├── BookApi
│   └── ChapterApi
│
├── LocalDataSource
│   ├── FileManager
│   ├── CacheManager
│   └── ImageCache
│
└── SyncManager
    ├── Download
    └── UpdateCheck
```

2、典型流程

```
请求章节
 ↓
优先本地缓存
 ↓
无缓存 → 请求网络
 ↓
保存本地
 ↓
返回渲染
```

3、说明

```
离线阅读的关键就在这里
```

### 3.5 Data / Storage 层

1、Tree层

```
Storage
│
├── BookDB
│   ├── BookInfo
│   ├── ChapterInfo
│   └── DownloadState
│
├── ProgressStore
│   ├── LastChapter
│   ├── PageIndex
│   └── Offset
│
└── SettingStore
    ├── ReaderStyle
    ├── ReadMode
    └── Theme
```

2、示例结构

```
{
  "bookId": "123",
  "chapterId": "c12",
  "page": 8,
  "offset": 4021,
  "fontSize": 18,
  "theme": "night"
}
```

## 四 关键数据流

### 4.1 阅读流程(主线)

```
打开书籍
 ↓
ContentRepository.loadBook()
 ↓
Parser 解析章节
 ↓
ReaderEngine 排版分页
 ↓
RenderEngine 渲染
 ↓
UI 展示
```

### 4.2 目录跳转流程

```
点击目录
 ↓
ChapterId / Offset
 ↓
PageController.jumpTo()
 ↓
LayoutEngine 重新分页
 ↓
RenderEngine 刷新
```

### 4.3 样式调整流程

```
用户修改字体/背景
 ↓
StyleManager 更新
 ↓
LayoutEngine 重算分页
 ↓
RenderEngine 重绘
```

说明：样式变化 = 必然重新分页

## 五 扩展能力设计

### 5.1 插件化 Parser

```
interface BookParser {
  fun parse(book: File): List<Chapter>
}

说明：新格式（mobi / azw3）可直接接入
```

### 5.2 AI 能力可插入点

|     位置     |   AI 用途   |
| :----------: | :---------: |
|    Parser    |  自动分章   |
| ReaderEngine | 摘要 / 高亮 |
|   Content    |  智能推荐   |
|    Search    |  语义搜索   |

## 六 平台映射

|   层    |     Android      |    Flutter    |  Harmony   |
| :-----: | :--------------: | :-----------: | :--------: |
|   UI    |  Compose / View  |    Widget     |   ArkUI    |
| Render  | Canvas / WebView | CustomPainter | Text / Web |
| Parser  |      Kotlin      |     Dart      |     TS     |
| Storage |       Room       |    SQLite     |    RDB     |

## 七 一句话总结

```
电子书 App 采用分层架构：

UI 层负责交互，
Reader Engine 负责排版和渲染，
Parser 负责格式解析，
Repository 统一在线与离线数据源，
底层通过 Storage 保存进度与样式，
整体解耦、可扩展、支持多格式与多端。
```

