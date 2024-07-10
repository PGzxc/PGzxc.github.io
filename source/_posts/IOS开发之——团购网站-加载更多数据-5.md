---
title: IOS开发之——团购网站-加载更多数据(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c0b98ca1
date: 2020-06-13 23:43:16
---
## 一 概述

本文在团购页面的基础上添加下面的功能：

* 下拉到底部时，加载更多页面的搭建
* 设置代理传递按钮被点击事件
* 刷新全部数据和刷新单条数据
* 代理的optional和if预处理指令

<!--more-->

## 二 功能详述

### 2.1 加载更多页面

* 新建TgFooterView.xib用于做加载更多数据的布局页面

  ![][1]
  
* 在ViewController.m中，给tableView.tableFooterView指定上述布局

  ```
  self.tableView.tableFooterView=[[[NSBundle mainBundle]loadNibNamed:@"TgFooterView" owner: nil options:nil] lastObject];
  ```

* 控制加载点击按钮与加载中按钮的显示与隐藏逻辑

  - 默认隐藏加载中布局，显示加载按钮
  - 点击加载按钮后，隐藏加载按钮，显示加载中视图
  - 数据请求到后，隐藏加载中视图，显示加载按钮

### 2.2 设置代理传递按钮被点击事件

* TgFooterView中定义代理与代理属性

  ```
  @class TgFooterView;
  @protocol TgFootViewDelegate <NSObject>
  @optional
  //视图的下载按钮被点击
  - (void)footViewDidDownloadButtonClick:(TgFooterView *)footVIew;
  @end
  @property (nonatomic,weak) id <TgFootViewDelegate> delegate;
  ```

* ViewController.m中继承代理，实现代理中方法

  ```
  @interface ViewController ()<TgFootViewDelegate>
  
  - (void)footViewDidDownloadButtonClick:(nonnull TgFooterView *)footVIew {
      NSLog(@"努力加载数据中。。");
      //向数组中添加数据，模拟网络添加数据的效果
      NSDictionary *dict=@{@"title":@"标题",@"icon":@"ad_00",@"price":@"100.2",@"buyCount":@"250"};
      TG *tg=[TG tgWithDict:dict];
      [self.tgs addObject:tg];
      //刷新数据
      //[self.tableView reloadData];
      NSIndexPath *path=[NSIndexPath indexPathForRow:self.tgs.count-1 inSection:0];
      [self.tableView insertRowsAtIndexPaths:@[path] withRowAnimation:UITableViewRowAnimationMiddle];
  }
  ```

* 给TgFooterView指定代理

  ```
   TgFooterView *footer=[TgFooterView footView];
   footer.delegate=self;
   self.tableView.tableFooterView=footer;
  ```

### 2.3 刷新全部数据和刷新单条数据

* 刷新全部数据(不推荐)

  ```
  [self.tableView reloadData];
  ```

* 刷新单条数据

  ```
   NSIndexPath *path=[NSIndexPath indexPathForRow:self.tgs.count-1 inSection:0];
      [self.tableView insertRowsAtIndexPaths:@[path] withRowAnimation:UITableViewRowAnimationMiddle];
  ```

### 2.4 代理的optional和if预处理指令

* optional

  ```
  //TgFooterView.h
  @optional
  //视图的下载按钮被点击
  - (void)footViewDidDownloadButtonClick:(TgFooterView *)footVIew;
  
  //TgFooterView.m
  //判断代理是否实现了协议方法
  if ([self.delegate respondsToSelector:@selector(footViewDidDownloadButtonClick:)]) {
                  [self.delegate footViewDidDownloadButtonClick:self];
              }
  ```

* if预处理指令(if 为0不会执行代理，为1会执行)

  ```
  #if 1
  - (void)footViewDidDownloadButtonClick:(nonnull TgFooterView *)footVIew {
      NSLog(@"努力加载数据中。。");
      //向数组中添加数据，模拟网络添加数据的效果
      NSDictionary *dict=@{@"title":@"标题",@"icon":@"ad_00",@"price":@"100.2",@"buyCount":@"250"};
      TG *tg=[TG tgWithDict:dict];
      [self.tgs addObject:tg];
      //刷新数据
      //[self.tableView reloadData];
      NSIndexPath *path=[NSIndexPath indexPathForRow:self.tgs.count-1 inSection:0];
      [self.tableView insertRowsAtIndexPaths:@[path] withRowAnimation:UITableViewRowAnimationMiddle];
  }
  #endif
  ```

## 三 效果
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/icon-tuangou-tgfooterview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tuangou-loadmore.gif

