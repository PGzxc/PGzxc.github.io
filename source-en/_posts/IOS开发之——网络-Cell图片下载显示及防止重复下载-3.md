---
title: IOS开发之——网络-Cell图片下载显示及防止重复下载(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 21859b82
date: 2022-03-01 10:33:51
---
## 一 概述

* 通过网络加载图片并显示到TableViewCell中
* 防止网络图片重复下载

<!--more-->

## 二 通过网络加载图片并显示到TableViewCell中

### 2.1 过程描述

* 将apps.plist中item转换为App(model模型)，并懒加载到MultableArray中
* apps.plist中item.icon图片地址放在MJServer的WebContent\resources\cellImages下
* 将网络图片转换为image显示到图片上

### 2.2 功能实现

#### App数据模型

##### App.h

```
#import <Foundation/Foundation.h>

@interface App : NSObject
@property(nonatomic,copy) NSString *name;
@property(nonatomic,copy) NSString *download;
@property(nonatomic,copy) NSString *icon;

+(instancetype)appWithDict:(NSDictionary *)dict;

@end
```

##### App.m

```
#import "App.h"
@implementation App

+(instancetype)appWithDict:(NSDictionary *)dict
{
    App *app=[[self alloc]init];
    [app setValuesForKeysWithDictionary:dict];
    return app;
}
@end
```

#### 将apps.plist转换为模型数据

```
@interface ILAppsViewController ()
//存放数据
@property(nonatomic,strong) NSMutableArray *apps;
@end

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
```

#### 数据显示到Cell

```
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
#warning Incomplete implementation, return the number of sections
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
#warning Incomplete implementation, return the number of rows
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

    //设置图片
    //1-会阻塞主线程
    //2-重复下载，浪费流量，浪费时间，影响用户体验
    //保证一张图片只下载1次
    
    NSURL *url=[NSURL URLWithString:app.icon];
    NSData *data=[NSData dataWithContentsOfURL:url];
    cell.imageView.image=[UIImage imageWithData:data];
    
    NSLog(@"---%@---%d",[NSThread currentThread],indexPath.row);
       
    return cell;
}
```

#### 效果图
![][1]
#### 问题

* 会阻塞主线程
* 重复下载，浪费流量，浪费时间，影响用户体验

## 三 防止网络图片重复下载

### 3.1 使用NSBlockOperation，将下载放到子线程

#### 代码

```
NSBlockOperation *operation=[NSBlockOperation blockOperationWithBlock:^{
        NSURL *url=[NSURL URLWithString:app.icon];
        NSData *data=[NSData dataWithContentsOfURL:url];
        NSLog(@"正在下载图片----%@",url);
        
        [[NSOperationQueue mainQueue]addOperationWithBlock:^{
                   cell.imageView.image=[UIImage imageWithData:data];
               }];
     }];
 //添加操作到队列
 [self.queue addOperation:operation];
```

#### 现象
![][2]
#### 原因

* operation在子线程操作，未返回图片前，已将cell返回
* cell未给ImageView赋值，故图片未显示
* 上下拖动后，imageView显示，并且多次下载

### 3.2 防止图片多次下载

#### 过程说明

* 创建全局NSMutableDictionary *operations，url是key，operation是value
* Cell中先从operations中根据app.icon取出operation，默认为null
* operation为空时，创建operation，通过operation下载图片
* 并将operation下载的图片保存到operations(Map集合)中

#### 代码

```
@interface ILAppsViewController ()
//存放数据
@property(nonatomic,strong) NSMutableArray *apps;
//存放所有下载操作的队列
@property(nonatomic,strong) NSOperationQueue *queue;
//存放所有的下载操作(url是key,operation是value)
@property(nonatomic,strong) NSMutableDictionary *operations;
@end

-(NSOperationQueue *)queue
{
    if (!_queue) {
        self.queue=[[NSOperationQueue alloc]init];
    }
    return _queue;
}
-(NSMutableDictionary *)operations
{
    if (!_operations) {
        self.operations=[[NSMutableDictionary alloc]init];
    }
    return _operations;
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
    //方法三
    //取出当前图片url对应的下载操作(operation对象)
    NSBlockOperation *operation=self.operations[app.icon];
    if (!operation) {
        NSBlockOperation *operation=[NSBlockOperation blockOperationWithBlock:^{
            NSURL *url=[NSURL URLWithString:app.icon];
            NSData *data=[NSData dataWithContentsOfURL:url];
            NSLog(@"正在下载图片----%@",url);

            [[NSOperationQueue mainQueue]addOperationWithBlock:^{
                       cell.imageView.image=[UIImage imageWithData:data];
                   }];
         }];
        //添加操作到队列
        [self.queue addOperation:operation];
        //添加到字典中
        self.operations[app.icon]=operation;
    }
    
    return cell;
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-tableviewcell-main-show.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-tableviewcell-operation-image-no.png