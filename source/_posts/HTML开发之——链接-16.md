---
title: HTML开发之——链接(16)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: cd93d80
date: 2020-08-26 22:13:00
---
## 一 概述

* HTML使用超级链接与网络上的另一个文档相连
* 几乎可以在所有的网页中找到链接。点击链接可以从一张页面跳转到另一个页面

<!--more-->

## 二 链接相关属性

### 2.1 HTML超级链接(链接)

#### 2.1.1 概念

* 超级链接可以是一个字，一个词，或者一组词，也可以是一幅图像，你可以点击这些内容来跳转到新的文档或当前文档中的某个部分
* 当你把鼠标指针移动到网页中的某个链接上时，箭头会变为一只小手
* 我们通过使用\<a>标签在HTML中创建链接

#### 2.1.2 使用\<a>标签的方式

1. 通过使用href属性—创建指向另一个文档的链接
2. 通过name属性—创建文档内的书签

### 2.2 HTML链接语法

#### 2.2.1 链接语法

链接的HTML代码很简单。它类似于这样：

```
<a href="url">Link text</a>
```

* href属性规定链接的目标
* 开始标签和结束标签之间的文字被作为超级链接来显示

#### 2.2.2 实例

```
<a href="http://www.w3school.com.cn/">Visit W3School</a>
```

* 上面这行代码显示为：[Visit W3School][11]
* 点击这个超级链接会把用户带到W3School的首页
* <font color="orange">提示：</font>"链接文本"不必一定是文本。图片或其他HTML元素都可以成为链接

### 2.3 HTML链接—target属性

使用Target属性，你可以定义被链接的文档在何处显示，下面这行会在新窗口打开文档：

```
<a href="http://www.w3school.com.cn/" target="_blank">Visit W3School!</a>
```

### 2.4 HTML链接—name属性

#### 2.4.1 说明

* name属性规定锚(anchor)的名称
* 你可以使用name属性创建HTML页面中的书签
* 书签不会以任何特殊方式显示，它对读者是不可见的
* 当使用命名锚(named anchors)时，我们可以创建直接跳至该命名锚(比如页面中某个小节)的链接，这样使用者就无需不停地滚动页面来寻找他们需要的信息了

#### 2.4.2 语法

```
<a name="label">锚(显示在页面上的文本)</a>
```

<font color="orange">提示：</font>锚的名称可以是任何你喜欢的名字

<font color="orange">提示：</font>您可以使用id属性来替代name属性，命名锚同样有效

#### 2.4.3 实例

首先，我们在HTML文档中对锚进行命名(创建一个书签)：

```
<a name="tips">基本的注意事项-有用的提示</a>
```

然后，我们在同一个文档中创建指向该锚的链接：

```
<a href="#tips">有用的提示</a>
```

您也可以在其他页面中创建指向该锚的链接：

```
<a href="http://www.w3school.com.cn/html/html_links.asp#tips">有用的提示</a>
```

在上面的代码中，我们将`#`符号和锚名称添加到URL的末端，就可以直接链接到tips这个命名锚了

#### 2.4.4 基本的注意事项——有用的提示

**注释**：请始终将正斜杠添加到子文件夹。假如这样书写链接：href="http://www.w3school.com.cn/html"，就会向服务器产生两次HTTP请求。这是因为服务器会添加正斜杠到这个地址，然后创建一个新的请求，就像这样：href="http://www.w3school.com.cn/html"

**<font color="orange">提示：</font>**命名锚经常用于在大型文档开始位置上创建目录。可以为每个章节赋予一个命名锚，然后把链接到这些锚的链接放到文档的上部。如果您经常访问百度百科，您会发现其中几乎每个词条都采用这样的导航方式

**<font color="orange">提示：</font>**假如浏览器找不到已定义的命名锚，那么就会定位到文档的顶端。不会有错误发生

## 三 实例

### 3.1 在新的浏览器窗口打开链接

本例演示如何在新窗口打开一个页面，这样的话访问者就无需离开你的站点了

```
<html>
<body>
<a href="http://www.w3school.com.cn/" target="_blank">Visit W3School!</a>
<p>如果把链接的 target 属性设置为 "_blank"，该链接会在新窗口中打开。</p>
</body>
</html>
```

### 3.2 链接到同一个页面的不同位置

本例演示如何使用链接跳转至文档的另一个部分

```
<html>

<body>

<p>
<a href="#C4">查看 Chapter 4。</a>
</p>

<h2>Chapter 1</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 2</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 3</h2>
<p>This chapter explains ba bla bla</p>

<h2><a name="C4">Chapter 4</a></h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 5</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 6</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 7</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 8</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 9</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 10</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 11</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 12</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 13</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 14</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 15</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 16</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 17</h2>
<p>This chapter explains ba bla bla</p>

</body>
</html>
```

### 3.3 跳出框架

本例演示如何跳出框架，假如你的页面被固定在框架之内

```
<html>
<body>
<p>被锁在框架中了吗？</p> 
<a href="/index.html"
target="_top">请点击这里！</a> 
</body>
</html>
```

### 3.4 创建电子邮件链接

本例演示如何链接到一个邮件.(本例在安装邮件客户端程序后才能工作)

```
<html>
<body>
<p>
这是邮件链接：
<a href="mailto:someone@microsoft.com?subject=Hello%20again">发送邮件</a>
</p>
<p>
<b>注意：</b>应该使用 %20 来替换单词之间的空格，这样浏览器就可以正确地显示文本了。
</p>
</body>
</html>
```

## 四 HTML链接标签

| 标签 |  描述  |
| :--: | :----: |
| \<a> | 定义锚 |



[11]:http://www.w3school.com.cn/