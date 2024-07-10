---
title: Angular开发之——Angular介绍(01)
categories:
  - 开发
  - C-前端开发
  - Angular
tags:
  - Angular
abbrlink: d37420a4
date: 2023-05-13 11:42:09
---
## 一 概述

* Angular是什么
* AngularJS和Angular关系
* Angular特性
* Angular的发展历史
* Angular学习建议

<!--more-->

## 二  Angular是什么

* Angular(读音[ˈæŋɡjələr])是一套用于构建用户界面的javaScript框架。由Google开发和维护，主要被用来开发单页面应用程序
* 类似于Vue.js(MVVM数据驱动视图思想、组件化、模块化、指令等)
* 由Google开发和维护
* 开发单页面应用程序(SPA)

## 三 AngularJS和Angular关系

|      |       AngularJS        |       Angular       |
| :--: | :--------------------: | :-----------------: |
| 网站 | https://angularjs.org/ | https://angular.io/ |
| 界面 |         ![][1]         |       ![][2]        |

## 四 Angular特性

类似于Vue.js，有以下特性：

* MVVM
* 组件化
* 模块化
* 指令
* 服务
* 依赖注入
* TypeScript
* ....

## 五 Angular的发展历史

### 5.1 起源

* 2009年，Misko hevery和Adam abrons在业余时间打造了<font color=red>GetAngular</font>
* Misko hevery接手了Google内部的一个项目Feedback，该项目经过6个月的迭代代码量已经达到了17000行。项目的开发和维护变得非常困难。所以Misko就决定用<font color=red>GetAngular</font>重写这个项目
* 结果就是小伙子成功了，使用<font color=red>GetAngular</font>之后该项目从17000行缩减到了1500行，前后仅仅使用了三周时间
* Misko领导一看，小伙子厉害啊，同时也看到了<font color=red>GetAngular</font>所带来的商业价值，所以决定把<font color=red>GetAngular</font>正式立项，组织专职团队开发和维护
* Abrons后来离开了这个计划，但在Google工作的Hevery和一些谷歌员工如Igor Minar和Vojta Jina等则继续开发维护此库
* 由于已经不再是个人项目，所以开发团队将<font color=red>GetAngular</font>重新命名为<font color=red>AngularJS</font>

### 5.2 AngularJS发展迭代

至此，AngularJS就进入了漫长的发展迭代阶段

* 经过3年的发展，AugularJS在2012年6月，1.0.0版本正式推出
* AngularJS在1.2之后的版本不再支持IE6和7
* AngularJS在1.3之后不再支持IE8
* AngularJS在1.5增加了类似组件化的开发方式(为过度到Angular2做铺垫)
* AngularJS 1.x.x当前已发布到了1.8.3，并于2022年停止维护

### 5.3 困境

* 饱受诟病的性能问题(脏检查)
* 落后于当前Web发展理念(例如组件化、模块化支持不好)
* 对移动端支持不够友好

### 5.4 Angular2 横空出世

* Angular 1.x由于问题太多，历史包袱太重，重构几乎不可能
* 不过早在2014年3月，官方博客就有提及开发新版本Angular的计划
* 2014年9月下旬一个大会上，Angular2正式亮相
* 2016年9月15号，Angular2正式发布
* 由于ng2几乎完全重写了ng1，所以官方把2之后的版本都称之为Angular
* Angular2之后的logo：`A`

### 5.5 Angular1升级到Angular2?(ng2相比ng1)

* 移除了control+$scope的设计方式，改用了当前主流的组件化构建
* 相比ng1性能更好
* 优先为移动端设计
* 更贴合未来标准(EcmaScript 6、Web Component)
* TypeScript
* 反正就是更现代化，更好了

### 5.6  现状

* 自Angular2之后，官方承诺之后的版本都会兼容到Angular2
* 当前Angular最新发布版本为v16.x.x
* 新版的Angular在GitHub上也收获了`88k+`
* 使用量低于React和Vue

## 六 Angular学习建议

* 读官方文档
* 写demo测试
* 写小项目练手
* 参与实际项目开发经验
* 日积月累...

## 七 参考

* [AngularJS官网](https://angularjs.org/)
* [Angular官网](https://angular.io/)
* [Angular-Github](https://github.com/angular/angular)
* [Angular官方文档](https://angular.io/docs)
* [Angular中文官方文档](https://angular.cn/docs)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-01-angularjs-website.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-01-angular-website.png
