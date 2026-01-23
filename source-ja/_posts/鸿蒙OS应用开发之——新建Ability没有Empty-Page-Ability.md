---
title: 鸿蒙OS应用开发之——新建Ability没有Empty Page Ability
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 51b3ad74
date: 2020-12-28 09:14:10
---
## 一 现象

当在项目的bundleName上右键，新建Ability时，只有`Empty Data Ability`和`Empty Service Ability`，没有：`Empty Feature Ability(JS)`、`Empty Feature Ability(Java)`、`List Feature Ability(JS)`

![][1]

<!--more-->

## 二 原因分析

### 2.1 设备模板不同

不同设备下，模板类别不同
![][2]

### 2.2 不同设备下的模板

|   设备   |                             模板                             |
| :------: | :----------------------------------------------------------: |
|  phone   | Empty Data Ability<br>Empty Page Ability(JS)<br>Empty Page Ability(Java)<br>Empty Service Ability<br> |
|  tablet  | Empty Data Ability<br/>Empty Page Ability(JS)<br/>Empty Page Ability(Java)<br/>Empty Service Ability<br/> |
|    tv    | Empty Data Ability<br/>Empty Page Ability(JS)<br/>Empty Page Ability(Java)<br/>Empty Service Ability<br/>List Feature Ability(JS) |
|   car    | Empty Data Ability<br/>Empty Page Ability(Java)<br/>Empty Service Ability<br/> |
| wearable | Empty Data Ability<br/>Empty Page Ability(JS)<br/>Empty Page Ability(Java)<br/>Empty Service Ability<br/>List Feature Ability(JS) |

## 三 deviceType同时设置了phone和tablet如何解决

deviceType同时设置了phone和table时，新建Ability时，只有`Empty Data Ability`和`Empty Service Ability`，此时可先设置一个如`phone`或`tablet`
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/homs-new-ability-lack-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/homs-ability-template-choice.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-create-abillity-second-sample.gif
