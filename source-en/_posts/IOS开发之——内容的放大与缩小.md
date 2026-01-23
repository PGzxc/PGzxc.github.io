---
title: IOS开发之——内容的放大与缩小
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: d276fa40
date: 2020-05-10 23:21:14
---
## 一 概述

* 有些时候，我们需要对某些内容进行手势缩放，而UIScrollView能满足这个要求；
* UIScrollVIew不仅能滚动显示大量内容，还能对其内容进行缩放处理
* 也就是说，要完成缩放功能，只需要将需要缩放的内容添加到UIScrollView中

<!--more-->

## 二 UIScrollVIew的缩放原理

* 当用户在UIScrollVIew身上使用捏合手势时，UIScrollView会给代理发送一条消息，询问代理究竟要缩放自己内部的哪一个控件(哪一块内容)
* 当用户在UIScrollView身上使用捏合手势时，UIScrollVIew会调用代理的ViewForZoomingInScrollView方法，这个方法返回的控件就是需要缩放的控件

## 三 缩放的实现步骤

1. 设置UIScrollView的id<UISCrollViewDelegate> delegate代理对象
2. 设置minmumZoomScale：缩小的最小比例
3. 设置maximumZoomScale：放大的最大比例
4. 让代理对象实现下面的方法，返回需要缩放的视图控件

   ```
   - (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView;
   ```

## 四 代码实现

### 4.1 OC模式下(ViewController.m)

```
#import "ViewController.h"

@interface ViewController ()<UIScrollViewDelegate>
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIImageView *imageView;
@end
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.scrollView.contentSize=self.imageView.image.size;
    self.scrollView.delegate=self;
    self.scrollView.maximumZoomScale=2.0;
    self.scrollView.minimumZoomScale=0.2;
}
#pragma UIScrollView的代理

- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView
{
    return self.imageView;
}
//开始缩放
- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    NSLog(@"%s",__func__);
}
//完成缩放
- (void)scrollViewDidEndZooming:(UIScrollView *)scrollView withView:(UIView *)view atScale:(CGFloat)scale
{
    NSLog(@"%s",__func__);
}
//正在缩放
- (void)scrollViewDidZoom:(UIScrollView *)scrollView
{
    NSLog(@"%@",NSStringFromCGAffineTransform(self.imageView.transform));
}
@end
```

### 4.2 Swift模式下(ViewController.swift)

```
import UIKit

class ViewController: UIViewController, UIScrollViewDelegate {
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var imageView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.scrollView.contentSize=self.imageView.image?.size as! CGSize;
        self.scrollView.delegate=self;
        self.scrollView.maximumZoomScale=2.0
        self.scrollView.minimumZoomScale=0.2
    }

    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return self.imageView
    }
}
```
