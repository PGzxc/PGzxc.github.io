---
title: IOS开发之——九宫格-字典转模型(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: ee03e58f
date: 2020-06-01 23:39:26
---
## 一 原因

- 我们从plist中获取到的数据后，一般是字典数据，所有的数据都在ViewController.m中处理，容易引起该文件冗余
- 在字典的读取中，如果属性名称错误，会引起报错，且错误位置太多，不方便排查
- 如果有多个键值，手动赋值工作量很大，出错的概率也比较高
- 模型即Model类型，无侵入，易扩展

<!--more-->

## 二 代码

### 2.1 OC模式下

#### AppInfo.h

```
#import <Foundation/Foundation.h>

@interface AppInfo : NSObject
@property (nonatomic,copy) NSString *name;
@property (nonatomic,copy) NSString *icon;

/**使用字典实例化模型 */
-(id)initWithDict:(NSDictionary *)dict;
/**类方法，可以快速示例化一个对象 */
+(id)appInfoWithDict:(NSDictionary *)dict;
@end
```

#### AppInfo.m

```
#import "AppInfo.h"
@implementation AppInfo
- (id)initWithDict:(NSDictionary *)dict
{
    self = [super init];
    if (self) {
        self.name=dict[@"name"];
        self.icon=dict[@"icon"];
    }
    return self;
}
+(id)appInfoWithDict:(NSDictionary *)dict
{
    return [[self alloc]initWithDict:dict];
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
//        _appList=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"app.plist" ofType:nil]];
        NSArray *array=[NSArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"app.plist" ofType:nil]];
        //创建一个临时数组
        NSMutableArray *arrayM=[NSMutableArray array];
        //遍历数组，一次类型转换
        for (NSDictionary  *dict in array) {
            //AppInfo *appInfo=[[AppInfo alloc]initWithDict:dict];
            AppInfo *appInfo=[AppInfo appInfoWithDict:dict];
//            appInfo.name=dict[@"name"];
//            appInfo.icon=dict[@"icon"];
            [arrayM addObject:appInfo];
        }
        //将临时数组为属性赋值
        _appList=arrayM;  
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
        icon.image=[UIImage imageNamed:appInfo.icon];
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

