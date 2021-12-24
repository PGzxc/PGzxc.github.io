---
title: HTML开发之——属性(6)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 25e68abf
date: 2020-08-21 21:43:55
---
## 一 HTML属性

* 属性为HTML元素提供附加信息
* HTML标签可以拥有属性。属性提供了有关HTML元素的更多的信息
* 属性总是以名称/值对的形式出现，比如：name="value"
* 属性总是在HTML元素的开始标签中规定

<!--more-->

## 二 属性实例

HTML链接由\<a>标签定义。链接的地址在href属性中指定

```
<a href="http://www.baidu.com">This is a link</a>
```

### 2.1 属性例子1( 居中排列标题 )

* \<h1>定义标题的开始

* \<h1 align="center">拥有关于对其方式的附加信息

  ```
  <html>
  <body>
  <h1 align="center">This is heading 1</h1>
  <p>上面的标题在页面中进行了居中排列。上面的标题在页面中进行了居中排列。上面的标题在页面中进行了居中排列。</p>
  </body>
  </html>
  ```

### 2.2  属性例子2(背景颜色)

* \<body>定义HTML文档的主题

* \<body bgcolor="yellow">拥有关于背景颜色的附加信息

  ```
  <html>
  <head>
  </head>
  <body bgcolor="yellow">
  <h2>请看: 改变了颜色的背景。</h2>
  </body>
  </html>
  ```

### 2.3 属性例子3(表格)

* \<table>定义HTML表格，\<table border="1">拥有关于表格边框的附加信息

  ```
  <!DOCTYPE html>
  <html>
  <body >
  <table border="1">
   <tr>
   <td>编号</td>
   <td>物品</td>
   <td>价格</td>
   </tr>
  <tr>
   <td>1</td>
   <td>西红柿</td>
   <td>2.99</td>
   </tr>
  </table>
  </body>
  </html>
  ```

## 三 注意事项

### 3.1 HTML提示：使用小写属性

* 属性和属性值对大小写不敏感
* 不过，万维网联盟在其HTML4推荐标准中推荐小写的属性/属性值
* 而新版本(X)HTML要求使用小写属性

### 3.2 始终为属性值加引号

* 属性值应该始终被包括在引号内。双引号是最常用的，不过使用单引号也没有问题
* 在某些个别的情况下，比如属性值本身就含有双引号，那么您必须使用单引号，例如：

  ```
  name='Bill "HelloWorld" Gates'
  ```


### 3.3 HTML属性参考手册

我们的完整的HTML参考手册提供了每个HTML元素可使用的合法属性的完整列表：

下面列出了适用于大多数HTML元素的属性：

| 属性  |        值        |                  描述                  |
| :---: | :--------------: | :------------------------------------: |
| class |    classname     |       规定元素的类名(classname)        |
|  id   |        id        |            规定元素的唯一id            |
| style | style_definition |    规定元素的行内样式(inline style)    |
| title |       text       | 规定元素的额外信息(可在工具提示中显示) |


