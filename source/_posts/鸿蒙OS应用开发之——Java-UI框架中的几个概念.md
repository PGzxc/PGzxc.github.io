---
title: 鸿蒙OS应用开发之——Java UI框架中的几个概念
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 96bc9c53
date: 2020-12-31 15:15:14
---
## 一 概述

本文介绍java UI框架中的几个概念：

* 组件和布局
* Component组件和ComponentContainer
* LayoutConfig布局参数和属性类
* 组件树

<!--more-->

## 二 组件和布局

* 用户界面元素统称为`组件`，组件根据一定的 层级结构进行组合形成`布局`
* 组件在未被添加到布局中时，即无法显示也无法交互，因此一个用户界面至少包含一个布局
* 在UI框架中，具体的布局类通常以XXLayout命名，完整的用户界面是一个布局，用户界面中的一部分也可以是一个布局。
* 布局中容纳Component与ComponentContainer对象

## 三 Component和ComponentContainer

### 3.1 Component

* 提供内容显示，是界面中所有组件的基类
* 开发者可以给Component设置事件处理回调来创建一个可交互的组件
* Java UI框架提供了一些常用的界面元素，也可称之为组件
* 组件一般直接继承Component或它的子类，如Text、Image等

### 3.2 ComponentContainer

* 作为容器容纳Component或ComponentContainer对象，并对它们进行布局
* Java UI框架提供了一些标准布局功能的容器，它们继承自ComponentContainer，一般以`Layout`结尾，如DirectionalLayout、DependentLayout等

### 3.3 Component结构图

![][1]

## 四 LayoutConfig布局参数和属性类

### 4.1 概念

* 每种布局都根据自身特点提供LayoutConfig供子Component设定布局属性和参数
* 通过指定布局属性可以对子Component在布局中的显示效果进行约束
* 例如：`width`、`height`是最基本的布局属性，它们指定了组件的大小

### 4.2 LayoutConfig布局图
![][2]

## 五 组件树

* 布局把Component和ComponentContainer以树状的层级结构进行组织，这样的一个布局就称为组件树
* 组件树的特点是仅有一个根组件，其他组件有且仅有一个父节点，组件之间的关系受到父节点的规则约束





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-component-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-layoutconfig-view.png