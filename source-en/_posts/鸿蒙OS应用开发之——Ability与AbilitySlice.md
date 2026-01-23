---
title: 鸿蒙OS应用开发之——Ability与AbilitySlice
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 42edb2ab
date: 2020-12-28 13:09:16
---
## 一 概述

鸿蒙应用中在创建页面时，会生成两个类：

* MainAbility与MainAbilitySlice和一个布局文件layout_main.xml
* config.json中配置的启动页面是`MainAbility`
* 和布局文件`layout_main.xml`关联的是`MainAbilitySlice`
* MainAbility通过`SetMainRoute`关联`MainAbilitySlice`

<!--more-->

## 二 术语解释

### 2.1 **Ability**

应用的重要组成部分，是应用所具备能力的抽象。Ability分为两种类型，Feature Ability和Particle Ability

#### **FA**

Feature Ability，元程序，代表有界面的Ability，用于与用户进行交互

#### **PA**

Particle Ability，元服务，代表无界面的Ability，主要为Feature Ability提供支持，例如作为后台服务提供计算能力，或作为数据仓库提供数据访问能力。

### 2.2 **AbilitySlice**

切片，是单个可视化界面及其交互逻辑的总和，是Feature Ability的组成单元。一个Feature Ability可以包含一组业务关系密切的可视化界面，每一个可视化界面对应一个AbilitySlice

## 三 总结

* Ability可以由界面(如Feature Ability)，也可以没有界面(如Particle Ability)
* 有界面要显示时，通过`setMainRoute`关联要显示的`AbilitySlice`
* 设置布局文件、处理业务逻辑的代码写在`AbilitySlice`中

