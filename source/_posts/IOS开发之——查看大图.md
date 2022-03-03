---
title: IOS开发之——查看大图
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e98d0d50
date: 2020-05-08 22:41:22
---
## 一 概述

本文给UIImageView控件设置图片资源，并利用UIScrollView嵌套UIImageView实现拖动查看UIImage大图   
请确保Assets.xcassets下有所需的图片资源
<!--more-->

## 二 Main.storyboard有UIImageView控件时

### 2.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@end
@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //告诉scrollview内部内容的实际大小
    self.scrollView.contentSize=CGSizeMake(892, 632);
}
@end
```

### 2.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var imageView: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.scrollView.contentSize=CGSize.init(width:892, height: 632);
    }
}
```

## 三 Main.storyboard无UIImageView控件(代码追加)

### 3.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (strong, nonatomic) UIImageView *imageView;
@property (nonatomic,strong) UIImage *image;

@end

@implementation ViewController

-(void)setImage:(UIImage *)image
{
    _image=image;
    self.imageView.image=image;
    [self.imageView sizeToFit];
    self.scrollView.contentSize=image.size;
}
-(UIImageView *)imageView
{
    if(_imageView==nil)
    {
        _imageView=[[UIImageView alloc]init];
        [self.scrollView addSubview:_imageView];
    }
    return _imageView;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //告诉scrollview内部内容的实际大小
    self.image=[UIImage imageNamed:@"minion"];
}

@end
```

### 3.2  Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var scrollView: UIScrollView!
    var imageView: UIImageView?
    var image:UIImage?;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        image=UIImage.init(named: "minion");
        imageView=UIImageView.init()
        imageView?.image=image;
        imageView?.sizeToFit()
        scrollView.addSubview(imageView!);
        scrollView.contentSize=image?.size as! CGSize
    }
}
```
