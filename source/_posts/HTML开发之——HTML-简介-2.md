---
title: HTML开发之——HTML 简介(2)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 29f8cd98
date: 2020-08-20 22:04:15
---
## 一 什么是HTML？

HTML是用来描述网页的一种语言

* HTML指的是超文本标记语言(Hyper Text Markup Language)
* HTML不是一种编程语言，而是一种标记语言(markup language)
* 标记语言是一套标记标签(markup tag)
* HTML使用标记标签来描述网页

<!--more-->

## 二 HTML标签

HTML 标记标签通常被称为HTML标签(HTML tag)

* HTML标签是由尖括号包围的关键词，比如\<html>
* HTML标签通常是成对出现的，比如\<b>和\</b>
* 标签对中的第一个标签是开始标签，第二个标签是结束标签
* 开始和结束标签页被称为开放标签和闭合标签

## 三 HTML文档=网页

* HTML文档描述网页
* HTML文档包含HTML标签和纯文本
* HTML文档也被称为网页

Web浏览器的作用是读取HTML文档，并以网页的形式显示出它们。浏览器不会显示HTML标签，而是使用标签来解释页面的内容：

```
<html>
<body>
<h1>我的第一个标题</h1>
<p>我的第一个段落。</p>
</body>
</html>
```

### 句子解释

* \<html>与\</html>之间的文本描述网页
* \<body>与\</body>之间的文本是可见的页面内容
* \<h1>与\</h1>之间的文本被显示为标题
* \<p>与\</p>之间的文本被显示位段落

## 四 实例

```
<html>
<body>
<h1>My First Heading</h1>
<p>My first paragraph.</p>
</body>
</html>
```

