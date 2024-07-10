---
title: IOS开发之——UITableView
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8ce6a3c1
date: 2020-05-21 23:41:25
---
## 一 概述

本文使用UITableView实现分组布局，其中涉及到的知识点：

* numberOfSectionsInTableView：必须实现的方法，设置有多少分组(section)
* numberOfRowsInSection：必须实现的方法，设置每个分组有多少cell
* cellForRowAtIndexPath：可选的方法，设置每个cell的数据
* titleForHeaderInSection：可选的方法，设置header标题
* titleForFooterInSection：可选的方法，设置footer标题

<!--more-->

## 二 效果图

![][1]

## 三 代码
### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
@interface ViewController ()<UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@end

@implementation ViewController

#pragma tableView方法
//设置有多少section
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 2;
}
//每个section有多少cell
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if(section==0)
    {
        return 20;
    }else{
        return  20;
    }
}
// 告诉表格控件，每个cell的数据
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
    cell.textLabel.text=[NSString stringWithFormat:@"单元格%02ldsection-第%04ldrow",indexPath.section,(long)indexPath.row];
    
    return cell;
}
//设置header标题文字
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return [NSString stringWithFormat:@"header---%02ld",section];
}
//设置footer标题文字
- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section
{
    return [NSString stringWithFormat:@"footer--%02ld",section];
}
@end
```

### 3.2 设置DataSource
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitableview-guding.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tableview-datasource.png