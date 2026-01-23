---
title: IOS开发之——团购网站-代码重构(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: af488a23
date: 2020-06-11 23:25:05
---
## 一 概述

本文从以下几点对代码进行重构：

* XIB的属性面板，指定可重用标识符(Cell与XIB中的Identifier中的Cell一致)
* 通过数据模型设置Cell内容，可以让视图控制器不需要了解Cell的内部实现细节
* 在TgCell中提供一个类方法，可以快速创建Cell

<!--more-->

## 二 重构
### 2.1 XIB面板，重用标识符

#### TgCell.m面板标识符

```
+(instancetype)cellWithTableView:(UITableView *)tableView
{
    //1.可重用标识符
    static NSString *ID=@"Cell";
    //2.tableView查询可重用Cell
    TgCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    //3.如果没有可重用cell
    if (cell==nil) {
        NSLog(@"加载XIB");
        cell=[[[NSBundle mainBundle]loadNibNamed:@"TgCell" owner:nil options:nil]lastObject];
    }
    return cell;
}
```

####  TgCell.xib面板

![][1]

### 2.2 通过数据模型设置Cell内容

#### TgCell.h

```
@property (nonatomic,strong) TG *tg;
```

#### TgCell.m

```
- (void)setTg:(TG *)tg 
{
    //setter方法中，第一句要赋值
    _tg=tg;
    self.titleLabel.text=tg.title;
    self.iconView.image=[UIImage imageNamed:tg.icon];
    self.priceLabel.text=tg.price;
    self.buyCountLabel.text=tg.buyCount;  
}
```

### 2.3 提供一个类方法，可以快速创建Cell

#### TgCell.h

```
+(instancetype)cellWithTableView:(UITableView *)tableView;
```

#### TgCell.m

```
+(instancetype)cellWithTableView:(UITableView *)tableView
{
    //1.可重用标识符
    static NSString *ID=@"Cell";
    //2.tableView查询可重用Cell
    TgCell *cell=[tableView dequeueReusableCellWithIdentifier:ID];
    //3.如果没有可重用cell
    if (cell==nil) {
        NSLog(@"加载XIB");
        cell=[[[NSBundle mainBundle]loadNibNamed:@"TgCell" owner:nil options:nil]lastObject];
    }
    return cell;
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-tgcell-biaoshifu-cell.png