---
title: Vue2.0开发之——插槽-基于slot插槽修改购物车案例(61)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 8a3d9a4c
date: 2023-03-27 09:52:12
---
## 一 概述

* 购物车的事件传递分析
* 基于slot插槽修改购物车案例过程

<!--more-->

## 二 购物车的事件传递分析

### 2.1 事件传递示意图

![][1]

### 2.2 事件传递说明

* Counter组件——>Goods组件——>App：Counter传递给Goods，Goods传递给App，一层层嵌套
* Counter组件——>App，Counter通过EventBus传递给App

## 三 基于slot插槽修改购物车案例过程

### 3.1 Goods组件中将Counter组件使用插槽slot占位
修改前(Counter组件)

```
<Counter :num="count" :id="id"></Counter>
```

修改后(Counter组件替换为slot)

```
<slot></slot>
```
### 3.2 将App.vue中的Goods组件计算部分使用Counter组件

导入Counter组件并注册

```
//导入组件
import Counter from '@/components/Counter/Counter.vue'
//注册组件
 components: {
    Header,
    Goods,
    Footer,
    Counter
  }
```

将Goods组件的插槽替换为Counter(此时所有count值为默认值1)

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
      @state-change="getNewState">
      <Counter></Counter>
  </Goods>
```

### 3.3 Goods组件中的数值显示

**Counter组件**

定义num

```
export default {
  props: {
    num: {
      type: Number,
      default: 1
    }
  },
```

显示num

```
<span class="number-box">{{ num }}</span>
```

**App.vue组件通过Counter传值**(初始值已修改)

```
<Counter :num="item.goods_count"></Counter>
```

修改后，效果图

![][2]

### 3.4 点击`+`、`-`修改Counter 的值

#### Counter.vue组件中——子传父

界面点击事件

```
<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
  </div>
</template>
```

界面对应的方法

```
methods: {
    add() {
      this.$emit('num-change', this.num + 1)
    },
    sub() {
      if (this.num - 1 === 0) return
      this.$emit('num-change', this.num - 1)
    }
  },
```

#### App.vue中接收事件

插槽接收事件

```
<Counter  :num="item.goods_count" @num-change="getNewNum(item,$event)"></Counter>
```

getNewNum事件处理

```
getNewNum(item,event){
      item.goods_count =event
 }
```

效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-61-cart-before-event-flow.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-61-cart-slot-count-value.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-61-cart-slot-modify.gif


