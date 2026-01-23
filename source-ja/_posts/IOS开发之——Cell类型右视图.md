---
title: IOS开发之——Cell类型右视图
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4d74368d
date: 2020-05-24 23:36:00
---
## 一 概述

本文主要介绍给表格布局中的Cell类型设置右侧视图，及右侧视图的监听 

常见的右侧视图：

* ITableViewCellAccessoryDisclosureIndicator:右箭头
* UITableViewCellAccessoryCheckmark:对号
* UITableViewCellAccessoryDetailButton:按钮
* UITableViewCellAccessoryDetailDisclosureButton:按钮+箭头

<!--more-->

## 二 效果图

![][1]

## 三 代码
### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
#import "Hero.h"

@interface ViewController ()<UITableViewDataSource,UITableViewDelegate>
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (nonatomic,strong) NSArray *heros;
@end

@implementation ViewController

- (NSArray *)heros
{
    if (_heros==nil) {
        _heros=[Hero heros];
    }
    return _heros;
}
- (UITableView *)tableView
{
    if (_tableView== nil) {
        _tableView=[[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
        _tableView.dataSource=self;
        _tableView.delegate=self;
        [self.view addSubview:_tableView];
    }
    return _tableView;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    //NSLog(@"%@",self.heros);
    [self tableView];
    //self.tableView.rowHeight=80;
}
#pragma -设置数据源
//每个分组中的数据总数
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.heros.count;
}
//告诉表格每个单元格的明细信息
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:nil];
    //取出对象
    Hero *hero=self.heros[indexPath.row];
    cell.textLabel.text=hero.name;
    cell.imageView.image=[UIImage imageNamed:hero.icon];
    cell.detailTextLabel.text=hero.intro;
    //设置右箭头
    /**
     1. UITableViewCellAccessoryDisclosureIndicator:右箭头
     2. UITableViewCellAccessoryCheckmark:对号
     3.UITableViewCellAccessoryDetailButton:按钮
     3.UITableViewCellAccessoryDetailDisclosureButton:按钮+箭头
     */
    //cell.accessoryType=UITableViewCellAccessoryDetailButton;
    UISwitch *switcher=[[UISwitch alloc]init];
    [switcher addTarget:self action:@selector(switchChange:) forControlEvents:UIControlEventValueChanged];
    
    cell.accessoryView=switcher;
    return cell;
}
#pragma 代理方法设置
-(void)switchChange:(UISwitch *)sender
{
    NSLog(@"%s %@",__func__,sender);
}
//设置行高
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 60;
    //return (indexPath.row %2)?60:44;
}
//选中某一行
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%s %@",__func__,indexPath);
}
//取消选中某一行
- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath
{ 
}
@end
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitableview-cell-right.gif