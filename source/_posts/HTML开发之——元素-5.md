---
title: HTML开发之——元素(5)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: b6f8caf
date: 2020-08-21 21:42:55
---
## 一 HTML元素

HTML元素指的是开始标签(start tag)到结束标签(end tag)的所有代码

|         开始标签         |      元素内容       | 结束标签 |
| :----------------------: | :-----------------: | :------: |
|           \<p>           | this is a paragraph |  \</p>   |
| \<a href="default.html"> |   this is a link    |   </a>   |
|          \<br/>          |                     |          |

**注释**：开始标签常被称为开放标签(opening tag)，结束标签通常称为闭合标签(closing tag)

<!--more-->

## 二 HTML元素语法

* HTML元素以开始标签起始
* HTML元素以结束标签终止
* 元素的内容是开始标签与 结束标签之间的内容
* 某些HTML元素具有空内容(empty content)
* 空元素在开始标签中进行关闭(以开始标签的结束而结束)
* 大多数HTML元素可拥有属性

## 三 嵌套的HTML元素

大多数HTML元素可以嵌套(可以包含其他HTML元素)

HTML文档由嵌套的HMTL元素构成

### 3.1 HTML文档实例

```
<html>
<body>
<p>This is my first paragraph.</p>
</body>
</html>
```

上面的例子包含三个HTML元素

### 3.2 HTML实例解释

#### 3.2.1 \<p>元素

```
<p>This is my first paragraph.</p>
```

* 这个\<p>元素定义了HTML文档中的一个段落
* 这个元素拥有一个开始标签\<p>，以及一个结束标签\</p>
* 元素的内容是：This is my first paragraph.

#### 3.2.2 \<body>元素

```
<body>
<p>This is my first paragraph.</p>
</body>
```

* \<body>元素定义了HTML文档的主题
* 这个元素拥有一个开始标签\<body>，以及一个结束标签\</body>
* 元素内容是另一个HTML元素(p元素)

#### 3.2.3 \<html>元素

```
<html>
<body>
<p>This is my first paragraph.</p>
</body>
</html>
```

* \<html>元素定义了整个HTML文档
* 这个元素拥有一个开始标签\<html>以及一个结束标签\</html>
* 元素内容是另一个HTML元素(body元素)

#### 3.2.4 不要忘记结束标签

即使您忘记了使用结束标签，大多数浏览器也会正确地显示HTML：

```
<p>This is a paragraph
<p>This is a paragraph
```

上面的例子在大多数浏览器中都没有问题，但不要依赖这种做法。忘记使用结束标签会产生不可预料的结果或错误。 

**注释**：未来的HTML版本不允许省略结束标签

#### 3.2.5 空的HTML元素

* 没有内容的HTML元素被称为空元素。空元素是在开始标签中关闭的
* \<br>就是没有关闭标签的空元素(\<br>标签定义换行)
* 在XHTML、XML以及未来版本的HTML中，所有元素都必须被关闭
* 在开始标签中添加斜杠，比如\<br/>，是关闭空元素的正确方法，HTML、XHTML和XML都接受这种方式
* 即使\<br>在所有浏览器中都是有效的，但使用\<br/>其实是更长远的保障

#### 3.2.6 HTML提示：使用小写标签

* HTML标签对大小写不敏感：\<P>等同于\<p>。许多网站都使用大写的HTML标签
* W3School使用的是小写标签，因为万维网联盟(W3C)在HTML4中推荐使用小写，而在未来(X)HTML版本中强制使用小写