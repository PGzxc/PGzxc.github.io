---
title: IOS开发之——网络-Cell图片沙盒缓存(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: a1f70037
date: 2022-03-05 16:05:56
---
## 一 概述

* 如果沙盒中的图片不存在，下载图片并保存到沙盒中
* 如果沙盒图片存在，直接加载沙盒中的图片，显示在Cell上

<!--more-->

## 二  Cell下载图片并保存沙盒缓存

![][1]

## 三 代码及结果

### 3.1 代码

```
#define APPImageFile(url) [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject] stringByAppendingPathComponent:[url lastPathComponent]]
#import "ILAppsViewController.h"
#import "App.h"

@interface ILAppsViewController ()
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
       
        //NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
        //NSString *filename=[app.icon lastPathComponent];
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
    NSBlockOperation *operation=self.operations[imageUrl];
    if (operation) return;
    __weak typeof(self) appsVc=self;
    operation=[NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:0]; //演示图片错乱等问题延时
        NSURL *url=[NSURL URLWithString:imageUrl];
        NSData *data=[NSData dataWithContentsOfURL:url];
        UIImage *image=[UIImage imageWithData:data];
        //NSLog(@"正在下载图片----%@",url);
        
        [[NSOperationQueue mainQueue]addOperationWithBlock:^{
            //cell.imageView.image=image;//直接设置图片会导致图片错乱
            //存放图片到字典中
            if(image){
                //self.images[imageUrl]=image;
                appsVc.images[imageUrl]=image;//循环引用换成weak
                //将图片存入沙盒中：UIImage->Data——>File
                NSData *data=UIImagePNGRepresentation(image);
                //获取Caches路径
                //NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
                //NSLog(@"%@",caches);
                //拼接文件路径
                //NSString *filename=[imageUrl lastPathComponent];
                //NSString *file=[caches stringByAppendingPathComponent:filename];
                //NSLog(@"%@----%@",filename,file);
                //放入文件到沙盒中
                [data writeToFile:APPImageFile(imageUrl) atomically:YES];
                
            }
            //从字典中移除下载操作
            [self.operations removeObjectForKey:imageUrl];
            //刷新表格
            //[self.tableView reloadData];
            [self.tableView reloadRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationNone];//刷新一行
        }];
    }];
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
@end
```

### 3.2 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-cell-cache-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-cell-cache-view.png

