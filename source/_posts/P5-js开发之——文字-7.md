---
title: P5.js开发之——文字(7)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 61afcbe6
date: 2021-11-24 14:59:17
---
## 一 概述

* P5.js显示文字
* P5.js加载文字字体
* P5.js文字属性

<!--more-->

## 二 P5.js显示文字——text()

### 2.1 语法

```
text(str, x, y, [x2], [y2])
```

### 2.2 参数说明

| 属性 |             类型             |         说明         |
| :--: | :--------------------------: | :------------------: |
| str  | 字符串\物件\数组\数字\布尔值 | 该显示的字母数字符号 |
|  x   |             数字             |    文字的 x 坐标     |
|  y   |             数字             |    文字的 y 坐标     |
|  x2  |             数字             |     文字格的宽度     |
|  y2  |             数字             |     文字格的高度     |

### 2.3 示例

#### 2.3.1 代码

```
function draw() {
  let s = 'P5.js';
  textSize(32);
  text(s, 10, 10, 70, 80);
}
```

#### 2.3.2 效果图

![][1]

## 三 P5.js加载文字字体——loadFont/textFont

### 3.1 说明

* loadFont：从一个文件或网址加载字形文字(.otf、.ttf)
* textFont：定义使用 text() 函数绘制文字时该使用的字形

### 3.2 语法

#### 3.2.1 loadFont

```
loadFont(path, [callback], [onError])
```

|   参数   |  类型  |               说明               |
| :------: | :----: | :------------------------------: |
|   path   | 字符串 |      该加载的字形名字或网址      |
| callback |  函数  | 在 loadFont() 完成后该调用的函数 |
| onError  |  函数  |     在发生错误时该调用的函数     |

#### 3.2.2 textFont

```
textFont(font, [size])
```

| 参数 |  类型  |              说明              |
| :--: | :----: | :----------------------------: |
| font | 字符串 | 一个使用 loadFont() 加载的字形 |
| size |  数字  |            字形大小            |

### 3.3 示例

#### 3.3.1 代码

```
let myFont;
function preload() {
  myFont = loadFont('assets/ComingSoon.ttf');
}

function draw() 
{
	let s = 'P5.js';
	textFont(myFont);
	textSize(32);
	text(s, 10, 10, 70, 80);

}
```

#### 3.3.2 效果图
![][2]



## 四 P5.js文字属性

|    属性     |                用法                |         说明         |
| :---------: | :--------------------------------: | :------------------: |
|  textAlign  | textAlign(horizAlign, [vertAlign]) |       对齐方向       |
| textLeading |        textLeading(leading)        | 行与行之间的像素距离 |
|  textSize   |         textSize(theSize)          |       字体大小       |
|  textStyle  |        textStyle(theStyle)         |      字体的风格      |
|  textWidth  |         textWidth(theText)         |     字符串的宽度     |
| textAscent  |            textAscent()            |       整体高度       |
| textDescent |           textDescent()            |      下端线高度      |
|  textWrap   |        textWrap(wrapStyle)         |       换行方式       |

## 五 参考
### 5.1 文字
* [P5.js—参考文献—text](https://p5js.org/zh-Hans/reference/#/p5/text)

### 5.2 字体
* [P5.js—参考文献—loadFont](https://p5js.org/zh-Hans/reference/#/p5/loadFont)
* [P5.js—参考文献—textFont](https://p5js.org/zh-Hans/reference/#/p5/textFont)

### 5.3 属性

* [P5.js—参考文献—textAlign](https://p5js.org/zh-Hans/reference/#/p5/textAlign)
* [P5.js—参考文献—textLeading](https://p5js.org/zh-Hans/reference/#/p5/textLeading)
* [P5.js—参考文献—textSize](https://p5js.org/zh-Hans/reference/#/p5/textSize)
* [P5.js—参考文献—textStyle](https://p5js.org/zh-Hans/reference/#/p5/textStyle)
* [P5.js—参考文献—textWidth](https://p5js.org/zh-Hans/reference/#/p5/textWidth)
* [P5.js—参考文献—textAscent](https://p5js.org/zh-Hans/reference/#/p5/textAscent)
* [P5.js—参考文献—textDescent](https://p5js.org/zh-Hans/reference/#/p5/textDescent)
* [P5.js—参考文献—textWrap](https://p5js.org/zh-Hans/reference/#/p5/textWrap)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-text-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5-js-text-font-preview.png