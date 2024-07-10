---
title: Vue2.0开发之——Vue组件-组件属性(34)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: f04d2926
date: 2022-12-10 08:58:15
---
## 一 概述

* 为Count组件添加自定义属性
* 为自定义属性添加v-bind
* 自定义属性props是只读的
* 自定义属性default默认值
* 自定义属性type值类型
* 自定义属性required必填值

<!--more-->

## 二 为Count组件添加自定义属性

### 2.1 组件的props

props 是组件的<font color=red>自定义属性</font>，在<font color=red>封装通用组件</font>的时候，合理地使用 props 可以极大的<font color=red>提高组件的复用性</font>！ 它的语法格式如下

```
export default{
 //组件的自定义属性
 props:['自定义属性A','自定义属性B','其他自定义属性...'],
 //组件的私有数据
 data(){
   return {}
 }
}
```

### 2.2 自定义属性示例

#### Count.vue

布局代码

```
<template>
  <div>
    <h5>Count 组件</h5>
    <p>count 的值是：{{ count }}</p>
    <button @click="count += 1">+1</button>
  </div>
</template>
```

自定义属性

```
<script>
export default {
  props: ['init'],
  data() {
    return {
      count: this.init
    }
  },
}
</script>
```

#### Left.vue

```
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <hr />
    <MyCount :init="9"></MyCount>
  </div>
</template>
```

#### Right.vue

```
<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <hr />
    <MyCount init="6"></MyCount>
  </div>
</template>
```

#### 效果图
![][1]

## 三 为自定义属性添加v-bind

|      未添加v-bind(字符串)      |        添加v-bind(数字)         |
| :----------------------------: | :-----------------------------: |
| \<MyCount init="6">\</MyCount> | \<MyCount :init="6">\</MyCount> |
|             ![][2]             |             ![][3]              |

## 四 自定义属性props是只读的

### 4.1 使用自定义属性计算时出错

Count.vue代码文件

```
<template>
  <div>
    <h5>Count 组件</h5>
    <p>count 的值是：{{ init }}</p>
    <button @click="init += 1">+1</button>
  </div>
</template>
```

vue 规定：组件中封装的自定义属性是<font color=red>只读的</font>，程序员<font color=red>不能直接修改</font> props 的值。否则会直接报错

```
[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "init"

found in
```

### 4.2 如何修改自定义属性的值

要想修改 props 的值，可以<font color=red>把 props 的值转存到 data 中</font>，因为 data 中的数据都是可读可写的！

Count.vue逻辑文件

```
<script>
export default {
  props: ['init'],
  data() {
    return {
      count: this.init
    }
  },
}
</script>
```

Count.vue布局文件

```
<template>
  <div>
    <h5>Count 组件</h5>
    <p>count 的值是：{{ count }}</p>
    <button @click="count += 1">+1</button>
  </div>
</template>
```

效果图

![][4]

## 五 自定义属性default、type、required

### 5.1 将数组类型的props修改为对象类型

修改前

```
props: ['init'],
```

修改后

```
props: {
    // 自定义属性A : { /* 配置选项 */ },
    // 自定义属性B : { /* 配置选项 */ },
    // 自定义属性C : { /* 配置选项 */ },
    init: {
      // 如果外界使用 Count 组件的时候，没有传递 init 属性，则默认值生效
      default: 0,
      // init 的值类型必须是 Number 数字
      type: Number,
      // 必填项校验
      required: true
    }
  },
```

### 5.2 说明

* 在声明自定义属性时，可以通过 <font color=red>default </font>来<font color=red>定义属性的默认值</font>
* 在声明自定义属性时，可以通过 <font color=red>type</font> 来<font color=red>定义属性的值类型</font>
* 在声明自定义属性时，可以通过 <font color=red>required</font> 选项，将属性设置为<font color=red>必填项</font>，强制用户必须传递属性的值


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-34-props-define-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-34-vbing-no-string.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-34-vbing-yes-number.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-34-props-modify-preview.gif