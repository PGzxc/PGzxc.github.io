---
title: HTML开发之——表格(18)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 97dd3a7d
date: 2020-08-26 22:23:02
---
## 一 概述

使用HTML可以创建表格，本文介绍与表格相关的内容：

* 表格
* 表格和边框属性
* 表格的表头
* 表格中的空单元格

<!--more-->

## 二 语法

###  2.1  表格

表格由\<table>标签来定义。每个表格均有若干行(由\<tr>标签定义)，每行被分割为若干单元格(由\<td>标签定义)。字母td指表格数据(table data)，即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等

```
<table border="1">
<tr>
<td>row 1,cell 1</td>
<td>row 1,cell 2</td>
</tr>
<tr>
<td>row 2,cell 1</td>
<td>row 2,cell 2</td>
</tr>
</table>
```

在浏览器显示如下：

| row 1, cell 1 | row 1, cell 2 |
| ------------- | ------------- |
| row 2, cell 1 | row 2, cell 2 |

###  2.2 表格和边框属性

如果不定义边框属性，表格将不显示边框。有时这很有用，但是大多数时候，我们希望显示边框

使用边框属性来显示一个带有边框的表格：

```
<table border="1">
<tr>
<td>Row 1, cell 1</td>
<td>Row 1, cell 2</td>
</tr>
</table>
```

### 2.3  表格的表头

表格的表头使用\<th>标签进行定义。

大多数浏览器会把表头显示为粗体居中的文本：

```
<table border="1">
<tr>
<th>Heading</th>
<th>Another Heading</th>
</tr>
<tr>
<td>row 1, cell 1</td>
<td>row 1, cell 2</td>
</tr>
<tr>
<td>row 2, cell 1</td>
<td>row 2, cell 2</td>
</tr>
</table>
```

在浏览器显示如下：

| Heading       | Another Heading |
| ------------- | --------------- |
| row 1, cell 1 | row 1, cell 2   |
| row 2, cell 1 | row 2, cell 2   |

### 2.4 表格中的空单元格

在一些浏览器中，没有内容的表格单元显示得不太好。如果某个单元格是空的(没有内容)，浏览器可能无法显示出这个单元格的边框

```
<table border="1">
<tr>
<td>row 1, cell 1</td>
<td>row 1, cell 2</td>
</tr>
<tr>
<td></td>
<td>row 2, cell 2</td>
</tr>
</table>
```

浏览器可能会这样显示：
![][1]

<font color="red">注意：</font>这个空的单元格的边框没有被显示出来。为了避免这种情况，在空的单元格中添加一个空格占位符，就可以将边框显示出来

```
<table border="1">
<tr>
<td>row 1, cell 1</td>
<td>row 1, cell 2</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>row 2, cell 2</td>
</tr>
</table>
```

在浏览器中显示如下：

在浏览器中显示如下：

| row 1, cell 1 | row 1, cell 2 |
| ------------- | ------------- |
|               | row 2, cell 2 |

## 三 表格标签

|    表格     |         描述         |
| :---------: | :------------------: |
|  \<table>   |       定义表格       |
| \<caption>  |     定义表格标题     |
|    \<th>    |    定义表格的表头    |
|    \<tr>    |     定义表格的行     |
|    \<td>    |    定义表格的单元    |
|  \<thead>   |    定义表格的页眉    |
|  \<tfoot>   |    定义表格的页脚    |
|   \<col>    | 定义用于表格列的属性 |
| \<colgroup> |    定义表格列的组    |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/table_td_empty.gif