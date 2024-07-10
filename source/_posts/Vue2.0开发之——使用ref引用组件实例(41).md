---
title: Vue2.0开发之——使用ref引用组件实例(41)
abbrlink: 556e40b2
date: 2023-02-26 10:28:56
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
---
## 一 概述

* 在本组件内部修改count的值
* 在父组件内修改子组件的count值

<!--more-->

## 二 在本组件内部修改count的值

### 2.1 Left.vue
布局代码

```
<template>
  <div class="left-container">
    <h3 >Left 组件---{{count}}</h3>
    <button @click="count +=1">+1</button>
    <button @click="resetCount">重置</button>
  </div>
</template>
```

逻辑代码

```
export default {
data(){
  return {
    count:0
  }
},
methods:{
  resetCount(){
    this.count=0
  }
}
}
```


### 2.2 在App.vue中导入自定义组件

导入Left.vue组件

```
import Left from '@/components/Left.vue'
```

注册组件

```
components: {
    Left,
}
```

渲染Left.vue组件

```
<div class="box">
     <!--渲染Left-->
     <Left></Left>
</div>
```

### 2.3 效果图

![][1]

## 三 在父组件内修改子组件的count值

### 3.1 给App.vue中的Left组件添加ref属性

```
<div class="box">
     <!--渲染Left-->
     <Left ref="comLeft"></Left>
 </div>
```

打印this，查看refs的打印内容(父组件可以拿到Left.vue)

![][2]

### 3.2 给父组件添加重置按钮，用于修改Left.vue子组件

```
<template>
  <div class="app-container">
    <h1 ref="myh1">App 根组件</h1>
    <button @click="showThis">打印this</button>
    <button @click="onReset">重置Left组件的count值为0</button>
    <hr>

    <div class="box">
      <!--渲染Left-->
      <Left ref="comLeft"></Left>
    </div>
    
  </div>
</template>
```
界面效果显示如下：
![][3]

### 3.3 通过comLeft的属性或方法重置子组件的count值

App.vue中重置子组件代码

```
//点击按钮，重置Left组件的count值
onReset(){
    //this.$refs.comLeft.resetCount() //通过方法修改
    this.$refs.comLeft.count=0 //通过属性修改
}
```

效果图

![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-41-ref-vuecomponent-left.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/web2.0-41-left-component-refs-print.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/web2.0-41-left-component-reset-button-add.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-41-ref-vuecomponent-father-modify.gif