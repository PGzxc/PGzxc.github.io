---
title: IOS开发之——Modal-原理和常规使用(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 13a611e1
date: 2020-12-09 17:39:48
---
## 一 概述

* 除了push之外，还有另外一种控制器的切换方式，那就是Modal
* 任何控制器都能通过Modal的形式展示出来
* Modal的默认效果：新控制器从屏幕的最底部往上钻，直到盖住之前的控制器为止

<!--more-->

## 二 Modal的打开及关闭

### 2.1 Modal形式展示控制器

```
-(void)presentViewCOntroller:(UIViewCOntroller *)viewCOntrollerToPresent animated:(BOOL)flag completion:(void^)completion
```

### 2.2 关闭Modal出来的控制器

```
self dismissViewControllerAnimated:<#(BOOL)#> completion:<#^(void)completion#>
```

## 三 简单示例

### 3.1 界面关系

* FirstVIewController(第一个页面)，有一个按钮，点击跳转到JumpViewController
* JumpViewController(跳转到的页面)，有一个返回按钮，点击返回到FirstViewController

### 3.2 代码

#### FirstVIewController

```
- (void)viewDidLoad {
    [super viewDidLoad];
    UIButton *btn=[UIButton buttonWithType:UIButtonTypeContactAdd];
    btn.center=self.view.center;
    [btn addTarget:self action:@selector(btnClick) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
}
-(void)btnClick{
    //创建控制器对象
    JumpViewController *jump=[[JumpViewController alloc]init];
    //Modal出一个控制器
    //[self presentModalViewController:jump animated:YES];
     
    [self presentViewController:jump animated:YES completion:nil];
}
```

#### JumpViewController

```
- (IBAction)cancel:(UIButton *)sender {
    //关闭
    [self dismissViewControllerAnimated:YES completion:nil];
}
```

### 3.3 效果图

![][1]

## 四 通过导航条方式关闭Modal

### 4.1 界面修改说明

* 去掉JumpViewController中去掉按钮
* 通过导航条做按钮做返回操作

### 4.2 代码

#### FirstVIewController

```
- (void)viewDidLoad {
    [super viewDidLoad];
    UIButton *btn=[UIButton buttonWithType:UIButtonTypeContactAdd];
    btn.center=self.view.center;
    [btn addTarget:self action:@selector(btnClick) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
}
-(void)btnClick{
    //创建控制器对象
    JumpViewController *jump=[[JumpViewController alloc]init];
    //Modal出一个控制器
    //[self presentModalViewController:jump animated:YES];
    UINavigationController *nav=[[UINavigationController alloc]initWithRootViewController:jump];
     
    [self presentViewController:nav animated:YES completion:nil];
}
```

#### JumpViewController

```
- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.leftBarButtonItem=[[UIBarButtonItem alloc]initWithTitle:@"取消" style:UIBarButtonItemStyleDone target:self action:@selector(cancel)];  
}
- (IBAction)cancel{
    //关闭
    [self dismissViewControllerAnimated:YES completion:nil];
}
```

### 4.3 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-modal-sample-1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-modal-sample-nav.gif

