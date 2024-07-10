---
title: IOS开发之——彩票-自定义TabBar(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 18e0f085
date: 2022-02-07 09:39:48
---
## 一 概述

TabBar 图片尺寸引起的问题

| 不超过TabBar尺寸 | 超过TabBar尺寸 |
| :--------------: | :------------: |
|      ![][1]      |     ![][2]     |

<!--more-->

## 二 自定义TabBar

### 2.1 自定义TabBar

#### TabBar.h

```
#import <UIKit/UIKit.h>

//如果需要传参数给其他对象，block才需要定义参数
//typedef void(^ILTabBarBlock)(int selectedIndex);
@class ILTabBar;

@protocol ILTabBarDelegate<NSObject>

@optional
-(void)tabBar:(ILTabBar *)tabBar didSelectedIndex:(int)index;

@end

@interface ILTabBar : UIView
//@property (nonatomic,copy) ILTabBarBlock block;

@property (nonatomic,weak) id<ILTabBarDelegate> delegate;

@end
```

#### TabBar.m

```
#import "ILTabBar.h"
#import "ILTabBarButton.h"

@interface ILTabBar()
@property (nonatomic,weak) UIButton *selectedButton;

@end

@implementation ILTabBar

- (instancetype)initWithFrame:(CGRect)frame
{
    self=[super initWithFrame:frame];
    if(self)
    {
        [self addBtns];
    }
    return self;
}

-(void)addBtns
{
    NSString *imageName=nil;
    NSString *selImageName=nil;
    
    
    for(int i=0;i<5;i++)
    {
        ILTabBarButton *btn=[ILTabBarButton buttonWithType:UIButtonTypeCustom];
        btn.tag=i;
        
        imageName=[NSString stringWithFormat:@"TabBar%d",i+1];
        selImageName=[NSString stringWithFormat:@"TabBar%dSel",i+1];
        //设置按钮的图片
        [btn setBackgroundImage:[UIImage imageNamed:imageName] forState:UIControlStateNormal];
        [btn setBackgroundImage:[UIImage imageNamed:selImageName] forState:UIControlStateSelected];
        
        //监听按钮的点击
        [btn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchDown];
        
        [self addSubview:btn];
        
        //选中第一个
        if(i==0)
        {
            [self btnClick:btn];
        }
        
    }
}
-(void)btnClick:(UIButton *)button
{
 
    _selectedButton.selected=NO;
    button.selected=YES;
    _selectedButton=button;
    if ([_delegate respondsToSelector:@selector(tabBar:didSelectedIndex:)]) {
        [_delegate tabBar:self didSelectedIndex:button.tag];
    }
    
//    if(_block)
//     _block(button.tag);
}


-(void)layoutSubviews
{
    [super layoutSubviews];
    
    CGFloat btnW=self.bounds.size.width/self.subviews.count;
    CGFloat btnH=self.bounds.size.height;
    CGFloat btnX=0;
    CGFloat btnY=0;
    
    //设置按钮的尺寸
    for(int i=0;i<self.subviews.count;i++)
    {
        UIButton *btn=self.subviews[i];
        btnX=i*btnW;
        btn.frame=CGRectMake(btnX, btnY, btnW, btnH);
    }
}
@end
```

### 2.2 点击TarBar按下颜色变化(TabBarButton)

```
#import "ILTabBarButton.h"
@implementation ILTabBarButton

-(void)setHighlighted:(BOOL)highlighted
{
    //NSLog(@"%s",__func__);
    //return [super setHighlighted:highlighted];
}
@end
```

### 2.3 TabBarController

```
#import "ILTabBarController.h"
#import "ILTabBar.h"

@interface ILTabBarController ()<ILTabBarDelegate>

@end

@implementation ILTabBarController

- (void)viewDidLoad {
    [super viewDidLoad];
   //创建tarBar
    ILTabBar *tabBar=[[ILTabBar alloc]init];
    //移除自带的tarBar
    [self.tabBar removeFromSuperview];
    NSLog(@"%@",self.tabBar);
    tabBar.delegate=self;
//    tabBar.block=^(int selectedIndex)
//    {
//        self.selectedIndex=selectedIndex;
//    };
    
    //尺寸
    tabBar.frame=self.tabBar.frame;
    [self.view addSubview:tabBar];
    
    //self.selectedIndex=2;  
}
//代理方法
-(void)tabBar:(ILTabBar *)tabBar didSelectedIndex:(int)index
{
    self.selectedIndex=index;   
}
@end
```

## 三 tabBar通过addTabBarButtonWithName添加按钮

###  3.1  自定义addTabBarButtonWithName方法

#### ILTabBar.h

```
//给外界创建按钮
-(void)addTabBarButtonWithName:(NSString *)name selName:(NSString *) selName;
```

#### ILTabBar.m

```
-(void)addTabBarButtonWithName:(NSString *)name selName:(NSString *)selName
{
    ILTabBarButton *btn=[ILTabBarButton buttonWithType:UIButtonTypeCustom];
    
    //设置按钮的图片
    [btn setBackgroundImage:[UIImage imageNamed:name] forState:UIControlStateNormal];
    [btn setBackgroundImage:[UIImage imageNamed:selName] forState:UIControlStateSelected];
    
    //监听按钮的点击
    [btn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchDown];
    
    [self addSubview:btn];
}
```

### 3.2 添加按钮(ILTabBarController.m)

```
  NSString *imageName=nil;
  NSString *selImageName=nil;
    
  for (int i=0; i<self.childViewControllers.count; i++) {
       imageName=[NSString stringWithFormat:@"TabBar%d",i+1];
       selImageName=[NSString stringWithFormat:@"TabBar%dSel",i+1];
       [tabBar addTabBarButtonWithName:imageName selName:selImageName];
  }
```

## 三 效果图

![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-tabbar-normal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-tabbar-oversize.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-tabbar-preview.gif