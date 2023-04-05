---
title: Vue2.0开发之——动态组件-组件注册名称和组件声明时名称的区别(57)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 47548e0c
date: 2023-03-22 10:25:56
---
## 一 概述

* 组件注册名称和组件声明名称概念
* 组件注册名称和组件声明名称示例

<!--more-->

## 二 组件注册名称和组件声明名称概念

### 2.1 组件声明名称—Left.vue

* 在组件声明时使用，如Left.vue中
* 当提供了name属性之后，组件的名称就是name属性的值

### 2.2  组件注册名称—App.vue

* 在App.vue中的components注册组件时的名称
* 如果在“声明组件”的时候，没有为组件指定name名称，则组件的名称默认就是注册时候的名称

### 2.3 注意事项

* 当为组件声明名称时，include和exclude中的名称保持一致
* 组件的“注册名称”的主要应用场景是：以标签的形式，把注册好的组件，渲染和使用到页面结构中
* 组件声明时候的“name”名称的主要应用场景：结合\<keep-alive>标签实现组件缓存功能；以及在调试工具中看到组件

## 三  组件注册名称和组件声明名称示例

### 3.1 组件声明名称——Left.vue和Right.vue

Left.vue

```
export default {
  name:'MyLeft'
}
```

Right.vue

```
export default {
  name:'MyRight'
}
```

### 3.2 组件注册名称—App.vue中component中注册

注册组件名称的使用App.vue的components中

```
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'

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

keep-alive中使用

```
<keep-alive include="MyLeft">
        <component :is="comName"></component>
</keep-alive>
```


