---
title: IOS开发之——Xcode使用技巧(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - Xcode
abbrlink: 4d0e458c
date: 2022-04-04 07:17:39
---
## 一 概述

* 使用Main.Storyboard搭建界面
* 将Main.Storyboard的界面搭建通过代码控制实现

<!--more-->

## 二 使用Main.Storyboard搭建界面

在Main.storyboard界面：TabBarController+Navigation Controller(4个)搭建界面

![][1]

设置Main  Interface为Main.storyboard

![][2]

## 三 将Main.Storyboard的界面搭建通过代码控制实现

### 3.1 删除Storyboard相关内容

####  删除Main.storyboard和 Targets—>Deployment Info下的Main Interface
![][3]

###  打开info.plist，删除指定内容(Application Scene. Manifest)

| 删除前 | 删除后 |
| :----: | :----: |
| ![][4] | ![][5] |

### 3.2 新建4个分类并在每个分类下面创建相应Storyboard(勾选Is Initial ViewController)

![][6]

### 3.3 AppDelegate方法中用代码实现Storyboard

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    //1-创建Window窗体
    self.window=[[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor=[UIColor whiteColor];


    //2-创建TabBarController
    UITabBarController *tb=[[UITabBarController alloc]init];

    //3-加载4个Storyboard
    UIStoryboard *homeSB=[UIStoryboard storyboardWithName:@"Home" bundle:nil];
    UIStoryboard *messageSB=[UIStoryboard storyboardWithName:@"Message" bundle:nil];
    UIStoryboard *discoverSB=[UIStoryboard storyboardWithName:@"Discover" bundle:nil];
    UIStoryboard *profileSB=[UIStoryboard storyboardWithName:@"Profile" bundle:nil];
    
    //4-创建并将4个Storyboard添加到TabBarController
    tb.viewControllers=@[homeSB.instantiateInitialViewController,
                         messageSB.instantiateInitialViewController,
                         discoverSB.instantiateInitialViewController,
                         profileSB.instantiateInitialViewController];
    //5-设置根控制器
    self.window.rootViewController=tb;
    
    //6-添加并设置4个TabBarItem
    UITabBar *tabBar = tb.tabBar;
      
    UITabBarItem *tabBarItem1 = [tabBar.items objectAtIndex:0];
    UITabBarItem *tabBarItem2 = [tabBar.items objectAtIndex:1];
    UITabBarItem *tabBarItem3 = [tabBar.items objectAtIndex:2];
    UITabBarItem *tabBarItem4 = [tabBar.items objectAtIndex:3];
    tabBarItem1.title=@"首页";
    tabBarItem1.image=[UIImage imageNamed:@"home"];
    
      
    tabBarItem2.title=@"消息";
    tabBarItem2.image=[UIImage imageNamed:@"message"];
   
      
    tabBarItem3.title=@"广场";
    tabBarItem3.image=[UIImage imageNamed:@"discover"];

      
    tabBarItem4.title=@"我";
    tabBarItem4.image=[UIImage imageNamed:@"profile"];
   
    
    //设置选中的tabitem，也可以使用selectedViewController
    //tab.selectedIndex = 2;
    //7-显示Window
    [self.window makeKeyAndVisible];

    return YES;
}
```

### 3.4 效果图
![][7]

## 四 参考
* [Github-参考代码](https://github.com/PGzxc/StoryboardCode)
* [博客园-xcode11新项目删除main.storyboard 两种方法](https://www.cnblogs.com/baitongtong/p/12023484.html)
* [CSDN-iOS 使用代码和storyboard分别创建UITabBarController](https://blog.csdn.net/chy555chy/article/details/51692287)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-main-storyboard.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-main-storyboard-interface.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-main-storyboard-remove.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-info-dele-before.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-info-dele-after.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-four-storyboard-add.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xcode-05-code-preview.gif