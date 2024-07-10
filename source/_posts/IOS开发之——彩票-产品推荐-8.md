---
title: IOS开发之——彩票-产品推荐(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: ef579a2a
date: 2022-02-10 08:36:09
---
## 一 概述

* 产品推荐页面ILProductViewController(UICollectionViewController)
* 设置页面跳转产品推荐页面时destVcClass处理
* 读取products.json并将结果封装到Model中
* 界面布局及结果显示

<!--more-->

## 二 产品推荐页面ILProductViewController

### 2.1 流程

* 自定义ILProductViewController继承UICollectionViewController
* numberOfSectionsInCollectionView：有几个分组
* numberOfItemsInSection：每个分组多少条数据
* collectionView：每个cell的内容

### 2.2 代码

```
//数据源
- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
#warning Incomplete implementation, return the number of sections
    return 1;
}
- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
#warning Incomplete implementation, return the number of items
    return 12;
}
//返回每个cell长什么样子
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    ILProductViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    cell.backgroundColor=[UIColor redColor];
    return cell;
}
```

### 2.3 效果图

![][1]

## 三 设置页面跳转产品推荐页面时destVcClass处理

### 3.1 ILProductViewController

```
- (instancetype)init
{
    //创建流水布局
    UICollectionViewFlowLayout *layout=[[UICollectionViewFlowLayout alloc]init];
    //每一个Cell的尺寸
    layout.itemSize=CGSizeMake(85, 85);
    //垂直间距
    layout.minimumLineSpacing=10;
    //水平间距
    layout.minimumInteritemSpacing=1;
    //内边距
    layout.sectionInset=UIEdgeInsetsMake(10, 0, 0, 0);
    
    return [super initWithCollectionViewLayout:layout];
}
```

### 3.2 设置页面跳转设置(ILSettingTableViewController)

```
ILSettingItem *recommend=[ILSettingArrowItem itemWithIcon:@"MoreNetease" title:@"产品推荐" destVcClass:[ILProductViewController class]];
```

## 四 读取products.json并将结果封装到Model中

### 4.1 读取products.json(ILProductViewController)

```
-(NSArray *)products
{
    if (_products==nil) {
        _products=[NSMutableArray array];
        
        NSString *fileName=[[NSBundle mainBundle]pathForResource:@"products.json" ofType:nil];
        NSData *data=[NSData dataWithContentsOfFile:fileName];
        NSArray *jsonArr=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
        NSMutableArray *arrM=[NSMutableArray array];
        for (NSDictionary *dict in jsonArr) {
            ILProduct *p=[ILProduct productWithDict:dict];
            [_products addObject:p];
        }
    }
    return _products;
}
```

### 4.2 Product数据Model

```
#import "ILProduct.h"


@implementation ILProduct

+(instancetype)productWithDict:(NSDictionary *)dict
{
    ILProduct *product=[[ILProduct alloc]init];
    //不能使用kvc
    //[product setValuesForKeysWithDictionary:dict];
    product.title=dict[@"title"];
    product.icon=dict[@"icon"];
    product.url=dict[@"url"];
    product.customUrl=dict[@"customUrl"];
    product.ID=dict[@"id"];

    return product;
}
-(void)setIcon:(NSString *)icon
{
    _icon=[icon stringByReplacingOccurrencesOfString:@"@2x.png" withString:@""];
}
@end
```

## 五 界面布局及结果显示

### 5.1 ILProductViewCell

#### ILProductViewCell.h

```
#import <UIKit/UIKit.h>
@class ILProduct;

@interface ILProductViewCell : UICollectionViewCell
@property(nonatomic,strong) ILProduct *product;

@end
```

#### ILProductViewCell.m

```
#import "ILProductViewCell.h"
#import "ILProduct.h"


@interface ILProductViewCell()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@property (weak, nonatomic) IBOutlet UILabel *label;

@end
@implementation ILProductViewCell

-(void)setProduct:(ILProduct *)product
{
    _product=product;
    _imageView.image=[UIImage imageNamed:product.icon];
    _label.text=product.title;
    
}
-(void)awakeFromNib
{
    _imageView.layer.cornerRadius=10;
    _imageView.clipsToBounds=YES;
}

@end
```

#### ILProductViewCell.xib布局文件

![][2]

### 5.2 逻辑处理

#### 将注册类替换为xib

```
//替换前
[self.collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:reuseIdentifier];

//替换后
UINib *xib=[UINib nibWithNibName:@"ILProductViewCell" bundle:nil];
[self.collectionView registerNib:xib forCellWithReuseIdentifier:reuseIdentifier];
```

#### 为cell配置模型数据

```
//返回每个cell长什么样子
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    ILProductViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    //cell.backgroundColor=[UIColor redColor];
    //取出模型
   ILProduct *product =self.products[indexPath.item];
    cell.product=product;
    // Configure the cell
    return cell;
}
```

#### 点击事件

```
-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    //取出模型
   ILProduct *product =self.products[indexPath.item];
    NSLog(@"点击了——%@",product.title);
}
```

#### 效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-productview-controller.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-productview-cell-xib.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-caipiao-productview-preview.png