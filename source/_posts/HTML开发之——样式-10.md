---
title: HTML开发之——样式(10)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 5050ad29
date: 2020-08-21 21:54:59
---
## 一 HTML 的 style 属性

style 属性的作用：

**提供了一种改变所有 HTML 元素的样式的通用方法。**

样式是 HTML 4 引入的，它是一种新的首选的改变 HTML 元素样式的方式。通过 HTML 样式，能够通过使用 style 属性直接将样式添加到 HTML 元素，或者间接地在独立的样式表中（CSS 文件）进行定义

<!--more-->

##  二不赞成使用的标签和属性

在 HTML 4 中，有若干的标签和属性是被废弃的。被废弃（Deprecated）的意思是在未来版本的 HTML 和 XHTML 中将不支持这些标签和属性。

这里传达的信息很明确：请避免使用这些被废弃的标签和属性

### 2.1 应该避免使用下面这些标签和属性

|         **标签**         |        **描述**        |
| :------------------: | :----------------: |
|      \<center>       |   定义居中的内容   |
| \<font> 和 \<basefont> |    定义 HTML 字体    |
|   \<s> 和 \<strike>   |   定义删除线文本   |
|         \<u>         |   定义下划线文本   |
|       **属性**       |      **描述**s      |
|        align         | 定义文本的对齐方式 |
|       bgcolor        |    定义背景颜色    |
|        color         |    定义文本颜色    |

 对于以上这些标签和属性：请使用样式代替！ 

##  三 示例

### 3.1 HTML 样式实例 - 背景颜色

  background-color 属性为元素定义了背景颜色 

```
<html>
<body style="background-color:yellow">
<h2 style="background-color:red">This is a heading</h2>
<p style="background-color:green">This is a paragraph.</p>
</body>
</html>
```

 style 属性淘汰了“旧的” bgcolor 属性。 

### 3.2 HTML 样式实例 - 字体、颜色和尺寸

 font-family、color 以及 font-size 属性分别定义元素中文本的字体系列、颜色和字体尺寸 

```
<html>
<body>
<h1 style="font-family:verdana">A heading</h1>
<p style="font-family:arial;color:red;font-size:20px;">A paragraph.</p>
</body>
</html>
```

 style 属性淘汰了旧的 \<font> 标签 

### 3.3 HTML 样式实例 - 文本对齐

 text-align 属性规定了元素中文本的水平对齐方式 

```
<html>s
<body>
<h1 style="text-align:center">This is a heading</h1>
<p>The heading above is aligned to the center of this page.</p>
</body>
</html>
```

 style 属性淘汰了旧的 "align" 属性 

