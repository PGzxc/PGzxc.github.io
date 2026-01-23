---
title: Vue2.0开发之——购物车案例-案例说明及导入Header(44)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: fc70cee7
date: 2023-03-03 17:50:11
---
## 一 概述

| 初始项目预览 | 最终项目预览 |
| :----------: | :----------: |
|    ![][1]    |    ![][2]    |

<!--more-->

## 二 案例说明

### 2.1 初始项目代码结构
![][3]

### 2.2 Components组件与项目的对应关系

![][4]

对应关系：

* components/Counter：物品数量
* components/Footer：购物车底部
* components/Goods：购物车商品
* components/Header：购物车标题

## 三 导入、注册、使用Header组件

### 3.1 导入Header组件(App.vue)

```
import Header from '@/components/Header/Header.vue'
```

### 3.2 注册Header组件

```
export default {
  components:{
    Header
  }
}
```

### 3.3 使用Header组件

```
<template>
  <div class="app-container">
    <!--Header头部区域-->
    <Header></Header>
    <h1>App 根组件</h1>
  </div>
</template>
```

### 3.4 添加Header组件后的Header效果图
![][5]

## 四 修改Header标题

### 4.1 定义title标题属性—Header.vue

```
export default {
  props:{
    title:{
      default:'',
      type:String
    }
  }
}
```

### 4.2 通过titlee显示Header的标题内容—Header.vue

```
<template>
  <div class="header-container">{{title}}</div>
</template>
```

### 4.3 App.vue设置Header的标题

```
<template>
  <div class="app-container">
    <!--Header头部区域-->
    <Header title="购物车案例"></Header>
    <h1>App 根组件</h1>
  </div>
</template>
```

### 4.4 效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-app-init-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-app-finish-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-components-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-struct-view.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-header-view.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-44-cart-header-title.png