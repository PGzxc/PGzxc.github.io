---
title: IOS开发之——音乐播放器-播放器页面(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: '9114e337'
date: 2022-04-20 10:12:19
---
## 一 概述

* 播放器页面Storyboard
* 点击列表Cell时，播放器页面show弹出
* 播放器页面按钮对应的功能

<!--more-->

## 二 播放器页面Storyboard

### 2.1 Storyboard界面

![][1]

### 2.2 界面说明

* 界面分类：顶部View和底部View两部分
* 顶部View：歌曲大图、名字背景(歌曲名和歌手名)、拖拽进度、歌词显示控件(HMLrcView)、退出和图词切换按钮等
* 底部View：播放控制面板(播放/暂停、上一首、下一首)、进度条(歌曲时长/播放进度)、滑块(拖动改变播放位置)

## 三 点击列表Cell时，播放器页面show弹出

### 3.1 HMPlayingViewController中show方法的作用

* 点击Cell时会设置当前播放歌曲，判断正在播放的歌曲和Cell设置的是否是同一个
* 设置播放器的frame和窗口的大小一致，并添加到窗口上
* 执行动画，让播放器View从底部转出来
* 动画执行完(播放器View展示出来后)播放歌曲

### 3.2 播放器中show代码

```
- (void)show {
    
    // 0.判断是否切换歌曲
    if (self.playingMusic != [HMMusicsTool returnPlayingMusic]) {
        // 重置数据
        [self resetPlayingMusic];
    }
    // 1.拿到window
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    
    // 2.设置当前控制器的frame
    //self.view.y = window.bounds.size.height;
    self.view.frame = window.bounds;
    
    // 3.将当前控制器的View添加到window上
    [window addSubview:self.view];
    self.view.hidden = NO;
    
    // 禁用交互功能
    window.userInteractionEnabled = NO;
    
    // 4.执行动画，让控制器的View从下面转出来
    [UIView animateWithDuration:1 animations:^{
        // 执行动画
        self.view.y = 0;
    } completion:^(BOOL finished) {
        // 开启交互
        window.userInteractionEnabled = YES;
        // 开始播放
        [self startPlayingMusic];
    }];
}
```

### 3.3 列表Cell选中弹出播放器的方法(设置播放歌曲和show)

```
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

## 四 播放器页面按钮对应的功能

### 4.1 进入播放器页面播放并设置歌曲信息

```
// 开始播放
- (void)startPlayingMusic
{
    // 执行动画完毕, 开始播放音乐
    // 1.取出当前正在播放的音乐模型
    HMMusic *music = [HMMusicsTool returnPlayingMusic];
    
    // 2.播放音乐
    self.player = [HMAudioTool playMusic:music.filename];
    self.player.delegate = self;
    // 记录当前正在播放的音乐
    self.playingMusic = [HMMusicsTool returnPlayingMusic];
    
    // 3.设置其他属性
    // 设置歌手
    self.singerLabel.text = music.singer;
    // 歌曲名称
    self.songLabel.text = music.name;
    // 背景大图
    self.iconView.image = [UIImage imageNamed:music.icon];
    // 设置总时长
    self.durationLabel.text = [self strWithTimeInterval:self.player.duration];
    
    // 4.开启定时器
    [self addProgressTimer];
    [self addLrcTimer];
    
    // 5.设置播放按钮状态
    self.playOrPauseButton.selected = YES;
    
    // 6.切换歌词（加载新的歌词）
    self.lrcView.lrcname = self.playingMusic.lrcname;
    
    // 7.切换锁屏界面的歌曲
    [self updateLockedScreenMusic];
}
```

### 4.2 点击Cell的歌曲跟正在播放的歌曲不是同一个，重置数据

```
// 重置数据
- (void)resetPlayingMusic {
    
    // 设置歌手
    self.singerLabel.text = nil;
    // 歌曲名称
    self.songLabel.text = nil;
    // 背景大图
    self.iconView.image = [UIImage imageNamed:@"play_cover_pic_bg"];
//    self.iconView.clipsToBounds = YES;// 超出部分减掉
    
    // 停止当前正在播放的歌曲
    [HMAudioTool stopMusic:self.playingMusic.filename];
    self.player = nil;
    
    // 设置播放按钮状态
    self.playOrPauseButton.selected = NO;
}
```

### 4.3 上一首歌曲previous

```
- (IBAction)previous {
    UIWindow *window = [[UIApplication sharedApplication].windows lastObject];
    window.userInteractionEnabled = NO;
    
    // 1.重置当前歌曲
    [self resetPlayingMusic];
    
    // 2.获得下一首歌曲
    [HMMusicsTool setPlayingMusic:[HMMusicsTool previouesMusic]];
    
    // 3.播放下一首
    [self startPlayingMusic];
    
    window.userInteractionEnabled = YES;
}
```

### 4.4 下一首歌曲next

```
- (IBAction)next {
    UIWindow *window = [[UIApplication sharedApplication].windows lastObject];
    window.userInteractionEnabled = NO;
    
    // 1.重置当前歌曲
    [self resetPlayingMusic];
    
    // 2.获得下一首歌曲
    [HMMusicsTool setPlayingMusic:[HMMusicsTool nextMusic]];
    
    // 3.播放下一首
    [self startPlayingMusic];
    
    window.userInteractionEnabled = YES;
}
```

### 4.5 暂停和播放按钮

```
- (IBAction)playOrPause {
    if (self.player.isPlaying) { // 暂停
        self.playOrPauseButton.selected = NO;
        [HMAudioTool pauseMusic:self.playingMusic.filename];
        [self removeProgressTimer];
        [self removeLrcTimer];
    } else { // 继续播放
        self.playOrPauseButton.selected = YES;
        [HMAudioTool playMusic:self.playingMusic.filename];
        [self addProgressTimer];
        [self addLrcTimer];
        
        // 更新锁屏信息
        [self updateLockedScreenMusic];
    }
}
```

### 4.6 其他-参考源代码

* 播放进度监听
* 歌词监听和更新
* 滑块拖动监听
* 播放完成之后下一首


## 五 参考

* [Github-参考代码](https://github.com/PGzxc/IOSPlayer)
* [Xmind原图](https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-player-struct-view.xmind)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-07-player-play-storyboard.png

