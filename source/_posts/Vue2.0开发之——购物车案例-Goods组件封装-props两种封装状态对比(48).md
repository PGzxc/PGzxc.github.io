---
title: Vue2.0开发之——购物车案例-Goods组件封装-props两种封装状态对比(48)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: d8dd9a8d
date: 2023-03-06 09:32:33
---
## 一 概述

* Goods.vue中props属性对比
* Goods.vue中属性使用对比
* App.vue中父向子传值对比

<!--more-->

## 二 Goods.vue中props属性对比

### 2.1  props分别赋值

```
export default {
  props: {
    //商品标题
    title: {
      default: "",
      type: String,
    },
    //商品图片
    pic: {
      default: "",
      type: String,
    },
    //商品价格
    price: {
      default: 0,
      type: Number,
    },
    //商品勾选状态
    state: {
      default: false,
      type: Boolean,
    },
  },
};
```
### 2.2 props整体赋值

```
export default {
  props: {
    good:{
      default:{},
      type:Object
    }
  },
};
```

## 三 Goods.vue中属性使用对比

### 3.1 Goods.vue中分别赋值使用实例-标题title为例

```
<h6 class="goods-title">{{ title }}</h6>
```

### 3.2  Goods.vue中整体赋值使用实例-标题title为例

```
<h6 class="goods-title">{{ good.goods_name }}</h6>
```

## 四 App.vue中父向子传值对比

### 4.1 Goods.vue中分别赋值

```
<Goods
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
      :state="item.goods_state"
      :count="item.goods_count"
      @state-change="getNewState"
    ></Goods>
```

### 4.2 Goods.vue中整体赋值

```
<Goods
      v-for="item in list"
      :key="item.id"
      :good="item"></Goods>
```

