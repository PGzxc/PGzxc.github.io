---
title: Vue2.0开发之——购物车案例-Goods组件封装-商品名称和图片(46)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 4c9240a
date: 2023-03-05 10:03:16
---
## 一 概述

* 循环渲染Goods组件
* 为Goods组件封装title属性
* 为Goods组件封装pic属性

<!--more-->

## 二 循环渲染Goods组件

### 2.1 App.vue中导入Goods组件

```
import Goods from '@/components/Goods/Goods.vue'
```

### 2.2 App.vue中注册Goods组件

```
components: {
    Header,
    Goods
  }
```

### 2.3 循环渲染每一个商品的信息

```
<template>
  <div class="app-container">
    <!--Header头部区域-->
    <Header title="购物车案例"></Header>
    <Goods v-for="item in list" :key="item.id"></Goods>
  </div>
</template>
```

### 2.4 效果图
![][1]

## 三 为Goods组件封装title属性

### 3.1  Goods.vue中定义要渲染的商品标题title

```
export default {
 props:{
  //商品标题
  title:{
    default:'',
    type:String
  }
 }
}
```
### 3.2 商品标题修改

修改前

```
<h6 class="goods-title">商品名称商品名称商品名称商品名称</h6>
```

修改后(从父向子Goods传值)

```
<h6 class="goods-title">{{title}}</h6>
```

### 3.3 App.vue中设置title的值

```
<Goods v-for="item in list" :key="item.id" :title="item.goods_name"></Goods>
```

### 3.4 修改title后的效果图
![][2]

## 四 为Goods组件封装pic属性

### 4.1 Goods.vue中定义要渲染的商品图片pic

```
export default {
 props:{
  //商品标题
  title:{
    default:'',
    type:String
  },
  //商品图片
  pic:{
    default:'',
    type:String
  }
 }
}
```

### 4.2  商品图片修改

修改前：

```
<img src="../../assets/logo.png" alt="" />
```

修改后

```
<img :src="pic" alt="" />
```

### 4.3 App.vue中设置pic的值

```
<Goods v-for="item in list" :key="item.id" :title="item.goods_name" :pic="item.goods_img"></Goods>
```

###  4.4 修改pic后的效果图
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-46-cart-good-list.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-46-cart-goods-name-modify.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-46-cart-goods-pic-modify.png

