---
title: IOS开发之——彩票-设置导航条按钮(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c43b80bc
date: 2022-02-07 09:49:11
---
## 一 概述

* 通过BarButtonItem和Button给导航条添加按钮
* 统一给导航条设置主题颜色
* 统一给BarButtonItem按钮和返回按钮设置背景色

<!--more-->

## 二 通过BarButtonItem和Button给导航条添加按钮

### 2.1 BarButtonItem设置导航条 

![][1]

### 2.2 Button设置导航条
![][2]

## 三 统一给导航条设置主题颜色

### 3.1 通过代码设置主题颜色

```
//设置导航条主体颜色
[bar setTintColor:[UIColor whiteColor]];
```

### 3.2 主题颜色设置前后对比

| 设置前 | 设置后 |
| :----: | :----: |
| ![][3] | ![][4] |

## 四 统一给BarButtonItem按钮和返回按钮设置背景色

### 4.1 通过代码设置按钮和返回按钮背景

```
//获取所有UIBarButton的外观
 UIBarButtonItem *buttonItem=[UIBarButtonItem appearance];
 [buttonItem setBackgroundImage:[UIImage imageNamed:@"NavButton"] forState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
[buttonItem setBackgroundImage:[UIImage imageNamed:@"NavButton"] forState:UIControlStateHighlighted barMetrics:UIBarMetricsDefault];
    
 //设置返回按钮
[buttonItem setBackButtonBackgroundImage:[UIImage imageNamed:@"NavBackButton"] forState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
[buttonItem setBackButtonBackgroundImage:[UIImage imageNamed:@"NavBackButtonPressed"] forState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
```

### 4.2 背景设置前后对比

| 设置前 | 设置后 |
| :----: | :----: |
| ![][5] | ![][6] |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-barbuttonitem-setting.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-button-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-color-theme-before.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-color-theme-after.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-background-before.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-navigation-background-after.gif