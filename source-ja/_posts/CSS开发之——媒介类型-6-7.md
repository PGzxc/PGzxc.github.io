---
title: CSS开发之——媒介类型(6.7)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 241f4033
date: 2020-09-27 22:09:46
---
## 一 概述

媒介类型(Media Types)允许你定义如何以何种媒介来提交文档。文档可以被显示在显示器、纸媒介或者听觉浏览器等

<!--more-->

## 二 媒介类型

某些 CSS 属性仅仅被设计为针对某些媒介。比方说 "voice-family" 属性被设计为针对听觉用户终端。其他的属性可被用于不同的媒介。例如，"font-size" 属性可被用于显示器以及印刷媒介，但是也许会带有不同的值。显示器上面的显示的文档通常会需要比纸媒介文档更大的字号，同时，在显示器上，sans-serif 字体更易阅读，而在纸媒介上，serif 字体更易阅读。

### @media规则

@media 规则使你有能力在相同的样式表中，使用不同的样式规则来针对不同的媒介。

下面这个例子中的样式告知浏览器在显示器上显示 14 像素的 Verdana 字体。但是假如页面需要被打印，将使用 10 个像素的 Times 字体。注意：font-weight 被设置为粗体，不论显示器还是纸媒介：

```
<html>
<head>

<style>
@media screen
{
p.test {font-family:verdana,sans-serif; font-size:14px}
}

@media print
{
p.test {font-family:times,serif; font-size:10px}
}

@media screen,print
{
p.test {font-weight:bold}
}
</style>

</head>

<body>....</body>

</html>
```

## 三 不同的媒介类型

**注释：**媒介类型名称对大小写不敏感。

| **媒介类型** |                        **描述**                        |
| :----------: | :----------------------------------------------------: |
|     all      |                  用于所有的媒介设备。                  |
|    aural     |                 用于语音和音频合成器。                 |
|   braille    |              用于盲人用点字法触觉回馈设备              |
|   embossed   |             用于分页的盲人用点字法打印机。             |
|   handheld   |                  用于小的手持的设备。                  |
|    print     |                       用于打印机                       |
|  projection  |               用于方案展示，比如幻灯片。               |
|    screen    |                    用于电脑显示器。                    |
|     tty      | 用于使用固定密度字母栅格的媒介，比如电传打字机和终端。 |
|      tv      |                 用于电视机类型的设备。                 |

