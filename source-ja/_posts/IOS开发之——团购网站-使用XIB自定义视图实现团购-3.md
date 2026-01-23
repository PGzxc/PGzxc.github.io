---
title: IOS开发之——团购网站-使用XIB自定义视图实现团购(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9a77d197
date: 2020-06-10 23:39:13
---
## 一 概述

* 新建自定义Cell(TgCell.xib)
* 拖拽一个需要自定义的控件，摆放其他子控件
* 新建一个类
  - 类名要与XIB的名字保持一致
  - 继承自的子类要与XIB中的根节点的类型一致
* 要连线之前，需要将XIB的根节点类名修改为刚刚新建的类名

<!--more-->

## 二 效果图

![][1]

## 三 代码

#### TgCell.h

```
#import <UIKit/UIKit.h>

@interface TgCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIImageView *iconView;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UILabel *priceLabel;
@property (weak, nonatomic) IBOutlet UILabel *buyCountLabel;
@end
```

#### ViewController.m

```
#import "ViewController.h"
#import "TG.h"
#import "TgCell.h"

@interface ViewController ()
@property (nonatomic,strong) NSArray *tgs;

@end

@implementation ViewController

- (NSArray *)tgs
{
    if (_tgs==nil) {
        _tgs=[TG tgs];
    
    }
    return _tgs;
}
-(void)viewDidLoad
{
    [super viewDidLoad];
    self.tableView.rowHeight=80;
    self.tableView.contentInset=UIEdgeInsetsMake(20, 0, 0, 0);
}
#pragma mark -数据源
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.tgs.count;
}
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    //1.可重用标识符
    static NSString *ID=@"Cell";
    //2.tableView查询可重用Cell
    TgCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    //3.如果没有可重用cell
    if (cell==nil) {
        cell=[[[NSBundle mainBundle]loadNibNamed:@"TgCell" owner:nil options:nil]lastObject];      
    }
    //4.设置cell内容
    TG *tg=self.tgs[indexPath.row];
    cell.titleLabel.text=tg.title;
    cell.iconView.image=[UIImage imageNamed:tg.icon];
    cell.priceLabel.text=tg.price;
    cell.buyCountLabel.text=tg.buyCount;  
    return cell;
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xib-tuangou.png