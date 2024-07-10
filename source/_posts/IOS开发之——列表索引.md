---
title: IOS开发之——列表索引
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 53e601a0
date: 2020-05-27 00:17:13
---
## 一概述

本文介绍从plist配置文件中读取数据，并设置到UITableView中；在右侧设置列表索引，通过索引字母，快速定位到所在位置。

<!--more-->

## 二 效果图
![][1]
## 三 代码

### 3.1 OC模式下

#### Car.h

```
#import <Foundation/Foundation.h>

@interface Car : NSObject
@property (nonatomic,copy) NSString *name;
@property (nonatomic,copy) NSString *icon;

-(instancetype)initWithDict:(NSDictionary *)dict;
+(instancetype)carWithDict:(NSDictionary *)dict;

//传入一个包含字典的数组，返回一个Car模型的数组
+(NSArray *)carsWithArray:(NSArray *)array;

@end
```

#### Car.m

```
#import "Car.h"
@implementation Car
- (instancetype)initWithDict:(NSDictionary *)dict
{
    self=[super init];
    if (self) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
+ (instancetype)carWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
}
+ (NSArray *)carsWithArray:(NSArray *)array
{
    NSMutableArray *arrayM=[NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self carWithDict:dict]];
    }
    return arrayM;
}
- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@:%p>{name:%@,icon:%@}",self.class,self,self.name,self.icon];
}
@end
```

#### CarGroup.h

```
#import <Foundation/Foundation.h>
@interface CarGroup : NSObject
//首字母
@property (nonatomic,copy) NSString *title;
//车的数组
@property (nonatomic,strong) NSArray *cars;

- (instancetype)initWithDict:(NSDictionary *)dict;
+(instancetype)carGroupWithDict:(NSDictionary *)dict;
+(NSArray *)carGroups;
@end
```

#### CarGroup.m

```
#import "CarGroup.h"
#import "Car.h"

@implementation CarGroup
- (instancetype)initWithDict:(NSDictionary *)dict
{
    self=[self init];
    if (self) {
        //[self setValuesForKeysWithDictionary:dict];
        [self setValue:dict[@"title"] forKey:@"title"];
        self.cars=[Car carsWithArray:dict[@"cars"]];
    }
    return self;
}
+ (instancetype)carGroupWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
}
+(NSArray *)carGroups
{
    NSArray *array=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"cars_total.plist" ofType:nil]];
    NSMutableArray *arrayM=[NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self carGroupWithDict:dict]];
    }
    return arrayM;
}
- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@: %p> {title: %@, cars: %@}", self.class, self, self.title, self.cars];
}
@end
```

#### ViewController.m

```
#import "ViewController.h"
#import "Car.h"
#import "CarGroup.h"

@interface ViewController ()<UITableViewDataSource>
@property (nonatomic,strong) NSArray *carGroups;
@property (nonatomic,strong) UITableView *tableView;
@end

@implementation ViewController

- (UITableView *)tableView
{
    if (_tableView==nil) {
        _tableView=[[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
        _tableView.dataSource=self;
        [self.view addSubview:_tableView];
    }
    return _tableView;
}
- (NSArray *)carGroups
{
    if (_carGroups==nil) {
        _carGroups=[CarGroup carGroups];
    }
    return _carGroups;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    [self tableView];
    // Do any additional setup after loading the view.
}
#pragma -数据源方法
//分组数
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return self.carGroups.count;
}
//每一组的总数
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    CarGroup *group=self.carGroups[section];
    return group.cars.count;
}
//每一单元内容
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    //可重用标识符
    static NSString *ID=@"Cell";
    //让表格缓冲区查找可重用cell
    UITableViewCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    //如果没有找到可重用cell
    if (cell==nil) {
    //实例化cell
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    //设置cell内容
    CarGroup *group=self.carGroups[indexPath.section];
    Car *car=group.cars[indexPath.row];
    //设置数据
    cell.imageView.image=[UIImage imageNamed:car.icon];
    cell.textLabel.text=car.name;
    return cell;
}
//设置标题
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    CarGroup *group=self.carGroups[section];
    return group.title;
}
//右侧索引列表
-(NSArray<NSString *> *)sectionIndexTitlesForTableView:(UITableView *)tableView
{
    return [self.carGroups valueForKeyPath:@"title"];
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cars-suoyin.gif