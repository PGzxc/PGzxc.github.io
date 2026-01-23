---
title: Vue2.0开发之——购物车案例-Goods组件封装-商品价格和选中状态(47)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 799aa284
date: 2023-03-06 08:43:11
---
## 一 概述

* 为Goods组件封装商品价格price属性
* 为Goods组件封装商品选中状态state属性

<!--more-->

## 二 为Goods组件封装商品价格price属性

### 2.1  Goods.vue中定义要渲染的商品价格price

```
export default {
 props:{
  //商品价格
  price:{
    default:0,
    type:Number
  }
 }
}
```
### 2.2 商品价格修改

修改前

```
<span class="goods-price">￥0</span>
```

修改后(从父App.vue向子Goods.vue传值)

```
<span class="goods-price">￥{{ price }}</span>
```

### 2.3 App.vue中设置price的值

```
<Goods
      v-for="item in list"
      :key="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
    ></Goods>
```

### 2.4 修改price后的效果图
![][1]

## 三 为Goods组件封装商品选中状态state属性

### 3.1 Goods.vue中定义要渲染的商品勾选状态state

```
export default {
 props:{
  //商品勾选状态
  state:{
    default:false,
    type:Boolean
  }
 }
}
```

### 3.2  商品勾选状态修改

修改前：

```
<input type="checkbox" class="custom-control-input" id="cb1" :checked="true" />
```

修改后

```
<input
      type="checkbox"
      class="custom-control-input"
      id="cb1"
      :checked="state"
      />
```

### 3.3 App.vue中设置state的值

```
<Goods
      v-for="item in list"
      :key="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
      :state="item.goods_state"
    ></Goods>
```

###  3.4 修改pic后的效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-47-cart-goods-price-modify.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-47-cart-goods-state-modify.png


