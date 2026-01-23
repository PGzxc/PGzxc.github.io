---
title: IOS开发之——数据的删除、添加及排序
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 11f88d56
date: 2020-05-28 00:20:11
---
## 一 概述

本文介绍表格数据的删除、添加及排序相关操作

* 数据列左滑动删除
* 在数据列左侧点击+号添加数据项
* 拖动数据项上下滑动，重新排序

<!--more-->

## 二 效果图

![][1]

## 三 代码

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()<UITableViewDataSource,UITableViewDelegate>

//数据列表
@property (nonatomic,strong) NSMutableArray *dataList;
@property (nonatomic,strong) UITableView *tableView;
@end

@implementation ViewController

- (UITableView *)tableView
{
    if (_tableView==nil) {
        _tableView=[[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
        _tableView.dataSource=self;
        _tableView.delegate=self;
        [self.view addSubview:_tableView];
    }
    return _tableView;
}
- (NSMutableArray *)dataList
{
    if (_dataList==nil) {
        _dataList=[NSMutableArray arrayWithObjects:@"A", @"B",@"C",@"D", @"E",@"F",@"G", @"H",@"I",@"J", @"K",@"L",@"M", @"N",@"O",@"P", @"Q",nil];
    }
    return _dataList;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    [self tableView];
    self.tableView.editing=YES;
}

#pragma 数据项
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.dataList.count;
}
//单元格内容
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *ID=@"Cell";
    UITableViewCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    if (cell==nil) {
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    //设置内容
    cell.textLabel.text=self.dataList[indexPath.row];
    return cell;
    
}

#pragma 代理
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle==UITableViewCellEditingStyleDelete) {
        NSLog(@"要删除..");
        [self.dataList removeObjectAtIndex:indexPath.row];
        NSLog(@"%@",self.dataList);
        //刷新
        //[self.tableView reloadData];
        [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationMiddle];
    }else if(editingStyle==UITableViewCellEditingStyleInsert)
    {
        NSLog(@"要添加数据");
        [self.dataList insertObject:@"Z" atIndex:indexPath.row+1];
        //刷新数据
        NSIndexPath *path=[NSIndexPath indexPathForRow:indexPath.row+1 inSection:indexPath.section];
        [self.tableView insertRowsAtIndexPaths:@[path] withRowAnimation:UITableViewRowAnimationMiddle];
    }
}
// 只要实现此方法，就可以显示拖动控件
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)sourceIndexPath toIndexPath:(NSIndexPath *)destinationIndexPath
{
    // 界面数据UITableView已经完成了
    // 调整数据即可
//    [self.dataList exchangeObjectAtIndex:sourceIndexPath.row withObjectAtIndex:destinationIndexPath.row];
    // 1. 将源从数组中取出
    id source = self.dataList[sourceIndexPath.row];
    // 2. 将源从数组中删除
    [self.dataList removeObjectAtIndex:sourceIndexPath.row];
    NSLog(@"%@", self.dataList);
    
    // 3. 将源插入到数组中的目标位置
    [self.dataList insertObject:source atIndex:destinationIndexPath.row];
    
    NSLog(@"%@", self.dataList);
}

#pragma mark - 代理方法
// 返回编辑样式，如果没有实现此方法，默认都是删除
- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row % 2) {
        return UITableViewCellEditingStyleInsert;
    } else {
        return UITableViewCellEditingStyleDelete;
    }
    //return UITableViewCellEditingStyleInsert;
}
@end
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-drag-add-delete.gif