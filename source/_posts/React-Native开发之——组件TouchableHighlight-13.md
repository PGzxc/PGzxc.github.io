---
title: React Native开发之——组件TouchableHighlight(13)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TouchableHighlight
abbrlink: c9325146
date: 2018-03-06 11:54:29
---

## 一 概述
```
TouchableHighlight，包装要显示的视图，点击时可用于高亮显示，
React Native 0.36版本以前用于替代Button，类似于Android中的Button，React Native 0.37开始出现Button按钮。  

本文主要讲述TouchableHighlight的使用及其几个属性的用法：  

- underlayColor
- activeOpacity
- onHideUnderlay
- onShowUnderlay
```

<!--more-->


## 二 TouchableHighlight属性介绍 

### 2.1 underlayColor

1、概念

```
点击时，显示的颜色  
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][1] | ![][2] |

### 2.2 activeOpacity

1、概念

```
用于显示透明度，0-完全透明，1-完全不透明
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][3] | ![][4] |

### 2.3 onHideUnderlay

1、概念

```
当图层颜色隐藏时，调用此方法 
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][5] | ![][6] |

### 2.4 onShowUnderlay
```
用法同上onHideUnderlay
```

## 三 参考 
参考：[RN_TouchableHighlight][7]    




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-underlinecolor-code.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-underlinecolor.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-activeopacity-code.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-activeopacity-code.gif
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-onhideunderlay-code.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-touchable-onhideunderlay-code.gif
[7]: https://github.com/PGzxc/RN_TouchableHighlight