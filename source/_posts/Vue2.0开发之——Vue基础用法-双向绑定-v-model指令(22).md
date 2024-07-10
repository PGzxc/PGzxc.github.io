---
title: Vue2.0开发之——Vue基础用法-双向绑定-v-model指令(22)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 5272d24f
date: 2022-11-18 09:34:30
---
## 一 概述

* 了解v-model指令的用法
* v-model的修饰符

<!--more-->

## 二 了解v-model指令的用法

### 2.1 v-model

vue 提供了 v-model 双向数据绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取表单的数据。

### 2.2 示例-1

布局代码

```
<div id="app">
      <p>用户的名字是：{{username}}</p>
      <input type="text" v-model="username">
</div>
```

数据代码

```
data:{
       username:'zhangsan',
    }
```

效果图

![][1]

### 2.3 v-model与v-bind的区别

布局代码

```
<div id="app">
      <p>用户的名字是：{{username}}</p>
      <input type="text" v-model="username">
      <hr>
      <input type="text" v-bind:value="username">
</div>
```

数据代码

```
data:{
       username:'zhangsan',
    }
```

分别操作v-model和v-bind效果图

![][2]

说明：

* v-model：用于input、textarea、select，双向绑定
* v-bind：单向绑定(数据变化引起布局显示变化)

### 2.4 v-model作用于select

布局代码

```
<div id="app">
     <select v-model="city">
        <option value="">请选择城市</option>
        <option value="1">北京</option>
        <option value="2">上海</option>
        <option value="3">广州</option>
     </select>
</div>
```

数据代码

```
data:{
       city:''
    },
```

效果图
![][3]

## 三 v-model的修饰符

### 3.1 v-model指令的修饰符

为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：

| 修饰符  |              作用              |              示例               |
| :-----: | :----------------------------: | :-----------------------------: |
| .number | 自动将用户的输入值转为数值类型 | \<input v-model.number="age" /> |
|  .trim  | 自动过滤用户输入的首尾空白字符 |  \<input v-model.trim="msg" />  |
|  .lazy  | 在“change”时而非“input”时更新  |  \<input v-model.lazy="msg" />  |

### 3.2 示例用法

#### .number 

布局代码

```
<div id="app">
      <input type="text" v-model.number="n1">+<input type="text" v-model.number="n2">=<span>{{n1+n2}}</span>
</div>
```

数据代码

```
data:{
        n1:1,
        n2:2
    },
```

效果图
![][4]

#### .trim

布局代码

```
<div id="app">
       <input type="text" v-model.trim="username">
       <button @click="showName">获取用户名</button>
</div>
```

数据代码

```
data:{
      username:""
    },
```

vue代码

```
showName(){
        console.log(`用户名是："${this.username}"`)
      }
```

效果图
![][5]

#### .lazy

布局代码

```
<div id="app">
       <input type="text" v-model.lazy="username">
</div>
```

数据代码

```
data:{
      username:""
    },
```

效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-sample1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-bind-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-select-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-number-sample.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-trim-sample.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-22-v-model-lazy-sample.gif