---
title: P5.js开发之——通过createVideo向页面中添加视频
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: '90362299'
date: 2022-01-18 16:19:23
---
## 一 概述

* createVideo添加一个视频
* 示例—本地视频添加及播放示例

<!--more-->

## 二 createVideo添加一个视频

### 2.1 语法

```
createVideo(src, [callback])
```

### 2.2 说明

* 添加一个本地或网络视频
* 可以级联使用p5.Element的语法

### 2.3 参数及返回值

#### 参数

|   参数   |               说明               |
| :------: | :------------------------------: |
|   src    | String\|String[]：视频文件的路径 |
| callback |          事件触发时回调          |

#### 返回值

p5.MediaElement

## 三 示例

### 3.1 代码

```
let vid;

function setup() {
  noCanvas();
  vid=createVideo("assets/small.mp4",vidLoad);
  vid.size(100,100);
  vid.position(10,10);

}
function vidLoad() {
  vid.loop();
  vid.volume(0);
}
```

### 3.2 效果图
![][1]

## 四 参考

* [P5.js官方文档—createVideo](https://p5js.org/zh-Hans/reference/#/p5/createVideo)
* [P5.js官方文档—p5.MediaElement](https://p5js.org/zh-Hans/reference/#/p5.MediaElement)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-createvideo-sample1.gif