---
title: HTML开发之——文本格式化(11)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: b0f94f2
date: 2020-08-21 21:55:45
---
## 一 概述

HTML可定义很多供格式化输出的元素，比如粗体和斜体字

* 文本格式化
* 预格式文本
* "计算机输出"标签
* 地址
* 缩写和首字母缩写
* 文字方向
* 块引用
* 删除字效果和插入字效果

<!--more-->

## 二 实例

### 2.1 文本格式化

 此例演示如何在一个 HTML 文件中对文本进行格式化 

```
<b>加粗文本</b><br/>
<i>斜体文本</i><br/>
<code>电脑自动输出</code><br/>
这是<sub>下标</sub>和<sup>上标</sup>
```

### 2.2 预格式文本

 此例演示如何使用 pre 标签对空行和空格进行控制 

```
<pre>
此例演示如何使用 pre 标签
对空行和    空格
进行控制
</pre>
```

### 2.3 "计算机输出"标签

 此例演示不同的“计算机输出”标签的显示效果。 

```
<code>计算机输出</code><br/>
<kbd>键盘输入</kbd><br/>
<samp>计算机代码样本</samp><br/>
<var>计算机变量</var>
```

### 2.4 地址

 此例演示如何在 HTML 文件中写地址。 

```
<address>
Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br> 
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>
```

### 2.5  缩写和首字母缩写

 此例演示如何实现缩写或首字母缩写 

```
<abbr title="etcetera">etc.</abbr><br/>
<acronym title="World Wide Web">WWW</acronym>
```

### 2.6 文字方向

 此例演示如何改变文字的方向。 

```
<p><bdo dir="rtl">该段落文字从右到左显示</bdo></p>
```

### 2.7 块引用

 此例演示如何实现长短不一的引用语 

```
<p>我们的目标是：<q>行业第一</q></p>
```

### 2.8 删除字效果和插入字效果

 此例演示如何标记删除文本和插入文本 

```
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```

## 三 标签

### 3.1 文本格式化标签

| **标签**  |                          **描述**                          |
| :-------: | :--------------------------------------------------------: |
|   \<b>    |                        定义粗体文本                        |
|  \<big>   |                         定义大号字                         |
|   \<em>   |                        定义着重文字                        |
|   \<i>    |                         定义斜体字                         |
| \<small>  |                         定义小号字                         |
| \<strong> |                        定义加重语气                        |
|  \<sub>   |                         定义下标字                         |
|  \<sup>   |                         定义上标字                         |
|  \<ins>   |                         定义插入字                         |
|  \<del>   |                         定义删除字                         |
|   \<s>    |    <font color="blue">不赞成使用。</font>使用\<del>代替    |
| \<strike> |    <font color="blue">不赞成使用。</font>使用\<del>代替    |
|   \<u>    | <font color="blue">不赞成使用。</font>使用\样式(style)代替 |

### 3.2 “计算机输出”标签

|   **标签**   |                       **描述**                       |
| :----------: | :--------------------------------------------------: |
|   \<code>    |                    定义计算机代码                    |
|    \<kdb>    |                      定义键盘码                      |
|   \<samp>    |                  定义计算机代码样本                  |
|    \<tt>     |                    定义打字机代码                    |
|    \<var>    |                       定义变量                       |
|    \<pre>    |                    定义预格式文本                    |
|  \<listing>  | <font color="blue">不赞成使用。</font>使用\<pre>代替 |
| \<plaintext> | <font color="blue">不赞成使用。</font>使用\<pre>代替 |
|    \<xmp>    | <font color="blue">不赞成使用。</font>使用\<pre>代替 |

### 3.3 引用、引用和术语定义

|     标签      |     **描述**     |
| :-----------: | :--------------: |
|    \<abbr>    |     定义缩写     |
|  \<acronym>   |  定义首字母缩写  |
|  \<address>   |   定义文字方向   |
|    \<bdo>     |   定义文字方向   |
| \<blockquote> |   定义长的引用   |
|     \<q>      |  定义短的引用语  |
|    \<cite>    |  定义引用、印证  |
|    \<dfn>     | 定义一个定义项目 |

