---
title: IOS开发之——新浪微博-内容页面
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 16cc65c2
date: 2020-06-15 22:55:04
---
## 一 概述

本文介绍实现新浪微博的基本页面效果，代码结果如下：

* Status：模型数据
* StatusFrame：Cell中每个组件要显示的内容和位置
* StatusCell：自定义Cell
* ViewController：页面控制器

<!--more-->

## 二 页面效果图

![][1]

## 三 代码

### 3.1 Status

#### Status.h

```

@interface HMStatus : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *icon;
@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSString *picture;
@property (nonatomic, assign) BOOL vip;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)statusWithDict:(NSDictionary *)dict;

@end
```

#### Status.m

```
#import "HMStatus.h"
@implementation HMStatus
- (instancetype)initWithDict:(NSDictionary *)dict
{
    self = [super init];
    if (self) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
+ (instancetype)statusWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}
@end
```

### 3.2 StatusFrame

#### StatusFrame.h

```
#import <Foundation/Foundation.h>
@class HMStatus;
@interface HMStatusFrame : NSObject
@property (nonatomic, assign, readonly) CGRect nameF;
@property (nonatomic, assign, readonly) CGRect iconF;
@property (nonatomic, assign, readonly) CGRect textF;
@property (nonatomic, assign, readonly) CGRect pictureF;
@property (nonatomic, assign, readonly) CGRect vipF;
/** 单元格高度 */
@property (nonatomic, assign, readonly) CGFloat cellHeight;

@property (nonatomic, strong) HMStatus *status;

+ (NSArray *)statusFrames;

@end
```

#### StatusFrame.m

```
#import "HMStatusFrame.h"
#import "HMStatus.h"
#import "NSString+Tools.h"

/** 姓名字体 */
#define kNameFont   [UIFont systemFontOfSize:14]
/** 正文字体 */
#define kTextFont   [UIFont systemFontOfSize:16]

@implementation HMStatusFrame

- (void)setStatus:(HMStatus *)status
{
    _status = status;
    
    // 控件之间的间距
    CGFloat padding = 10;
    
    // 1> 头像
    CGFloat iconX = padding;
    CGFloat iconY = padding;
    CGFloat iconW = 30;
    CGFloat iconH = 30;
    _iconF = CGRectMake(iconX, iconY, iconW, iconH);
    
    // 2> 名字
    NSDictionary *nameDict = @{NSFontAttributeName: kNameFont};
    CGRect nameRect = [self.status.name textRectWithSize:CGSizeMake(MAXFLOAT, MAXFLOAT) attributes:nameDict];
    nameRect.origin.x = CGRectGetMaxX(self.iconF) + padding;
    nameRect.origin.y = iconY + (iconH - nameRect.size.height) * 0.5;
    _nameF = nameRect;
    
    // 3> vip
    CGFloat vipX = CGRectGetMaxX(self.nameF) + padding;
    CGFloat vipY = nameRect.origin.y;
    CGFloat vipW = 14;
    CGFloat vipH = 14;
    _vipF = CGRectMake(vipX, vipY, vipW, vipH);
    
    // 4> 文字
    NSDictionary *textDict = @{NSFontAttributeName: kTextFont};
    CGRect textRect = [self.status.text textRectWithSize:CGSizeMake(300, MAXFLOAT) attributes:textDict];
    textRect.origin.x = padding;
    textRect.origin.y = CGRectGetMaxY(self.iconF) + padding;
    _textF = textRect;
    
    // 5> 图像
    if (self.status.picture.length > 0) {
        CGFloat pictureX = padding;
        CGFloat pictureY = CGRectGetMaxY(self.textF);
        CGFloat pictureW = 100;
        CGFloat pictureH = 100;
        
        _pictureF = CGRectMake(pictureX, pictureY, pictureW, pictureH);
        
        _cellHeight = CGRectGetMaxY(self.pictureF) + padding;
    } else {
        _cellHeight = CGRectGetMaxY(self.textF) + padding;
    }
}
+ (NSArray *)statusFrames
{
    NSArray *array = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"statuses.plist" ofType:nil]];
    
    NSMutableArray *arrayM = [NSMutableArray array];
    for (NSDictionary *dict in array) {
        HMStatusFrame *statusFrame = [[HMStatusFrame alloc] init];
        statusFrame.status = [HMStatus statusWithDict:dict];
        
        [arrayM addObject:statusFrame];
    }
    return [arrayM copy];
}
@end
```

### 3.3 StatusCell

#### StatusCell.h

```
#import <UIKit/UIKit.h>
@class HMStatusFrame;

@interface HMStatusCell : UITableViewCell
@property (nonatomic, strong) HMStatusFrame *statusFrame;
@end
```

#### StatusCell.m

```
#import "HMStatusCell.h"
#import "HMStatus.h"
#import "HMStatusFrame.h"

/** 姓名字体 */
#define kNameFont   [UIFont systemFontOfSize:14]
/** 正文字体 */
#define kTextFont   [UIFont systemFontOfSize:16]
@interface HMStatusCell()
@property (nonatomic, strong) UIImageView *iconView;
@property (nonatomic, strong) UILabel *nameView;
@property (nonatomic, strong) UIImageView *vipView;
@property (nonatomic, strong) UILabel *textView;
@property (nonatomic, strong) UIImageView *pictureView;
@end

@implementation HMStatusCell

#pragma mark - getter方法，创建控件
- (UIImageView *)iconView
{
    if (_iconView == nil) {
        _iconView = [[UIImageView alloc] init];
        [self.contentView addSubview:_iconView];
    }
    return _iconView;
}

- (UILabel *)nameView
{
    if (_nameView == nil) {
        _nameView = [[UILabel alloc] init];
        _nameView.font = kNameFont;
        [self.contentView addSubview:_nameView];
    }
    return _nameView;
}

- (UIImageView *)vipView
{
    if (_vipView == nil) {
        _vipView = [[UIImageView alloc] init];
        self.vipView.image = [UIImage imageNamed:@"vip"];
        [self.contentView addSubview:_vipView];
    }
    return _vipView;
}

- (UILabel *)textView
{
    if (_textView == nil) {
        _textView = [[UILabel alloc] init];
        _textView.font = kTextFont;
        _textView.numberOfLines = 0;
        [self.contentView addSubview:_textView];
    }
    return _textView;
}

- (UIImageView *)pictureView
{
    if (_pictureView == nil) {
        _pictureView = [[UIImageView alloc] init];
        [self.contentView addSubview:_pictureView];
    }
    return _pictureView;
}

#pragma mark - setter方法，设置模型
- (void)setStatusFrame:(HMStatusFrame *)statusFrame
{
    _statusFrame = statusFrame;
    
    [self settingData];
    [self settingsFrame];
}

/** 设置数据 */
- (void)settingData
{
    HMStatus *status = self.statusFrame.status;
    
    self.iconView.image = [UIImage imageNamed:status.icon];
    self.nameView.text = status.name;
    
    self.vipView.hidden = (status.vip == 0);
    if (self.vipView.hidden) {
        self.nameView.textColor = [UIColor blackColor];
    } else {
        self.nameView.textColor = [UIColor redColor];
    }
    self.textView.text = status.text;
    
    self.pictureView.hidden = (status.picture.length == 0);
    if (!self.pictureView.hidden) {
        self.pictureView.image = [UIImage imageNamed:status.picture];
    }
}

/** 设置位置 */
- (void)settingsFrame
{
    // 1> 头像
    self.iconView.frame = self.statusFrame.iconF;
    
    // 2> 名字
    self.nameView.frame = self.statusFrame.nameF;
    
    // 3> vip
    self.vipView.frame = self.statusFrame.vipF;
    
    // 4> 文字
    self.textView.frame = self.statusFrame.textF;
    
    // 5> 图像
    if (self.statusFrame.status.picture.length > 0) {
        self.pictureView.frame = self.statusFrame.pictureF;
    }
}
@end
```

### 3.4 ViewControllser.m

```
#import "HMViewController.h"
#import "HMStatus.h"
#import "HMStatusCell.h"
#import "HMStatusFrame.h"

@interface HMViewController ()
@property (nonatomic, strong) NSArray *statusFrames;
@end

@implementation HMViewController
static NSString *ID = @"Cell";

- (NSArray *)statusFrames
{
    if (_statusFrames == nil) _statusFrames = [HMStatusFrame statusFrames];
    return _statusFrames;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // 通过代码为表格注册可重用单元格
    [self.tableView registerClass:[HMStatusCell class] forCellReuseIdentifier:ID];
}

#pragma mark - 数据源方法
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.statusFrames.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    HMStatusCell *cell = [tableView dequeueReusableCellWithIdentifier:ID forIndexPath:indexPath];
    
    cell.statusFrame = self.statusFrames[indexPath.row];
    
    return cell;
}
#pragma mark - 代理方法
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    HMStatusFrame *statusFrame = self.statusFrames[indexPath.row];
    
    return statusFrame.cellHeight;
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-xinlang-weibo.gif

