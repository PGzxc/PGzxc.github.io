---
title: Vue2.0开发之——Vue基础用法-vue-cli(30)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 22a67ee4
date: 2022-12-02 15:01:32
---
## 一 概述

* vue-cli—介绍并安装vue-cli
* vue-cli—基于vue-cli创建vue项目
* vue-cli—项目预览效果
* vue-cli—项目目录结构
* vue-cli—vue项目运行过程
* vue-cli—组件的基本使用

<!--more-->

## 二  vue-cli—介绍并安装vue-cli

### 2.1 什么是单页面应用程序

<font color=red>单页面应用程序</font>（英文名：Single Page Application）简称 SPA，顾名 思义，指的是<font color=red>一个 Web 网站中只有唯一的一个 HTML 页面</font>，所有的功能 与交互都在这唯一的一个页面内完成。

例如这个 Demo 项目

![][1]

### 2.2 什么是 vue-cli

* <font color=red>vue-cli 是 Vue.js 开发的标准工具</font>。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。
* 引用自 vue-cli 官网上的一句话： 程序员可以<font color=red>专注在撰写应用上</font>，而不必花好几天去纠结 webpack 配置的问题
* 中文官网：https://cli.vuejs.org/zh

### 2.3 安装和使用

vue-cli 是 npm 上的一个全局包，使用 npm install 命令，即可方便的把它安装到自己的电脑上

```
npm install -g @vue/cli
```
![][2]
输入如下指令，查看vue版本

```
vue -V
```
![][3]

## 三 vue-cli—基于vue-cli创建vue项目
在cmd终端打开要创建的vue项目
![][4]
在终端运行如下指令，创建指定名称的项目

```
vue create 项目的名称
```
![][5]

调整上下箭头，选择预设(本文选择第三种：手动选择)
![][6]
回车后，选择配置项
![][7]
再次回车，选择vue版本（本次选择vue2.x）
![][8]
下一步选择预处理器(本文选择Less)
![][9]
回车选择第三方插件的配置方式(本文选自In dedicated config files-独立配置文件)
![][10]
回车后，弹出保存上面配置选项，供下次使用
![][11]
设置保存配置名称
![][12]
项目开始创建
![][13]
创建完成后，如图所示
![][14]

## 四 vue-cli—项目预览效果
分别执行如下的两条指令启动项目

```
cd demo-first
npm run serve
```
![][15]
执行之后，项目运行
![][16]
打开链接后，显示效果图
![][17]

## 五 vue-cli—项目目录结构
将demo-first拖到vscode后，打开项目
![][18]
目录介绍：

### 5.1 node_modules

npm加载项目的依赖模块

### 5.2 public

* favicon.icon：网站图标
* index.html：网站页面文件

### 5.3 src：源码目录

* assets ---- 资源目录，这里的资源会被wabpack构建
* components ---- 公共组件目录
* app.vue ---- 根组件
* main.js ---- 入口js文件

### 5.4 .gitignore

git版本控制忽略文件

### 5.5 babel.config.js

babel配置文件

### 5.6 package.json

npm包配置文件，定义项目的npm脚本、依赖包等信息

### 5.7 vue.config.js

vue项目配置文件，如：配置项目的入口路径和输出文件和各种插件配置

## 六 vue-cli—vue项目运行过程

### 6.1 vue 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过<font color=red> main.js</font>把 <font color=red>App.vue</font> 渲染到 <font color=red>index.html</font> 的指定区域中。

其中：

* <font color=red>App.vue</font> 用来编写待渲染的<font color=red>模板结构</font>
* <font color=red>index.html</font> 中需要预留一个 <font color=red>el 区域</font>
* <font color=red>main.js</font> 把 App.vue 渲染到了 index.html 所预留的区域中

### 6.2 项目修改

1-App.vue代码修改(删除默认代码，只保留如下代码)

```
<template>
  <h1>App.vue组件</h1>
</template>
```

2-main.js代码修改($mount替换未el)

```
new Vue({
  el:'#app',
  render: h => h(App),
})

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
```

3-public/index.html种app的位置
![][19]

4-效果图
![][20]

## 七 vue-cli—组件的基本使用

### 7.1 将App.vue替换为自定义Vue

1-自定义Test.vue替换App.vue

```
<template>
    <div>
        <h3>这是用户自定义的Test.vue</h3>
    </div>
</template>
```

2-将main.js种的App替换为Test

```
import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

说明：vue实例种的`$mount()`方法和作用与el属性完全一样

### 7.2 将index.html种的el替换为`$mount()`

```
<body>
  <div id="app">{{username}}</div>
  <script src="./lib/vue-2.6.12.js"></script>
  <script>
    const vm = new Vue({
      data: {
        username: 'admin'
      }
    })
    vm.$mount('#app')
  </script>
</body>
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-spa-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-install-g.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-vue-v.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-dist-open-cmd.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-name.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-preset.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-features.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-vue.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-less.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-config.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-config-save.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-config-save-name.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-start-create.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-create-project-create-finish.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-run-project-cmd.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-start-project-cmd.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-open-webpage.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-open-vscode.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-public-index-app.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-30-vue-cli-public-index-app-preview.png