---
title: IOS开发之——九宫格-设置图片、标题和按钮(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 5ad1b35f
date: 2020-05-29 23:28:04
---
## 一 概述

本文给上节的九宫格布局中的组件设置响应的属性和效果

* UIImageView设置图片
* UILabel设置文字
* UIButton设置点击效果和文字说明

<!--more-->

## 二 效果图

![][1]

## 三 代码

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"
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
        _appList=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"app.plist" ofType:nil]];
    }
    return _appList;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    
    //九宫格界面
    CGFloat marginX=(self.view.bounds.size.width-kColCount*kAppViewW)/(kColCount+1);
    CGFloat marginY=10;
    
    for (int i=0; i<10; i++) {
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
        
        UIView *appView=[[UIView alloc]initWithFrame:CGRectMake(x, y, kAppViewW, kAppViewH)];
        //appView.backgroundColor=[UIColor redColor];
        [self.view addSubview:appView];
        NSDictionary *dict=self.appList[i];
        
        //九宫格背景色
        //1->UIImageView
        UIImageView *icon=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kAppViewW, 50)];
        //icon.backgroundColor=[UIColor greenColor];
        //设置图像
        icon.image=[UIImage imageNamed:dict[@"icon"]];
        //图像填充
        icon.contentMode=UIViewContentModeScaleAspectFit;
        
        [appView addSubview:icon];
        //2->UILabel->应用程序名称
        UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(0, CGRectGetMaxY(icon.frame), kAppViewW, 20)];
        //label.backgroundColor=[UIColor blueColor];
        //设置程序名称
        label.text=dict[@"name"];
        //字体
        label.font=[UIFont systemFontOfSize:13.0];
        label.textAlignment=NSTextAlignmentCenter;
        [appView addSubview:label];
        
        //3->UIButton->下载按钮
        UIButton *button=[[UIButton alloc]initWithFrame:CGRectMake(0, CGRectGetMaxY(label.frame), kAppViewW, 20)];
        //button.backgroundColor=[UIColor yellowColor];
        //设置背景图片
        [button setBackgroundImage:[UIImage imageNamed:@"buttongreen"] forState:UIControlStateNormal];
        [button setBackgroundImage:[UIImage imageNamed:@"buttongreen_highlighted"] forState:UIControlStateHighlighted];
        [button setTitle:@"下载" forState:UIControlStateNormal];
        //字体
        button.titleLabel.font=[UIFont systemFontOfSize:12.0];
        
        [appView addSubview:button];   
    }
}

@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-jiugongge-image-label-button.png