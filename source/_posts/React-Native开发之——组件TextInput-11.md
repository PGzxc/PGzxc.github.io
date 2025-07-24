---
title: React Native开发之——组件TextInput(11)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TextInput
abbrlink: d8acfc56
date: 2018-03-04 17:19:35
---
## 一 概述
```
前两节已经讲了TextInput的大部分属性，本文将继续介绍TextInput的属性，内容如下：  

- editable、value和defaultValue
- onChange和onChangeText
- 获取文本输入 
```

<!--more-->

## 二 TextInpupt属性
### 2.1 editable、value和defaultValue

1、概念

```
- editable:用于说明TextInput是否可编辑
- value：TextInput的值
- defaultValue：TextInput的默认值 
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][1] | ![][2] |

### 2.2 onChange和onChangeText

1、概念

```
- onChange：当TextInput的文本发生变化时回调
- onChangeText：当TextInput的文本发生变化时回调，能够获取TextInput的变化
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][3] | ![][4] |

### 2.3 获取文本输入 

1、概念

```
当TextInput内容变化时，获取TextInput中的内容
```

2、图示

| 1-代码 | 2-图示 |
| :----: | :----: |
| ![][5] | ![][6] |

## 三 参考 
参考： [RN_TextInput][7]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-editable.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-editable-look.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-onchange.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-onchange.gif
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-statechange.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-statechange.gif
[7]: https://github.com/PGzxc/RN_TextInput

