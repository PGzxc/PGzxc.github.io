---
title: IOS开发之——九宫格-KVC(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c859d1d3
date: 2020-06-03 23:18:55
---
## 一 概述

本文介绍IOS开发中，数据封装时使用的KVC。KVC(key value coding)，即键值编码，是一种简洁修改/读取对象属性的一种方法。  

```
 1. [self setValue:dict[@"name"] forKey:@"name"];
 2. [self setValue:dict[@"icon"] forKey:@"icon"];
 3. [self setValuesForKeysWithDictionary:dict]
```
<!--more-->

说明：

* 3=1+2，即3中为name和value设置
* setValue后是数值,forked：属性名称

## 二 代码

### 2.1 OC模式下

#### AppInfo.h

```
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface AppInfo : NSObject
@property (nonatomic,copy) NSString *name;
@property (nonatomic,copy) NSString *icon;
@property (nonatomic,strong,readonly) UIImage *image;

/**使用字典实例化模型 */
-(id)initWithDict:(NSDictionary *)dict;
/**类方法，可以快速示例化一个对象 */
+(id)appInfoWithDict:(NSDictionary *)dict;
/**返回所有plist中的数据模型数组*/
+(NSArray *)appList;
@end
```

#### AppInfo.m

```
#import "AppInfo.h"
@implementation AppInfo
@synthesize image=_image;
- (UIImage *)image
{
    if (_image==nil) {
        _image=[UIImage imageNamed:self.icon];
    }
    return _image;
}
- (id)initWithDict:(NSDictionary *)dict
{
    self = [super init];
    if (self) {
        //self.name=dict[@"name"];
        //self.icon=dict[@"icon"];
        //KVC-key value coding键值对
        //[self setValue:dict[@"name"] forKey:@"name"];
        //[self setValue:dict[@"icon"] forKey:@"icon"];
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
+(id)appInfoWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
}
+(NSArray *)appList
{
   NSArray *array=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"app.plist" ofType:nil]];
    //创建一个临时数组
    NSMutableArray *arrayM=[NSMutableArray array];
    //遍历数组，一次类型转换
   for (NSDictionary  *dict in array)
   {
       AppInfo *appInfo=[AppInfo appInfoWithDict:dict];
       [arrayM addObject:appInfo];   
   }
    return arrayM;
}
@end
```

#### ViewController.m

```
#import "ViewController.h"
#import "AppInfo.h"
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
        //NSDictionary *dict=self.appList[i];
        AppInfo *appInfo=self.appList[i];
        
        //九宫格背景色
        //1->UIImageView
        UIImageView *icon=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, kAppViewW, 50)];
        //icon.backgroundColor=[UIColor greenColor];
        //设置图像
        //icon.image=[UIImage imageNamed:dict[@"icon"]];
        //icon.image=[UIImage imageNamed:appInfo.icon];
        icon.image=appInfo.image;
        //图像填充
        icon.contentMode=UIViewContentModeScaleAspectFit;
        
        [appView addSubview:icon];
        //2->UILabel->应用程序名称
        UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(0, CGRectGetMaxY(icon.frame), kAppViewW, 20)];
        //label.backgroundColor=[UIColor blueColor];
        //设置程序名称
        //label.text=dict[@"name"];
        label.text=appInfo.name;
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

