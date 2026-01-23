---
title: Vue2.0开发之——购物车案例-Footer组件封装-计算商品的总价格(51)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: '1155119'
date: 2023-03-06 10:26:02
---
## 一 概述

* App.vue中计算勾选商品的总价格
* 定义子组件Footer中的商品总价格
* 将App.vue中商品的总价格传递给Footer显示

<!--more-->

## 二  App.vue中计算勾选商品的总价格

### 2.1 商品总价格的计算逻辑

所有勾选商品的价格*数量

### 2.2 App.vue中通过计算属性计算总价格

通过计算属性计算总价格

```
computed: {
    //已勾选商品的总价格
    amt() {
      //1.先filter过滤
      //2.再reduce累加
      return this.list
        .filter((item) => item.goods_state)
        .reduce(
          (total, item) => (total += item.goods_price * item.goods_count),
          0
        );
    },
  },
```

## 三 定义子组件Footer中的商品总价格

### 3.1 再Footer中定义商品总价格amount

```
props: {
    isFull: {
      type: Boolean,
      default: false,
    },
    amount:{
      type:Number,
      default:0
    }
  },
```

### 3.2 将amount的值渲染到页面上

```
<div>
      <span>合计：</span>
      <span class="total-price">￥{{ amount.toFixed(2) }}</span>
</div>
```

## 四 将App.vue中商品的总价格传递给Footer显示

```
<Footer
      :isfull="fullState"
      :amount="amt"
      :all="total"
      @full-change="getFullState"
    ></Footer>
```

## 五 效果图
![][1]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-51-cart-footer-total-price.gif
