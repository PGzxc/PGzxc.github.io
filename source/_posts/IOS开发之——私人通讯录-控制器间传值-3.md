---
title: IOS开发之——私人通讯录-控制器间传值(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 5255d7ad
date: 2020-07-01 23:24:09
---
## 一 概述

本节完成通讯录到成员添加页面，成员添加页面填写完姓名和电话号码后保存并返回到通讯录界面：

* prepareForSegue：设置联系人控制器上的标题
* 顺传：控制器之间的传值，需要把登录的账号传给联系人控制器
* 逆传：控制器之间的传值，把添加用户信息传递给联系人控制器

<!--more-->

## 二 效果图

![][1]

## 三 功能实现

### 3.1 prepareForSegue(Login->Contact)

* 利用performSegueWithIdentifier：方法可以执行某个Segue，完成界面跳转


### 3.2 顺传(Login->Contact)

```
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    NSLog(@"%@---%@--%@",segue.identifier,segue.sourceViewController,segue.destinationViewController);
    
    UIViewController *v=segue.destinationViewController;
    v.navigationItem.title=[NSString stringWithFormat:@"%@的联系人",_accountField.text];
}
```

### 3.3 逆传(Add->Contact)
#### AddController
```
- (IBAction)add:(id)sender
{
    //回到上一个控制器
    [self.navigationController popViewControllerAnimated:YES];
    //创建模型
    Contact *contact=[Contact contactWithName:_nameField.text phone:_phoneField.text];
    //2.把文本框的内容传递给联系人控制器
    //[self.contacts setName:_nameField.text phone:_phoneField.text];
    //2.通知代理做事情
    if ([_delegate respondsToSelector:@selector(viewController:didAddContact:)]) {
        [_delegate viewController:self didAddContact:contact];
    }
    
}
```

#### ContactController

```
- (void)viewController:(AddViewController *)add didAddContact:(Contact *)contact
{
    //把数据展示到联系人界面上
    NSLog(@"%@",contact.name);
    //保存
    [self.contacts addObject:contact];
    //刷新
    [self.tableView reloadData];
    
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-chuanzhi.gif