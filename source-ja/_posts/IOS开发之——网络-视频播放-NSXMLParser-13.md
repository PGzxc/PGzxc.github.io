---
title: IOS开发之——网络-视频播放-NSXMLParser(13)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 268f5ba4
date: 2022-03-08 09:21:08
---
## 一 概述

* NSXMLParser通过initWithDat接收网络请求返回的data初始化
* 准守NSXMLParserDelegate协议，并实现didStartElement和didEndElement方法
* didStartElement时开始解析，通过attributeDict初始化Video数据类
* 执行parser parse方法进行解析，解析完成后，刷新表格

<!--more-->

## 二 解析过程

### 2.1 解析开始didStartElement和结束didEndElement时

```
2022-03-07 20:37:30.496853+0800 01-视频播放[10815:102773] didStartElement----videos
2022-03-07 20:37:30.497054+0800 01-视频播放[10815:102773] didStartElement----video
2022-03-07 20:37:30.497322+0800 01-视频播放[10815:102773] didEndElement----video
2022-03-07 20:37:30.497492+0800 01-视频播放[10815:102773] didStartElement----video
2022-03-07 20:37:30.497654+0800 01-视频播放[10815:102773] didEndElement----video
2022-03-07 20:37:30.507498+0800 01-视频播放[10815:102773] didStartElement----video
2022-03-07 20:37:30.507706+0800 01-视频播放[10815:102773] didEndElement----video
2022-03-07 20:37:30.507906+0800 01-视频播放[10815:102773] didStartElement----video
2022-03-07 20:37:30.508130+0800 01-视频播放[10815:102773] didEndElement----video
2022-03-07 20:37:30.508334+0800 01-视频播放[10815:102773] didStartElement----video
2022-03-07 20:37:30.508587+0800 01-视频播放[10815:102773] didEndElement----video
2022-03-07 20:37:30.508834+0800 01-视频播放[10815:102773] didEndElement----videos
```

### 2.2 解析开始时，attributeDict的内容

```
2022-03-07 20:39:03.748877+0800 01-视频播放[10940:104868] attributeDict:{
    id = 1;
    image = "resources/images/minion_01.png";
    length = 10;
    name = "\U5c0f\U9ec4\U4eba \U7b2c01\U90e8";
    url = "resources/videos/minion_01.mp4";
}
```

说明：可通过video videoWithDict方法，将attributeDict传入，获取Video类

## 三 示例- NS XMLParser

### 3.1 代码

```
#import "ILVideosTableViewController.h"
#import "MBProgressHUD+MJ.h"
#import "Video.h"
#import <SDWebImage/SDWebImage.h>
#import <MediaPlayer/MediaPlayer.h>
#import "GDataXMLNode.h"

#define Url(path) [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:8080/MJServer/%@",path]];

@interface ILVideosTableViewController ()<NSXMLParserDelegate>

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
        
        //1-创建XML解析器- SAX-逐个元素往下解析
        NSXMLParser *parser=[[NSXMLParser alloc]initWithData:data];
        //2.设置代理
        parser.delegate=self;
        //3-开始解析
        [parser parse]；
        //刷新表格
        //NSLog(@"---%d",data.length);
        [self.tableView reloadData];    
    }]; 
}
//解析道文档的开头时会调用那个方法
//elementName-元素名称，attributeDict-属性字典

-(void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName attributes:(NSDictionary<NSString *,NSString *> *)attributeDict{
    //NSLog(@"didStartElement----%@",elementName);
    NSLog(@"attributeDict:%@",attributeDict);
    if([@"videos" isEqualToString:elementName])return;//vides标签，返回
    Video *video=[Video videoWithDict:attributeDict];
    [self.videos addObject:video];
}

//解析到文档的结尾时会调用
//elementName-元素名称
-(void)parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
{
    //NSLog(@"didEndElement----%@",elementName); 
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

### 3.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-nsxmlparser-parse.gif