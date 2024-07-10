---
title: IOS开发之——图片的内存优化
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 626c6ca3
date: 2021-11-08 23:15:48
---
## 一 概述

创建Image的方式有两种：

* UIImage *image=[UIImage imageNamed:imageName]—内存由系统管理
* UIImage *image=[UIImage imageWithContentsOfFile:path]—开发者自己管理(优化)

| imageName(324M) | imageWithContentsOfFile(19M) |
| :-------------: | :--------------------------: |
|     ![][1]      |            ![][2]            |

<!--more-->

## 二 查看打包后的app文件

点击Xcode——>Preference，打开设置对话框
![][3]
选中`Locations`菜单栏，点击`Derved Data`,打开包数据文件夹
![][4]
找到当前应用的app
![][5]
在app上右键，显示包内容，查看app的包信息
![][6]

## 三 两种方式资源存放和获取方式

### 3.1 imageName方式

#### 资源存放位置

* Assets.xcassets：资源文件夹
* 任意的图片文件夹：如Animations

#### imageName获取Image方式

```
UIImage *image=[UIImage imageNamed:@“eat_001.jpg”];
```

### 3.2 imageWithContentsOfFile

#### supporting files(bundle文件)

新版本不支持supporting files文件打包后，直接放到app的包目录下

#### 存放位置

* 直接拖放到项目`根目录下`(如Animations文件夹)

#### imageWithContentsOfFile获取Image方式

```
 NSString *imageName=[NSString stringWithFormat:@"Animations/Eat/%@_%02d.jpg",@"eat",i];
 NSString *path=[[NSBundle mainBundle]pathForResource:imageName ofType:nil];
 UIImage *image=[UIImage imageWithContentsOfFile:path];
```

## 四  内存优化(imageWithContentsOfFile)

### 4.1 优化方式一

```
[self performSelector:@selector(clearup) withObject:nil afterDelay:self.tom.animationDuration];

-(void)clearup
{
    NSLog(@"%s",__func__);
    self.tom.animationImages=nil;
}
```

### 4.2 优化方式二

```
[self.tom performSelector:@selector(setAnimationImages:) withObject:nil afterDelay:self.tom.animationDuration];
```

 ## 五 参考

* [iOS 把图片资源打包成bundle](http://blog.sina.com.cn/s/blog_14ddfbc6f0102x3xr.html)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-youhua-imagename-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-youhua-path-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-xcode-preference.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-xcode-locations-deriveddata.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-xcode-locations-app.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-image-xcode-locations-app-package.png

