---
title: React Native开发之——组件TextInput(10)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TextInput
abbrlink: c1b7cd17
date: 2018-03-04 16:26:28
---
## 一 概述
```
前片文章已经简单介绍了组件TextInput的基本用法，本文将继续介绍其他属性的用法，内容如下：  

- maxLength属性
- multiline属性
- placeholder和placeholderTextColor属性
- secureTextEntry属性
- selectTextOnFocus和selectionColor属性
```

<!--more-->

## TextInput相关属性
### 2.1 maxLength

1、概念

```
maxLength，用于限定输入TextInput的字符的个数，类型值为number
如下图，设置maxlength为5，输入第6个字符时，不进入TextInput内  
```

2、图示

| 1-使用 | 2-效果 |
| :----: | :----: |
| ![][1] | ![][2] |

### 2.2 multiline属性

1、概念

```
multiline，用于限定TextInput是否可以输入多行文本，默认值为false
```

2、图示

| 1-使用 | 2-效果 |
| :----: | :----: |
| ![][3] | ![][4] |

### 2.3 placeholder和placeholderTextColor属性

1、概念

```
用于在输入文本输入前将呈现的字符串和字符串颜色
```

2、图示

| 1-使用 | 2-效果 |
| :----: | :----: |
| ![][5] | ![][6] |

### 2.4 secureTextEntry属性

1、概念

```
如果为真，文本输入会模糊输入的文本，这样敏感的文本如密码保持安全。默认值为false。
```

2、图示

| 1-使用 | 2-效果 |
| :----: | :----: |
| ![][7] | ![][8] |

### 2.5 selectTextOnFocus和selectionColor属性

1、概念

```
selectTextOnFocus和selectionColor，用于设置获取焦点时，选中文本，并设置选中文本的颜色
```

2、图示

| 1-使用 | 2-效果  |
| :----: | :-----: |
| ![][9] | ![][10] |

## 参考 
参考： [RN_TextInput][11]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-maxlength-code.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-maxlength.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-multiline-code.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-multiline-look.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-placeholder.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-placeholder.gif
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-securetextentry.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-securetextentry.gif
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-selectonfocus.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-selectTextOnFocus.gif
[11]: https://github.com/PGzxc/RN_TextInput