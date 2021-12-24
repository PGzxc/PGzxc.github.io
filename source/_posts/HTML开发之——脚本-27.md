---
title: HTML开发之——脚本(27)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: ed55b53
date: 2020-08-27 22:14:37
---
## 一 概述

HTML中的脚本是JavaScript，JavaScript使页面具有更强的动态和交互性

<!--more-->

## 二 HTML script元素

* \<script>标签用于定义客户端脚本，比如JavaScript
* script元素即可包含脚本语句，也可通过src属性指向外部脚本文件
* 必须的type属性规定脚本的MIME类型
* JavaScript最常用于图片操作、表单验证以及内容动态更新

下面的脚本会向浏览器输出“Hello World”

```
<script type="text/javascript">
document.write("Hello World!")
</script>
```

## 三 \<noscript>标签

* \<noscript>标签提供无法使用脚本时的替代内容，比方在浏览禁用脚本时，或浏览器不支持客户端脚本时
* noscript元素可包含普通HTML页面的body元素中能够找到的所有元素
* 只有在浏览器不支持脚本或者禁用脚本时，才会显示noscript元素中的内容

```
<script type="text/javascript">
document.write("Hello World!")
</script>
<noscript>Your browser does not support JavaScript!</noscript>
```

## 四 如何应付老式的浏览器

如果浏览器压根没法识别\<script>标签，那么\<script>标签所包含的内容将以文本方式显示在页面上。为了避免这种情况发生，你应该将脚本隐藏在注释标签中。那些老的浏览器(无法识别\<script>标签的浏览器)将忽略这些注释，所以不会讲标签的内容显示到页面上。而那些新的浏览器将读懂这些脚本并执行它们，即使代码被嵌套在注释标签内

### 4.1 实例
#### JavaScript

```
<script type="text/javascript">
<!--
document.write("Hello World!")
//-->
</script>
```

#### VBScript:

```
<script type="text/vbscript">
<!--
document.write("Hello World!")
'-->
</script>
```

## 五 脚本标签

|    标签     |                  描述                  |
| :---------: | :------------------------------------: |
|  \<script>  |             定义客户端脚本             |
| \<noscript> | 为不支持客户端脚本的浏览器定义替换内容 |

