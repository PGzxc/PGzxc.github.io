---
title: HarmonyOS第一课——应用程序框架(3)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 52f6f06
date: 2023-11-25 21:02:35
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-一个应用只能由一个UIAbility  <font color=red>(B)</font>

```
A-正确(True) 
B-错误(false)
```

注解(一个或多个UIAbility)：

```
UIAbility组件是系统调度的基本单元，为应用提供绘制界面的窗口。
一个应用可以包含一个或多个UIAbility组件。
例如，在支付应用中，可以将入口功能和收付款功能分别配置为独立的UIAbility
```

2-创建的Emty Ability模板工程，初始会生成一个UIAbility文件<font color=red>(A)</font>

```
A-正确(True) 
B-错误(false)
```

3-每调用一次router.pushUrl()方法，页面路由栈数量均会加1<font color=red>(B)</font>

```
A-正确(True) 
B-错误(false)
```

注解：与启动模式有关

### 2.2 单选题

1-API9及以上，router.pushUrl()方法，默认的跳转页面使用的模式是哪一种?<font color=red>(A)</font>

```
A-standard
B-Single
C-Specified
```

2-UIAbility启动模式需要在module.json5文件中配置哪个字段？<font color=red>(C)</font>

```
A-module
B-skills
C-launchType
D-ablities
```

### 2.3 多选题

1-API9及以上，router.pushUrl()方法的mode参数可以配置为以下哪几种跳转页面使用的模式？<font color=red>(AB)</font>

```
A-standard
B-Single
C-Specified
```

注解：[RouterMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-router-V5#routermode9)模式有两个选项：Standard、Single

2-UIAbility的生命周期有哪几个状态？<font color=red>(ACDF)</font>

```
A-Create
B-WindowStageCreate
C-Foreground
D-Background
E-WindowsStageDestroy
F-Destroy
```

3-UIAbility有哪几种的启动模式？<font color=red>(ABC)</font>

```
A-multition
B-singleton
C-specified
```

### 三 随堂测试截图

1-判断题

![][1]

2-单选题

![][2]

3-多选题

![][3]

4-随堂测试-结果

![][4]

## 四 随堂测试证书

![][5]

## 五 思维导图

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-multiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-centify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson3-xmind.png