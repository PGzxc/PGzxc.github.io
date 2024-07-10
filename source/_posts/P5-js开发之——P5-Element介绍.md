---
title: P5.js开发之——P5.Element介绍
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: d752821b
date: 2022-01-13 14:10:25
---
## 一 概述

* 向index.html导入sketch.js后，只是生成了空画板，里面并没有内容
* 可以向sketch空画板中添加p5.Element内容的对象，渲染出内容
* sketch可以渲染的内容包含画布(canvas)、图片缓冲(graphics buffers)以及其他HTML
* p5.Element不能直接调用，需要借助下面函数createCanvas, createGraphics, createDiv, createImg, createInput创建p5.Element对象

<!--more-->

## 二 p5.Element方法

### 2.1 方法一

|  No  |      方法       |      说明       |
| :--: | :-------------: | :-------------: |
|  1   |    parent()     |     父元素      |
|  2   |      id()       |    元素的id     |
|  3   |     class()     | 给元素添加class |
|  4   | mousePressed()  |  鼠标按下事件   |
|  5   | doubleClicked() |    双击事件     |
|  6   |  mouseWheel()   |  鼠标滚动事件   |
|  7   | mouseReleased() |  鼠标抬起事件   |
|  8   | mouseClicked()  |  鼠标点击事件   |
|  9   |  mouseMoved()   |  鼠标移动事件   |
|  10  |   mouseOver()   |  鼠标完成事件   |

### 2.2 方法二

|  No  |      方法      |       说明        |
| :--: | :------------: | :---------------: |
|  1   |   mouseOut()   |   鼠标移出事件    |
|  2   | touchStarted() |   触摸开始事件    |
|  3   |  touchMoved()  |   触摸移动事件    |
|  4   |  touchEnded()  |   触摸结束事件    |
|  5   |   dragOver()   |   拖拽结束事件    |
|  6   |  dragLeave()   |   拖拽离开事件    |
|  7   |   addClass()   |  给元素添加clsss  |
|  8   | removeClass()  |     移出class     |
|  9   |   hasClass()   | 元素是否包含class |
|  10  | toggleClass()  |     切换元素      |

### 2.3 方法三

|  No  |       方法        |       说明       |
| :--: | :---------------: | :--------------: |
|  1   |      child()      |      子元素      |
|  2   |     center()      |     元素居中     |
|  3   |      html()       | 设置元素显示内容 |
|  4   |    position()     |     元素位置     |
|  5   |      style()      |     元素样式     |
|  6   |    attribute()    |     元素属性     |
|  7   | removeAttribute() |     移出属性     |
|  8   |      value()      |   设置或获取值   |
|  9   |      show()       |     显示元素     |
|  10  |      hide()       |     隐藏元素     |

### 2.4 方法四

|  No  |   方法   |      说明      |
| :--: | :------: | :------------: |
|  1   |  size()  |   元素的大小   |
|  2   | remove() | 移出元素和监听 |
|  3   |  drop()  |    注册回调    |

## 三 示例(html)

### 3.1 代码(添加元素)

```
function setup() {
  let div = createDiv('Hello ').size(100, 100).style('color', '#f00');
  div.html('World', true);
}
```

### 3.2 效果图

![][1]

## 四 参考

* [P5官方文档-P5.Element](https://p5js.org/zh-Hans/reference/#/p5.Element)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-p5element-html-example.png