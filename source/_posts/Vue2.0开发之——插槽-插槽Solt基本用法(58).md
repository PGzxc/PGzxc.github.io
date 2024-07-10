---
title: Vue2.0开发之——插槽-插槽Solt基本用法(58)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 97f5a655
date: 2023-03-23 13:53:59
---
## 一 概述

* 了解插槽的基本用法
* v-slot指令
* v-slot的简写形式
* 插槽的后备内容

<!--more-->

## 二 了解插槽的基本用法

### 2.1 什么是插槽

* <font color=red>插槽</font>(<font color=red>Slot</font>)是vue为<font color=red>组件的封装者</font>提供的能力。允许开发者在封装组件时，把<font color=red>不确定的、希望由用户指定的部分</font>定义为插槽。
* 可以把插槽认为是组件封装期间，为用户预留的<font color=red>内容的占位符</font>。

![][1]

### 2.2 插槽solt示例

Left.vue中定义插槽solt占位

```
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <hr>
    <!--声明一个插槽-->
    <slot></slot>
  </div>
</template>
```

App.ve中在组件Left中使用插槽

```
<Left>
    <p>这是在Left组件中的内容区域，声明的p标签</p>
</Left>
```

效果图
![][2]

## 三 v-slot指令

### 3.1 v-solt使用示例

#### 组件Left.vue中

```
<slot name="default"></slot>
```

说明：

* vue官方规定：每一个slot插槽，都要有一个name名称
* 如果省略了slot的name属性，则有一个默认名称叫做default

#### App.vue中，指定插槽具体组件

```
<Left>
    <template v-slot:default>
       <p>这是在Left组件中的内容区域，声明的p标签</p>
     </template>
</Left>
```

### 3.2 使用中可能出现的问题

直接在标签处使用`v-slot`

```
 <p v-slot:default>这是在Left组件中的内容区域，声明的p标签</p>
```

错误现象

```
 Errors compiling template:

  v-slot can only be used on components or <template>
```

解决方案：

将插槽中的内容使用\<template>包裹

```
<Left>
    <template v-slot:default>
        <p>这是在Left组件中的内容区域，声明的p标签</p>
     </template>
</Left>
```

说明：

* 默认情况下，在使用组件的时候，提供的内容都会被填充到名字为default的插槽之中
* 如果要把内容填充到指定名称的插槽中，需要使用`v-slot:`这个指令
* v-slot：后面要跟上插槽的名字
* v-slot：指令不能直接用在元素身上，必须用在template标签上
* template这个标签，它是一个虚拟的标签，只起到包裹性质的作用，但是，不会被渲染为任何实质性的html元素

## 四 v-slot的简写形式(`v-slot:`替换为`#`)

简写之前：

```
<Left>
     <template v-slot:default>
         <p>这是在Left组件中的内容区域，声明的p标签</p>
     </template>
</Left>
```

简写之后

```
<Left>
     <template #default>
         <p>这是在Left组件中的内容区域，声明的p标签</p>
      </template>
</Left>
```

## 五  插槽的后备内容

### 5.1 Left.vue后备内容

未填充后备内容

```
<slot name="default"></slot>
```

填充后备内容

```
<slot name="default">这是default插槽的默认内容</slot>
```

### 5.2 App.vue中未指定插槽

```
<Left>
</Left>
```

### 5.3 效果图
![][3]

App.vue中指定插槽的内容时，后备内容将被替换



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-58-solt-mycom-define.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-58-solt-mycom-use-p.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-58-solt-mycom-default-content.png