---
title: Vue3.0开发之——API接口案例(08)
categories:
  - 开发
  - C-前端开发
  - Vue3
tags:
  - Vue3
abbrlink: 38d93e4a
date: 2023-04-06 21:17:40
---
## 一 概述

* 案例需求
* 项目结构及准备
* API 接口案例

<!--more-->

## 二  案例需求

### 2.1 案例需求

基于 <font color=red>MySQL 数据库 + Express</font> 对外提供<font color=red>用户列表</font>的 API 接口服务。用到的技术点如下

* 第三方包 express 和 mysql2
* ES6 模块化
* Promise
* async/await

### 2.2 主要的实现步骤

* 搭建项目的基本结构
* 创建基本的服务器
* 创建 <font color=red>db</font> 数据库操作模块
* 创建 <font color=red>user_ctrl</font> 业务模块
* 创建 <font color=red>user_router</font> 路由模块

### 2.3 第三方包介绍

#### express

应用介绍：Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架

安装依赖：

```
npm install express --save
```

#### mysql2

应用介绍：适用于Node.js的MySQL客户端，专注于性能优化

安装依赖：

```
npm install --save mysql2
```

#### nodemon

应用介绍：

是一个大约300万个项目都依赖的工具，它可以监视源码中的任意改动并自动重启服务

安装依赖：

```
npm install -g nodemon
```

## 三 项目结构及准备

### 3.1 MySql数据库

MySql数据库表格及内容

![][1]

数据库连接信息

```
用户名：root
密码：admin
端口：3306
```

### 3.2 搭建项目的基本结构

1-执行如下指令，生成package.json

```
npm init -y
```

2-启用ES6模块化支持

```
在 package.json 中声明 "type": "module"
```

3-安装第三方依赖包

```
npm install express mysql2
```

## 四 API 接口案例

### 4.1 创建基本的服务器—app.js

```
import express from 'express'
import userRouter from './router/user_router.js'

const app = express()

app.use('/api', userRouter)

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1')
})
```

### 4.2 创建 db 数据库操作模块—index.js

```
import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'db1',
  user: 'root',
  password: 'admin'
})
export default pool.promise()
```

### 4.3 创建 user_ctrl 模块—user_ctrl.js

```
import db from '../db/index.js'

export async function getAllUser(req, res, next) {
  try {
    const [rows] = await db.query('select id, name,money from account')
    console.log(rows)
    res.send({
      status: 0,
      message: '获取用户列表数据成功！',
      data: rows
    })
  } catch (err) {
    res.send({
        status: 1,
        message: '获取用户列表数据失败！',
        desc: err.message,
      })
  }
}
```

### 4.4 创建 user_router 模块—user_router.js

```
import express from 'express'
import { getAllUser } from '../controller/user_ctrl.js'

const router = new express.Router()
router.get('/user', getAllUser)

export default router
```

### 4.5 启动API项目，并请求

启动项目

```
nodemon .\app.js
```

请求结果

![][2]

## 五 参考

* [npm-express](https://www.npmjs.com/package/express)
* [Express中文网](https://www.expressjs.com.cn/)
* [npm-mysql2](https://www.npmjs.com/package/mysql2)
* [npm-nodemon](https://www.npmjs.com/package/nodemon)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-08-api-mysql-table.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue3.0-day1-08-api-request-result.png

