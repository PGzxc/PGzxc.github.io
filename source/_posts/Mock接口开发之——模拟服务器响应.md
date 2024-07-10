---
title: Mock接口开发之——模拟服务器响应
categories:
  - 开发
  - G-后端开发
  - 接口
  - Mock
tags:
  - Mock
abbrlink: '81867271'
date: 2021-06-04 10:24:37
---
## 一 概述

* 服务模块介绍
* 模拟服务器响应(返回数据)
* 测试服务(postman调用测试)

<!--more-->

## 二 服务模块介绍

### 2.1 模块

* node：基于 Chrome V8 引擎的 JavaScript 运行环境(运行在服务端的 JavaScript)
* express：基于node的web应用程序框架
* mockjs：模拟数据生成器

### 2.2 模块地址
* node：https://nodejs.org/zh-cn/
* express：http://expressjs.jser.us/
* mockjs：http://mockjs.com/

## 三 模拟服务器响应(返回数据)

### 3.1 创建文件夹，并打开文件夹路径终端，执行初始化，生成package.json文件

```
npm init
```

### 3.2 安装模块(express和mockjs)

```
npm install mockjs
npm install express
```

### 3.3 创建mockapi.js文件，mockjs模块模拟数据

```
var Mock = require('mockjs'); // 引进express
const express = require('express'); // 引进mockjs
const app = express()  // 准备服务对象

// 监听路由
app.get('/',(req,res)=>{
  // 准备随机数据
  var data = Mock.mock({
    'list|1-20': [{
      'name|3-5': /[a-z][A-Z]/,
      'age|10-15': 15,
      'gender|1': true,
    }]
  })
  res.end(JSON.stringify(data));
})  
// 开启服务
app.listen(3000) 
```

### 3.4 开启服务

* vscode：运行——>启动调试——>选择环境(Node)
* 终端：node 要执行文件

## 四 测试服务(postman调用测试)

### 4.1 Postman访问

打开postman，访问地址http://localhost:3000

![][1]

### 4.2 返回结果

```
{
    "list": [
        {
            "name": "gWxUvBsF",
            "age": 13,
            "gender": false
        },
        {
            "name": "uVdFyGwQ",
            "age": 10,
            "gender": false
        },
        {
            "name": "vTvNgB",
            "age": 13,
            "gender": true
        },
        {
            "name": "xZpPmG",
            "age": 12,
            "gender": true
        },
        {
            "name": "iNhHnKqYcT",
            "age": 15,
            "gender": false
        },
        {
            "name": "oUmKqIkX",
            "age": 11,
            "gender": false
        }
    ]
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-api/mock-api-response-postman.png