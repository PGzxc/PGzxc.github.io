---
title: IOS开发之——倒计时
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: dfee059e
date: 2020-05-11 23:46:50
---
## 一 概述

本文分别介绍如何在OC和Swift中实现倒计时功能：

* OC中实现倒计时的类是NSTimer
* Swift中实现倒计时的类是Timer

<!--more-->

## 二 效果图

![][1]

## 三 代码实现

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UILabel *counterLabel;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *pause;
@property (strong,nonatomic) NSTimer *timer;
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
//开始
- (IBAction)start:(UIBarButtonItem *)sender
{
    self.counterLabel.text=@"2";
    self.timer=[NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(updateTimer:) userInfo:@"hello timer" repeats:YES];
}
//暂停
- (IBAction)pause:(UIBarButtonItem *)sender
{
    [self.timer invalidate];
}

-(void)updateTimer:(NSTimer *)timer
{
    NSLog(@"%s",__func__);
    NSLog(@"%@",timer.userInfo);
    int counter=self.counterLabel.text.intValue;
    if(counter<=0)
    {
        [self pause:self.pause];
        UIAlertController *alert=[UIAlertController alertControllerWithTitle:@"开始" message:@"开始啦。。" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *sure=[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:nil];
        [alert addAction:sure];
        [self presentViewController:alert animated:YES completion:nil];
        
    }else
    {
        self.counterLabel.text=[NSString stringWithFormat:@"%d",--counter];
    }
}
@end
```

### 3.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var counterLabel: UILabel!
    @IBOutlet weak var pauseItem: UIBarButtonItem!
    var timer: Timer? = nil
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @objc func undateTimer(timer: Timer)
      {
          var counter:Int=Int.init(self.counterLabel.text!)!
          if(counter<=0)
          {
              pause(self.pauseItem)
          }else
          {
              counter-=1;
              self.counterLabel.text=String.init(format: "%d",counter);
          }
      }
    @IBAction func start(_ sender: UIBarButtonItem)
    {
        timer=Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(undateTimer), userInfo: "hello timer", repeats: true);
    }
    
    @IBAction func pause(_ sender: UIBarButtonItem)
    {
        timer?.invalidate()
    }
}
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-timer-cutdown.gif