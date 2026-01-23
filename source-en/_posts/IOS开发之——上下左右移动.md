---
title: IOS开发之——上下左右移动
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: f0d1cb69
date: 2020-05-05 22:23:14
---
## 一 概述

本文介绍给UIButton设置background图片，并设置点击高亮时的图片，并通过上下左右按钮，控制UIButton上下左右移动

<!--more-->

## 二 界面布局

1. 将图片资源拖放到Assets.xcassets目录下
   ![][1]
2. 在main.storyboard上布局如下
   ![][2]

## 三 代码实现

### 3.1 OC

#### 3.1.1 ViewController.h

```
#import <UIKit/UIKit.h>
@interface ViewController : UIViewController
@property (weak, nonatomic) IBOutlet UIButton *iconButton;
@end
```

#### 3.1.2 ViewController.m

```
#import "ViewController.h"

@interface ViewController ()

@end
typedef enum
{
    moveDirTop=11,
    moveDirLeft=12,
    moveDirBottom=13,
    moveDirRight=14
    
}moveDirect;

#define moveDelta 20;

@implementation ViewController
- (IBAction)move:(UIButton*)button {
    CGRect frame=self.iconButton.frame;
    
    switch (button.tag) {
        case moveDirTop:
            frame.origin.y-=moveDelta;
            break;
        case moveDirLeft:
            frame.origin.x-=moveDelta;
            break;
        case moveDirBottom:
            frame.origin.y+=moveDelta;
            break;
        case moveDirRight:
            frame.origin.x+=moveDelta;
            break;
            
        default:
            break;
    }
    self.iconButton.frame=frame; 
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
@end
```

### 3.2 Swift实现

#### 3.2.1 ViewController.swift

```
import UIKit

enum moveDir:Int {
    case moveTop = 11
    case moveLeft = 12
    case moveBottom = 13
    case moveRight = 14
}
let moveLata:Double = 20.0

class ViewController: UIViewController {

    @IBOutlet weak var moveButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func move(_ button: UIButton) {
        var frame:CGRect=self.moveButton.frame
        switch button.tag {
        case moveDir.moveTop.rawValue:
            frame.origin.y-=CGFloat(moveLata)
            break
        case moveDir.moveLeft.rawValue:
            frame.origin.x-=CGFloat(moveLata)
            break;
        case moveDir.moveBottom.rawValue:
            frame.origin.y+=CGFloat(moveLata)
            break;
        case moveDir.moveRight.rawValue:
            frame.origin.x+=CGFloat(moveLata)
            break;
            
        default:
            break;
        }
        
        moveButton.frame = frame
    }   
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-move-assets-xcassets-resource.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-move-main-storyboard-view.png