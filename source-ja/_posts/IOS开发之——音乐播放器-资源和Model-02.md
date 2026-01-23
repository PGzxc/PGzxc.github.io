---
title: IOS开发之——音乐播放器-资源和Model(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: 165a2530
date: 2022-04-17 21:21:04
---
## 一 概述

* 音乐播放器资源文件
* 资源文件转换为对应的Model类

<!--more-->

## 二 音乐播放器资源文件

### 2.1 图片资源

Images.xcassets(启动图标/播放按钮/默认背景等)

![][1]

### 2.2 Resources(歌曲资源)

* Images(音乐大图)
* Lrcs(音乐歌词文件)
* MP3s(本地歌曲文件)
* Musics.plist(所有歌词信息，转换为HMMusic Model)

![][2]

### 2.3 查看Copy Bundle Resources

Targets——>Build Phases——>Copy Bundle Resources
![][3]

## 三 资源文件转换为对应的Model类

### 3.1 音乐文件Model

#### Musics.plist
![][4]

#### 数据模型HMMusic

```
#import <Foundation/Foundation.h>

@interface HMMusic : NSObject
/**
 *  歌曲名字
 */
@property (copy, nonatomic) NSString *name;
/**
 *  歌曲大图
 */
@property (copy, nonatomic) NSString *icon;
/**
 *  歌曲的文件名
 */
@property (copy, nonatomic) NSString *filename;
/**
 *  歌词的文件名
 */
@property (copy, nonatomic) NSString *lrcname;
/**
 *  歌手
 */
@property (copy, nonatomic) NSString *singer;
/**
 *  歌手图标
 */
@property (copy, nonatomic) NSString *singerIcon;
@end
```

### 3.2 歌词Model
#### 歌词文件
![][5]

#### 歌词模型 HMLrcLine

```
#import <Foundation/Foundation.h>

@interface HMLrcLine : NSObject
/**
 *  时间点
 */
@property (nonatomic, copy) NSString *time;
/**
 *  词
 */
@property (nonatomic, copy) NSString *word;
@end
```

## 四 参考
* [Github-参考代码](https://github.com/PGzxc/IOSPlayer)
* [Xmind原图](https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-player-struct-view.xmind)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-04-player-images-resources.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-04-player-resources-files.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-04-player-build-phases.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-04-player-music-plist.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-04-player-lrc-file.png