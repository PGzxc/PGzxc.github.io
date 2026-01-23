---
title: 微信小程序开发之——import、require和include
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 19d0fae6
date: 2021-11-17 10:02:48
---
## 一 概述

* require：js代码中引用其他js模块代码
* include：wxml文件中引用template模板文件
* import：既可以在js代码中导入模块代码，又可以在wxml或wxss文件中导入模块文件

<!--more-->

## 二 import和require

### 2.1 说明

* import和require：在js代码文件中导入逻辑代码模块
* require 是 AMD规范引入方式
* import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法

### 2.2 使用

#### import使用示例

```
import App from './App';
```

#### require使用示例

```
const App = require('./App');
```

### 2.3 区别

require和import没有什么区别，这是两种js模块化规范而已

### 2.4 注意事项

两个js文件互相require,导致其中一个取不到值

## 三 import和include

### 3.1 说明

* import和include都是小程序中文件的引用方式
* import：既可以用在wxml文件中，又可以用在wxss文件中
* include：只能用在wxml文件中

### 3.2 使用示例

#### import使用示例

##### 模板文件(item.wxml)

```
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```

##### 使用模板文件的文件(index.wxml)

```
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```

#### include使用示例

#### 被引用文件(header.wxml)

```
<!-- header.wxml -->
<view> header </view>
```

#### 引用文件(index.wxml)

```
<!-- index.wxml -->
<include src="header.wxml"/>
<view> body </view>
```

### 3.3 区别

* import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template
* `include` 可以将目标文件**除了** `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 `include` 位置，

## 四 参考

### import和require

* [简书—微信小程序中import和require区别](https://www.jianshu.com/p/07b40b632431)
* [知乎—require，import区别](https://www.zhihu.com/question/56820346)
* [阮一峰的日志—JavaScript 模块的循环加载](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

### import和include

* [小程序官方文档—引用](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html)