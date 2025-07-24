---
title: React Native开发之——组件TextInput(9)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TextInput
abbrlink: f59b5413
date: 2018-03-04 12:18:25
---
## 一 概述
```
React Native中用于输入文本的组件是TextInput，类似于Android中的EditText，TextInput也是继承自 View,
所以 View 的属性 TextInput 也能使用，一些样式类的属性可以参照 View 的相关属性。   

本文主要讲述：  

- autoCapitalize属性
- autoCorrect属性
- autoFocus属性
- keyboardType属性（设置软键盘类型）
- returnKeyType属性（设置返回键类型）
```

<!--more-->  
## 二 TextInput属性
### 2.1 内容概述 
原文请参考：[TextInput][0]
![][1]  
### 2.2 autoCapitalize属性  

1、概念

```
告诉TextInput自动利用某些特征(字母的大小写)  
```

2、图示

| 1-代码 | 2-效果(characters) |
| :----: | :----------------: |
| ![][2] |       ![][3]       |

### 2.3 autoCorrect属性

1、概念

```
TextInput内容的自我修改，如果为true，则自动修改，为false，不修正；默认为true;
```

2、图示

| 1-代码 | 2-效果(characters) |
| :----: | :----------------: |
| ![][4] |       ![][5]       |

### 2.4 autoFocus属性

1、概念

```
autoFocus，自动获取焦点，为true时获取焦点
```

2、图示

| 1-代码 | 2-效果(characters) |
| :----: | :----------------: |
| ![][6] |       ![][7]       |

### 2.5 keyboardType属性（设置软键盘类型）

1、概念

```
keyboardType，用于设置软键盘类型,它有下面几个通用值： 

- default
- numeric
- email-address
- phone-pad
```

2、图示

| 1-代码 | 2-效果 |
| :----: | :----: |
| ![][8] | ![][9] |

### 2.6 returnKeyType属性（设置返回键类型）

1、概念

```
returnKeyType，用于设置返回键类型，它有以下几个通用类型：  

- done
- go
- next
- search
- send
```

2、图示

| 1-代码  | 2-效果  |
| :-----: | :-----: |
| ![][10] | ![][11] |

## 三 参考 
参考：[RN_TextInput][12]





[0]: https://facebook.github.io/react-native/docs/textinput.html
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textInput.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autoCapitalize-code.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autocap.gif
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autocorrect-code.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autocorrect.gif
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autofocus-code.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-autofocus.gif
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-keyboardtype.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-keyboardtype-look.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-returnkeytype.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-textinput-returnkeytype-look.png
[12]: https://github.com/PGzxc/RN_TextInput