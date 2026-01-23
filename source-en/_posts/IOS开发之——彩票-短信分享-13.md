---
title: IOS开发之——彩票-短信分享(13)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8e6b60b5
date: 2022-02-15 23:16:37
---
## 一 概述(短信分享的两种方法)

* NSURL URLWithString:@"sms:xxx"
* 短信控制器MFMessageComposeViewController

<!--more-->

## 二 方式一 NSURL URLWithString:@"sms:xxx"

### 2.1 说明

* 直接跳转到发短信界面，但是不能指定短信内容
* 而且不能自动回到原应用

### 2.2 代码

```
NSURL *url = [NSURL URLWithString:@"sms:10010"];
[[UIApplication sharedApplication] openURL:url];
```

### 2.3 效果图

![][1]

## 三 方式二 短信控制器MFMessageComposeViewController

### 3.1 说明

* 如果想指定短信内容，那就得使用MessageUI框架
* 显示发短信的控制器
* 代理方法，当短信界面关闭的时候调用，发完后会自动回到原应用

### 3.2 代码

```
//1-头部
#import <MessageUI/MessageUI.h>
@interface ILShareViewController()<MFMessageComposeViewControllerDelegate>
@end

//2-点击分享部分
 MFMessageComposeViewController *vc = [[MFMessageComposeViewController alloc] init];
 // 设置短信内容
 vc.body = @"吃饭了没？";
 // 设置收件人列表
 vc.recipients = @[@"10010", @"02010010"];
// 设置代理
vc.messageComposeDelegate = self;
// 显示控制器
[self presentViewController:vc animated:YES completion:nil];

//3-代理
- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
{
    // 关闭短信界面
    [controller dismissViewControllerAnimated:YES completion:nil];
    
    if (result == MessageComposeResultCancelled) {
        NSLog(@"取消发送");
    } else if (result == MessageComposeResultSent) {
        NSLog(@"已经发出");
    } else {
        NSLog(@"发送失败");
    }
}
```

### 3.3 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-share-sms-way-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-share-sms-way-2.png