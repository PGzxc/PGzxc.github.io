---
title: HarmonyOS第一课——使用DevEco Studio高效开发(10)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 927e5b01
date: 2023-11-26 10:58:41
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-用哪一种装饰器修饰的组件可作为页面入口组件？<font color=red>(B)</font>

```
A-@Component
B-@Entry
C-@Preview
D-@Builder
```

2-ArkTS Stage模型支持API Version9，关于其工程目录结构说法正确的是？<font color=red>(C)</font>

```
A-on-package.json5用于存放应用级配置信息，包括签名、产品配置等
B-build-profile.json5用于配置三方包声明文件的入口及包名
C-module.json5包含HAP的配置信息，应用在具体设备上的配置信息及应用的全部配置信息
D-app.json5用于编写应用级编译构建任务脚本
```

注解：

```
1-app.json5：应用的全局配置信息
2-module.json5：模块配置文件。主要包含HAP包的配置信息
3-build-profile.json5：模块及工程级配置信息
4-on-package.json5：来描述包名、版本、入口文件（类型声明文件）和依赖项等信息
5-hvigorfile.ts：编译构建任务脚本
```

3-DevEco Studio提供模拟器开发者运行和调试HarmonyOS应用/服务，以下说法错误的是？<font color=red>(A)</font>

```
A-本地模拟器是创建和运行在本地计算机上的，需要登录授权
B-本地模拟器支持音量大小调节、电池电量调节、屏幕旋转等功能
C-向本地模拟器安装应用/服务的时候，不需要给应用签名
D-DevEco Studio会启动应用/服务的编译构建，完成后应用/服务即可运行在本地模拟器上
```

### 2.2 多选题

1-DevEco Studio支持使用多种语言进行应用/服务的开发，包括ArkTS、JS和C/C++。在编写应用/服务阶段，可以通过以下哪些方法提升编码效率？<font color=red>(ABCD)</font>

```
A-提供代码的智能补齐功能，编辑器工具会分析师行下文并理解项目内容，并根据输入的内容，提示可补齐的类、方法、字段和关键字的名称等
B-在编辑器中调用ArkTS API接口或ArkTS/JS组件时，支持在编辑器中快速、精准调取出对应的参考文档
C-代码格式化功能可以帮助您快速的调整和规范代码格式，提升代码的美观度和可读性
D-如果输入的语法不符编码规范，或者出现语义语法错误，编辑器会显示错误或警告
```

2-关于预览器的使用，以下哪些说法是正确的？ <font color=red>(ABCD)</font>

```
A-在开发界面UI代码过程中，如果添加或删除了UI组件，您只需Ctrl+S进行保存，然后预览器就会立即刷新预览结果
B-在预览器界面，可以在预览器中操作应用/服务的界面交互动作，如单击、跳转、滑动等，与应用/服务运行在真机设备上的界面交互体验一致
C-组件预览通过在组件前添加注解@Preview实现
D-页面预览通过在工程的ets文件头部添加注解@Entry实现
```

## 三 随堂测试截图

1-单选题

![][1]

2-多选题

![][2]

3-随堂测试截图

![][3]

## 四 随堂测试证书

![][4]

## 五 思维导图

![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson10-single-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson10-multiple-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson10-result-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson10-centify-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson10-xmind.png