---
title: Vue2.0开发之——动态组件-keep-alive组件的include和exclude属性(56)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 1c5c8324
date: 2023-03-22 09:56:25
---
## 一 概述

* 使用keep-alive默认缓存
* keep-alive组件的include属性
* keep-alive组件的exclude属性

<!--more-->

## 二 使用keep-alive默认缓存—默认缓存所有组件

| 显示右侧时缓存Left | 显示左侧时缓存Right |
| :----------------: | :-----------------: |
|       ![][1]       |       ![][2]        |

## 三 keep-alive组件的include属性

### 3.1 使用说明

include属性用来指定：只有<font color=red>名称匹配的组件</font>会被缓存。多个组件名之间使用<font color=red>英文的逗号</font>分隔。

### 3.2 示例代码-缓存Left

App.vue中示例代码

```
<keep-alive include="Left">
       <component :is="comName"></component>
</keep-alive>
```

### 3.3 效果图-include-left

| 显示右侧时缓存Left | 显示左侧时不缓存Right |
| :----------------: | :-------------------: |
|       ![][4]       |        ![][3]         |

## 四 keep-alive组件的exclude属性

### 4.1 使用说明

* include属性和exclude属性只能保留其一，不能同时存在
* exclude属性指定哪些组件需要被缓存
* exclude属性指定哪些组件不需要被缓存

### 4.2 示例代码—不缓存Right

```
<keep-alive exclude="Right">
        <component :is="comName"></component>
</keep-alive>
```

### 4.3 效果图

同上

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-56-component-keep-alive-left.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-56-component-keep-alive-right.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-56-component-keep-alive-include-left.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-56-component-keep-alive-include-right.png
