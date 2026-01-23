---
title: IOS开发之——图片查看器
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e2a96e98
date: 2020-05-18 22:51:34
---
## 一 概述

本文实现一种简单的图片查看器：

* 显示当前图片和图标描述及当前是第几张
* 通过左按钮向左切换图片，当前图片是第一张时，按钮灰色不可点击
* 通过右按钮向右切换图片，当图片是最后一张时，按钮灰色不可点击

<!--more-->

## 二 效果图

![][1]

## 三 代码

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
//控件
@property (nonatomic,strong) UILabel *noLabel;
@property (nonatomic,strong) UIImageView *iconImage;
@property (nonatomic,strong) UILabel *descLabel;
@property (nonatomic,strong) UIButton *leftButton;
@property (nonatomic, strong) UIButton *rightButton;

//当前照片的索引
@property (nonatomic,assign) int index;
//图片信息的数组
@property (nonatomic,strong) NSArray *imageList;
@end
@implementation ViewController

//懒加载，给图片复制
- (NSArray *)imageList
{
    NSLog(@"读取图像信息");
    if (_imageList == nil) {
        NSLog(@"实例化数组");

        // "包" Bundle [NSBundle mainBundle]编译安装之后对应的程序包
        NSString *path = [[NSBundle mainBundle] pathForResource:@"ImageList" ofType:@"plist"];
        NSLog(@"%@", path);
        
        // 在OC中ContentsOfFile，通常需要完整的路径
        _imageList = [NSArray arrayWithContentsOfFile:path];
        NSLog(@"%@", _imageList);
    }
    return _imageList;
}

//noLabel
- (UILabel *)noLabel
{
    if (_noLabel==nil)
    {
        UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(0, 20, self.view.bounds.size.width, 40)];
        _noLabel=label;
        _noLabel.textAlignment=NSTextAlignmentCenter;
        [self.view addSubview:_noLabel];
    }
    return _noLabel;
}

//iconImage
- (UIImageView *)iconImage
{
    if (_iconImage==nil) {
        CGFloat imageW=200;
        CGFloat imageH=200;
        CGFloat imageX=(self.view.bounds.size.width-imageW)*0.5;
        CGFloat imageY=CGRectGetMaxY(self.noLabel.frame)+20;
        _iconImage= [[UIImageView alloc] initWithFrame:CGRectMake(imageX, imageY, imageW, imageH)];
        [self.view addSubview:_iconImage];
    }
    return _iconImage;
}

//dessLabel
- (UILabel *)descLabel
{
   if (_descLabel == nil) {
        CGFloat descY = CGRectGetMaxY(self.iconImage.frame);
        _descLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, descY, self.view.bounds.size.width, 100)];
        _descLabel.textAlignment = NSTextAlignmentCenter;
        
        // 需要Label具有“足够的高度”，不限制显示的行数
        _descLabel.numberOfLines = 0;
        [self.view addSubview:_descLabel];
    }
    return _descLabel;
}
- (UIButton *)leftButton
{
    if (_leftButton == nil) {
        _leftButton = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 40, 40)];
        CGFloat centerY = self.iconImage.center.y;
        CGFloat centerX = self.iconImage.frame.origin.x * 0.5;
        _leftButton.center = CGPointMake(centerX, centerY);
        
        [_leftButton setBackgroundImage:[UIImage imageNamed:@"left_normal"] forState:UIControlStateNormal];
        [_leftButton setBackgroundImage:[UIImage imageNamed:@"left_highlighted"] forState:UIControlStateHighlighted];
        [self.view addSubview:_leftButton];
        
        _leftButton.tag = -1;
        
        [_leftButton addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _leftButton;
}

- (UIButton *)rightButton
{
    if (_rightButton == nil) {
        _rightButton = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 40, 40)];
        CGFloat centerY = self.iconImage.center.y;
        CGFloat centerX = self.iconImage.frame.origin.x * 0.5;
        _rightButton.center = CGPointMake(self.view.bounds.size.width - centerX, centerY);
        
        [_rightButton setBackgroundImage:[UIImage imageNamed:@"right_normal"] forState:UIControlStateNormal];
        [_rightButton setBackgroundImage:[UIImage imageNamed:@"right_highlighted"] forState:UIControlStateHighlighted];
        [self.view addSubview:_rightButton];
        
        _rightButton.tag = 1;
        
        [_rightButton addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _rightButton;
}

/** 在viewDidLoad创建界面 */
- (void)viewDidLoad
{
    [super viewDidLoad];
    
//    [self.view addSubview:self.noLabel];
    
    // 显示照片信息
    [self showPhotoInfo];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

/**
 重构的目的：让相同的代码只出现一次
 */
- (void)showPhotoInfo
{
    // 设置序号
    self.noLabel.text = [NSString stringWithFormat:@"%d/%d", self.index + 1, 5];

    // 效率不高，每次都会生成数组
    // 如何解决？使用属性记录字典数组
//    NSDictionary *dict1 = @{@"name": @"biaoqingdi", @"desc": @"表情1"};
//    NSDictionary *dict2 = @{@"name": @"bingli", @"desc": @"病例1"};
//    NSDictionary *dict3 = @{@"name": @"chiniupa", @"desc": @"吃牛扒1"};
//    NSDictionary *dict4 = @{@"name": @"danteng", @"desc": @"蛋疼1"};
//    NSDictionary *dict5 = @{@"name": @"wangba", @"desc": @"网吧1"};
//    NSArray *array = @[dict1, dict2, dict3, dict4, dict5];
    
    // 设置图像和描述
    self.iconImage.image = [UIImage imageNamed:self.imageList[self.index][@"name"]];
    self.descLabel.text = self.imageList[self.index][@"desc"];
    
    self.rightButton.enabled = (self.index != 4);
    self.leftButton.enabled = (self.index != 0);
}

// 在OC中，很多方法的第一个参数，都是触发该方法的对象！
- (void)clickButton:(UIButton *)button
{
    // 根据按钮调整当前显示图片的索引?
    self.index += button.tag;
    
    [self showPhotoInfo];
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/iso-image-view-switch.gif