---
title: P5.js开发之——通过createInput向页面中添加输入框
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: 2bbd9a3c
date: 2022-01-18 14:38:57
---
## 一 概述

* createInput语法概述
* 示例—页面中添加input输入框并打印

<!--more-->

## 二 createInput语法概述

### 2.1 语法

```
createInput(value, [type])
```

```
createInput([value])
```

### 2.2 说明

* 向页面中添加输入框
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

| 参数  |            说明            |
| :---: | :------------------------: |
| value |       输入框中默认值       |
| type  | 输入类型(text、password等) |

#### 返回值

p5.Element

## 三 示例

### 3.1 代码

```
function setup() {

  createCanvas(100, 100);
  background('grey');
  let inp = createInput('123','text');
  inp.position(0, 0);
  inp.size(100);
  inp.input(myInputEvent);

}
function myInputEvent() {
  console.log('you are typing: ', this.value());
}
```

### 3.2 效果图
![][1]

## 四 参考
* [P5.js官方文档—createInput](https://p5js.org/zh-Hans/reference/#/p5/createInput)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createInput-sample1.gif