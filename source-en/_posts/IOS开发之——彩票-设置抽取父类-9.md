---
title: IOS开发之——彩票-设置抽取父类(9)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 9a2cc1d0
date: 2022-02-11 08:41:00
---
## 一 概述

设置页面及推送和提醒界面结果类似，可以抽取共同父类，优化项目代码

| 设置页面 | 推送和提醒 |
| :------: | :--------: |
|  ![][1]  |   ![][2]   |

<!--more-->

## 二 功能分析

* 两个界面继承自UITableViewController
* 每个界面需要分别实现数据(dataList)，及数据源的相关的数据设置如
  - numberOfSectionsInTableView：多少分组
  - numberOfRowsInSection：每个分组包含多少条数据
  - cellForRowAtIndexPath：每条cell的内容及样式
  - didSelectRowAtIndexPath：点击每天数据如何进行处理及跳转

## 三 代码抽取

### 3.1 ILBaseTableViewController

#### ILBaseTableViewController.h(定义数组数据)

```
#import <UIKit/UIKit.h>
@interface ILBaseTableViewController : UITableViewController
@property (nonatomic,strong) NSMutableArray *dataList;
@end
```

#### ILBaseTableViewController.m(共量数据)

```
#import "ILBaseTableViewController.h"
#import "ILSettingItem.h"
#import "ILSettingGroup.h"
#import "ILSettingCell.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"

@interface ILBaseTableViewController ()

@end

@implementation ILBaseTableViewController

-(NSMutableArray *)dataList
{
    if (_dataList==nil) {
        _dataList=[NSMutableArray array];
    }
    return _dataList;
}

- (instancetype)init
{
    return [super initWithStyle:UITableViewStyleGrouped];
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
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
    //取消选中
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    //取出模型
    ILSettingGroup *group=self.dataList[indexPath.section];
    //ILSettingItem *item=self.dataList[indexPath.section][indexPath.row];
    ILSettingItem *item=group.items[indexPath.row];
    
    if (item.option) {
        item.option();
    }
    
    //创建跳转的控制器
    if([item isKindOfClass:[ILSettingArrowItem class]])
    {
        ILSettingArrowItem *arrowItem=(ILSettingArrowItem *)item;
        //Class vcClass=NSClassFromString(arrowItem.destVcName);
        //UIViewController *vc=[[vcClass alloc]init];
        //跳转控制器
        if (arrowItem.destVcClass) {
            UIViewController *vc=[[arrowItem.destVcClass alloc]init];
            vc.title=item.title;
            [self.navigationController pushViewController:vc animated:YES];
        }
    }
}
@end
```

### 3.2 设置页面(ILSettingTableViewController)

#### ILSettingTableViewController.h(继承ILBaseTableViewController)

```
#import "ILBaseTableViewController.h"
@interface ILSettingTableViewController : ILBaseTableViewController

@end
```

#### ILSettingTableViewController.m(数据部分)

```
#import "ILSettingTableViewController.h"
#import "ILSettingItem.h"
#import "ILSettingGroup.h"
#import "ILSettingCell.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"
#import "ILTestViewController.h"
#import "MBProgressHUD.h"
#import "ILProductViewController.h"
#import "ILPushNoticeController.h"


@interface ILSettingTableViewController ()

@end

@implementation ILSettingTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //0组数据
    [self addGroup0];
    [self addGroup1];
}
-(void)addGroup0
{
    //第0组
    ILSettingArrowItem *pushNotice=[ILSettingArrowItem itemWithIcon:@"MorePush" title:@"推送和提醒" destVcClass:[ILPushNoticeController class]];
    //pushNotice.destVcClass=[ILTestViewController class];
    //pushNotice.destVcName=@"ILTestViewController";
    ILSettingItem *yaoyiyao=[ILSettingSwitchItem itemWithIcon:@"handShake" title:@"摇一摇机选"];
    ILSettingItem *vioce=[ILSettingSwitchItem itemWithIcon:@"sound_Effect" title:@"声音效果"];
    //NSArray *group0=@[pushNotice,yaoyiyao];
    
    ILSettingGroup *group0=[[ILSettingGroup alloc]init];
    group0.items=@[pushNotice,yaoyiyao,vioce];
    group0.header=@"标题头部-1";
    group0.footer=@"标题尾部-1";
    
    [self.dataList addObject:group0];
    
}
-(void)addGroup1
{
    //第1组
    ILSettingItem *newVersion=[ILSettingArrowItem itemWithIcon:@"MoreUpdate" title:@"检测新版本"];
    newVersion.option=^{
        
        //1-显示蒙版
        MBProgressHUD *hud= [MBProgressHUD  showHUDAddedTo:self.view animated:YES];
        hud.mode = MBProgressHUDModeIndeterminate;
        hud.label.text = @"Loading";
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        //2-隐藏蒙版
        [MBProgressHUD hideHUDForView:self.view animated:YES];
            
        //3-提示用户
        //1.创建UIAlertControler
         UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"有更新版本" message:@"确认更新？" preferredStyle:UIAlertControllerStyleAlert];
            /*
             参数说明：
             Title:弹框的标题
             message:弹框的消息内容
             preferredStyle:弹框样式：UIAlertControllerStyleAlert
             */
            
            //2.添加按钮动作
            //2.1 确认按钮
            UIAlertAction *conform = [UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
                NSLog(@"点击了确认按钮");
            }];
            //2.2 取消按钮
            UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
                NSLog(@"点击了取消按钮");
            }];
            //3.将动作按钮 添加到控制器中
            [alert addAction:conform];
            [alert addAction:cancel];
            
            //4.显示弹框
            [self presentViewController:alert animated:YES completion:nil];
            
        });
    };
    ILSettingItem *help=[ILSettingArrowItem itemWithIcon:@"MoreHelp" title:@"帮助" destVcClass:[ILTestViewController class]];
    ILSettingItem *share=[ILSettingArrowItem itemWithIcon:@"MoreShare" title:@"分享"];
    ILSettingItem *message=[ILSettingArrowItem itemWithIcon:@"MoreMessage" title:@"查看消息" destVcClass:[ILTestViewController class]];
    ILSettingItem *recommend=[ILSettingArrowItem itemWithIcon:@"MoreNetease" title:@"产品推荐" destVcClass:[ILProductViewController class]];
    ILSettingItem *about=[ILSettingArrowItem itemWithIcon:@"MoreAbout" title:@"关于" destVcClass:[ILTestViewController class]];
    
    //NSArray *group1=@[newVersion,help];
    
    ILSettingGroup *group1=[[ILSettingGroup alloc]init];
    group1.items=@[newVersion,help,share,message,recommend,about];
    group1.header=@"标题头部-2";
    group1.footer=@"标题尾部-2";
    
    [self.dataList addObject:group1];
    
}
@end
```

### 3.3 推送和提醒ILPushNoticeController

#### ILPushNoticeController.h(继承ILBaseTableViewController)

```
#import <UIKit/UIKit.h>
#import "ILBaseTableViewController.h"
//@interface ILPushNoticeController : UITableViewController
@interface ILPushNoticeController : ILBaseTableViewController

@end
```

#### ILPushNoticeController.m(数据部分)

```
#import "ILPushNoticeController.h"
#import "ILSettingItem.h"
#import "ILSettingGroup.h"
#import "ILSettingCell.h"
#import "ILSettingArrowItem.h"
#import "ILSettingSwitchItem.h"


@interface ILPushNoticeController ()

@end

@implementation ILPushNoticeController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addGroup0];

}
-(void)addGroup0
{
    //第0组
    ILSettingArrowItem *push=[ILSettingArrowItem itemWithIcon:nil title:@"开奖号码推送" destVcClass:nil];
    ILSettingItem *ani=[ILSettingArrowItem itemWithIcon:nil title:@"中奖动画"];
    ILSettingItem *live=[ILSettingArrowItem itemWithIcon:nil title:@"比分直播提醒"];
    ILSettingItem *time=[ILSettingArrowItem itemWithIcon:nil title:@"购彩定时提醒"];
    
    ILSettingGroup *group0=[[ILSettingGroup alloc]init];
    group0.items=@[push,ani,live,time];
    group0.header=@"标题头部-1";
    group0.footer=@"标题尾部-1";
    
    [self.dataList addObject:group0];
}

@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-setting-extract-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-setting-push-extract-view.png
