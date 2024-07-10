---
title: 微信小程序开发之——margin-left=auto 为什么可以使元素靠右
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 80a6a88f
date: 2021-11-11 09:35:44
---
## 一 效果对比

| 不设置margin-left | 设置margin-left |
| :---------------: | :-------------: |
|      ![][1]       |     ![][2]      |

<!--more-->

## 二 原因分析

```
'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' +'border-right-width' + 'margin-right' = width of containing block
```

* 左外边距+左边框宽度+左内边距+容器宽度+右内边距+右边框宽度+右外边距=容器宽度
* 不设置默认为0，单独设置了margin-left，顾左外边距等于剩余容器的宽度

## 三 参考

* [Segmentfault-margin-left: auto;为什么可以使的元素靠右](https://segmentfault.com/q/1010000008431088)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-margin-left-none.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-margin-left-auto.png