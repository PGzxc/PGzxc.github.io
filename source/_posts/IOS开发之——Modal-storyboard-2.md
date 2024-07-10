---
title: IOS开发之——Modal-storyboard(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 2e9137ef
date: 2020-12-10 00:04:20
---
## 一 概述

* Modal方式打开UIViewController
* Modal方式打开Navigation Controller
* Modal方式，ViewController向Navigation Controller传值

<!--more-->

## 二 Modal方式打开UIViewController

### 2.1 连线方式

按住`Control`按钮，从Button连接到View Controller，Action选择Modal

![][1]

### 2.2 效果
![][2]
## 三 Modal方式打开Navigation Controller

### 3.1 操作过程

* Button通过Modal方式，连接到Navigation Controller
* 新建TableViewController关联到Navigation Controller
* Navigation Controller添加Button Bar Item取消按钮
* 点击取消按钮，关闭Navigation Controller

### 3.2 功能代码

```
- (IBAction)cancel:(UIBarButtonItem *)sender
{
    //回到控制器
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}
```

### 3.3 效果图
![][3]

## 四 Modal方式，ViewController向Navigation Controller传值

### 4.1 思路分析

* TableViewController.h定义要传递的参数name
* 在要跳转的ViewController重写prepareForSegue(跳转之前的操作)，通过UINavigationController传值
* TableViewController.m获取传递的值

### 4.2 逻辑代码

#### TableViewController.h

```
@property (nonatomic,strong) NSString *name;
```

#### ViewController.m

```
//跳转之前调用
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    UINavigationController *nav=segue.destinationViewController;
    
    TableViewController *tableView=nav.topViewController;
    tableView.name=@"123456";
    //tableView.
    NSLog(@"%@---%@",segue.sourceViewController,segue.destinationViewController);
}
```

#### TableViewController.m

```
- (void)setName:(NSString *)name{
    _name=name;
    NSLog(@"%@",name);
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-modal-storyboard-line-modal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-button-jump-viewcontroller.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-storyboard-button-jump-navigation.gif