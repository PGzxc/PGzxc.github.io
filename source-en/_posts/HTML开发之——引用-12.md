---
title: HTML开发之——引用(12)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 7777c580
date: 2020-08-21 21:56:39
---
## 一 HTML \<q>用于短的引用

HTML \<q>元素定义为短的引用

浏览器通常会为\<q>元素包围引号

```
<p>WWF 的目标是 <q>构建人与自然和谐相处的世界。</q></p>
```
<!--more-->

## 二 用于长引用的HTML \<blockquote>

HTML \<blockquote>元素定义被引用的节

浏览器通常会对\<blockquote>元素进行缩进处理

```
<blockquote cite="http://www.worldwildlife.org/who/index.html">
五十年来，WWF 一直致力于保护自然界的未来。
WWF 工作于 100 个国家，并得到美国一百二十万会员及全球近五百万会员的支持。
</blockquote>
```

## 三 用于缩略词的HTML \<abbr>

HTML \<abbr>元素定义缩写或首字母缩略语

对缩写进行标记能够为浏览器、翻译系统以及搜索引起提供有用的信息

```
<p><abbr title="World Health Organization">WHO</abbr> 成立于 1948 年。</p>
```

## 四 用于定义HTML \<dfn>

HTML \<dfn>元素定义项目或缩写的定义

\<dfn>的用法，按照HTML5标准中的描述，有点复杂

### 4.1 如果设置了\<dfn>元素的title属性，则定义项目

```
<p><dfn title="World Health Organization">WHO</dfn> 成立于 1948 年。</p>
```

### 4.2 如果\<dfn>元素包含具有标题的\<abbr>元素，则title定义项目

```
<p><dfn><abbr title="World Health Organization">WHO</abbr></dfn> 成立于 1948 年。</p>
```

### 4.3 否则，\<dfn>文本内容既是项目，并且父元素包含定义

```
<p><dfn>WHO</dfn> World Health Organization 成立于 1948 年。</p>
```

 **注释：**如果您希望简而化之，请使用第一条，或使用 <abbr> 代替。 

## 五 用于联系信息的 HTML \<address>

HTML\<address>元素定义文档或文章的联系信息(作者/拥有者)
此元素通常以斜体显示。大多数浏览器会在此元素前后添加折行

```
<address>
Written by Donald Duck.<br> 
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>
```

## 六 用于著作标题的 HTML \<cite>

HTML \<cite>元素定义*著作的标题*。 

 浏览器通常会以斜体显示 \<cite> 元素。 

```
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```

## 七 用于双向重写的 HTML \<bdo>

 HTML \<bdo>元素定义双流向覆盖（bi-directional override） 
\<bdo> 元素用于覆盖当前文本方向： 

```
<bdo dir="rtl">This text will be written from right to left</bdo>
```

## 八 HTML 引文、引用和定义元素

|   **标签**    |            **描述**            |
| :-----------: | :----------------------------: |
|    \<abbr>    |     定义缩写或首字母缩略语     |
|  \<address>   | 定义文档作者或拥有者的联系信息 |
|    \<bdo>     |          定义文本方向          |
| \<blockquote> |     定义从其他来源引用的节     |
|    \<dfn>     |     定义项目或缩略词的定义     |
|     \<q>      |        定义短的行内引用        |
|    \<cite>    |         定义著作的标题         |

