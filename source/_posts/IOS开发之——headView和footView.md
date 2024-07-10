---
title: IOS开发之——headView和footView
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 614fb064
date: 2020-05-25 22:40:58
---
## 一 概述

本文在UITableView的基础上，追加headView头布局和footView尾部局：

* headView：常用语显示轮播图
* footView：常用来做下拉加载

<!--more-->

## 二 效果图

![][1]

## 三 代码

### 3.1 OC模式下(ViewController.m)

```
   //headView
    UIView *head=[[UIView alloc]initWithFrame:CGRectMake(0, 0, 320, 130)];
    head.backgroundColor=[UIColor blueColor];
    self.tableView.tableHeaderView=head;
    
    //footView
    UIView *foot=[[UIView alloc]initWithFrame:CGRectMake(0, 0, 320, 44)];
    foot.backgroundColor=[UIColor redColor];
    self.tableView.tableFooterView=foot;
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-head-foot-view.gif