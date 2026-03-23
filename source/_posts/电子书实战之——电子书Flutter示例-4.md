---
title: 电子书实战之——电子书Flutter示例(4)
categories:
  - 技术实践
  - 项目实践
  - Android项目
tags:
  - 电子书实战
abbrlink: 1ff9b2df
date: 2026-03-23 08:17:36
---
## 一 概述

```
本文介绍：
-1个简单、跨平台的 EPUB 阅读器示例应用
-基于 Flutter + InAppWebView 实现
```

<!--more-->

## 二 介绍

### 2.1 核心功能

```
1.加载并解压本地 EPUB 文件
2.自动扫描生成章节列表
3.左右滑动切换章节
4.目录查看 + 点击跳转
5.实时调整阅读样式：字体大小，文字颜色，背景颜色
6.页面切换时样式保持一致
```

### 2.2 技术特点

```
1.Flutter 跨平台(Android / iOS)
2.使用 InAppWebView 渲染 EPUB 的 HTML 内容
3.通过 archive 包解压 EPUB
4.JavaScript 注入实现动态样式修改
5.手势驱动的章节切换
6.响应式布局，适配不同屏幕
```

## 三 快速上手

### 3.1 环境要求

```
Flutter 3.0+
Android SDK 21+ / iOS 11+
```

### 3.2 三步运行

```
# 1. 克隆项目
git clone https://github.com/你的用户名/flutter_epub_demo.git
cd flutter_epub_demo

# 2. 安装依赖
flutter pub get

# 3. 启动
flutter run
```

### 3.3 基本操作

```
1.首页 → 点击「加载 EPUB」
2.选择本地 .epub 文件
3.阅读界面：
 -左右滑动 → 切换章节
 -左上角 → 打开目录
 -右上角 → 打开样式设置面板
```

## 四 项目介绍

### 4.1 项目结构

```
flutter_epub_demo/
├── lib/
│   ├── main.dart
│   └── reader/
│       ├── epub/unzip.dart           # EPUB 解压
│       ├── reader_engine/
│       │   └── style_manager.dart    # 样式管理
│       └── ui/
│           ├── catalog_page.dart     # 目录页
│           ├── reader_page.dart      # 阅读主页面
│           └── setting_page.dart     # 样式设置页
└── pubspec.yaml
```

### 4.2 核心实现要点

1、EPUB 解压

```
final archive = ZipDecoder().decodeBytes(epubBytes);
for (final file in archive) {
  final path = join(targetDir.path, file.name);
  if (file.isFile) {
    File(path).writeAsBytesSync(file.content as List<int>);
  } else {
    Directory(path).createSync(recursive: true);
  }
}
```

2、自动扫描章节(HTML 文件)

```
final htmlFiles = Directory(epubRoot)
    .listSync(recursive: true)
    .whereType<File>()
    .where((f) => f.path.endsWith('.html') || f.path.endsWith('.xhtml') || f.path.endsWith('.htm'))
    .map((f) => f.path)
    .toList()
  ..sort();
```

3、手势翻页

```
GestureDetector(
  onHorizontalDragEnd: (details) {
    if (details.primaryVelocity! > 300)  _prevChapter();
    if (details.primaryVelocity! < -300) _nextChapter();
  },
  child: InAppWebView(...),
)
```

4、样式注入(页面加载完成时执行)

```
controller.evaluateJavascript(source: """
  document.body.style.fontSize    = '${fontSize}px';
  document.body.style.backgroundColor = '$bgColor';
  document.body.style.color       = '$textColor';
""");
```

### 4.3 常见问题

|       问题       |         可能原因         |          快速解决办法           |
| :--------------: | :----------------------: | :-----------------------------: |
|  EPUB 加载失败   | 文件损坏 / 不是标准 EPUB |   换一个规范的 EPUB 文件测试    |
| 样式切换后不生效 |       注入时机不对       |    确认在 onLoadStop 里调用     |
|   目录全是乱序   |       没有正确排序       | 确认 _chapterList.sort() 已执行 |
|  章节跳转后空白  |       路径拼接错误       |   检查 epubRoot 计算是否正确    |

### 4.4 未来计划(待办)

```
夜间模式 / 护眼模式
字体家族选择
阅读进度保存
书签功能
文本搜索
支持更多 EPUB 特性（图片、CSS 动画等）
```

## 五 图示

| ![][1] | ![][2] | ![][3] |
| :----: | :----: | :----: |
| ![][4] | ![][5] |        |






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-demo-epub-flutter-6.png