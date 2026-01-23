---
title: Mock接口开发之——Mock介绍
categories:
  - 开发
  - G-后端开发
  - 接口
  - Mock
tags:
  - Mock
abbrlink: 828eea4f
date: 2021-06-04 09:01:38
---
## 一 概述

* Mock介绍
* Mock安装及配置
* Mock的语法规则
* Mock模拟数据打印到控制台

<!--more-->

## 二 Mock介绍

* Mock.js 是一款模拟数据生成器
* Mock能根据数据模板生成模拟数据

## 三 Mock安装及配置

### 3.1 Mock地址

* GitHub地址：https://github.com/nuysoft/Mock
* 文档地址：[mockjs.com](http://mockjs.com/)

### 3.2 安装及下载

1-下载后作为文件引入使用

```
<script type="text/javascript" src="./bower_components/mockjs/dist/mock.js"></script>
```

2-通过npm安装模块

```
npm install mockjs
// 使用
var Mock = require('mockjs');
```

## 三 Mock的语法规则

Mock.js 的语法规范包括两部分：数据模板定义 DTD和数据占位符定义 DPD

### 3.1 数据模板定义 DTD

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

**示例**('name|min-max': string)

```
"string|1-10": "★"
```

### 3.2 数据占位符定义 DPD

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。占位符 的格式为：

```
@占位符
@占位符(参数 [, 参数])
```

**示例**

```
 {
     name: {
         first: '@FIRST',
         middle: '@FIRST',
         last: '@LAST',
         full: '@first @middle @last'
     }
 }
 // =>
 {
     "name": {
         "first": "Charles",
         "middle": "Brenda",
         "last": "Lopez",
         "full": "Charles Brenda Lopez"
     }
 }
```

### 3.3 Mock生成模拟数据

```
Mock.mock( template )
```

## 四 Mock模拟数据打印到控制台

### 4.1 新建Mock文件夹，打开文件所在路径终端，执行如下执行

```
npm init
npm install mockjs
```

上述指令执行后，生成package.json文件

### 4.2 用vscode打开此文件夹，创建src/mock文件夹
![][1]
### 4.3 创建mock-console.js文件，并将如下代码copy

```
var Mock = require('mockjs');//引入mockjs模块
var data = Mock.mock('@first') //模拟生成用户名数据
console.log(JSON.stringify(data)) //将数据打印到控制台上
```

### 4.4 运行查看结果(可能data换成[示例](http://mockjs.com/examples.html)中其他结果)

依次点击：运行——>启动调试——>选择环境(Node.js)，调试控制台打印如下结果(结果可能不同)

```
"Donna"
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mock-project-open-vscode.png