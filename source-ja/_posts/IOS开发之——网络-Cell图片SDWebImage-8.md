---
title: IOS开发之——网络-Cell图片SDWebImage(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a2ce1888
date: 2022-03-05 16:10:21
---
## 一 概述

* SDWebImage网络图片处理框架介绍
* Cell图片下载中的image下载使用SDWebImage代替

<!--more-->

## 二 SDWebImage网络图片处理框架介绍

### 2.1 SDWebImage项目地址

```
https://github.com/SDWebImage/SDWebImage
```

### 2.2 什么是SDWebImage

* IOS中著名的网络图片处理框架
* 包含的功能：图片下载、图片缓存、下载进度监听、gif处理等等
* 用法极其简单，功能十分强大，大大提高了网络图片的处理效率
* 国内超过90%的iOS项目都有它的影子

### 2.3 如何使用

在项目目录下打开终端，执行如下指令生成Podfile文件

```
pod init
```

Podfile文件中添加SSWebImage

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '01-Cell-网络图片下载' do
  use_frameworks!
  pod 'SDWebImage'
end
```

安装依赖库

```
pod install
```

在使用的位置导入SDWebImage

```
#import <SDWebImage/SDWebImage.h>
```

## 三 Cell图片下载中的image下载使用SDWebImage代替

### 3.1 代码

#### ILAppsViewController

```
#import "ILAppsViewController.h"
#import "App.h"
#import <SDWebImage/SDWebImage.h>

@interface ILAppsViewController ()
//存放数据
@property(nonatomic,strong) NSMutableArray *apps;

@end

@implementation ILAppsViewController

#pragma mark-懒加载代码

-(NSMutableArray *)apps
{
    if (!_apps) {
        NSMutableArray *appArray=[NSMutableArray array];
        //加载plist
        NSString *file=[[NSBundle mainBundle]pathForResource:@"apps" ofType:@"plist"];
        NSArray *dicctArray=[NSArray arrayWithContentsOfFile:file];
        
        //2-字典转模型
        for(NSDictionary *dict in dicctArray){
            App *app=[App appWithDict:dict];
            [appArray addObject:app];
        }
        //3.赋值
        self.apps=appArray;
    }
    return _apps;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.apps.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *ID=@"app";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    if (!cell) {
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }
    //取出模型
    App *app=self.apps[indexPath.row];
    
    cell.textLabel.text=app.name;
    cell.detailTextLabel.text=app.download;
    
    [cell.imageView sd_setImageWithURL:[NSURL URLWithString:app.icon] placeholderImage:[UIImage imageNamed:@"placeholder"]];

    return cell;
}

@end
```

#### AppDelegate内存警告时

```
//当app接收到内存警告
-(void)applicationDidReceiveMemoryWarning:(UIApplication *)application
{
    //1.取消正在下载到操作
    [[SDWebImageManager sharedManager]cancelAll];
    //2.清除内存
    [[SDWebImageManager sharedManager].imageCache clearWithCacheType:SDImageCacheTypeMemory completion:nil];
    
}
```

### 3.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-cell-sdwebimage.png