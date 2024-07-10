---
title: HarmonyOS第一课——ArkTS开发语言介绍(2)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: ac314a13
date: 2023-11-24 17:35:29
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-循环渲染ForEach可以从数据源中迭代获取数据，并为每个数组项创建相应的组件  <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

2-@Link变量不能在组件内部进行初始化  <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

注解：状态管理

```
@Link selectedDate: Date;//无，禁止本地初始化。
```

### 2.2  单选题

1-用哪一种装饰器修饰的struct表示该结构体具有组件化能力 ? <font color=red>(A)</font>

```
A-@Component
B-@Entry
C-@Builder
D-@Preview
```

2-用哪一种装饰器修饰的自定义组件可作为页面入口组件？ <font color=red>(B)</font>

```
A-@Component
B-@Entry
C-@Builder
D-@Preview
```



### 2.3 多选题

1-下面哪些函数是自定义组件的生命周期函数？<font color=red>(ABCDE)</font>

```
A-aboutToAppear
B-aboutToDisappear
C-onPageShow
D-onPageHide
E-onBackPress
```

注解：[页面和自定义组件生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-page-custom-components-lifecycle-V5)

```
组件和页面生命周期
```

2-下面哪些装饰器可以用于管理自定义组件中变量的状态？<font color=red>(CD)</font>

```
A-@Component
B-@Entry
C-@State
D-@Link
```

## 三 随堂测试截图

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



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-multiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-certify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson2-xmind.png