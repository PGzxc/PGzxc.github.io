---
title: IOS开发之——网络-视频播放-XML解析GDataXML(12)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: '371978e4'
date: 2022-03-07 08:44:27
---
## 一 概述

* IOS中的XML解析
* 接口请求返回XML
* GData XML配置
* XML解析示例——GDataXML

<!--more-->

## 二 IOS中的XML解析

在IOS中，解析XML的手段有很多

### 2.1 苹果原生

* NSXMLParser：SAX方式解析，使用简单

### 2.2 第三方框架

* libxml2：纯C语言，默认包含在IOS SDK中，同时支持DOM和SAX方式
* GDataXML：DOM方式解析，基于libxml2

### 2.3 XML解析方式的选择建议

* 大文件：NSXMLParser、libxml2
* 小文件：GDataXML

###  三 接口请求返回XML

### 3.1 接口请求地址

```
http://localhost:8080/MJServer/video?type=XML
```

### 3.2 服务器返回XML结果

![][1]

## 四 GData XML配置

### 4.1 导入libxml2库

TARGETS——>Build Phases——>Link Binary With Libraries——>+

![][2]

### 4.2 在Header Search Path中加入/usr/include/libxml2

TARGETS——>Build Settings——>User Header Search Paths

![][3]

### 4.3 设置链接参数(自动链接libxml2库)

TARGETS——>Build Settings——>Other Linker Flags——>-lxml2

![][4]

### 4.4 GDataXMLNode.m设置非ARC

```
-fno-objc-arc
```
![][5]

## 五 XML解析示例——GDataXML

### 5.1 代码

```
#import "ILVideosTableViewController.h"
#import "MBProgressHUD+MJ.h"
#import "Video.h"
#import <SDWebImage/SDWebImage.h>
#import <MediaPlayer/MediaPlayer.h>
#import "GDataXMLNode.h"


#define Url(path) [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",path]];

@interface ILVideosTableViewController ()

@property(nonatomic,strong) NSMutableArray *videos;

@end

@implementation ILVideosTableViewController

-(NSMutableArray *)videos
{
    if (_videos==nil) {
        _videos=[NSMutableArray array];
    }
    return _videos;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    //加载服务器的最新视频信息
    //1-创建URL
    NSURL *url=Url(@"video?type=XML");
    //2-创建请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //3-发送请求
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
        if (connectionError||data==nil) {
            [MBProgressHUD showError:@"请求失败"];
            return;
        }
        //解析XML数据
        GDataXMLDocument *doc=[[GDataXMLDocument alloc]initWithData:data options:0 error:nil];
        NSLog(@"doc----%@",doc);
        //获取文档的根元素-videos元素
        GDataXMLElement *root=doc.rootElement;
        //获取根元素里面的所有video元素
        NSArray *elements=[root elementsForName:@"video"];
        //遍历所有video元素
        for (GDataXMLElement *videoElement in elements) {
            Video *video=[[Video alloc]init];
            //取出元素的属性
            video.id=[videoElement attributeForName:@"id"].stringValue.intValue;
            video.length=[videoElement attributeForName:@"length"].stringValue.intValue;
            video.name=[videoElement attributeForName:@"name"].stringValue;
            video.image=[videoElement attributeForName:@"image"].stringValue;
            video.url=[videoElement attributeForName:@"url"].stringValue;
            
            //添加到数组中
            [self.videos addObject:video];
        }
        //刷新表格
        //NSLog(@"---%d",data.length);
        [self.tableView reloadData];
        
    }];
    
}
-(void)parseJSON:(NSData *)data
{
    //解析json数据
    NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
    NSArray *videoArray=dict[@"videos"];
    //NSLog(@"视频的个数为：%d",videoArray.count);
    for (NSDictionary *videoDict in videoArray) {
        Video *video=[Video videoWithDict:videoDict];
        [self.videos addObject:video];
    }
}

#pragma mark - Table view data source
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.videos.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  
    static NSString *ID=@"ID";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    if(!cell){
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }
    Video *video=self.videos[indexPath.row];
    
    cell.textLabel.text=video.name;
    cell.detailTextLabel.text=[NSString stringWithFormat:@"时长：%d分钟",video.length];
    //NSString *imageUrl=[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",video.image];
    
    NSURL *url=Url(video.image);
    
    [cell.imageView sd_setImageWithURL:url placeholderImage:[UIImage imageNamed:@"placeholder"]];
    
    return cell;
}
#pragma 代理方法
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    //取出视频模型
    Video *video=self.videos[indexPath.row];
    NSLog(@"%@",video.name);
    //播放视频(调用系统提供的视频播放器)
    NSString *videoUrl=[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",video.url];
    //NSURL *url=[NSURL URLWithString:videoUrl];
    NSURL *url=Url(video.url);
    MPMoviePlayerViewController *player=[[MPMoviePlayerViewController alloc]initWithContentURL:url];
    //显示播放器
    [self presentViewController:player animated:YES completion:nil];
}
@end
```
### 5.2 效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-request-xml-response.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-link-libxml2-add.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-user-header-path-libxml2.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-other-linker-flag-xml2.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-gdataxml-no-arc.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-gdataxml-view.gif