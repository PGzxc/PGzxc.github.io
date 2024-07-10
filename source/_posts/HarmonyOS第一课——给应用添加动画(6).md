---
title: HarmonyOS第一课——给应用添加动画(6)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 6d925bdf
date: 2023-11-25 22:55:31
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-属性动画中产生动画的属性可以在任意位置声明 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

注解：把animation接口加在要做属性动画的可动画属性后即可

2-属性动画中改变属性时需出发UI状态更新 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

### 2.2 单选题

1-属性animation可以在哪些组件中使用？<font color=red>(C)</font>

```
A-只能基础组件
B-只能容器组件
C-基础组件和容器组件
D-以上都不对
```

2-属性动画中如何设置反向播放？<font color=red>(D)</font>

```
A-PlayMode.Normal
B-PlayMode.Alternate
C-PlayMode.AlternateReverse
D-PlayMode.Reverse
```

3-下面哪种情况不会回调onFinish函数？ <font color=red>(C)</font>

```
A-delay设置为0
B-tempo设置为1
C-iterations设置为-1
D-playMode设置为PlayMode.Reverse
```

注解：iterations动画播放次数，卡片中禁止设置此参数，使用默认值1

4-属性动画中关于animation参数说法错误的是？<font color=red>(B)</font>

```
A-参数tempo默认值为1.0
B-参数delay不能大于duration
C-参数curve可以不设置
```

### 2.3 多选题

1-属性动画支持哪些属性？<font color=red>(ABCD)</font>

```
A-width
B-rotate
C-opacity
D-scale
```

2-属性动画中animation的参数有哪些？<font color=red>(ABCD)</font>

```
A-playMode
B-curve
C-delay
D-onFinish
```

## 三 随堂测试截图

1-判断题

![][1]

2-单选题

![][2]

3-多选题

![][3]

4-随堂测试截图

![][4]

## 四 随堂测试证书

![][5]

## 五 思维导图

![][6]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-mulitiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-centify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson6-xmind.png