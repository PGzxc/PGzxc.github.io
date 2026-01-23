---
title: IOS开发之——表格分组
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 248fb82c
date: 2020-05-23 23:59:17
---
## 一 概述

本文介绍使用UITableVIew加载本地资源文件夹下的图片和文字，实现列表布局，并介绍相应的技术：

* 如何将资源文件(.plist)映射为类文件(Hero)
* 如何初始化UITableView及设置数据和代理

<!--more-->

## 二 效果图

![][1]
## 三 代码
### 3.1 OC模式下

#### Hero.h

```
#import <Foundation/Foundation.h>

@interface Hero : NSObject
@property (nonatomic,copy) NSString *name;
@property (nonatomic,copy) NSString *icon;
@property (nonatomic,copy) NSString *intro;

-(instancetype)initWithDict:(NSDictionary *)dict;
+(instancetype)heroWithDict:(NSDictionary *)dict;
+(NSArray *)heros;

@end
```

#### Hero.m

```
#import "Hero.h"
@implementation Hero
- (instancetype)initWithDict:(NSDictionary *)dict
{
    self=[super init];
    if(self)
    {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
+ (instancetype)heroWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
}
+(NSArray *)heros
{
    NSArray *array=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"heros.plist"ofType:nil]];
    NSMutableArray *arrayM=[NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self heroWithDict:dict]];
    }
    return arrayM;
}
@end
```

#### ViewController.m

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
    NSLog(@"%@",self.heros);
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
    return cell;
}
#pragma 代理方法设置

//设置行高
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{  
    return 60;
    //return (indexPath.row %2)?60:44;
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitableview-heros.gif