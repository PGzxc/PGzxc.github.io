---
title: IOS开发之——团购网站-顶部视图及分割线(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 99a83168
date: 2020-06-14 23:53:28
---
## 一 概述

本文主要介绍一下内容：

* 给团购页面设置顶部视图及视图分割线
* 设置团购单元格选中颜色

<!--more-->

## 二 功能实现

### 2.1 给团购页面设置顶部视图及视图分割线

* 依次点击：Xcode——>New File——User Interface——>TgHeaderView.xib

  ![][1]
  
* 在TgHeaderView中设置View的大小，并添加UIView，并设置background为灰色和宽度大小（1）

  ![][2]
  
### 2.2 设置团购单元格选中颜色

* TgCell.m中setSelected方法

  ```
  - (void)setSelected:(BOOL)selected animated:(BOOL)animated {
      [super setSelected:selected animated:animated];
      if(selected)
      {
          self.contentView.backgroundColor=[UIColor redColor];
      }else
      {
          self.contentView.backgroundColor=[UIColor greenColor];
      }  
  }
  ```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tuangou-headerview-xib.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tuangou-view-width-1.png
