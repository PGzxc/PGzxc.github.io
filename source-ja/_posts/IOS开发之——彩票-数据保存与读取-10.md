---
title: IOS开发之——彩票-数据保存与读取(10)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 72196cd7
date: 2022-02-12 22:40:55
---
## 一 概述

* 自定义带UILabel的设置Item
* 比分直播页面
* 开始时间提醒(时间保存及读取)

<!--more-->

## 二 自定义带UILabel的设置Item

### 2.1 ILSettingLabelItem

#### ILSettingLabelItem.h

```
#import "ILSettingItem.h"
@interface ILSettingLabelItem : ILSettingItem
//label显示什么内容
@property(nonatomic,copy) NSString *text;
@end
```

### 2.2 ILSettingCell中添加label

```
@interface ILSettingCell()
@property (nonatomic,strong) UILabel *labelView;
@end

-(UILabel *)labelView
{
    if (_labelView==nil) {
        _labelView=[[UILabel alloc]init];
        _labelView.bounds=CGRectMake(0, 0, 100, 25);
        _labelView.textColor=[UIColor redColor];
        _labelView.textAlignment=NSTextAlignmentRight;  
    }
    
    return _labelView;
}
//设置右边的视图
-(void)setUpAccessoryView
{
  //...省略内容
  if([_item isKindOfClass:[ILSettingLabelItem class]])
    {
        self.accessoryView=self.labelView;
        self.selectionStyle=UITableViewCellSelectionStyleNone;
        ILSettingLabelItem *labelItem=(ILSettingLabelItem *)_item;
        self.labelView.text=labelItem.text;
    }
    //...省略内容
}
```

## 三 比分直播页面(ILScoreNoticeViewController)

### 3.1 ILScoreNoticeViewController.h(继承ILBaseTableViewController)

```
#import "ILBaseTableViewController.h"
@interface ILScoreNoticeViewController : ILBaseTableViewController
@end
```

### 3.2 ILScoreNoticeViewController.m(数据项)

```
#import "ILScoreNoticeViewController.h"
#import "ILSettingSwitchItem.h"
#import "ILSettingGroup.h"
#import "ILSettingLabelItem.h"
#import "ILSaveTool.h"

@interface ILScoreNoticeViewController ()

@property(nonatomic,strong) ILSettingLabelItem *start;

@end

@implementation ILScoreNoticeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //0组
    [self addGroup0];
    [self addGroup1];
    [self addGroup2]; 
}
-(void)addGroup0
{
    ILSettingSwitchItem *notice=[ILSettingSwitchItem itemWithIcon:nil title:@"提醒我关注比赛"];
    ILSettingGroup *group=[[ILSettingGroup alloc]init];
    group.items=@[notice];
    group.footer=@"当我关注的比赛比分发送变化时，通过小弹窗或推送进行提醒。";
    [self.dataList addObject:group];
}
-(void)addGroup1
{
    ILSettingLabelItem *start=[ILSettingLabelItem itemWithIcon:nil title:@"开始时间"];
    _start=start;
    //start.text=[[NSUserDefaults standardUserDefaults]objectForKey:start.title];
    //start.text=[ILSaveTool objectForKey:start.title];
    if (!start.text.length) {
        start.text=@"00:00";
    }
    start.option=^{
        UITextField *textField=[[UITextField alloc]init];
        
        UIDatePicker *datePicker=[[UIDatePicker alloc]init];
        //设置模式
        datePicker.datePickerMode=UIDatePickerModeTime;
        //设置地区
        datePicker.locale=[NSLocale localeWithLocaleIdentifier:@"zh"];
        
        //创建日期格式对象
        NSDateFormatter *dateF=[[NSDateFormatter alloc]init];
        dateF.dateFormat=@"HH:mm";

        //设置日期
        datePicker.date=[dateF dateFromString:@"00:00"];
        //监听UIDatePicker
        [datePicker addTarget:self action:@selector(valueChange:) forControlEvents:UIControlEventValueChanged];
        
        textField.inputView=datePicker;
        
        [textField becomeFirstResponder];
        [self.view addSubview:textField];
        
    };
    ILSettingGroup *group=[[ILSettingGroup alloc]init];
    group.items=@[start];
    group.header=@"只在一下时间接受比分直播。";
    [self.dataList addObject:group];

}
-(void)addGroup2
{
    ILSettingLabelItem *stop=[ILSettingLabelItem itemWithIcon:nil title:@"结束时间"];
    stop.text=@"00:00";
    ILSettingGroup *group=[[ILSettingGroup alloc]init];
    group.items=@[stop];
    //group.header=@"只在一下时间接受比分直播。";
    [self.dataList addObject:group];
}

-(void)valueChange:(UIDatePicker *)datePicker
{
    NSDateFormatter *dateF=[[NSDateFormatter alloc]init];
    dateF.dateFormat=@"HH:mm";
    _start.text=[dateF stringFromDate:datePicker.date];
    //存储制
    //[[NSUserDefaults standardUserDefaults]setObject:_start.text forKey:_start.title];
    //[[NSUserDefaults standardUserDefaults]synchronize];
    
    //放到模型中settext中
    //[ILSaveTool setObject:_start.text forKey:_start.title];
    
    NSLog(@"%@",datePicker.date);
    [self.tableView reloadData];
}

@end
```

## 四 开始时间提醒(时间保存及读取)—Tools工具类

### 4.1 ILSaveTool.h

```
#import <Foundation/Foundation.h>

@interface ILSaveTool : NSObject
+(void)setObject:(id)value forKey:(NSString *)defaultName;
+(id)objectForKey:(NSString *)defaultName;

@end
```

### 4.2  ILSaveTool.m

```
#import "ILSaveTool.h"
@implementation ILSaveTool

+(void)setObject:(id)value forKey:(NSString *)defaultName
{
    //存储制
    [[NSUserDefaults standardUserDefaults]setObject:value forKey:defaultName];
    [[NSUserDefaults standardUserDefaults]synchronize];
}
+(id)objectForKey:(NSString *)defaultName
{
    return [[NSUserDefaults standardUserDefaults]objectForKey:defaultName];
}
@end
```

## 五 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-push-setting-time-save.gif