---
title: HTML开发之——注释(14)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: '65172774'
date: 2020-08-21 21:59:22
---
## 一 HTML 注释标签

你能够通过如下语法向HTML源代码添加注释

```
<!-- 在此处写注释 -->
```

**注释**：在开始标签中有一个惊叹号，但是结束标签中没有
浏览器不会显示注释，但是能够帮助你的HTML文档，你可以利用注释在HTML中放置通知和提醒信息

<!--more-->

## 二 实例

```
<!-- 这是一段注释 -->
<p>这是一个段落。</p>
<!-- 记得在此处添加信息 -->
```

注释对于HTML纠错也大有帮助，因为您可以一次注释一行HTML代码，以搜索错误：

```
<!-- 此刻不显示图片：
<img border="0" src="/i/tulip_ballade.jpg" alt="Tulip">
-->
```

## 三 条件注释

你也许会在HTML中偶尔发现条件注释：

```
<!--[if IE 8]>
    .... some HTML here ....
<![endif]-->
```

条件注释定义只有Internet Explore执行的HTML标签

## 四 软件程序标签

各种HTML软件程序也能够生成HTML注释

例如：\<!--webbot bot-->标签会被包围在由FrontPage和Expression Web创建的HTML注释中。

作为一项规则，这些标签的存在，有助于对创建这些标签的支持