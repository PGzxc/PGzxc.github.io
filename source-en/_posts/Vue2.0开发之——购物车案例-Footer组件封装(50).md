---
title: Vue2.0开发之——购物车案例-Footer组件封装(50)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: '90086241'
date: 2023-03-06 10:14:45
---
## 一 概述

* 导入Footer子组件
* 定义fullState计算属性
* 把全选状态传递给Footer子组件
* 实现全选功能

<!--more-->

## 二  导入Footer子组件

### 2.1 App.vue中导入Footer组件

```
import Footer from "@/components/Footer/Footer.vue";
```

### 2.2 App.vue中注册Footer子组件

```
components: {
    Header,
    Goods,
    Footer
  },
```

### 2.3 App.vue中使用Footer子组件

```
<template>
  <div class="app-container">
    <Header title="购物车案例"></Header>
    <Goods
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :good="item"
      @state-change="getNewState"
    ></Goods>
    <Footer></Footer>
  </div>
</template>
```

### 2.4 效果图
![][1]

## 三 定义fullState计算属性

### 3.1 Footer.vue中全选状态

* 当Goods中的所有商品全部选中时，Footer.vue中的全选按钮才被选中
* 在App.vue中通过计算属性computed，计算Goods中商品按钮的状态

### 3.2 App.vue中通过计算属性确定Goods商品状态

代码

```
 //计算属性
 computed:{
   //动态计算出全选的状态是true还是false
   fullState(){
    return this.list.every(item=>item.goods_state)
   }
  }
```

App.vue中查看计算属性的值

```
<p>{{ fullState }}</p>
```

效果图

![][2]

## 四 把全选状态传递给Footer子组件—父向子传值

### 4.1 Footer子组件中定义全选属性

```
export default {
  props:{
    isFull:{
      type:Boolean,
      default:false
    }
  }
}
```

### 4.2 Footer子组件中使用自定义全选属性

```
<input
        type="checkbox"
        class="custom-control-input"
        id="cbFull"
        :checked="isFull"
      />
```

### 4.3 App.vue父组件向子组件Footer.vue中传值

```
<Footer :isFull="fullState"></Footer>
```

### 4.4 效果图

![][3]

## 五 实现全选功能—自定义事件

### 5.1 Footer.vue子组件

监听checkbox状态改变事件

```
<input
        type="checkbox"
        class="custom-control-input"
        id="cbFull"
        :checked="isFull"
        @change="fullChange"
      />
```

发送自定义事件

```
  methods: {
    fullChange(e){
        this.$emit('full-change',e.target.checked)
    }
  },
```

### 5.2 App.vue-父组件

监听子组件的事件变化

```
<Footer 
      :isFull="fullState" 
       @full-change="getFullState">
      </Footer>
```

实现Goods状态变化

```
getFullState(val){
      this.list.forEach(item=>(item.goods_state=val))
}
```

### 5.3 效果图

![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-50-cart-footer-import-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-50-cart-footer-fullstate.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-50-cart-footer-setstate.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-50-cart-footer-allcheck.gif