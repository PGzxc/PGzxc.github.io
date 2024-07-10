---
title: Vue2.0开发之——自定义指令(62)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: c2393029
date: 2023-03-27 18:58:44
---
## 一 概述

* 什么是自定义指令
* 自定义指令分类
* 私有自定义指令
* 全局自定义指令

<!--more-->

## 二 什么是自定义指令

* vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令
* 除此之外 vue 还允许开发者自定义指令。

## 三 自定义指令分类

vue 中的自定义指令分为两类，分别是：

* <font color=red>私有</font>自定义指令
* <font color=red>全局</font>自定义指令

## 四 私有自定义指令

### 4.1 使用自定义指令v-color出现的错误

代码(v-color直接使用)

```
 <h1 v-color>App 根组件</h1>
```

错误信息

```
vue.runtime.esm.js?2b0e:619 [Vue warn]: Failed to resolve directive: color

(found in <App> at src/App.vue)
```

![][1]

### 4.2 声明自定义指令

在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令

```
directives:{
    color:{
      bind(el){
        el.style.color='red'
      }
    }
  }
```

说明：

* directives位于export default下，与data、components同一目录
* el：指绑定了次指令的、原生的DOM对象

### 4.3 使用自定义指令

在使用自定义指令时，需要加上 v- 前缀

```
<h1 v-color>App 根组件</h1>
```

效果图(App跟组件颜色)
![][2]

### 4.4 为自定义指令动态绑定参数值

在 template 结构中<font color=red>使用自定义指令</font>时，可以通过等号（<font color=red>=</font>）的方式，为当前指令<font color=red>动态绑定参数值</font>

定义color的值

```
data() {
    return {
      color: 'red'
    };
  },
```

在使用指令时，动态为当前指令绑定参数值color

```
<h1 v-color="color">App 根组件</h1>
```

### 4.5 通过 binding 获取指令的参数值

在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值：

自定义指令修改

```
directives:{
    color:{
      bind(el,binding){
        el.style.color=binding.value
      }
    }
  }
```

通过binding获取参数

```
<p v-color="'red'">测试</p>
```

### 4.6 update 函数

bind 函数<font color=red>只调用 1 次</font>：当指令第一次绑定到元素时调用，<font color=red>当 DOM 更新时 bind 函数不会被触发</font>。 update 函数会在<font color=red>每次 DOM 更新时</font>被调用

界面上添加button按钮，改变颜色

```
<button @click="color='green'">改变color的颜色值</button>
```

按钮点击时，触发事件(update方法)

```
directives:{
    color:{
      bind(el,binding){
        el.style.color=binding.value
      },
      update(el,binding){
        el.style.color=binding.value
      }
    }
  }
```

效果图
![][3]

### 4.7 自定义指令函数简写

如果 <font color=red>insert</font> 和<font color=red>update</font> 函数中的<font color=red>逻辑完全相同</font>，则<font color=red>对象格式</font>的自定义指令可以简写成<font color=red>函数格式</font>

```
directives:{
    color(el,binding){
        el.style.color=binding.value
      }
  }
```

## 五 全局自定义指令

### 5.1 全局自定义指令声明

全局共享的自定义指令需要通过“Vue.directive()”进行声明。全局自定义指令声明在main.js文件中

一般形式：

```
Vue.directive('color',{
  bind(el,binding){
    el.style.color=binding.value
  },
  update(el,binding){
    el.style.color=binding.value
  }
})
```

简写形式：

```
Vue.directive('color',function(el,binding){
  el.style.color=binding.value
})
```

### 5.2 在Article.vue组件中使用全局自定义指令

```
<h3 v-color="'red'">Article 组件</h3>
```

效果图(Article颜色)
![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-62-direct-v-color-error-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-62-direct-v-color-use-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-62-direct-update-view.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-62-direct-whole-view.png



