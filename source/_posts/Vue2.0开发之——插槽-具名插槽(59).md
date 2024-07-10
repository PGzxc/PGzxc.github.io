---
title: Vue2.0开发之——插槽-具名插槽(59)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: cd981aa9
date: 2023-03-23 13:55:08
---
## 一 概述

* 如果在封装组件时<font color=red>需要预留多个插槽节点</font>，则需要为每个 \<slot> 插槽指定<font color=red>具体的 name 名称</font>。
* 这种<font color=red>带有具体名称的插槽</font>叫做"具名插槽"

<!--more-->
## 二 具名插槽讲解—Vant-NavBar

![][1]

Slots说明

| 名称  |        说明        |
| :---: | :----------------: |
| title |     自定义标题     |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |


## 三 具名插槽示例—文章(标题/内容/署名)

### 3.1 Article.vue中定义插槽(标题/内容/署名)

```
<template>
  <div class="article-container">
    <h3 v-color="'red'">Article 组件</h3>
    <!-- 文章的标题 -->
    <div class="header-box">
      <slot name="title"></slot>
    </div>

    <!-- 文章的内容 -->
    <div class="content-box">
      <slot name="content"></slot>
    </div>

    <!-- 文章的作者 -->
    <div class="footer-box">
      <slot name="author"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // 首字母要大写
  name: 'Article',

}
</script>

<style lang="less" scoped>
.article-container {
  > div {
    min-height: 150px;
  }
  .header-box {
    background-color: pink;
  }
  .content-box {
    background-color: lightblue;
  }
  .footer-box {
    background-color: lightsalmon;
  }
}
</style>
```

### 3.2  App.vue使用插槽

```
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />
    <Article>
      <template #title>
        <h1>滕王阁序</h1>
      </template>

      <template #content>
        <p>豫章故郡，洪都信服</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越</p>
      </template>

      <template #author>
        <p>作者：王勃</p>
      </template>
    </Article>

  </div>
</template>
```

### 3.3  效果图

![][2]

## 四 参考

* [Vant 4](https://vant-contrib.gitee.io/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-59-solt-use-vant-navbar.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-59-solt-use-article-preview.png
