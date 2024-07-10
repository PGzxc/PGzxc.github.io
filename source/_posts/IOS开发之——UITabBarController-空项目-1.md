---
title: IOS开发之——UITabBarController-空项目(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8bd5a825
date: 2020-10-19 23:49:15
---
## 一 概述

跟UINavigationController类似，UITabBarController也可以轻松地管理多个控制器，轻松完成控制器之间的切换，典型的例子就是QQ、微信等应用

<!--more-->

## 二 UITabBarController的简单使用
### 2.1 UITabBarController的使用步骤

* 初始化UITabBarController
* 设置UIWindow的rootViewController为UITabBarController
* 根据具体情况，通过addChildViewController方法添加对应个数的子控制器

### 2.2 UITabBar

* 如果UITabBarController有N个子控制器，那么UITabBar内部就会有N个UITabBarButton作为子控件
* 如果UITabBarController有4个子控制器，那么UITabBar的结构大致如下图

  ![][1]

### 2.3 UITabBarButton

* UITabBarButton里面显示什么内容，由对应子控制器的tabBarItem属性决定
* UITabBarItem有以下属性影响着UITabBarButton的内容：
  - 标题文字：@property(nonatomic,copy) NSString *title;
  - 图标：@property(nonatomic,retain) UIImage *image;
  - 选中时的图标：@property(nonatomic,retain) UIImage *selectedImage;
  - 提醒数字：@property(nonatomic,copy) NSString *badgeValue;

### 2.4 在何处初始化UITabBarController

#### 初始化

* 之前在AppDelegate.m中的didFinishLaunchingWithOptions方法初始
* Xcode11之后，在SceneDelegate.m中初始化

#### 原因

* Xcode 11 建新工程默认会创建通过 UIScene 管理多个 UIWindow 的应用，工程中除了 AppDelegate 外还会有一个 SceneDelegate，这是为了实现iPadOS支持多窗口的结果
* AppDelegate.h不再有window属性，window属性被定义在了SceneDelegate.h中，AppDelegate中有新增的关于scene的代理方法，SceneDelegate中也有相应的代理方法

## 三 代码(SceneDelegate.m—>willConnectToSession方法)

```
    UITabBarController *tb=[[UITabBarController alloc]init];
    //设置控制器为Window的根控制器
    self.window.rootViewController=tb;
    
    //b.创建子控制器
    UIViewController *c1=[[UIViewController alloc]init];
    c1.view.backgroundColor=[UIColor grayColor];
    c1.view.backgroundColor=[UIColor greenColor];
    c1.tabBarItem.title=@"消息";
    c1.tabBarItem.image=[UIImage imageNamed:@"tab_recent_nor"];
    c1.tabBarItem.selectedImage=[UIImage imageNamed:@"tab_recent_select"];
    c1.tabBarItem.badgeValue=@"123";
    
    UIViewController *c2=[[UIViewController alloc]init];
    c2.view.backgroundColor=[UIColor brownColor];
    c2.tabBarItem.title=@"联系人";
    c2.tabBarItem.image=[UIImage imageNamed:@"tab_buddy_nor"];
    c2.tabBarItem.selectedImage=[UIImage imageNamed:@"tab_buddy_select"];
    
    UIViewController *c3=[[UIViewController alloc]init];
    c3.view.backgroundColor=[UIColor greenColor];
    c3.tabBarItem.title=@"动态";
    c3.tabBarItem.image=[UIImage imageNamed:@"tab_qworld_nor"];
    c3.tabBarItem.selectedImage=[UIImage imageNamed:@"tab_qworld_select"];
    
    UIViewController *c4=[[UIViewController alloc]init];
    c4.view.backgroundColor=[UIColor blueColor];
    c4.tabBarItem.title=@"设置";
    c4.tabBarItem.image=[UIImage imageNamed:@"tab_me_nor"];
    c4.tabBarItem.selectedImage=[UIImage imageNamed:@"tab_me_select"];
   
    
    //c.添加子控制器到ITabBarController中
    //c.1第一种方式
    //[tb addChildViewController:c1];
    //[tb addChildViewController:c2];
    
    //c.2第二种方式
    tb.viewControllers=@[c1,c2,c3,c4];
```

## 四 效果图

![][2]

## 五 参考

* [Xcode11 新建工程中的SceneDelegate][11]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitablebar-uitabbarbutton-relate.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbar-controller-yanshi.gif

[11]:https://www.jianshu.com/p/6d6573fbd60b