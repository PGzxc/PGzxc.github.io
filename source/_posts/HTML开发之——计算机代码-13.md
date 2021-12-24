---
title: HTML开发之——计算机代码(13)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 871d8e66
date: 2020-08-21 21:58:07
---
## 一 计算机代码

```
var person = {
    firstName:"Bill",
    lastName:"Gates",
    age:50,
    eyeColor:"blue"
}
```

<!--more-->

## 二 HTML 计算机代码格式

通常HTML使用可变的字母尺寸，以及可变的字母间距，在显示计算机代码示例时，并不需要如此：

\<kbd>，\<samp>以及\<code>元素全都支持固定的字母尺寸和间距

## 三 HTML键盘格式

HTML\<kbd>元素定义键盘输入

```
<p>To open a file, select:</p>
<p><kbd>File | Open...</kbd></p>
```

## 四 HTML样本格式

HTML\<samp>元素定义计算机输出示例

```
<samp>
demo.example.com login: Apr 12 09:10:17
Linux 2.6.10-grsec+gg3+e+fhs6b+nfs+gr0501+++p3+c4a+gr2b-reslog-v6.189
</samp>
```

## 五 HTML代码格式

HTML\<code>元素定义编程代码示例

```
<code>
var person = { firstName:"Bill", lastName:"Gates", age:50, eyeColor:"blue" }
</code>
```

\<code>元素不保留多余的空格和折行：

```
<p>Coding Example:</p>

<code>
var person = {
    firstName:"Bill",
    lastName:"Gates",
    age:50,
    eyeColor:"blue"
}
</code>
```

如需解决该问题，你必须在\<pre>元素中包围代码

```
<p>Coding Example:</p>
<code>
<pre>
var person = {
    firstName:"Bill",
    lastName:"Gates",
    age:50,
    eyeColor:"blue"
}
</pre>
</code>
```

## 六 HTML变量格式化

HTML\<var>元素定义数学变量

```
<p>Einstein wrote:</p>
<p><var>E = m c<sup>2</sup></var></p>
```

## 七 HTML 计算机代码元素

|  标签   |        描述        |
| :-----: | :----------------: |
| \<code> | 定义计算机代码文本 |
| \<kbd>  |    定义键盘文本    |
| \<samp> | 定义计算机代码示例 |
| \<var>  |      定义变量      |
| \<pre>  |  定义预格式化文本  |

