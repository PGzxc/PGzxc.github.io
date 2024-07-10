---
title: IOS开发之——彩票-邮件分享(14)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a16e2276
date: 2022-02-15 23:17:31
---
## 一 概述(邮件分享到两种方式)

* NSURL URLWithString:@"mailto:xxx"
* 邮箱控制器MFMailComposeViewController

<!--more-->

## 二 方式一 NSURL URLWithString:@"mailto:xxx"

### 2.1 说明

* 用自带的邮件客服端
* 发完邮件后不会自动回到应用

### 2.2 代码

```
 NSURL *url = [NSURL URLWithString:@"mailto:10010@qq.com"];
 [[UIApplication sharedApplication] openURL:url];
```

### 2.3 效果图

![][1]

## 三 方式二 邮箱控制器MFMailComposeViewController

### 3.1 说明

* 不实用share方式，通过邮箱控制器MFMailComposeViewController设置
* 可以设置收件人，抄送人，密送人，主题，内容等
* 邮件发送后的代理方法回调，发完后会自动回到原应用

### 3.2 代码

```
//1-头部
@interface ILShareViewController ()<MFMailComposeViewControllerDelegate>
@end
//2-分享
// 不能发邮件处理
if (![MFMailComposeViewController canSendMail]) return;
 MFMailComposeViewController *vc = [[MFMailComposeViewController alloc] init];

 // 设置邮件主题
 [vc setSubject:@"会议"];
 // 设置邮件内容
 [vc setMessageBody:@"今天下午开会吧" isHTML:NO];
  // 设置收件人列表
 [vc setToRecipients:@[@"643055866@qq.com"]];
 // 设置抄送人列表
 [vc setCcRecipients:@[@"1234@qq.com"]];
 // 设置密送人列表
  [vc setBccRecipients:@[@"56789@qq.com"]];


  // 添加附件（一张图片）
  UIImage *image = [UIImage imageNamed:@"阿狸头像"];
  NSData *data = UIImagePNGRepresentation(image);
  [vc addAttachmentData:data mimeType:@"image/png" fileName:@"阿狸头像.png"];
  // 设置代理
  vc.mailComposeDelegate = self;
  // 显示控制器
  [self presentViewController:vc animated:YES completion:nil];
  
  //3-代理
  - (void)mailComposeController:(MFMailComposeViewController *)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError *)error
{
    // 关闭邮件界面
    [controller dismissViewControllerAnimated:YES completion:nil];
    
    if (result == MFMailComposeResultCancelled) {
        NSLog(@"取消发送");
    } else if (result == MFMailComposeResultSent) {
        NSLog(@"已经发出");
    } else {
        NSLog(@"发送失败");
    }
}
```

### 3.3 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-mail-share-way-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-mail-share-way-2.png