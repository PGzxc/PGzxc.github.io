---
title: HarmonyOS第一课——构建更加丰富的页面(5)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 3e8188dc
date: 2023-11-25 22:25:57
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-@State修饰的属性不允许在本地进行初始化 <font color=red>(B)</font>

```
A-正确(True)
B-错误(False)
```

2-@CustomDialog装饰器用于装饰自定义弹窗组件，使得弹窗可以自定义内容及样式 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

3-将Video组件的controls属性设置为false时，不会显示控制视频播放的控制栏 <font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

4-@Prop修饰的属性值发生变化时，此状态变化不会传递到其父组件<font color=red>(A)</font>

```
A-正确(True)
B-错误(False)
```

注解：@Prop装饰器：父子单向同步。@Prop装饰的变量是可变的，但是变化不会同步回其父组件

### 2.2 单选题

1-使用Video组件播放网络视频时，需要以下哪种权限？<font color=red>(B)</font>

```
A-ohos.permission.READ_MEDIA
B-ohos.permission.INTERNET
C-ohos.permission.WRITE_MEDIA
D-ohos.permission.LOCATION
```

2-下列哪种组合方式可以实现子组件从父子组件单向状态同步 <font color=red>(C)</font>

```
A-@State和@Link
B-@Provide和@Consume
C-@State和@Prop
D-@Observed和@ObjectLink
```

### 2.3 多选题

1-下列哪些状态装饰器修饰的属性必须在本地进行初始化 <font color=red>(AD)</font>

```
A-@State
B-@Prop
C-@Link
D-@Provide
E-@Cosume
```

2-ArkUI提供了下面哪些弹窗功能 <font color=red>(ABCDE)</font>

```
A-AlertDialog
B-TextPickerDialog
C-DatePickerDialog
D-@CustomDialog
E-TimePickerDialog
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





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-choice-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-single-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-mulitiple-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-result-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-centify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson5-xmind.png