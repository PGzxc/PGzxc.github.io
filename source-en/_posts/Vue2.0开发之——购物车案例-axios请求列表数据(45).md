---
title: Vue2.0开发之——购物车案例-axios请求列表数据(45)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 2cb5c72f
date: 2023-03-04 08:57:49
---
## 一 概述

* 项目导入axios HTTP 库
* axios请求数据列表
* 将请求到的数据转存到data中

<!--more-->

## 二 项目导入axios HTTP 库

### 2.1 axios介绍

Axios是一个基于promise 的 HTTP 库，可以用在浏览器和 node.js中

### 2.2 axios项目地址

https://www.npmjs.com/package/axios

### 2.3 axios安装

```
npm install axios
```

## 三 axios请求数据列表

### 3.1 App.vue中导入axios

```
import axios from 'axios'
```

### 3.2 在methods方法中，定义initCartList函数请求列表数据

```
methods: {
    //封装请求列表数据的方法
    async  initCartList(){
      //调用axios的get方法，请求列表数据
    const {data:res} =  await axios.get('https://www.escook.cn/api/cart')
    console.log(res)
    }
}
```

### 3.3 在created生命周期函数中，调用上面的initCartList函数

```
created() {
    //调用请求数据的方法
    this.initCartList()
  },
```

### 3.4 请求结果
![][1]

## 四 将请求到的数据转存到data中

### 4.1 App.vue中定义存储购物车列表数据的集合

```
data() {
    return {
      //用来存储购物车的列表数据，默认为空数组
      list: [],
    };
  },
```

### 4.2 axios请求到数据后，为list赋值

```
async initCartList() {
      //调用axios的get方法，请求列表数据
      const { data: res } = await axios.get('https://www.escook.cn/api/cart')
      console.log(res)
      if (res.status == 200) {
        this.list = res.list;
      }
    }
```

### 4.3 查看vue赋值结果
![][2]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-45-cart-axios-getlist.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-45-cart-data-list.png
