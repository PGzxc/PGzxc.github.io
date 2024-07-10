---
title: IOS开发之——私人通讯录-登录功能(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8012bc20
date: 2020-06-29 23:34:22
---
## 一 概述

本文介绍登录功能相关的开发：

* 登录界面，记住密码和自动登录联动操作
* 从登录界面跳转到联系人界面
* 从联系人界面返回到登录界面

<!--more-->

## 二 效果图

![][1]

## 三 功能实现
### 3.1 登录界面功能

#### 当记住密码状态改变的时候调用

```
- (IBAction)rmbPwdSwitch:(UISwitch*)sender
{
    if (sender.isOn==NO)
    {
        [_autoLoginS setOn:NO animated:YES];
    }  
}
```

#### 当自动登录状态改变的时候调用

```
- (IBAction)autoLoginSwitch:(UISwitch *)sender
{
    if (sender.isOn==YES) {
        [_rmbPwdS setOn:YES animated:YES];
    }
}
```

### 3.2 从登录界面跳转到联系人界面

```
 [MBProgressHUD showMessage:@"正在登录"];//显示遮盖
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            //移除遮盖
       [MBProgressHUD hideHUD];
       [self performSegueWithIdentifier:@"login2contact" sender:nil];
   });
```

### 3.3 从联系人界面返回到登录界面

```
  [self.navigationController popViewControllerAnimated:YES];
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tongxunlu-login.gif

