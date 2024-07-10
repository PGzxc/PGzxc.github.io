---
title: Vue2.0开发之——购物车案例-Goods组件封装-把购买数量传给counter组件(52)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 5abbcb61
date: 2023-03-06 10:29:37
---
## 一 概述

* Goods组件中导入Counter组件
* 设置Counter组件的数量

<!--more-->

## 二  Goods组件中导入Counter组件

### 2.1 Goods组件中导入Counter组件

```
import Counter from "@/components/Counter/Counter.vue";
```

### 2.2 Goods组件中注册Counter组件

```
components:{
  Counter
}
```

### 2.3 Goods组件中使用Counter组件

```
<Counter></Counter>
```

### 2.4 导入Counter后效果图-Counter中设置了固定值

![][1]

## 三  设置Counter组件的数量

App.vue中list中Item数量——>Goods中count——>Counter中num

### 3.1 Counter.vue中定义num数量

定义num属性

```
export default {
  props:{
    //接收到的num数量值
    num:{
      type:Number,
      default:1
    }
  }
}
```

渲染num值

```
<span class="number-box">{{ num }}</span>
```

### 3.2 Goods.vue中，设置传递到Counter中的数量

```
<Counter :num="good.goods_count"></Counter>
```

### 3.3 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-52-cart-goods-counter-import.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-52-cart-goods-counter-result.png
