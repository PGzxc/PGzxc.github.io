---
title: IOS开发之——音乐播放器-功能封装(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: 52562d76
date: 2022-04-18 07:38:28
---
## 一 概述

上一节介绍了音乐播放器的资源文件和将资源文件转换为对应的Model，本文介绍

* HMMusicsTool：获取所有音乐资源和点击按钮时转换为对应的HMMusic的处理
* HMAudioTool：真正处理音乐播放的类，处理播放、暂停、停止等操作

<!--more-->

## 二 HMMusicsTool

#### HMMusicsTool.h

```
#import <Foundation/Foundation.h>
#import "HMMusic.h"

@interface HMMusicsTool : NSObject
// 获取所有音乐
+ (NSArray *)musics;

// 设置当前正在播放的音乐
+ (void)setPlayingMusic:(HMMusic *)music;

// 返回当前正在播放的音乐
+ (HMMusic *)returnPlayingMusic;

// 获取下一首
+ (HMMusic *)nextMusic;

// 获取上一首
+ (HMMusic *)previouesMusic;

@end
```

#### HMMusicsTool.m

```
#import "HMMusicsTool.h"
#import "MJExtension.h"

@implementation HMMusicsTool

// 所有歌曲
static NSArray *_musics;

// 当前正在播放歌曲
static HMMusic *_playingMusic;

// 获取所有音乐
+ (NSArray *)musics
{
    if (!_musics) {
        _musics = [HMMusic objectArrayWithFilename:@"Musics.plist"];
    }
    return _musics;
}

// 设置当前正在播放的音乐
+ (void)setPlayingMusic:(HMMusic *)music
{
    // 判断传入的音乐模型是否为nil
    // 判断数组中是否包含该音乐模型
    if (!music ||
        ![[self musics] containsObject:music]) {
        return;
    }
    _playingMusic = music;
}

// 返回当前正在播放的音乐
+ (HMMusic *)returnPlayingMusic
{
    return _playingMusic;
}

// 获取下一首
+ (HMMusic *)nextMusic
{
    // 1.获取当前播放的索引
    NSArray *_musics=[self musics];
    NSUInteger currentIndex = [_musics indexOfObject:_playingMusic];
    // 2.计算下一首的索引
    NSInteger nextIndex = currentIndex + 1;
    // 3.越界处理
    if (nextIndex >= [[self musics] count]) {
        nextIndex = 0;
    }
    // 4.取出下一首的模型返回
    return [self musics][nextIndex];
}

// 获取上一首
+ (HMMusic *)previouesMusic
{
    // 1.获取当前播放的索引
    NSUInteger currentIndex = [[self musics] indexOfObject:_playingMusic];
    // 2.计算上一首的索引
    NSInteger perviouesIndex = currentIndex - 1;
    // 3.越界处理
    if (perviouesIndex < 0) {
        perviouesIndex = [[self musics] count] - 1;
    }
    // 4.取出下一首的模型返回
    return [self musics][perviouesIndex];
}
@end
```

## 三 HMAudioTool

#### HMAudioTool.h

```
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

@interface HMAudioTool : NSObject
/**
 *  播放音乐
 *
 *  @param filename 音乐的文件名
 */
+ (AVAudioPlayer *)playMusic:(NSString *)filename;
/**
 *  暂停音乐
 *
 *  @param filename 音乐的文件名
 */
+ (void)pauseMusic:(NSString *)filename;
/**
 *  停止音乐
 *
 *  @param filename 音乐的文件名
 */
+ (void)stopMusic:(NSString *)filename;

/**
 *  播放音效
 *
 *  @param filename 音效的文件名
 */
+ (void)playSound:(NSString *)filename;
/**
 *  销毁音效
 *
 *  @param filename 音效的文件名
 */
+ (void)disposeSound:(NSString *)filename;
@end
```

#### HMAudioTool.m

```
#import "HMAudioTool.h"

@implementation HMAudioTool

+ (void)initialize
{
    // 音频会话
    AVAudioSession *session = [AVAudioSession sharedInstance];
    
    // 设置会话类型（播放类型、播放模式,会自动停止其他音乐的播放）
    [session setCategory:AVAudioSessionCategorySoloAmbient error:nil];
    
    // 激活会话
    [session setActive:YES error:nil];
}

/**
 *  存放所有的音效ID
 */
static NSMutableDictionary *_soundIDs;
+ (NSMutableDictionary *)soundIDs
{
    if (!_soundIDs) {
        _soundIDs = [NSMutableDictionary dictionary];
    }
    return _soundIDs;
}

/**
 *  存放所有的音乐播放器
 */
static NSMutableDictionary *_musicPlayers;
+ (NSMutableDictionary *)musicPlayers
{
    if (!_musicPlayers) {
        _musicPlayers = [NSMutableDictionary dictionary];
    }
    return _musicPlayers;
}

/**
 *  播放音乐
 *
 *  @param filename 音乐的文件名
 */
+ (AVAudioPlayer *)playMusic:(NSString *)filename
{
    if (!filename) return nil;
    
    // 1.取出对应的播放器
    AVAudioPlayer *player = [self musicPlayers][filename];
    
    // 2.播放器没有创建，进行初始化
    if (!player) {
        // 音频文件的URL
        NSURL *url = [[NSBundle mainBundle] URLForResource:filename withExtension:nil];
        if (!url) return nil;
        
        // 创建播放器(一个AVAudioPlayer只能播放一个URL)
        player = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:nil];
        
        // 缓冲
        if (![player prepareToPlay]) return nil;
        
        // 存入字典
        [self musicPlayers][filename] = player;
    }
    
    // 3.播放
    if (!player.isPlaying) {
        [player play];
    }
    
    // 正在播放
    return player;
}

/**
 *  暂停音乐
 *
 *  @param filename 音乐的文件名
 */
+ (void)pauseMusic:(NSString *)filename
{
    if (!filename) return;
    
    // 1.取出对应的播放器
    AVAudioPlayer *player = [self musicPlayers][filename];
    
    // 2.暂停
    if (player.isPlaying) {
        [player pause];
    }
}

/**
 *  停止音乐
 *
 *  @param filename 音乐的文件名
 */
+ (void)stopMusic:(NSString *)filename
{
    if (!filename) return;
    
    // 1.取出对应的播放器
    AVAudioPlayer *player = [self musicPlayers][filename];
    
    // 2.停止
    [player stop];
    
    // 3.将播放器从字典中移除
    [[self musicPlayers] removeObjectForKey:filename];
}

/**
 *  播放音效
 *
 *  @param filename 音效的文件名
 */
+ (void)playSound:(NSString *)filename
{
    if (!filename) return;
    
    // 1.取出对应的音效ID
    SystemSoundID soundID = [[self soundIDs][filename] unsignedLongValue];
    
    // 2.初始化
    if (!soundID) {
        // 音频文件的URL
        NSURL *url = [[NSBundle mainBundle] URLForResource:filename withExtension:nil];
        if (!url) return;
        
        AudioServicesCreateSystemSoundID((__bridge CFURLRef)(url), &soundID);
        
        // 存入字典
        [self soundIDs][filename] = @(soundID);
    }
    
    // 3.播放
    AudioServicesPlaySystemSound(soundID);
}

/**
 *  销毁音效
 *
 *  @param filename 音效的文件名
 */
+ (void)disposeSound:(NSString *)filename
{
    if (!filename) return;
    
    // 1.取出对应的音效ID
    SystemSoundID soundID = [[self soundIDs][filename] unsignedLongValue];
    
    // 2.销毁
    if (soundID) {
        AudioServicesDisposeSystemSoundID(soundID);
        
        [[self soundIDs] removeObjectForKey:filename];
    }
}
@end
```

## 四 参考
* [Github-参考代码](https://github.com/PGzxc/IOSPlayer)
* [Xmind原图](https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-player-struct-view.xmind)