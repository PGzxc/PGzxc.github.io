---
title: IOS开发之——网络-Cell图片下载完善(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: cb1b3a90
date: 2022-03-04 23:00:17
---
## 一 Cell存在的问题

* Cell中的通过NSBlockOperation获取ImageView数据，未获取前返回导致Cell中的image数据为空无法显示
* operation和app.icon放到字典中，根据operation是否为空判断图片是否需要下载，如果意外导致app.icon为空，导致之后的operation无法下载图片
* 上下滑动时，图片错乱(下面的图片为正确显示，显示滑出去的上张图片)

<!--more-->

## 二 对应的解决办法

* Cell中ImageView为空：通过占位图placeholder解决(未返回图像前，显示占位图，返回图像后，显示图像)
* app.icon(图片下载地址为空)无法下载显示图片：下载完成后从字典中移除对应的operation下载操作
* 上下滑动时，图片错乱：不要在下载后直接显示图片，要在缓存中拿到图片再显示(刷新当前行Cell)

## 三 Cell下载图片思路

* 创建全局图片缓存变量images，key是app.icon，值是下载后到图片image
* 先从images缓存中取出图片ulr对应的image
* 如果取出的image不为空，说明图片已经下载过(缓存)，给Cell中的UIImage赋值image，赋值显示
* 如果取出的image为空，说明图片并未缓存过，先给图片设置一个占位符
* 取出当前图片url(app.icon)对应的operation
* 如果operation为空，创建一个NSBlockOperation下载队列，并将此队列添加到operations字典中(key=app.icon，value=operation)
* 下载成功后获取到image，下载的图片放到缓存images中(key=app.icon，value=image)，并从operations字典中移除下载操作

![][1]

## 四 代码及显示

### 4.1 代码

```
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
    //设置图片
    //方法四-先从images缓存中取出url对应的UIImage对象
    UIImage *image=self.images[app.icon];
    if (image) { //说明图片已经下载成功
        cell.imageView.image=image;
        NSLog(@"----从缓存中取得图片---%d",indexPath.row);
    }else{ //说明图片并未下载成功过(并未缓存过)
        NSLog(@"----缓存中没有图片---%d",indexPath.row);
        //显示占位图片
        cell.imageView.image=[UIImage imageNamed:@"placeholder"];
        [self download:app.icon indexPath:indexPath];
    }
    return cell;
}
-(void)download:(NSString *)imageUrl indexPath:(NSIndexPath *)indexPath{
    //取出当前图片url对应的下载操作(operation对象)
    NSBlockOperation *operation=self.operations[imageUrl];
    if (operation) return;
    __weak typeof(self) appsVc=self;
    operation=[NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:5]; //演示图片错乱等问题延时
        NSURL *url=[NSURL URLWithString:imageUrl];
        NSData *data=[NSData dataWithContentsOfURL:url];
        UIImage *image=[UIImage imageWithData:data];
        NSLog(@"正在下载图片----%@",url);
        
        [[NSOperationQueue mainQueue]addOperationWithBlock:^{
            //cell.imageView.image=image;//直接设置图片会导致图片错乱
            //存放图片到字典中
            if(image){
                //self.images[imageUrl]=image;
                appsVc.images[imageUrl]=image;//循环引用换成weak
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

### 4.2 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-cell-image-operation-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-cell-image-operation-view.gif