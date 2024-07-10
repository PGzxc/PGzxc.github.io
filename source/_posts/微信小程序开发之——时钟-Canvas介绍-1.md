---
title: 微信小程序开发之——时钟-Canvas介绍(1)
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 15fcdcc7
date: 2021-09-30 14:24:47
---
## 一 概述

* Canvas画布属性介绍
* Canvas用法示例(新/旧)

<!--more-->

## 二 Canvas画布属性介绍

|      属性       |    类型     |                             说明                             |
| :-------------: | :---------: | :----------------------------------------------------------: |
|      type       |   string    |      指定 canvas 类型，支持 2d (2.9.0) 和 webgl (2.7.0)      |
|    canvas-id    |   string    |  canvas 组件的唯一标识符，若指定了 type 则无需再指定该属性   |
| disable-scroll  |   boolean   | 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新 |
| bindtouchstart  | eventhandle |                       手指触摸动作开始                       |
|  bindtouchmove  | eventhandle |                        手指触摸后移动                        |
|  bindtouchend   | eventhandle |                       手指触摸动作结束                       |
| bindtouchcancel | eventhandle |             手指触摸动作被打断，如来电提醒，弹窗             |
|   bindlongtap   | eventhandle | 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 |
|    binderror    | eventhandle |        当发生错误时触发 error 事件，detail = {errMsg}        |

## 三 Canvas用法示例(新/旧)

### 3.1 Canvas用法示例—旧

#### 3.1.1 布局文件(index.wxml)

```
<canvas canvas-id="firstCanvas"></canvas>
```

#### 3.1.2 逻辑文件(index.js)

```
onReady: function () {
  //1- 使用 wx.createContext 获取绘图上下文 context
  var context = wx.createCanvasContext('firstCanvas')
  //2-设置填充色
  context.setFillStyle('red') 
  //3-绘制图形形状
  context.fillRect(0,0,150,150) 
  //4-开始绘制
  context.draw()
  },
```

#### 3.1.3 效果图
![][1]

### 3.2 Canvas新用法示例—Canvas 2D 

#### 3.2.1 布局文件(index.wxml)

```
<canvas type="2d" id="myCanvas"></canvas>
```

#### 3.2.2 逻辑文件(index.js)

```
 onReady: function () {
    const query = wx.createSelectorQuery() //返回一个 SelectorQuery 对象实例
    query.select('#myCanvas') //查询myCanvas对应的Canvas
      .fields({ node: true, size: true }) //节点，可用      .node()代替
      .exec((res) => { //回调结果
        const canvas = res[0].node //canvas
        const ctx = canvas.getContext('2d') //上下文
        ctx.fillStyle = '#f00' //设置填充颜色
        ctx.fillRect(0, 0, 150, 150) //绘制形状(x,y,width,height)
      })
  },
```

#### 3.2.3 效果图

![][1]

### 3.3 Canvas新用法示例—WebGL

#### 3.3.1 [WebGL入门——初识 WebGL][00]

WebGL基础知识学习

#### 3.3.2 小程序中-布局文件(index.wxml)

```
<canvas type="webgl" id="myCanvas"></canvas>
```

#### 3.3.3 样式文件(index.wxss)

```
canvas{
  width: 150px;
  height: 150px;
}
```

#### 3.3.4 逻辑文件(index.js)

```
onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        const gl = canvas.getContext('webgl') // 初始化WebGL上下文
        // 确认WebGL支持性
        if (!gl) {
          console.log("无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。");
          return;
        }
        //宽高在布局中设置
        gl.clearColor(1, 0, 0, 1) //将整个画布清除为红色，RGBA（红，绿，蓝，透明度）组成的，后面一个透明度0-1
        gl.clear(gl.COLOR_BUFFER_BIT) // 用上面指定的颜色清除缓冲区
      })
  },
```

#### 3.3.5 效果图

![][1]



[00]:https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-canvas-old-view.png