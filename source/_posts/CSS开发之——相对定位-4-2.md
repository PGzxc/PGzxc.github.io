---
title: CSS开发之——相对定位(4.2)
categories:
  - 开发
  - C-前端开发
  - CSS
tags:
  - CSS
abbrlink: 79a1cba7
date: 2020-09-25 21:34:17
---
## 一 概述

设置为相对定位的元素框会偏移某个距离。元素仍然保持其未定位前的形状，它原本所占的空间仍保留。

<!--more-->

## 二 CSS相对定位

相对定位是一个非常容易掌握的概念。如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直或水平位置，让这个元素“相对于”它的起点进行移动。

如果将top设置为20px，那么框将在原位置顶部下面20像素的地方。如果left设置为30像素，那么会在元素左边创建30像素的空间，也就是将元素向右移动。

```
#box_relative {
  position: relative;
  left: 30px;
  top: 20px;
}
```

如下图所示：

![][1]
注意，在使用相对定位时，无论是否进行移动，元素仍然占据原来的空间。因此，移动元素会导致它覆盖其他框


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/css-ct_css_positioning_relative_example.png