---
title: IOS开发之——九宫格-使用模型设置自定义视图的显示(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: afa60372
date: 2020-06-06 23:24:43
---
## 一 概述

本文介绍自定义视图和自定义模型相关的操作

* 如何创建自定义视图
* 使用模型设置自定义视图的显示

<!--more-->

## 二 创建自定义视图

* 依次点击：Xcode——>New File——>Cocoa Touch Class，创建的文件继承UIView

  ![][1]
  
* 点击AppView.xib，在Custom Class的Class下拉列表中选择AppView

  ![][2]

## 三 代码

### 3.1 OC模式下

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

#### AppView.h

```
#import <UIKit/UIKit.h>
#import "AppInfo.h"
@interface AppView : UIView

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
        
        //从XIB来加载自定义视图
        AppView *appView=[[[NSBundle mainBundle]loadNibNamed:@"AppView" owner:nil options:nil] lastObject];
        //设置视图的位置
        appView.frame=CGRectMake(x, y, kAppViewW, kAppViewH); 
        [self.view addSubview:appView];
        //AppInfo *appInfo=self.appList[i];
        appView.appInfo=self.appList[i];
    }
}
@end
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uiview-custom-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uivew-xib-custom-class.png

