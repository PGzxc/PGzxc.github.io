---
title: IOS开发之——彩票-设置界面封装(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 3296aa39
date: 2022-02-07 09:53:28
---
## 一 概述

* 设置界面为UITableViewController，自定义为ILSettingTableViewController
* 界面分为上下2组，自定义ILSettingGroup存放每个分组的header、footer和每列的数组items
* 为每列Item自定义View为ILSettingCell(UITableViewCell)
* 每列Item的数据为ILSettingItem(存放icon、title)
* 为区分ILSettingItem为箭头还是Switch，分别定义ILSettingItem的子类：ILSettingArrowItem和ILSettingSwitchItem

<!--more-->

## 二 代码实现

### 2.1 UITableViewController

#### UITableViewController.h

```
#import <UIKit/UIKit.h>
@interface ILSettingTableViewController : UITableViewController
@end
```

####  UITableViewController.m

```
#import "ILSettingTableViewController.h"
#import "ILSettingItem.h"
#import "ILSettingGroup.h"
#import "ILSettingCell.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"
#import "ILTestViewController.h"


@interface ILSettingTableViewController ()

@property (nonatomic,strong) NSMutableArray *dataList;

@end

@implementation ILSettingTableViewController

-(NSMutableArray *)dataList
{
    if(_dataList==nil)
    {
        _dataList=[NSMutableArray array];
        
        //第0组
        ILSettingArrowItem *pushNotice=[ILSettingArrowItem itemWithIcon:@"MorePush" title:@"推送和提醒"];
        pushNotice.destVcClass=[ILTestViewController class];
        pushNotice.destVcName=@"ILTestViewController";
        ILSettingItem *yaoyiyao=[ILSettingSwitchItem itemWithIcon:@"handShake" title:@"摇一摇机选"];
        ILSettingItem *vioce=[ILSettingSwitchItem itemWithIcon:@"sound_Effect" title:@"声音效果"];
        //NSArray *group0=@[pushNotice,yaoyiyao];
        
        ILSettingGroup *group0=[[ILSettingGroup alloc]init];
        group0.items=@[pushNotice,yaoyiyao,vioce];
        group0.header=@"标题头部-1";
        group0.footer=@"标题尾部-1";
        
        
        
        //第1组
        ILSettingItem *newVersion=[ILSettingArrowItem itemWithIcon:@"MoreUpdate" title:@"检测新版本"];
        ILSettingItem *help=[ILSettingArrowItem itemWithIcon:@"MoreHelp" title:@"帮助"];
        ILSettingItem *share=[ILSettingArrowItem itemWithIcon:@"MoreShare" title:@"分享"];
        ILSettingItem *message=[ILSettingArrowItem itemWithIcon:@"MoreMessage" title:@"查看消息"];
        ILSettingItem *recommend=[ILSettingArrowItem itemWithIcon:@"MoreNetease" title:@"产品推荐"];
        ILSettingItem *about=[ILSettingArrowItem itemWithIcon:@"MoreAbout" title:@"关于"];
        
        //NSArray *group1=@[newVersion,help];
        
        ILSettingGroup *group1=[[ILSettingGroup alloc]init];
        group1.items=@[newVersion,help,share,message,recommend,about];
        group1.header=@"标题头部-2";
        group1.footer=@"标题尾部-2";
        
        [_dataList addObject:group0];
        [_dataList addObject:group1];
        
    }
    return _dataList;
}

- (instancetype)init
{
    return [super initWithStyle:UITableViewStyleGrouped];
}
- (void)viewDidLoad {
    [super viewDidLoad];
    //self.tableView.rowHeight=200;
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
#warning Incomplete implementation, return the number of sections
    return self.dataList.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
#warning Incomplete implementation, return the number of rows
    
    //NSArray *arr=self.dataList[section];
    ILSettingGroup *group=self.dataList[section];
    return group.items.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
//    static NSString *ID=@"cell";
//    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
//    if (cell==nil) {
//        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
//    }
    //1-创建cell
    ILSettingCell *cell=[[ILSettingCell class] cellWithTableView:tableView];
    //2-取出模型
    
    
    ILSettingGroup *group=self.dataList[indexPath.section];
    //ILSettingItem *item=self.dataList[indexPath.section][indexPath.row];
    ILSettingItem *item=group.items[indexPath.row];

    //cell.imageView.image=[UIImage imageNamed:item.icon];
    //cell.textLabel.text=item.title;
    //传递模型
    cell.item=item;
    
    return cell;
}
-(NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    ILSettingGroup *group=self.dataList[section];
    return group.header;
}
-(NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section
{
    ILSettingGroup *group=self.dataList[section];
    return group.footer;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    //取出模型
    ILSettingGroup *group=self.dataList[indexPath.section];
    //ILSettingItem *item=self.dataList[indexPath.section][indexPath.row];
    ILSettingItem *item=group.items[indexPath.row];
    
    //创建跳转的控制器
    if([item isKindOfClass:[ILSettingArrowItem class]])
    {
        ILSettingArrowItem *arrowItem=(ILSettingArrowItem *)item;
        Class vcClass=NSClassFromString(arrowItem.destVcName);
        
        UIViewController *vc=[[vcClass alloc]init];
        //UIViewController *vc=[arrowItem.destVcClass alloc];
        [self.navigationController pushViewController:vc animated:YES];
    }
}

@end
```

### 2.2 ILSettingGroup

#### ILSettingGroup.h

```
#import <Foundation/Foundation.h>

@interface ILSettingGroup : NSObject

@property (nonatomic,copy)  NSString *header;
@property (nonatomic,copy)  NSString *footer;
@property (nonatomic,strong) NSArray *items;

@end
```

### 2.3 ILSettingCell

#### ILSettingCell.h

```
#import <UIKit/UIKit.h>

@class ILSettingItem;

@interface ILSettingCell : UITableViewCell
@property (nonatomic,strong) ILSettingItem *item;

+(instancetype)cellWithTableView:(UITableView *)tableView;

@end
```

#### ILSettingCell.m

```
#import "ILSettingCell.h"
#import "ILsettingItem.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"

@interface ILSettingCell()
@property (nonatomic,strong) UIImageView *imgView;
@property (nonatomic,strong) UISwitch *switchView;

@end

@implementation ILSettingCell

-(UIImageView *)imgView
{
    if (_imgView==nil) {
        _imgView=[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"CellArrow"]];
    }
    return  _imgView;
}

-(UISwitch *)switchView
{
    if (_switchView==nil) {
        _switchView=[[UISwitch alloc]init];
    }
    return _switchView;
}

-(void)setItem:(ILSettingItem *)item
{
    _item=item;
  //1-设置cell的子控件的数据
    [self setUpData];
  //2-设置右边的视图
    [self setUpAccessoryView];

}
//设置cell的子控件的数据
-(void)setUpData
{
    self.imageView.image=[UIImage imageNamed:_item.icon];
    self.textLabel.text=_item.title;
}
//设置右边的视图
-(void)setUpAccessoryView
{
    NSLog(@"%@",_item);
    if ([_item isKindOfClass:[ILSettingArrowItem class]]) { //箭头
        //self.accessoryType=UITableViewCellAccessoryDisclosureIndicator;
        self.accessoryView=self.imgView;
        self.selectionStyle=UITableViewCellSelectionStyleDefault;
    }else if([_item isKindOfClass:[ILSettingSwitchItem class]])//switch
    {
        self.accessoryView=self.switchView;
        self.selectionStyle=UITableViewCellSelectionStyleNone;
        //self.accessoryView=[[UISwitch alloc]init];
    }else
    {
        self.accessoryView=nil;
        self.selectionStyle=UITableViewCellSelectionStyleDefault;
    }
}

+(instancetype)cellWithTableView:(UITableView *)tableView
{
    static NSString *ID=@"cell";
    ILSettingCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    if (cell==nil) {
        cell=[[ILSettingCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    return cell;
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
```

### 2.4 ILSettingItem

#### ILSettingItem.h

```
#import <Foundation/Foundation.h>
@interface ILSettingItem : NSObject

@property (nonatomic,copy) NSString *title;
@property (nonatomic,copy) NSString *icon;
//@property (nonatomic,assign) ILSettingItemType type;

+(instancetype)itemWithIcon:(NSString *)icon title:(NSString *)title;

@end
```

#### ILSettingItem.m

```
#import "ILSettingItem.h"

@implementation ILSettingItem

+(instancetype)itemWithIcon:(NSString *)icon title:(NSString *)title
{
    
    ILSettingItem *item=[[self alloc]init];
    item.icon=icon;
    item.title=title;
    
    return item;
}
@end
```

### 2.5 ILSettingArrowItem

#### ILSettingArrowItem.h

```
#import "ILSettingItem.h"

@interface ILSettingArrowItem : ILSettingItem
//跳转的控制器的类目
@property (nonatomic,assign) Class destVcClass;
@property(nonatomic,copy) NSString *destVcName;
@end
```

### 2.6 ILSettingSwitchItem

#### ILSettingSwitchItem.h

```
#import "ILSettingItem.h"
@interface ILSettingSwitchItem : ILSettingItem
@end
```

## 三 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-setting-cell.gif