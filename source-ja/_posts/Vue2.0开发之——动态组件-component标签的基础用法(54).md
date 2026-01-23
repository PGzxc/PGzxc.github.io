---
title: Vue2.0开发之——动态组件-component标签的基础用法(54)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 7b61f19d
date: 2023-03-21 10:30:00
---
## 一 概述

* 什么是动态组件
* 创建默认项目
* 如何实现动态组件渲染
* 可能出现的错误
* 动态切换组件的显示与隐藏

<!--more-->

## 二 什么是动态组件

动态组件指的是<font color=red>动态切换组件的显示与隐藏</font>

## 三 创建默认项目

### 3.1 默认项目图示(只有根组件)
![][2]

### 3.2 导入注册Left,Right组件

导入Left,Right组件

```
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'
```

注册Left，Right组件

```
export default {
  components:{
    Left,
    Right
  }
}
```

使用Left，Right组件

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>
```

导入组件后的默认效果图

![][3]

## 四 如何实现动态组件渲染

### 4.1 动态组件概念

vue提供了一个内置的<font color=red>\<component></font>组件，<font color=red>专门用来实现动态组件的渲染</font>。过程如下：

* 当前要渲染的组件名称
* 通过`is`属性，动态指定要渲染的组件
* 点击按钮，动态切换组件的名称

实例代码

![][1]


### 4.2 动态组件渲染过程—固定写死

component组件通过is指定要渲染的组件

```
<component is="Left"></component>
```

Left组件渲染效果图

![][4]

### 4.3 动态组件渲染过程——动态绑定

动态绑定组件名称comName声明

```
export default {
  data(){
    return {
      comName:'Left'
    }
  },
  components:{
    Left,
    Right
  }
}
```

使用comName为组件赋值

```
<component :is="comName"></component>
```


## 五 可能出现的错误

### 5.1  make sure to provide the "name" option
错误信息

```
vue.runtime.esm.js?2b0e:619 [Vue warn]: Unknown custom element: <component> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

found in

---> <App> at src/App.vue
       <Root>
```

原因—只使用component时

```
<component></component>
```

### 5.2 '\<component>' elements to have 'v-bind:is' attribute."

错误信息

```
[vue/require-component-is]
Expected '<component>' elements to have 'v-bind:is' attribute.eslint-plugin-vue
```

消极方案 - 屏蔽提示

```
文件->首选项->设置，输入 vetur.validation.template，去掉 "Validate vue-html in <template> using eslint plugin-vue" 的勾选，然后重启 VSCODE
```

### 5.3 Unchecked runtime.lastError

错误信息

```
Unchecked runtime.lastError: The message port closed before a response was received.
xl-content.js:1 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'websiteDomains')
```

解决方案：

迅雷插件的问题，将迅雷插件关闭

## 六 动态切换组件的显示与隐藏

### 6.1 添加切换按钮

```
<button  @click="comName='Left'">展示Left</button>
<button  @click="comName='Right'">展示Right</button>
```

### 6.2 效果图
![][5]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-54-component-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-54-component-modify-before.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-54-component-compoent-import.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-54-component-left-preview.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-54-component-switch.gif