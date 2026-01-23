---
title: JavaWeb开发思维导图之——Vue高级(70)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: cf7dc288
date: 2025-03-03 09:40:12
---
## 一 概述

* 自定义组件
* Vue生命周期
* 异步操作(axios)

<!--more-->

## 二 内容详情

### 2.1 自定义组件

* 1-概念: 1-组件就是自定义标签;2-例如\<el-button>就是对\<button>的封装
* 2-自定义格式：Vue.component(组件名称,{props:组件属性,data:组件数据,template:组件解析标签模板})
* 3-示例：\<my-button>我是按钮\</my-button>

### 2.2 Vue生命周期

* 1-beforeCreate//创建前
* 2-created //创建后
* 3-beforeMount//载入前
* 4-mounted//载入后
* 5-beforeUpdate//更新前
* 6-updated //更新后
* 7-beforeDestory//销毁前
* 8-destoryed//销毁后

### 2.3 异步操作(axios)

1-异步介绍: 使用axios插件简化异步操作

2-使用步骤

* 1-引入axios核心js文件
* 2-调用axios对象的方法发起异步请求
* 3-调用axios对象的方法处理响应数据

3-axios常用方法

* 1-get(请求资源路径与参数)//发起get请求
* 2-post(请求资源路径,参数)//发起post请求
* 3-then(response)//请求成功回调，通过response获取
* 4-catch(error)//请求失败回调，通过error获取

## 三 思维导图

![javaweb-xmind-vue-level-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-vue-level-3.png