---
title: IOS开发之——九宫格-类方法加载XIB(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e40af26d
date: 2020-06-07 22:14:53
---
## 一 概述

本文介绍将ViewController中XIB视图加载和数据的初始化放到与XIB相关联类方法中进行，简化ViewController的书写

<!--more-->

## 二 代码

### 2.1 OC模式下

#### AppView.h

```
#import <UIKit/UIKit.h>
#import "AppInfo.h"
@interface AppView : UIView

//类方法，方便调用视图
+ (instancetype)appView;
//示例化视图，并使用appInfo设置视图的显示
+(instancetype)appViewWithAppInfo:(AppInfo *)appInfo;
//自定义视图中显示的数据来源是数据模型，使用模型设置自定义视图的显示
@property (nonatomic,strong) AppInfo *appInfo;

@end
```

#### AppView.m

```
#import "AppView.h"
#import "AppInfo.h"
@interface AppView()
@property (weak, nonatomic) IBOutlet UIImageView *iconView;
@property (weak, nonatomic) IBOutlet UILabel *label;
@end
@implementation AppView

+ (instancetype)appView
{
    return [[[NSBundle mainBundle]loadNibNamed:@"AppView" owner:nil options:nil] lastObject];
    
}
+(instancetype)appViewWithAppInfo:(AppInfo *)appInfo
{
    //1.示例化一个视图
    AppView *view=[self appView];
    //2.设置视图的显示
    view.appInfo=appInfo;
    //3。返回视图
    return view;
}
//利用setter方法设置视图的界面显示
-(void)setAppInfo:(AppInfo *)appInfo
{
    _appInfo=appInfo;
    self.label.text=appInfo.name;
    self.iconView.image=appInfo.image;
}

-(IBAction)click:(UIButton *)button
{
    NSLog(@"%s--%ld",__func__,button.tag);
    //添加一个UILabel到界面上
    UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(100, 440, 160, 40)];
    //数值是0表示黑色,1表示纯白 alpha表示透明度
    label.backgroundColor=[UIColor colorWithWhite:0.0 alpha:0.2];
    label.text=self.appInfo.name;
    label.textAlignment=NSTextAlignmentCenter;
    [self.superview addSubview:label];
    label.alpha=0.0;
    //禁用按钮
    button.enabled=NO;
    //动画效果,收尾式动画，修改对象的属性,frame,bounds,alpha
    [UIView animateWithDuration:1.0f animations:^{
        //要修改的动画属性
        label.alpha=1.0;
    } completion:^(BOOL finished) {
        //动画完成后，所做的操作
        [UIView animateWithDuration:1.0f animations:
         ^{
            label.alpha=0.0;
        } completion:^(BOOL finished) {
            [label removeFromSuperview];
            button.enabled=YES;
        }];
        
    }];   
}
@end
```

#### ViewController.m

```
#import "ViewController.h"
#import "AppInfo.h"
#import "AppView.h"
//九宫格常量
#define kAppViewW 80 //宽
#define kAppViewH 90 //高
#define kColCount 3 //列
#define kStartY 20

@interface ViewController ()
@property (nonatomic,strong) NSArray *appList;

@end

@implementation ViewController

- (NSArray *)appList
{
    if (_appList==nil) {

        //将临时数组为属性赋值
        _appList=[AppInfo appList];
        
    }
    return _appList;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    //九宫格界面
    CGFloat marginX=(self.view.bounds.size.width-kColCount*kAppViewW)/(kColCount+1);
    CGFloat marginY=10;
    
    for (int i=0; i<self.appList.count; i++) {
        //行
        // 0，1，2 ->0
        //3,4,5->1
        int row=i/kColCount;
        //列
        //0,3,6->0
        //1,4,7->1
        //2,5,8->2
        int col=i%kColCount;
        CGFloat x=marginX+col*(marginX+kAppViewW);
        CGFloat y=kStartY+ marginY+row*(marginY+kAppViewH);
        
        //从XIB来家长自定义视图
        AppView *appView=[AppView appViewWithAppInfo:self.appList[i]];
        //设置视图的位置
        appView.frame=CGRectMake(x, y, kAppViewW, kAppViewH);
        
        [self.view addSubview:appView];
    }
}
@end
```

