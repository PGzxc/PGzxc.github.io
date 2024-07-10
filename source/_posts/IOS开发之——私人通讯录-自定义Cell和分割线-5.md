---
title: IOS开发之——私人通讯录-自定义Cell和分割线(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: d3bc1c11
date: 2020-07-05 23:34:50
---
## 一 概述

本文介绍自定义私人通讯录联系人界面的功能：

* 自定义Cell
* 设置分割线

<!--more-->

## 二 效果图

![][1]

## 三 功能实现

### ContactCell.h

```

#import "Contact.h"
@interface ContactCell : UITableViewCell
@property (nonatomic,strong) Contact *contact;
+(instancetype)cellWithTableView:(UITableView *)tableView;

@end
```

### ContactCell.m

```
#import "ContactCell.h"
#import "Contact.h"

@interface ContactCell()
@property (nonatomic,weak) UIView *divide;
@end

@implementation ContactCell

- (UIView *)divide
{
    if (_divide==nil) {
        UIView *v=[[UIView alloc]init];
        v.backgroundColor=[UIColor blackColor];
        v.alpha=0.2;
        _divide=v;
        [self.contentView addSubview:_divide];
    }
    return _divide;
}
- (void)setContact:(Contact *)contact
{
    _contact=contact;
    //给cell的空间赋值
     self.textLabel.text=contact.name;
     self.detailTextLabel.text=contact.phone;   
}

+(instancetype)cellWithTableView:(UITableView *)tableView
{
      static NSString *ID=@"contact";
      return [tableView dequeueReusableCellWithIdentifier:ID];
}
//从XIB加载完成的时候
- (void)awakeFromNib {
    [super awakeFromNib];   
}
-(void)layoutSubviews
{
      [super layoutSubviews];
     //给分割线设置位置
      CGFloat divideH=1;
      CGFloat divideW=self.bounds.size.width;
      CGFloat divideY=self.bounds.size.height-divideH;
      self.divide.frame=CGRectMake(0, divideY, divideW, divideW);
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}
@end
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sirentongxunlu-cell.gif