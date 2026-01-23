---
title: IOS开发之——动画-转场动画(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 3c0aea5c
date: 2021-06-02 09:34:32
---
## 一 概述

* CATransition转场动画介绍
* 专场动画属性及过渡效果
* 示例(动画切换模拟转场动画)

<!--more-->

## 二 CATransition转场动画介绍

* CATransition是CAAnimation的子类，用于做转场动画，能够为层提供移出屏幕和移入屏幕的动画效果。iOS比Mac OS X的转场动画效果少一点
* UINavigationController就是通过CATransition实现了将控制器的视图推入屏幕的动画效果

## 三 转场动画属性及效果

### 3.1 属性

* type：动画过渡类型
* subtype：动画过渡方向
* startProgress：动画起点(在整体动画的百分比)
* endProgress：动画终点(在整体动画的百分比)

### 3.2 效果

|      类型字符串       |           效果说明            | 关键字 | 方向 |
| :-------------------: | :---------------------------: | :----: | :--: |
|         fade          |         交叉淡化过渡          |  YES   |      |
|         push          |     新视图把旧视图推出去      |  YES   |      |
|        moveIn         |     新视图移到旧视图上面      |  YES   |      |
|        reveal         | 将旧视图移开,显示下面的新视图 |  YES   |      |
|         cube          |        立方体翻滚效果         |        |      |
|        oglFlip        |       上下左右翻转效果        |        |      |
|      suckEffect       |   收缩效果，如一块布被抽走    |        |  NO  |
|     rippleEffect      |           水滴效果            |        |  NO  |
|       pageCurl        |         向上翻页效果          |        |      |
|      pageUnCurl       |         向下翻页效果          |        |      |
| cameraIrisHollowOpen  |       相机镜头打开效果        |        |  NO  |
| cameraIrisHollowClose |       相机镜头关闭效果        |        |  NO  |

## 四 示例(动画切换模拟转场动画)

### 4.1 代码

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *imageView;

@property (assign,nonatomic) int index;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _index=1;
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    _index++;
    if (_index==4) {
        _index=1;
    }
    NSString *fileName=[NSString stringWithFormat:@"%d",_index];
    _imageView.image=[UIImage imageNamed:fileName];
    CATransition *anim=[CATransition animation];
    anim.type=@"cube";
    [_imageView.layer addAnimation:anim forKey:nil];
    
}
@end
```

### 4.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-anim-transition.gif