---
title: IOS开发之——音乐播放器-音乐播放列表(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: 15bb16dc
date: 2022-04-19 09:10:45
---
## 一 概述

* 音乐列表界面Storyboard界面搭建
* 播放列表TableView数据填充及Cell设置
* 点击播放列表处理

<!--more-->

## 二 音乐列表界面Storyboard界面搭建

![][1]

说明：

* Storyboard由一个导航控制器和TableView组成
* TableView用于展示音乐列表

## 三 播放列表TableView数据填充及Cell设置

### 3.1 说明(实现TabelView的三个方法)

* numberOfRowsInSection：设置TableView的数据源([HMMusicsTool musics] count)
* cellForRowAtIndexPath：每一行Cell的信息设置(HMMusicCell)-Cell信息
* heightForRowAtIndexPath：每一行Cell的高度

### 3.2 TabelView的三个方法设置

```
#pragma mark - Table view data source
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
//    return self.musics.count;
    return [[HMMusicsTool musics] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 1.创建cell
    HMMusicCell *cell = [HMMusicCell cellWithTableView:tableView];
    cell.music = [HMMusicsTool musics][indexPath.row];
    // 2.返回cell
    return cell;  
}
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 70;
}
```

说明：HMMusicsTool musics中使用到了NSObject+MJKeyValue扩展，通过plist来创建一个模型数组

### 3.3 自定义Cell

#### HMMusicCell.h

```
#import <UIKit/UIKit.h>
@class HMMusic;

@interface HMMusicCell : UITableViewCell
+ (instancetype)cellWithTableView:(UITableView *)tableView;
@property (nonatomic, strong) HMMusic *music;
@end
```

#### HMMusicCell.m

```
#import "HMMusicCell.h"
#import "HMMusic.h"
#import "UIImage+NJ.h"
#import "Colours.h"

@implementation HMMusicCell

+ (instancetype)cellWithTableView:(UITableView *)tableView {
    static NSString *ID = @"music";
    HMMusicCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    if (cell == nil) {
        cell = [[HMMusicCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }  
    return cell;
}

- (void)setMusic:(HMMusic *)music {
    _music = music;
    
    self.textLabel.text = music.name;
    self.detailTextLabel.text = music.singer;
    self.imageView.image = [UIImage circleImageWithName:music.singerIcon borderWidth:3 borderColor:[UIColor skyBlueColor]];
}
@end
```

## 四 点击播放列表处理

### 4.1 点击播放列表弹出播放器说明

* 点击本行后，取消本次选中
* 执行segue跳转到播放界面，使用modal的方式打开，关闭控制器会销毁，无法继续播放音乐
* 自定义ViewController，执行从底部到底部动画，弹出ViewController，在此播放音频

### 4.2 点击列表代码

```
@interface HMMusicsViewController ()
// 播放界面
@property (nonatomic, strong) HMPlayingViewController *playingVc;
@end

@implementation HMMusicsViewController

#pragma mark - 懒加载
- (HMPlayingViewController *)playingVc
{
    if (!_playingVc) {
        self.playingVc = [[HMPlayingViewController alloc] init];
    }
    return _playingVc;
}
// 选中某一个行
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 1.主动取消选中
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    // 2.执行segue跳转到播放界面，使用modal的方式打开，关闭控制器会销毁，无法继续播放音乐
    //    [self performSegueWithIdentifier:@"musics2playing" sender:nil];
    
    // 3.设置当前播放的音乐
    HMMusic *music = [HMMusicsTool musics][indexPath.row];
    [HMMusicsTool setPlayingMusic:music];
    
    // 自定义控制器，像modal的方式弹出控制器
    [self.playingVc show];
    
}
```

## 五 效果图
![][2]

## 六 参考
* [Github-参考代码](https://github.com/PGzxc/IOSPlayer)
* [Xmind原图](https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-player-struct-view.xmind)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-06-player-mainstoryboard.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-06-player-list.png