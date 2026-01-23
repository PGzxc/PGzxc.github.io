---
title: IOS开发之——音视频-播放音效(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: 53f5dab8
date: 2022-04-14 08:05:54
---
## 一 概述

* 音效文件存放及获取
* 播放音效简单示例
* 对SoundID进行功能抽取
* 抽取播放音效工具类用于播放各种音效
* 销毁音效

<!--more-->

## 二 音效文件存放及获取

### 2.1 将音效文件夹放进项目目录下

![][1]

### 2.2 检查TARGETS—>Build Phases—>Copy Bundle Resources，是否Copy进去
![][2]

### 2.3 获取音效文件的路径

```
 NSURL *url=[[NSBundle mainBundle]URLForResource:@"raw/buyao.aac" withExtension:nil];
```

## 三 播放音效简单示例(点击屏幕播放)

### 3.1 过程

* 导入头文件`#import <AVFoundation/AVFoundation.h>`
* 创建播放音效的URL
* 创建音效ID
* 播放本地音效

### 3.2 代码

```
#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>

@interface ViewController ()
@end
@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //1-创建URL
    NSURL *url=[[NSBundle mainBundle]URLForResource:@"raw/buyao.aac" withExtension:nil];
    
    //2-创建音效ID
    SystemSoundID soundID;
    AudioServicesCreateSystemSoundID(CFBridgingRetain(url), &soundID);
    //3-播放音效(本地音效)
    AudioServicesPlayAlertSound(soudID);
}

@end
```

### 3.3 效果

点击屏幕，播放`buyao`音效

## 四 对SoundID进行功能抽取

### 4.1 说明

* 上例三每次点击都要重新创建SoundID
* 本地对SoundID进行抽取，没有就创建，有则直接使用SoundID

### 4.2 代码

```
#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>

@interface ViewController ()
@property(nonatomic,assign) SystemSoundID soundID;
@end

@implementation ViewController

-(SystemSoundID)soundID
{
    if (!_soundID) {
            //1-创建URL
            NSURL *url=[[NSBundle mainBundle]URLForResource:@"raw/buyao.aac" withExtension:nil];
            //2-创建音效ID
            AudioServicesCreateSystemSoundID(CFBridgingRetain(url), &_soundID);
    }
    return _soundID;
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
   //3-播放音效
   AudioServicesPlayAlertSound(self.soundID);
}
@end
```

## 五 抽取播放音效工具类用于播放各种音效

### 5.1 抽取AudioTool工具类

####  AudioTool.h

```
#import <Foundation/Foundation.h>

@interface AudioTool : NSObject
//播放音效，需要传入需要播放的文件名称
+(void)playAudioWithFilename:(NSString *)fileName;
@end
```

#### AudioTool.m

```
#import "AudioTool.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioTool

+(void)playAudioWithFilename:(NSString *)fileName
{
    //1-创建URL
    NSURL *url=[[NSBundle mainBundle]URLForResource:fileName withExtension:nil];
    //2-创建音效ID
    SystemSoundID soundID;
    AudioServicesCreateSystemSoundID(CFBridgingRetain(url), &soundID);
    //3-播放本地音效
    AudioServicesPlaySystemSound(soundID);
}
@end
```

#### 用AudioTool播放音效

```
#import "ViewController.h"
#import "AudioTool.h"

@interface ViewController ()
@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [AudioTool playAudioWithFilename:@"raw/buyao.aac"];
}
@end
```

### 5.2 AudioTool中对soundID优化

#### 说明

* 将音效ID跟音效文件名放入字典中
* 从字典中取出参数为文件名的音效ID
* 如果音效ID为空，根据文件名创建音效ID，创建完成后将文件名和音效ID放入字典中
* 播放这个音效ID

#### 代码

```
#import "AudioTool.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioTool
static NSMutableDictionary *_soundIDs;

+(void)initialize
{
    if (!_soundIDs) {
        _soundIDs=[NSMutableDictionary dictionary];
    }
}

+(void)playAudioWithFilename:(NSString *)fileName
{
    //1-判断文件名是否为nil
    if(fileName==nil)return;
   //2-从字典中取出音效ID
    SystemSoundID soundID=[_soundIDs[fileName] unsignedIntValue];
   //3-判断音效ID是否为nil
    if(!soundID)
    {
        NSLog(@"创建新的soundID");
        //如果音效ID为nil，根据文件名称加载音效URL
        NSURL *url=[[NSBundle mainBundle]URLForResource:fileName withExtension:nil];
        //判断url是否为nil
        if (!url) return;
        //创建音效ID
        AudioServicesCreateSystemSoundID(CFBridgingRetain(url), &soundID);
        //将音效ID添加到字典中
        _soundIDs[fileName]=@(soundID);
        
    }
    //4-播放音效
    AudioServicesPlaySystemSound(soundID);
    
}
@end
```

### 5.3 播放随机音效(ViewController.m)

```
#import "ViewController.h"
#import "AudioTool.h"

@interface ViewController ()
@end
@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //随机播放
    NSString *filename=[NSString stringWithFormat:@"raw/m_%02d.wav",arc4random_uniform(14)+3];
    [AudioTool playAudioWithFilename:filename];
}
@end
```

## 六 销毁音效

### 6.1 说明

* 当接收到内存警告时销毁音效
* AudioTool中添加disposeAudioWithFilename方法通过文件名销毁音效
* ViewController中didReceiveMemoryWarning方法中调用

### 6.2 AudioTool

#### AudioTool.h

```
@interface AudioTool : NSObject
//播放音效，需要传入需要播放的文件名称
+(void)playAudioWithFilename:(NSString *)fileName;
//销毁音效
+(void)disposeAudioWithFilename:(NSString *)fileName;
@end
```

#### AudioTool.m

```
//销毁音效
+(void)disposeAudioWithFilename:(NSString *)fileName
{
    //1-判断文件名是否为nil
    if (fileName==nil) return;
    //2-从字典中取出音效ID
    SystemSoundID soundID=[_soundIDs[fileName] unsignedIntValue];
    if (soundID) {
        //3-销毁音效ID
        AudioServicesDisposeSystemSoundID(soundID);
        //4-从字典中移除已经销毁的音效ID
        [_soundIDs removeObjectForKey:fileName];
    }
}
```

### 6.3 ViewController中调用

```
//接受到内存警告
-(void)didReceiveMemoryWarning
{
    [AudioTool disposeAudioWithFilename:@"raw/buyao.wav"]; 
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-01-copy-resources.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-01-target-bundle-resources.png