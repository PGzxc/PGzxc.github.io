---
title: Vue2.0开发之——Vue基础用法-v-on指令(19)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 890ceb09
date: 2022-11-15 08:45:44
---
## 一 概述

* v-on指令的基础用法
* 函数的简写形式
* 通过this访问数据源中的数据
* 绑定事件并传参
* v-on指令的简写形式

<!--more-->

## 二 v-on指令的基础用法

### 2.1 事件绑定指令

vue提供了v-on事件绑定指令，用来辅助程序员为DOM元素绑定事件监听。语法格式如下：

```
<h3>count的值为：{{count}}</h3>
<button v-on:click="addCount">+1</button>
```

### 2.2 示例

布局代码：

```
<div id="app">
      <p>count的值是：{{count}}</p>
      <button v-on:click="addCount">+1</button>
      <button>-1</button>
</div>
```

vue代码

```
const vm = new Vue({
    el:'#app',
    data:{count:0,},
    methods:{
        addCount:function(){
            console.log('ok')
        }
    }
   })
```

说明：

* 事件绑定用v-on:click标明
* v-on:click的方法调用写在methods中

## 三 函数的简写形式

未简写时：

```
addCount:function(){
            console.log('ok')
        }
```

简写后：

```
addCount(){
            console.log('ok')
        }
```

说明：简写后，去掉addCount后紧跟括号()，

## 四 通过this访问数据源中的数据

### 4.1 打印new Vue对象vm

```
const vm = new Vue({
    el:'#app',
    data:{
        count:0,
    },
    methods:{
        addCount(){
            console.log(vm)
        }
    }
})
```

打印结果：

![][1]

### 4.2 vm与this相等

```
console.log(vm==this)
```

打印结果为：true

### 4.3 使用this实现加减运算

布局代码

```
<div id="app">
     <p>count的值是：{{count}}</p>
     <button v-on:click="addCount">+1</button>
     <button v-on:click="minusCount">-1</button>
</div>
```

vue代码

```
const vm = new Vue({
    el:'#app',
    data:{
        count:0,
    },
    methods:{
        addCount(){
            this.count+=1;
        },
        minusCount(){
            this.count-=1;
        }
    }
})
```

效果图

![][2]

## 五 绑定事件并传参(给加法运算添加参数)

### 5.1 绑定事件添加参数

方法处

```
addCount(n){
            this.count+=n;
        }
```

方法调用处：

```
<button v-on:click="addCount(2)">+1</button>
```

### 5.2 效果图
![][3]

## 六 v-on指令的简写形式

由于 v-on 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 @ ）

简写前

```
<button v-on:click="addCount(2)">+1</button>
```

简写后

```
<button @click="addCount(2)">+1</button>
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-19-vm-print.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-19-add-minus.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-19-add-params.gif