---
title: Vue2.0开发之——动态组件-keep-alive组件(55)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: '63262e04'
date: 2023-03-21 10:31:08
---
## 一 概述

* 使用keep-alive前后对比
* 未使用keep-alive时，状态变化
* 使用keep-alive时，状态变化
* keep-alive对应的生命周期函数

<!--more-->

## 二 使用keep-alive前后对比

| 使用之前 | 使用之后 |
| :------: | :------: |
|  ![][1]  |  ![][3]  |

## 三  未使用keep-alive时，状态变化

### 3.1 Left.vue中功能实现

####  给Left组件设置默认数据count

```
export default {
  data(){
    return {
      count:0
    }
  }
}
```

####  添加一个+按钮，实现自增功能

```
<template>
  <div class="left-container">
    <h3>Left 组件---{{ count }}</h3>
    <button @click="count+=1">+1</button>
  </div>
</template>
```

#### 添加Left组件的生命周期，并打印

```
  created() {
    console.log('Left组件被创建了')
  },
  destroyed(){
    console.log('Left组件被销毁了')
  }
```

### 3.2 App.vue中Left组件使用

```
<component :is="comName"></component>
```

### 3.3 切换时生命周期—销毁重建

离开时，把Left组件销毁了，进入时重新创建。

![][2]

## 四 使用keep-alive时，状态变化

### 4.1 App.vue中使用keep-alive包裹Left组件

```
<keep-alive>
      <component :is="comName"></component>
</keep-alive>
```

### 4.2 使用keep-alive之后，生命周期
![][4]

说明：keep-alive可以把内部的组件进行缓存，而不是销毁组件

## 五 keep-alive对应的生命周期函数

### 5.1 概念

* 当组件<font color=red>被缓存</font>时，会自动触发组件的<font color=red>deactivated</font>生命周期函数
* 当组件<font color=red>被激活</font>时，会自动触发组件的<font color=red>activated</font>生命周期函数

### 5.2 Left.vue组件的生命周期函数

```
  activated(){
    console.log('Left组件被激活了，activated')
  },
  deactivated(){
    console.log('Left组件被缓存了，deactivated')
  }
```

### 5.3 效果图

![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-55-component-keepalive-no.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-55-component-keepalive-no-life.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-55-component-keepalive-yes.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-55-component-keepalive-yes-life.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-55-component-keepalive-life.gif