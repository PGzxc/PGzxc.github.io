---
title: IOS开发之——私人通讯录-删除联系人(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 47346f93
date: 2020-10-14 23:53:11
---
## 一 概述

本文介绍私人通讯录相关的联系人删除相关的操作，涉及以下知识点：

* 左滑删除联系人，界面全局和局部刷新
* 编辑联系人，界面全局和局部刷新
* 左滑删除的文字如何显示中文删除

<!--more-->

## 二 效果图

![][1]

## 三 左滑删除联系人，界面全局和局部刷新

### 3.1 说明

* 联系人ConTroller只要实现`commitEditingStyle`方法，列表项向左滑动会出现删除按钮
* 在`commitEditingStyle`方法中自己实现删除数据并刷新界面

### 3.2 代码

```
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath{
    if (editingStyle==UITableViewCellEditingStyleDelete) {
        //删除数据
        [self.contacts removeObjectAtIndex:indexPath.row];
        //刷新界面
        //[self.tableView reloadData];//全局刷新
        [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationLeft];//删除局部
    }
    NSLog(@"%ld",indexPath.row);
}
```

## 四 编辑联系人，界面全局和局部刷新

### 4.1 功能说明

* 联系人ConTroller的`didUpdateContact`方法是更新联系人要实现的方法
* 在此方法中处理全局和局部刷新逻辑

### 4.2 代码

```
-(void)editViewController:(EditViewController *)edit didUpdateContact:(Contact *)contact
{
    //刷新表格
    //[self.tableView reloadData];//全部刷新
    NSIndexPath *selectIndex=[self.tableView indexPathForSelectedRow];
    [self.tableView reloadRowsAtIndexPaths:@[selectIndex] withRowAnimation:UITableViewRowAnimationLeft];
    //归档
    [NSKeyedArchiver archiveRootObject:self.contacts toFile:FilePath];
}
```

## 五 左滑删除的文字如何显示中文删除

### 5.1 前提

* 系统语言是中文
* 添加中文本地化

### 5.2 添加本地化操作

* 依次选择：项目——>Locallization——>+，在弹出的语言列表中选择中文简体

  ![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-delete-contact.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-local-add.gif