---
title: Vue2.0开发之——组件数据共享-父向子传值(38)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 1a569955
date: 2023-01-12 09:26:27
---
## 一 概述

* 组件之间的关系
* 父向子传值
* 子向父传值

<!--more-->
## 二 组件之间的关系

### 2.1 组件之间的关系

![][1]

在项目开发中，组件之间的<font color=red>最常见的关系</font>分为如下两种

* <font color=red>父子关系</font>
* <font color=red>兄弟关系</font>

### 2.2 父子组件之间的数据共享

父子组件之间的数据共享又分为:

* <font color=red>父 -> 子</font>共享数据
* <font color=red>子 -> 父</font>共享数据

## 三 父向子传值

### 3.1 父向子传值过程

#### 父组件App.vue

```
export default {
  data() {
    return {
      message: 'hello 132 的宝们！',
      userinfo: { name: 'wsc', age: 18 },
    }
  },
}
```

####  子控件Left.vue

```
export default {
  props: ['msg', 'user'],
}
```

#### 子控件Left.vue注册父控件App.vue

导入

```
import Left from '@/components/Left.vue'
```

注册

```
export default {
  components: {
    Left,
    Right
  }
}
```

使用

```
<div class="box">
     <!-- 渲染 Left 组件和 Right 组件 -->
     <Left :msg="message" :user="userinfo"></Left>
</div>
```

#### 效果图

![][2]

### 3.2 不要修改props的值

#### Left.vue中值修改

```
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <p>msg 的值是：{{ msg }}</p>
    <p>user 的值是：{{ user }}</p>
    <button @click="msg = 'abc'">修改 msg</button>
    <button @click="user.name = 'zs'">修改 user</button>
    <hr />
  </div>
</template>
```

#### App.vue中内容

```
<template>
  <div class="app-container">
    <p>{{ userinfo }}</p>
    <hr />
    <div class="box">
      <Left :msg="message" :user="userinfo"></Left>
    </div>
  </div>
</template>
```

#### 效果图

![][3]

## 四  子向父传值

### 3.1 子组件Right.vue

布局文件

```
<template>
  <div class="right-container">
    <h3>Right 组件 --- {{ count }}</h3>
    <button @click="add">+1</button>
  </div>
</template>
```

逻辑文件

```
export default {
  data() {
    return {
      // 子组件自己的数据，将来希望把 count 值传给父组件
      count: 0,
    }
  },
  methods: {
    add() {
      // 让子组件的 count 值自增 +1
      this.count += 1
      // 把自增的结果，传给父组件
      this.$emit('numchange', this.count)
    }
  }
}
```

### 3.2 父组件App.vue

布局文件

```
<div class="box">
      <Right @numchange="getNewCount"></Right>
</div>
```

逻辑处理

```
export default {
  data() {
    return {
      // 定义 countFromSon 来接收子组件传递过来的数据
      countFromSon: 0
    }
  },
  methods: {
    // 获取子组件传递过来的数据
    getNewCount(val) {
      console.log('numchange 事件被触发了！', val)
      this.countFromSon = val
    }
  },
  components: {
    Left,
    Right
  }
}
```

### 3.3 效果图

![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-38-component-relates.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-38-relate-parent-son-result.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-38-relate-parent-son-props.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-38-relate-son-parent.gif