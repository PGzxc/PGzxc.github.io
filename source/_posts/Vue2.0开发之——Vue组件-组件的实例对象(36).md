---
title: Vue2.0开发之——Vue组件-组件的实例对象(36)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 78c9f529
date: 2023-01-10 11:10:18
---
## 一 概述

* 浏览器无法直接解析Vue文件
* package.json中的'vue-template-compiler'将vue结尾的文件解析为js文件交给浏览器处理
* Count组件实例对象

<!--more-->

## 二 浏览器无法直接解析Vue文件

将Vue文件拖放到浏览器中无法直接显示

![][1]

## 三 package.json中的'vue-template-compiler'将vue结尾的文件解析为js文件交给浏览器处理

vue-template-compiler将Left.vue、Right.vue、Count.vue处理后的文件放到app.js中

![][2]

## 四 Count组件实例对象
### 4.1 说明
* Count.vue是构造函数
* new MyCount就是创建MyCount的实例对象

### 4.2 创建实例
```
<MyCount :init="9"></MyCount>
```

使用标签的过程可以看错new创建实例的过程




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-36-vue-chrome-src.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-36-vue-template-compiler.png