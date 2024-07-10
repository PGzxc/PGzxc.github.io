---
title: IOS开发之——网页-WKWebView(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网页
abbrlink: b55858b6
date: 2022-03-22 19:44:57
---
## 一 概述

IOS中用于展示网页内容的组件是UIWebView(过时了)和 WKWebView，本文主要介绍WKWebView

* 通过代码和布局两种方式添加WKWebView
* 为WKWebView添加标题
* 为WKWebView添加前进和后退按钮

<!--more-->

## 二 通过代码和布局两种方式添加WKWebView

### 2.1 Storyboard布局方式

#### 过程

* 布局文件中拖入WKWebView，并全屏显示
* `#import "WebKit/WebKit.h"`添加头文件 
* 设置请求的requestWithURL
* Web view 通过loadRequest:request显示网页内容

#### 代码

```
@interface ViewController ()
@property (weak, nonatomic) IBOutlet WKWebView *myWebview;
@end  

- (void)viewDidLoad 
{
    [super viewDidLoad];
    
    NSURL *url=[NSURL URLWithString:@"https://www.baidu.com"];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    [self.myWebview loadRequest:request];    
}
```

### 2.2 通过代码方式

#### 过程

* `#import "WebKit/WebKit.h"`添加头文件 
* 设置WKWebViewConfiguration
* 通过WKWebViewConfiguration和frame为WKWebViewConfiguration初始化
* 将webveiw添加到布局中
* 设置请求的requestWithURL
* Web view 通过loadRequest:request显示网页内容

#### 代码

```
#import "WebKit/WebKit.h"

// 屏幕宽度
#define SCREEN_WIDTH ([UIScreen mainScreen].bounds.size.width)
// 屏幕高度
#define SCREEN_HEIGHT ([UIScreen mainScreen].bounds.size.height)
@interface ViewController ()
@property(nonatomic,strong) IBOutlet WKWebView *webView;
@end

-(void)loadView
{
    [super loadView];
    WKWebViewConfiguration *config=[[WKWebViewConfiguration alloc]init];
    self.webView= [[WKWebView alloc]initWithFrame:CGRectMake(0, 60, SCREEN_WIDTH, SCREEN_HEIGHT)configuration:config];
    [self.view addSubview:self.webView];    
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSURL *url=[NSURL URLWithString:@"https://www.baidu.com"];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];    
}
```

### 2.3 效果图

![][1]

## 三 为WKWebView添加标题

### 3.1 为ViewController嵌入Navigation导航条
一次点击：Editor——>Embed In——>Navigation Controller

![][2]

嵌入之后到界面如图所示：
![][3]

### 3.2 说明

* 遵循 WKNavigationDelegate协议
* 实现webView didFinishNavigation导航加载完成方法
* 在导航加载完成后，获取到webview的标题并设置

### 3.3 代码

```
@interface ViewController ()<WKNavigationDelegate>
@property(nonatomic,strong) IBOutlet WKWebView *webView;
@end

-(void)loadView
{
    [super loadView];
    WKWebViewConfiguration *config=[[WKWebViewConfiguration alloc]init];
    self.webView= [[WKWebView alloc]initWithFrame:CGRectMake(0, 60, SCREEN_WIDTH, SCREEN_HEIGHT)configuration:config];
    [self.view addSubview:self.webView];
    self.webView.navigationDelegate=self;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSURL *url=[NSURL URLWithString:@"https://www.baidu.com"];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
    self.navigationItem.title=webView.title;
}
```

### 3.4 效果图(显示 标题如：百度一下)

![][4]



## 四 为WKWebView添加前进和后退按钮

### 4.1 界面添加UIBarButtonItem，并设置按钮形状(前进后退)

![][5]

### 4.2 逻辑

* 前进和后退按钮默认是不可用状态
* 网页加载完毕后，判断WebView能够执行goBack后退和goForward前进操作
* 如果能，则按钮高亮，说明可执行前进和后退操作

### 4.3 代码

```
#import "ViewController.h"
#import "WebKit/WebKit.h"
// 屏幕rect
#define SCREEN_BOUNDS ([UIScreen mainScreen].bounds)
// 屏幕宽度
#define SCREEN_WIDTH ([UIScreen mainScreen].bounds.size.width)
// 屏幕高度
#define SCREEN_HEIGHT ([UIScreen mainScreen].bounds.size.height)
// 屏幕分辨率
#define SCREEN_RESOLUTION (SCREEN_WIDTH * SCREEN_HEIGHT * ([UIScreen mainScreen].scale))

@interface ViewController ()<WKNavigationDelegate>
@property (weak, nonatomic) IBOutlet UIBarButtonItem *forward;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *back;
@property(nonatomic,strong) IBOutlet WKWebView *webView;

@end

@implementation ViewController

-(void)loadView
{
    [super loadView];
    WKWebViewConfiguration *config=[[WKWebViewConfiguration alloc]init];
    self.webView= [[WKWebView alloc]initWithFrame:CGRectMake(0, 60, SCREEN_WIDTH, SCREEN_HEIGHT)configuration:config];
    [self.view addSubview:self.webView];
    self.webView.navigationDelegate=self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSURL *url=[NSURL URLWithString:@"https://www.baidu.com"];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}
- (IBAction)back:(UIBarButtonItem *)sender
{
    [self.webView goBack];
}
- (IBAction)forward:(id)sender
{
    [self.webView goForward];
}
#pragma mark-webview
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
    self.navigationItem.title=webView.title;
    //能否后退
    self.back.enabled=[webView canGoBack];
    self.forward.enabled=[webView canGoForward];
}
@end
```

### 4.3 效果图
![][6]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-webview-show.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-navigator-embed.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-navigator-embed-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-webview-title.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-barbutton-item-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-01-back-forward.gif

