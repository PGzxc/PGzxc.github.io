---
title: IOS开发之——团购网站-UITableViewController简介(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8272fd06
date: 2020-06-08 23:15:28
---
## 一 概述

用UITableViewController可以实现于UITableView+UIViewController相同的表格布局，本文介绍UITableViewController的简单开发流程：

* ViewController.h中ViewController继承UITableVIewController
* Main.storyboard中勾选`Is Initial Controller`，并在Custom Class的Class项选择ViewController
* ViewController.m重写numberOfRowsInSection和cellForRowAtIndexPath方法

<!--more-->

## 二 效果图

![][1]
## 三 代码
### 3.1 OC模式下
#### ViewController.h

```
#import <UIKit/UIKit.h>
@interface ViewController : UITableViewController

@end
```

#### ViewController.m

```
#import "ViewController.h"
@interface ViewController ()
@end
@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"%p  %p",self.view,self.tableView);
    NSLog(@"%@",self.view.class);
}
#pragma 数据源
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 10;
}
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
    cell.textLabel.text=@"text";
    return cell;
}
@end
```

## 四 使用中出现的问题

### 4.1 现象

* 屏幕显示黑屏

* 控制台有异常信息

  ```
  UITableViewController[4465:77896] [WindowScene] Failed to instantiate the default view controller for UIMainStoryboardFile 'Main' - perhaps the designated entry point is not set?
  ```

### 4.2 原因

* 没有给程序设定入口

### 4.3 解决办法

* 在`Main.storyboard`勾选`Is Initial View Controller`


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitableviewcontroller-simple-sample.png