---
title: IOS开发之——网络-视频播放-JSON解析(11)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: b0c4daf9
date: 2022-03-07 08:43:10
---
## 一 概述

* 解析JSON结果到OC类
* 通过视频播放地址构成视频播放器并播放显示
* 网络请求，返回视频播放列表，点击列表中的一项进行播放

<!--more-->

## 二 Main.storyboard

![][1]

## 三 解析JSON结果到OC类

### 3.1 JSON数据

```
{"videos":[
{"id":1,"image":"resources/images/minion_01.png","length":10,"name":"小黄人 第01部","url":"resources/videos/minion_01.mp4"},{"id":2,"image":"resources/images/minion_02.png","length":12,"name":"小黄人 第02部","url":"resources/videos/minion_02.mp4"}]}
```

### 3.2  视频类(Video)

#### Video.h

```
#import <Foundation/Foundation.h>
@interface Video : NSObject
@property(nonatomic,assign) int id;
@property(nonatomic,assign) int length;
@property(nonatomic,copy) NSString *image;
@property(nonatomic,copy) NSString *name;
@property(nonatomic,copy) NSString *url;

+(instancetype)videoWithDict:(NSString *)dict;

@end
```

#### Video.m

```
#import "Video.h"

@implementation Video

+(instancetype)videoWithDict:(NSString *)dict
{
    Video *video=[[self alloc]init];
    [video setValuesForKeysWithDictionary:dict];
    return video;
}
@end
```

#### 网络请求结果封装到Video

```
//解析json数据
NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
NSArray *videoArray=dict[@"videos"];
//NSLog(@"视频的个数为：%d",videoArray.count);
for (NSDictionary *videoDict in videoArray) {
     Video *video=[Video videoWithDict:videoDict];
     [self.videos addObject:video];
 }
```

## 四 通过视频播放地址构成视频播放器并播放显示

```
NSString *videoUrl=[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",video.url];
NSURL *url=[NSURL URLWithString:videoUrl];
MPMoviePlayerViewController *player=[[MPMoviePlayerViewController alloc]initWithContentURL:url];
//显示播放器
[self presentViewController:player animated:YES completion:nil];
```

## 五 网络请求，返回视频播放列表，点击列表中的一项进行播放

### 5.1 代码(ILVideosTableViewController)

```
#import "ILVideosTableViewController.h"
#import "MBProgressHUD+MJ.h"
#import "Video.h"
#import <SDWebImage/SDWebImage.h>
#import <MediaPlayer/MediaPlayer.h>

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
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/video"];
    //2-创建请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //3-发送请求
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
        if (connectionError||data==nil) {
            [MBProgressHUD showError:@"请求失败"];
            return;
        }
        //解析json数据
        NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        NSArray *videoArray=dict[@"videos"];
        //NSLog(@"视频的个数为：%d",videoArray.count);
        for (NSDictionary *videoDict in videoArray) {
            Video *video=[Video videoWithDict:videoDict];
            [self.videos addObject:video];
        }
        //刷新表格
        NSLog(@"---");
        [self.tableView reloadData];
        
    }];  
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
    NSString *imageUrl=[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",video.image];
    
    [cell.imageView sd_setImageWithURL:[NSURL URLWithString:imageUrl] placeholderImage:[UIImage imageNamed:@"placeholder"]];
    
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
    NSURL *url=[NSURL URLWithString:videoUrl];
    MPMoviePlayerViewController *player=[[MPMoviePlayerViewController alloc]initWithContentURL:url];
    //显示播放器
    [self presentViewController:player animated:YES completion:nil];
}
@end
```

### 5.2 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-video-main-storyboard.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-video-list-click-play.gif