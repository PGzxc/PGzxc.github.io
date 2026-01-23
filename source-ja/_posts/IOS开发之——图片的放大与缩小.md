---
title: IOS开发之——图片的放大与缩小
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 3db91e09
date: 2020-05-13 23:23:26
---
## 一 概述

本文介绍通过frame和bounds属性来实现图片的放大与缩小：

* frame：以图片原点为起点，进行放大与缩小
* bounds：以图片中心为起点，进行放大与缩小

<!--more-->

## 二 代码示例

### 2.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIButton *iconButton;
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
/** frame模式进行放大与缩小*/
- (IBAction)zoomWithFrame:(UIButton *)button
{
    CGRect frame=self.iconButton.frame;
    if(button.tag)
    {
        frame.size.width+=20;
        frame.size.height+=20;
        NSLog(@"放大");
    }else{
        frame.size.width-=20;
        frame.size.height-=20;
         NSLog(@"缩小");
    }
    self.iconButton.frame=frame;
}
/** bounds模式进行放大与缩小*/
- (IBAction)zoom:(UIButton *)button
{
    CGRect frame=self.iconButton.bounds;
    if(button.tag)
    {
        frame.size.width+=20;
        frame.size.height+=20;
        NSLog(@"放大");
    }else{
        frame.size.width-=20;
        frame.size.height-=20;
         NSLog(@"缩小");
    }
    self.iconButton.bounds=frame;
}
@end
```

### 2.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController {

@IBOutlet weak var iconBUtton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
 /** frame模式进行放大与缩小*/   
@IBAction func zoomWithFrame(_ button: UIButton)
 {
    var frame=self.iconBUtton.frame;
    if(button.tag>0)
      {
         frame.size.width+=20;
         frame.size.height+=20;
         NSLog("放大");
      }else
      {
         frame.size.width-=20;
         frame.size.height-=20;
         NSLog("缩小");
      }
         self.iconBUtton.frame=frame;
    }
    /** bounds模式进行放大与缩小*/
    @IBAction func zoom(_ button: UIButton)
    {
        var frame=self.iconBUtton.bounds;
        if(button.tag>0)
        {
            frame.size.width+=20;
            frame.size.height+=20;
            NSLog("放大");
        }else
        {
            frame.size.width-=20;
            frame.size.height-=20;
            NSLog("缩小");
        }
        self.iconBUtton.bounds=frame;
    }   
}
```