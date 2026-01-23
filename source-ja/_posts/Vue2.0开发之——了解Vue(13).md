---
title: Vue2.0开发之——了解Vue(13)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: f9f8f559
date: 2022-11-04 12:18:52
---
## 一 概述

* 了解Vue是什么
* Vue得两个特性
* MVVM

<!--more-->

## 二 了解Vue是什么

### 2.1 什么是Vue

官方给出的概念：Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的前端框架

### 2.2 Vue版本

当前，vue 共有 3 个大版本，其中：

* 2.x 版本的 vue 是目前企业级项目开发中的主流版本
* 3.x 版本的 vue 于 2020-09-19 发布，生态还不完善，尚未在企业级项目开发中普及和推广
* 1.x 版本的 vue 几乎被淘汰，不再建议学习与使用

### 2.3 总结

* 3.x 版本的 vue 是未来企业级项目开发的趋势；
* 2.x 版本的 vue 在未来（1 ~ 2年内）会被逐渐淘汰；

## 三 Vue得两个特性

vue 框架的特性，主要体现在如下两方面：

* 数据驱动视图
* 双向数据绑定

### 3.1 数据驱动视图

在使用了 vue 的页面中，vue 会监听数据的变化，从而自动重新渲染页面的结构。示意图如下：
![][1]

说明：
* 好处：当页面数据发生变化时，页面会自动重新渲染
* 注意：数据驱动视图是`单向得数据绑定`

### 3.2 双向数据绑定

在填写表单时，双向数据绑定可以辅助开发者在不操作 DOM 的前提下，自动把用户填写的内容同步到数据源 中。示意图如下：

![][2]

好处：开发者不再需要手动操作DOM元素，来获取表单元素最新的值

## 四 MVVM

### 4.1 概念

MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。MVVM 指的是 Model、View 和 ViewModel， 它把每个 HTML 页面都拆分成了这三个部分，如图所示：

### 4.2 模型
![][3]

说明：
* Model 表示当前页面渲染时所依赖的数据源。
* View 表示当前页面所渲染的 DOM 结构。
* ViewModel 表示 vue 的实例，它是 MVVM 的核心




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-13-data-view-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-13-data-view-binding.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-13-mvvm-struct.png

