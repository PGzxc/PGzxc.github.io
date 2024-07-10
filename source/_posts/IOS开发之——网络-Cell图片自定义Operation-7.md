---
title: IOS开发之——网络-Cell图片自定义Operation(7)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 1dea4274
date: 2022-03-05 16:08:35
---
## 一 概述

* 将NSBlockOperation封装成自定义Operation文件
* 将图片的下载放到自定义Operation文件的main方法中
* 下载后回到主线程image图片的显示，通过代理完成

<!--more-->

## 二 自定义NSOperation

### 2.1 自定义NSOperation的步骤很简单

重写`-(void)main`方法，在俩面实现想执行的任务

### 2.2 重写-(void)main的方法的注意点

* 自己创建自动释放池，因为如果是异步操作，无法访问主线程的自动释放池
* 经常通过-(BOOL)isCancelled方法检测操作是否被取消，对取消做出响应

## 三 自定义NSOperation

### 3.1 DownloadOperation

#### DownloadOperation.h

```
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@class DownloadOperation;
@protocol ILDownloadOperationDelegate<NSObject>

@optional
-(void)downloadOperation:(DownloadOperation *)operation didFinishDownload:(UIImage *)image andIndexPath:(NSIndexPath *)indexPath;

@end

@interface DownloadOperation : NSOperation

@property(nonatomic,copy) NSString *imageUrl;
@property(nonatomic,strong) NSIndexPath *indexPath;
@property(nonatomic,weak) id<ILDownloadOperationDelegate> delegate;

@end
```

#### DownloadOperation.m

```
#import "DownloadOperation.h"
@implementation DownloadOperation
- (void)main
{
    @autoreleasepool {
        if (self.isCancelled) return; //下载前判断是否被取消下载
        
        NSURL *url=[NSURL URLWithString:self.imageUrl];
        NSData *data=[NSData dataWithContentsOfURL:url];
        UIImage *image=[UIImage imageWithData:data];
        
        if (self.isCancelled) return; //判断下载过程中
        //回到主线程
        [[NSOperationQueue mainQueue]addOperationWithBlock:^{
            if ([self.delegate respondsToSelector:@selector(downloadOperation:didFinishDownload:andIndexPath:)]) {
                [self.delegate downloadOperation:self didFinishDownload:image andIndexPath:self.indexPath];
            }
            
        }];
    }
}
@end
```

### 3.2 App

#### App.h

```
#import <Foundation/Foundation.h>

@interface App : NSObject
@property(nonatomic,copy) NSString *name;
@property(nonatomic,copy) NSString *download;
@property(nonatomic,copy) NSString *icon;

+(instancetype)appWithDict:(NSDictionary *)dict;

@end
```

#### App.m

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

### 3.3 ILAppsViewController

```
#define APPImageFile(url) [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject] stringByAppendingPathComponent:[url lastPathComponent]]
#import "ILAppsViewController.h"
#import "App.h"
#import "DownloadOperation.h"

@interface ILAppsViewController ()<ILDownloadOperationDelegate>
//存放数据
@property(nonatomic,strong) NSMutableArray *apps;
//存放所有下载操作的队列
@property(nonatomic,strong) NSOperationQueue *queue;
//存放所有的下载操作(url是key,operation是value)
@property(nonatomic,strong) NSMutableDictionary *operations;
//存放所有下载完的图片
@property(nonatomic,strong) NSMutableDictionary *images;

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
- (NSMutableDictionary *)images
{
    if (!_images) {
        self.images=[[NSMutableDictionary alloc]init];
    }
    return _images;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
}

-(void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    //移除下载操作
    [self.queue cancelAllOperations];
    [self.images removeAllObjects];
    [self.operations removeAllObjects];
    
    
}
#pragma mark - Table view data source

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
    //方法四-先从images缓存中取出url对应的UIImage对象
    UIImage *image=self.images[app.icon];
    if (image) { //说明图片已经下载成功
        cell.imageView.image=image;
        //NSLog(@"----从缓存中取得图片---%d",indexPath.row);
    }else{ //说明图片并未下载成功过(并未缓存过)
       
        NSString *file=APPImageFile(app.icon);
        //先从沙盒中取出文件
        NSData *data=[NSData dataWithContentsOfFile:file];
        if (data) {//沙盒中存在这个文件
            cell.imageView.image=[UIImage imageWithData:data];
        }else{ //沙盒中不存在这个文件
            
            //NSLog(@"----缓存中没有图片---%d",indexPath.row);
            //显示占位图片
            cell.imageView.image=[UIImage imageNamed:@"placeholder"];
            //下载图片
            [self download:app.icon indexPath:indexPath];
        }
    }
    return cell;
}
-(void)download:(NSString *)imageUrl indexPath:(NSIndexPath *)indexPath{
    //取出当前图片url对应的下载操作(operation对象)
    DownloadOperation *operation=self.operations[imageUrl];
    if (operation) return;
    operation=[[DownloadOperation alloc]init];
    operation.imageUrl=imageUrl;
    operation.indexPath=indexPath;
    //设置代理
    operation.delegate=self;
    //添加操作到队列
    [self.queue addOperation:operation];
    //添加到字典中(为了解决重复下载)
    self.operations[imageUrl]=operation;
}
//当用户开始拖拽表格时调用开始拖拽
//1-会阻塞主线程，影响用户体验
//2-重复下载，浪费流量，浪费时间，影响用户体验
//保证：1张图片只下载1次
-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    //暂停下载
    [self.queue setSuspended:YES];
}
//当用户停止拖表格拽时
-(void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    //恢复下载
    [self.queue setSuspended:NO];
    
}
-(void)downloadOperation:(DownloadOperation *)operation didFinishDownload:(UIImage *)image andIndexPath:(nonnull NSIndexPath *)indexPath
{
    //存放图片到字典中
    if(image){
        //self.images[imageUrl]=image;
        self.images[operation.imageUrl]=image;//循环引用换成weak
        //将图片存入沙盒中：UIImage->Data——>File
        NSData *data=UIImagePNGRepresentation(image);
        [data writeToFile:APPImageFile(operation.imageUrl) atomically:YES];
        
    }
    //从字典中移除下载操作
    [self.operations removeObjectForKey:operation.imageUrl];
    //刷新表格
    //[self.tableView reloadData];
    [self.tableView reloadRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationNone];//刷新一行
}

@end
```

### 3.4 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-cell-image-operation-define.png