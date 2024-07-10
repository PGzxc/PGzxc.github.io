---
title: IOS开发之——团购网站-加载网模型显示基本数据(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: bbcb50fb
date: 2020-06-09 23:33:14
---
## 一 概述

本文先使用一般模型从plist设置网络模型加载数据，并进行基本数据的显示，但是由于系统提供的模型有限，稍后会通过XIB自定义方式实现团购网，本文的技术概要：

* 从plist抽取加载模型(TG)
* VIewController.h继承UITableViewController
* ViewController.m完成数据的填充

<!--more-->

## 二 效果图

![][1]

## 三 代码
### 3.1 OC模式下

#### TG.h

```
#import <Foundation/Foundation.h>
@interface TG : NSObject
@property (nonatomic,copy) NSString *title;
@property (nonatomic,copy) NSString *icon;
@property (nonatomic,copy) NSString *price;
@property (nonatomic,copy) NSString *buyCount;

-(instancetype)initWithDict:(NSDictionary *)dict;
+(instancetype)tgWithDict:(NSDictionary *)dict;
+(NSArray *)tgs;

@end
```

#### TG.m

```
#import "TG.h"
@implementation TG
- (instancetype)initWithDict:(NSDictionary *)dict
{
    self=[super init];
    if (self) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
+ (instancetype)tgWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
}
+(NSArray *)tgs
{
    NSArray *array=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"tgs.plist" ofType:nil]];
    NSMutableArray *arrayM=[NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self tgWithDict:dict]];
    }
    return arrayM;
}
@end
```

#### ViewController.m

```
#import "ViewController.h"
#import "TG.h"
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
//隐藏状态栏
//- (BOOL)prefersStatusBarHidden
//{
//    return YES;
//}
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
    UITableViewCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    //3.如果没有可重用cell
    if (cell==nil) {
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }
    //4.设置cell内容
    TG *tg=self.tgs[indexPath.row];
    cell.textLabel.text=tg.title;
    cell.imageView.image=[UIImage imageNamed:tg.icon];
    cell.detailTextLabel.text=[NSString stringWithFormat:@"￥%@    已有%@人购买",tg.price,tg.buyCount];
    return cell;
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tuangou-jiben-view.png