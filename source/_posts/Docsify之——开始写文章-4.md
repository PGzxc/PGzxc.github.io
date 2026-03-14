---
title: Docsify之——开始写文章(4)
categories:
  - 博客与建站
  - 静态博客
  - Docsify
tags:
  - Docsify
abbrlink: 958689ee
date: 2025-08-09 08:19:17
---
## 一 概述

```
本篇开始“写文章”其实就是写 Markdown（.md）文档。
Docsify 会自动渲染这些文档并展示在网站中
```

<!--more-->

## 二 开始写文章

### 2.1 写文章

```
1、创建blog文件夹

2、再blog文件夹写创建markdown文件
my-first-article.md

3、文章内容
# 我的第一篇文章

欢迎来到 Docsify 的世界！

## 🍀 特性

- 📦 无需构建
- ⚡ 实时渲染 Markdown
- 🧩 插件丰富
- 🎨 自定义主题

## 💡 使用技巧

你可以直接写 HTML：

​```html
<div style="color: red;">这是一段红色文字</div>
```

### 2.2 sidebar为文章添加展示

```
1、添加之前
- 文档
  - [介绍](/README.md)
  - [安装指南](/guide/install.md)
  - [配置说明](/guide/config.md)
  - [常用插件](/guide/plugins.md)
  
2、添加blog展示
- 文档
  - [介绍](/README.md)
  - [安装指南](/guide/install.md)
  - [配置说明](/guide/config.md)
  - [常用插件](/guide/plugins.md)

 - 博客
  - [第一篇文章](/blog/my-first-article.md)
```

## 三 显示效果

![][1]

## 四 高级写作技巧

### 4.1 表格

```
| 标题 | 内容 |
|------|------|
| 名字 | Docsify |
| 类型 | 静态文档 |
```

### 4.2 代码高亮

```
// JavaScript 示例
function hello() {
  console.log("Hello Docsify");
}
```

### 4.3 折叠内容

```
<details>
<summary>点击展开</summary>

这是折叠内容！

</details>
```

### 4.4 自定义标签

```
1、说明
你甚至可以写一些 HTML + CSS

2、示例
<div class="warning">
  ⚠️ 注意：这是重要提示！
</div>
<style>
.warning {
  padding: 12px;
  background: #fffbe6;
  border-left: 4px solid #f0ad4e;
}
</style>
```





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docsify-4-website-1.png