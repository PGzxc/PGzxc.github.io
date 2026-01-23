---
title: IOS开发之——网页-原生与JS相互调用(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网页
abbrlink: 241c5ad
date: 2022-03-23 20:52:45
---
## 一 概述

之前介绍过——Android原生和WebView相互调用，本文介绍IOS原生和JS相互调用

* 加载本地网页文件
* 原生调用JS
* JS调用原生

<!--more-->

## 二 加载本地网页文件

### 2.1 index.html

```
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
    <style>
        *{
           font-size: 50px;
         }
        .btn{height:80px; width:60%;}
   </style>
</head>
<body>
    <div>以下是网页内容---------------</div>
    <div id="js_content"></div>
    <button type="button" onclick="IOSCallJs()">IOS调用js代码</button><br>
    <button type="button" onclick="IOSCallJsWithArgs('js')">IOS调用js代码并传递参数</button><br>
    <button type="button" onclick="jsCallIOS()">JS调用IOS代码</button><br>
    <button type="button" onclick="jsCallIOSWithArgs('ios')">JS调用IOS代码并传递参数</button><br>
    <script>
        //IOS调用js代码无参数
        function IOSCallJs() {
            document.getElementById('js_content').innerHTML = 'hello js';
        }

       //IOS调用js代码带参数
        function IOSCallJsWithArgs(name) {
            document.getElementById('js_content').innerHTML = `hello withArgs ${name}`;
        }
        //js调用IOS代码无参数
        function jsCallIOS(){
             window.webkit.messageHandlers.jsInvokeOCMethod.postMessage('Javascript invoke OC');
        }
        //js调用IOS代码有参数
        function jsCallIOSWithArgs(name){
            window.webkit.messageHandlers.jsInvokeOCMethodArgs.postMessage(`Javascript invoke OC Args:${name}`);
        }
    </script>
</body>
</html>
```

### 2.2 加载网页

#### 代码

```
@interface ViewController ()
@property (strong, nonatomic) IBOutlet WKWebView *wkWebView;
@end

- (void)viewDidLoad {
    [super viewDidLoad];

    NSString *htmlPath=[[NSBundle mainBundle]pathForResource:@"index" ofType:@"html"];
    NSURL *url=[NSURL fileURLWithPath:htmlPath];
    NSURLRequest *request=[NSURLRequest requestWithURL:url];    
    [self.wkWebView loadRequest:request];  
}
```

#### 效果图

![][1]
说明：

* 上面的两个按钮是iOS原生按钮，点击调用JS方法
* 下面的是WebView网页组件

## 三 原生调用JS

### 3.1 过程说明

* 原生IOS：webView通过执行`evaluateJavaScript:@"IOS调用JS方法名"`调用JS文件中同名的方法
* JS(html)：执行`IOS调用JS方法名`同样的方法

### 3.2 代码

#### OC中按钮方法

```
//OC调用JS无参方法
- (IBAction)ocInvocJS:(UIButton *)sender
{
    [self.wkWebView evaluateJavaScript:@"IOSCallJs()" completionHandler:^(id _Nullable, NSError * _Nullable error) {
        
    }];
}
//OC调用JS有参方法
- (IBAction)ocInvocJSParams:(UIButton *)sender
{
    [self.wkWebView evaluateJavaScript:@"IOSCallJsWithArgs('aa')" completionHandler:^(id _Nullable, NSError * _Nullable error) {
        
    }];
}
```

#### JS：方法

```
<script>
    //IOS调用js代码无参数
    function IOSCallJs() {
       document.getElementById('js_content').innerHTML = 'hello js';     
     }
     
    //IOS调用js代码带参数
    function IOSCallJsWithArgs(name) {
        document.getElementById('js_content').innerHTML = `hello withArgs ${name}`;
    }
</script>
```

### 3.3 效果图
![][2]

## 四 JS调用原生

### 4.1 过程说明

* IOS原生：给WebView设置WKUserContentController
* IOS原生：WKUserContentController通过addScriptMessageHandler设置JS调用原生的方法代理和方法名， `name: @"jsInvokeOCMethod"`
* IOS原生：遵循WKScriptMessageHandler协议，并实现userContentController方法(接收JS返回给IOS原生的结果)
* JS页面：window.webkit.messageHandlers.`jsInvokeOCMethod`.postMessage('Javascript invoke OC');
* IOS原生：userContentController方法中通过判断`message.name`知道是执行的哪个方法

### 4.2 代码

#### OC中的方法

```
//1-遵循WKScriptMessageHandler协议
@interface ViewController ()<WKScriptMessageHandler>
@property (strong, nonatomic) IBOutlet WKWebView *wkWebView;
@end

//2-设置WKUserContentController及JS调用IOS中的方法
- (void)viewDidLoad {
    [super viewDidLoad];

    NSString *htmlPath=[[NSBundle mainBundle]pathForResource:@"index" ofType:@"html"];
    NSURL *url=[NSURL fileURLWithPath:htmlPath];
    
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    
    WKUserContentController* userCC = self.wkWebView.configuration.userContentController;
    [userCC addScriptMessageHandler: self name: @"jsInvokeOCMethod"];//不带参数的调用
    [userCC addScriptMessageHandler:self name:@"jsInvokeOCMethodArgs"];
    
    [self.wkWebView loadRequest:request];
    
}
//3-接收JS返回给IOS原生的结果
-(void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    if ([message.name isEqualToString: @"jsInvokeOCMethod"]) {
            NSLog(@"MessageBody: %@", message.body);
    }else if ([message.name isEqualToString: @"jsInvokeOCMethodArgs"]){
        NSLog(@"MessageBody: %@", message.body);
    }
}
```

#### JS中的方法

```
<script>
     //js调用IOS代码无参数
     function jsCallIOS(){
        window.webkit.messageHandlers.jsInvokeOCMethod.postMessage('Javascript invoke OC');
     }
     //js调用IOS代码有参数
     function jsCallIOSWithArgs(name){
         window.webkit.messageHandlers.jsInvokeOCMethodArgs.postMessage(`Javascript invoke OC Args:${name}`);
     }
</script>
```

### 4.3 效果

点击`JS调用IOS代码`时，打印结果

```
2022-03-23 20:38:36.704783+0800 WKWebViewJS[30340:492946] MessageBody: Javascript invoke OC
```

点击`JS调用IOS代码并传参数`时，打印结果

```
2022-03-23 20:39:47.354903+0800 WKWebViewJS[30340:492946] MessageBody: Javascript invoke OC Args:ios
```

## 五 参考(OC中完整代码)

```
#import "ViewController.h"

@interface ViewController ()<WKScriptMessageHandler>
@property (strong, nonatomic) IBOutlet WKWebView *wkWebView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    NSString *htmlPath=[[NSBundle mainBundle]pathForResource:@"index" ofType:@"html"];
    NSURL *url=[NSURL fileURLWithPath:htmlPath];
    
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    
    WKUserContentController* userCC = self.wkWebView.configuration.userContentController;
    [userCC addScriptMessageHandler: self name: @"jsInvokeOCMethod"];//不带参数的调用
    [userCC addScriptMessageHandler:self name:@"jsInvokeOCMethodArgs"];
    
    [self.wkWebView loadRequest:request];
    
}
//OC调用JS无参方法
- (IBAction)ocInvocJS:(UIButton *)sender
{
    [self.wkWebView evaluateJavaScript:@"IOSCallJs()" completionHandler:^(id _Nullable, NSError * _Nullable error) {
        
    }];
}
//OC调用JS有参方法
- (IBAction)ocInvocJSParams:(UIButton *)sender
{
    [self.wkWebView evaluateJavaScript:@"IOSCallJsWithArgs('aa')" completionHandler:^(id _Nullable, NSError * _Nullable error) {
        
    }];
}
#pragma mark--js-oc
-(void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    if ([message.name isEqualToString: @"jsInvokeOCMethod"]) {
            NSLog(@"MessageBody: %@", message.body);
    }else if ([message.name isEqualToString: @"jsInvokeOCMethodArgs"]){
        NSLog(@"MessageBody: %@", message.body);
    }
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-03-storyboard-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-webview-03-oc-invoke-js.gif
