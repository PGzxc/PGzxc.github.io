---
title: IOS开发之——私人通讯录-编辑界面(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 6f5c5165
date: 2020-07-05 23:33:02
---
## 一 概述

本文主要完成私人通讯录编辑界面，包含以下功能：

* 新建私人通讯录编辑界面和控制器
* 将通讯录数据传递到编辑页面
* 编辑，取消按钮功能
* 保存数据返回并刷新界面

<!--more-->

## 二 效果图

![][1]

## 三 功能实现

### 3.1 将通讯录数据传递到编辑页面

```
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    NSLog(@"%@",segue.destinationViewController);
    if ([segue.destinationViewController isKindOfClass:[AddViewController class]])
    {
         AddViewController *vc=segue.destinationViewController;
          vc.delegate=self;
    }else
    {
        //跳转到编辑控制器
        EditViewController *edit=segue.destinationViewController;
        NSIndexPath *selectIndex=[self.tableView indexPathForSelectedRow];
        edit.delegate=self;
        edit.contact=self.contacts[selectIndex.row];
    }
}
```

### 3.2 编辑，取消按钮功能

```
//点击编辑按钮
- (IBAction)edit:(UIBarButtonItem *)sender
{
    if ([sender.title isEqualToString:@"取消"])
    {
        //1.改变按钮的文字
          sender.title=@"编辑";
          //2.允许文本框编辑
          _nameField.enabled=NO;
          _phoneField.enabled=NO;
          //3.显示保存按钮
          _saveBtn.hidden=YES;
          //4.弹出电话的键盘
        [self.view endEditing:YES];
        //恢复文本框显示
        //给控件赋值
          _nameField.text=_contact.name;
          _phoneField.text=_contact.phone;
    }else
    {
        //1.改变按钮的文字
        sender.title=@"取消";
        //2.允许文本框编辑
        _nameField.enabled=YES;
        _phoneField.enabled=YES;
        //3.显示保存按钮
        _saveBtn.hidden=NO;
        //4.弹出电话的键盘
        [_phoneField becomeFirstResponder];
    }
}
```

### 3.3 保存数据返回并刷新界面

```
//保存按钮
- (IBAction)save:(UIButton *)sender
{
    //1.回到联系人界面
    [self.navigationController popViewControllerAnimated:YES];
    //2.更新数据：覆盖旧的数据，把最新的数据展示出来
    self.contact.name=_nameField.text;
    self.contact.phone=_phoneField.text;
    //3.通知联系人界面刷新表格
    if ([_delegate respondsToSelector:@selector(editViewController:didUpdateContact:)])
    {
        [_delegate editViewController:self didUpdateContact:self.contact];
    } 
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ios-sirentongxunlu-eidt.gif