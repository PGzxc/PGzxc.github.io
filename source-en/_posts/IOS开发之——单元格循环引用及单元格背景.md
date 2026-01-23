---
title: IOS开发之——单元格循环引用及单元格背景
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 828d739b
date: 2020-05-24 23:37:55
---
## 一 概述

一个视图窗口内要显示的单元格是有限的，滚动时进入的单元格是重新创建还是使用缓冲池中的，就是本文要介绍的问题。

* 单元格循环引用
* 如何给单元格设置背景色和背景图片

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
        _tableView=[[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewCellStyleSubtitle];
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
    self.tableView.rowHeight=100;
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

    UITableViewCell *cell=[tableView dequeueReusableCellWithIdentifier:@"Cell"];
    if (cell==nil) {
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"Cell"];
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
    }
    //    UITableViewCell *cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:nil];
    //取出对象
    Hero *hero=self.heros[indexPath.row];
    cell.textLabel.text=hero.name;
    cell.imageView.image=[UIImage imageNamed:hero.icon];
    cell.detailTextLabel.text=hero.intro;
    
    //设置背景色
    cell.backgroundColor=[UIColor grayColor];
    //背景图片
    UIImage *bgImage=[UIImage imageNamed:@"img_01"];
    cell.backgroundView=[[UIImageView alloc]initWithImage:bgImage];
    //选中的背景图片
    UIImage *selectedBGImage=[UIImage imageNamed:@"img_02"];
    cell.selectedBackgroundView=[[UIImageView alloc]initWithImage:selectedBGImage];

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
    return 100;
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


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitableview-xunhuan-use.gif