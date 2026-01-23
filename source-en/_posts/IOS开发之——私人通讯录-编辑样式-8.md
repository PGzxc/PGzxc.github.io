---
title: IOS开发之——私人通讯录-编辑样式(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 68b4dce2
date: 2020-10-17 23:46:45
---
## 一 概述

本文主要介绍一下内容：

* 导航条右侧(已有添加按钮)添加一个删除按钮
* 点击删除按钮，删除tableview条目
* tableview编辑之前调用，切换tableview中编辑模式(添加、删除模式)

<!--more-->

## 二 效果图

![][0]

## 三 导航条右侧(已有添加按钮)添加一个删除按钮

### 3.1 通过Main.storyboard添加

* 点击Xcode上方的“+”，选择BarButtonItem，System item选择Trash

  ![][1]

### 3.2 通过代码添加

#### 业务逻辑

* 现获取布局中的“add”按钮
* 通过代码新建一个“delete”按钮
* 通过navigationItem.rightBarButtonItems将上面的两个按钮添加进来

#### 代码实现

```
 //获取+按钮
 UIBarButtonItem *add=self.navigationItem.rightBarButtonItem;
    
 //添加一个垃圾箱按钮
 UIBarButtonItem *trash=[[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemTrash target:self action:@selector(delete)];
 self.navigationItem.rightBarButtonItems=@[add,trash];
```

## 四 点击删除按钮，删除tableview条目

### 4.1 逻辑说明

* 给tableview设置编辑模式，点击删除按钮时，切换tableview的编辑模式
* 当编辑模式为删除时，会调用到commitEditingStyle方法更新数据和布局的操作

### 4.2 代码实现

#### delete方法

```
 [self.tableView setEditing:!self.tableView.editing animated:YES];
```

#### commitEditingStyle

```
 //删除数据
 [self.contacts removeObjectAtIndex:indexPath.row];
 //刷新界面
 //[self.tableView reloadData];//全局刷新
 [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationLeft];//删除局部
```

## 五 切换tableview中编辑模式(添加、删除模式)

### 5.1 逻辑说明

* tableview在编辑之前会调用editingStyleForRowAtIndexPath方法，可以给tableview中的条目设置样式
* 如条目0位UITableViewCellEditingStyleInsert，其他为UITableViewCellEditingStyleDelete
* 给相应的样式，添加对应的功能

### 5.2 代码实现

#### editingStyleForRowAtIndexPath

```
- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row==0) {
        return UITableViewCellEditingStyleInsert;
    }
    return UITableViewCellEditingStyleDelete;
}
```

#### UITableViewCellEditingStyleInsert

```
 Contact *contact=[Contact contactWithName:@"grace" phone:@"123"];
 //[self.contacts addObject:contact];//添加到最后一行
 [self.contacts insertObject:contact atIndex:indexPath.row+1];
 [self.tableView reloadData];
```



[0]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-baritem-delete.gif
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xirentongxunlu-baritem-trash-add-mainstorey.png

