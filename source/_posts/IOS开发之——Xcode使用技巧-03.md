---
title: IOS开发之——Xcode使用技巧(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - Xcode
abbrlink: 1b54e20a
date: 2022-04-02 07:27:49
---
## 一 概述

本文介绍的是特征变量(Trait Variations)，旧版本Xcode上叫做Size Class，用于约束界面呈现方式的，是一种新的适配方式，用于：

* Size or position of a view(视图的大小或位置)
* Installation of a view(安装视图)
* Installation of a constraint(安装约束)
* Constraint constant(约束常数)
* Font(字体)
* Color for the font, tint, or background(字体、色调或背景的颜色)
* Layout margins(布局边距)
* Image file(图像文件)

<!--more-->

## 二 特征变量(Trait Variations)介绍

### 2.1 如何开启特征变量

Storyboard——>Show the File Inspector——>Interface Builder Document——>Use Trait Variations(勾选)

![][1]

### 2.2 如何添加特征变量

在Show the Attributes inspector和Show the Size inspector中点击属性前`+`号进行设置

![][2]

### 2.3 设置特征变量

| 添加特征变量 | 特征变量设置说明 |
| :----------: | :--------------: |
|    ![][3]    |      ![][4]      |

说明：Phone上除了宽度是Compact，其他属性都是Regular

## 三 特征变量应用示例

### 3.1 Image file(图像文件)

#### Image设置

| Phone上设置 | Pad上设置 |
| :---------: | :-------: |
|   ![][5]    |  ![][6]   |

#### 效果图(左边Phone右边Pad，显示图片不同)

![][7]

### 3.2 Font(字体)-左边斜体右边粗体
![][8]

### 3.3 Installation of a view(安装视图)

![][9]

说明：左边Button按钮未勾选installed(未显示)，右边勾选了installed(显示)

### 3.4 Constraint constant(约束常数)

![][10]

说明：对按钮的约束Constant设置左边为70，右边为500

## 四 参考

* [Stack Overflow-What is 'Vary for Traits' in Xcode 8](https://stackoverflow.com/questions/39890055/what-is-vary-for-traits-in-xcode-8)
* [官方文档-UITraitCollection](https://developer.apple.com/documentation/uikit/uitraitcollection)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-use-trait-variations.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-use-trait-set.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-use-trait-property.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-size-classes.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-image-man.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-image-woman.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-image.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-font.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-installed.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-03-variations-constant.png

