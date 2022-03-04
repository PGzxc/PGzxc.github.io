---
title: IOS开发之——超级猜图-大小图切换及按钮高亮显示(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: cd8f8171
date: 2020-06-18 22:33:39
---
## 一 概述

本文(超级猜图程序)的内容：

* 大小图切换(点击放大按钮与点击要放大的图片实现图片放大与缩小)
* 按钮高亮显示(图片按钮与金币按钮刚点击时，会稍微变暗解决方案)

<!--more-->

## 二 功能实现

### 2.1 大小图切换

#### 思路

* 如果没有放大，点击时就放大，否则就缩小
* 通过蒙版的alpha来判断按钮是否已被放大

#### 代码

```
  if (self.cover.alpha==0.0)
  {
     //2.将图像按钮放到最前面
     [self.view bringSubviewToFront:self.iconButton];
     //3.动画放大图像按钮
     CGFloat w=self.view.bounds.size.width;
     CGFloat h=w;
     CGFloat y=(self.view.bounds.size.height-h)*0.5;
     [UIView animateWithDuration:1.0f animations:^{
            self.iconButton.frame=CGRectMake(0,y, w, h);
            self.cover.alpha=1.0;
          }];
  }else
  {
    [UIView animateWithDuration:1.0 animations:^{
          self.iconButton.frame=CGRectMake(112, 160, 150, 150);
          self.cover.alpha=0.0;
          }];
  }
```

### 2.2 按钮高亮显示(按钮的高亮显示解决办法)

* 通过Button属性列表中的`Highlighted Adjusts Image`(可以与界面交互)
* 通过View属性中的`User Interfaction Enabled`接口(不可以与界面交互)

