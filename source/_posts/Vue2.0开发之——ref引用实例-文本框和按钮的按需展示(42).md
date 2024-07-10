---
title: Vue2.0开发之——ref引用实例-文本框和按钮的按需展示(42)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 2cc37c0d
date: 2023-02-27 09:13:17
---
## 一 概述

* 文本框和按钮按需展示功能实现
* 了解this.$nextTick的应用场景
* updated为啥不行

<!--more-->

## 二 文本框和按钮按需展示功能实现

### 2.1 布局文件

```
<template>
  <div class="app-container">

    <input type="text" v-if="inputVisible" @blur="showButton">
    <button v-else @click="showInput">展示输入框</button>

  </div>
</template>
```

### 2.2 逻辑文件

```
export default {
  methods:{
    showInput(){
      this.inputVisible=true
    },
    showButton(){
      this.inputVisible=false
    }
  },
  data() {
    return {
      //控制输入框和按钮的按需切换；
      //默认值为false,表示默认展示按钮，隐藏输入框
      inputVisible: false
    }
  },

}
```

### 2.3 效果图
![][1]

## 三 了解this.$nextTick的应用场景

### 3.1 当文本框显示时，自动获取焦点

布局文件(给input添加ref属性)

```
<input type="text" v-if="inputVisible" @blur="showButton" ref="iptRef">
<button v-else @click="showInput">展示输入框</button>
```

代码文件(input添加focus方法)

```
showInput(){
    //1.切换布尔值，把文本框显示出来
     this.inputVisible=true
     //2.让展示出来的文本框，自动获取焦点
     this.$refs.iptRef.focus()
 },
```

结果

```
vue.runtime.esm.js?c320:4605 [Vue warn]: Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'focus')"

found in

---> <App> at src/App.vue
       <Root>
vue.runtime.esm.js?c320:3049 TypeError: Cannot read properties of undefined (reading 'focus')
    at VueComponent.showInput (App.vue?11c4:41:1)
    at invokeWithErrorHandling (vue.runtime.esm.js?c320:3017:1)
    at HTMLButtonElement.invoker (vue.runtime.esm.js?c320:1815:1)
    at original_1._wrapper (vue.runtime.esm.js?c320:7473:1)
```

原因：

iptRef为空，导致focus方法出错

### 3.2 this.$nextTick(cb) 方法

组件的 <font color=red>$nextTick(cb) </font>方法，会把 cb 回调<font color=red>推迟到下一个 DOM 更新周期之后执行</font>。通俗的理解是：等组件的
DOM 更新完成之后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素

### 3.3 使用this.$nextTick(cb) 方法修改后

代码

```
showInput(){
      //1.切换布尔值，把文本框显示出来
      this.inputVisible=true
      //2.让展示出来的文本框，自动获取焦点
      this.$nextTick(()=>{
        this.$refs.iptRef.focus()
      })
    }
```

## 四 updated为啥不行

### 4.1 updated修改

```
updated(){
    this.$refs.iptRef.focus()
  },
```

### 4.2 现象

创建时正常，销毁时出错，错误现象如下：

```
vue.runtime.esm.js?c320:4605 [Vue warn]: Error in updated hook: "TypeError: Cannot read properties of undefined (reading 'focus')"

found in

---> <App> at src/App.vue
```

### 4.3 原因

* 第一次(创建时)，input展示获取焦点—正常
* 第二次(销毁时)，input不展示，又获取焦点—失败

![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-42-ref-vuecomponent-button-input-show.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-42-ref-vuecomponent-update.png