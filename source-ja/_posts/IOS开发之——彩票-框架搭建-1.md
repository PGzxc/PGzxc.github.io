---
title: IOS开发之——彩票-框架搭建(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 1cc06317
date: 2022-02-07 09:32:27
---
## 一 概述

* 通过Storyboard拖拽搭建框架
* 向NavigationController添加跳转按钮及跳转事件
* 设置NavigationController的背景颜色及跳转隐藏BottomBar

<!--more-->

## 二 通过Storyboard拖拽搭建框架

### 2.1 Storyboard添加TabBarController

![][1]

### 2.2 删除与TabBarController相连的View
![][2]

### 2.3 添加3个NavigationController
![][3]

添加后的预览效果
![][4]

### 2.4 修改TabBar标题和文字(NavigationController上点击)
![][5]

修改TabBar后的预览
![][6]

### 2.5 修改标题文字

如下图：在ViewController的Title上双击修改Titlee

![][7]

修改后的预览图
![][8]

## 三 向NavigationController添加跳转按钮及跳转事件

### 3.1 Navigation添加Button
![][9]

### 3.2 修改Button显示文字和图片及跳转事件
![][10]

## 四 设置NavigationController的背景颜色及跳转隐藏BottomBar

### 4.1 MyUINavigationController

```
#import "MyUINavigationController.h"

@interface MyUINavigationController ()

@end

@implementation MyUINavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //设置背景颜色
    UINavigationBar *bar=[UINavigationBar appearance];
    [bar setBackgroundColor:[UIColor redColor]];
    //[bar setBackgroundImage:[UIImage imageNamed:@"NavBar64"] forBarMetrics:UIBarMetricsDefault];
    //NSLog(@"debug");
}

//跳转隐藏BottomBar
-(void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    viewController.hidesBottomBarWhenPushed=YES;
    return [super pushViewController:viewController animated:animated ];
}
@end
```

### 4.2 效果图
![][11]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-tabbarcontroller.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-tabbarcontroller-remove-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-navigation-add.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-navigation-add-preview.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-tabbar-item-modify.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-tabbar-item-modify-preview.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-modify-title.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-modify-title-preview.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-navgation-button.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-navgation-button-event.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-struct-navgation-define.gif