---
title: HarmonyOS第一课——运行Hello World(1)
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS第一课
abbrlink: 978824cf
date: 2023-11-24 16:18:22
---
### 一  概述

* 随堂测验
* 随堂测试截图
* 随堂测试证书
* 思维导图总结

<!--more-->

## 二 随堂测验

### 2.1 判断题

1-DevEco Studio是开发HarmonyOS应用的一站式集成开发环境 <font color=red>(A)</font>

```
A-正确(True) B-错误(False)
```

2-main_pages.json存放页面page路径配置信息 <font color=red>(A)</font>

```
A-正确(True) B-错误(False)
```

注解：`main_pages.json`位于src/main/resources/base/profile目录下，页面路径如下

```
{
  "src": [
    "pages/Splash",
    "pages/MainPage",
    "pages/LoginRegisterPage",
    "pages/WebPage",
    "pages/SettingPage",
    "pages/TreeTabPage",
    "pages/InfoPage"
  ]
}
```

### 2.2 单选题

1-在stage模型中，下列配置文件属于AppScope文件夹的是？<font color=red>(C)</font>

```
A-main_pages.json
B-modules.json5
C-app.json5
D-package.json
```

注解：

```
AppScope:app.json5+resources(base)
```

### 2.3 多选题

1-如何在DevEco Studio中创建新项目？<font color=red>(BC)</font>

```
A-在计算机上创建一个新文件，并将其命名为“new harmonyOS项目”
B-如果已打开项目，从DevEco Studio菜单选择“file>new>Create Project”
C-如果第一次打开DevEco Studio，在欢迎页点击“Create new Projectt”
```

2-module.json5配置文件中，包含了以下哪些信息？<font color=red>(ABD)</font>

```
A-ability的相关配置信息
B-模块名
C-应用的版本号
D-模块类型
```

注解：

```
应用的版本号位于AppScope/app.json5下
```

## 三 随堂测试截图

1-判断题

![][1]

2-多选题

![][2]

3-随堂测试-结果

![][3]

## 四 随堂测试证书

![][4]

## 五 思维导图
![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-single-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-multiple-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-result-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-certify-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-xmind.png