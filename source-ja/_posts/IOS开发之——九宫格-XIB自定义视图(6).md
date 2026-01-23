---
title: IOS开发之——九宫格-XIB自定义视图(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 84123a38
date: 2020-06-04 23:31:31
---
## 一 概述

IOS可以通过XIB进行自定义视图，同Storyboard视图相比：

* Storyboard：重量级，能够描述一个应用程序所有的界面
* XIB：轻量级，在Xcode 4.0之前，是主要的图形化界面搭建工具InterfaceBuilder，在现在，依然是主流的界面开发技术，适用于开发小块的自定义视图

<!--more-->

## 二 新建XIB界面

* 依次点击：Xcode——>New File——>User Interface——>Empty，打开XIB新建对话框

  ![][1]
  
* 如图所示，给xib添加指定大小的View，并向其中添加子View(UIImage,UILabel,UIButton)，为子View设置相应的属性值

  ![][2]

##  三 将XIB应用到ViewController，替换代码构建视图

```
 //从XIB来家长自定义视图
	UIView *appView=[[[NSBundle mainBundle]loadNibNamed:@"AppView" owner:nil options:nil] lastObject];
  //设置视图的位置
  appView.frame=CGRectMake(x, y, kAppViewW, kAppViewH);
  [self.view addSubview:appView];
  AppInfo *appInfo=self.appList[i];
  //九宫格背景色
  //1->UIImageView
  UIImageView *icon=appView.subviews[0];
  icon.image=appInfo.image;
  //2->UILabel->应用程序名称
  UILabel *label=appView.subviews[1];
  //设置程序名称
  label.text=appInfo.name;
  //3->UIButton->下载按钮
  UIButton *button=appView.subviews[2];
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xib-new-dialog.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xlb-add-view-property.png