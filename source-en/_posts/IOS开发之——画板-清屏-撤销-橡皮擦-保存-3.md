---
title: IOS开发之——画板-清屏/撤销/橡皮擦/保存(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 8784f66e
date: 2021-04-08 10:55:44
---
## 一 概述

画板——清屏，撤销，橡皮擦，保存

<!--more-->

## 二 清屏

### 2.1 说明

* PaintView方法提供clearScreen清屏方法，将paths中的所有内容情况，并重绘
* ViewController方法调用PaintView中的clearScreen清屏

### 2.2 代码

#### PaintView.m

```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    if (!self.paths.count) {
        return;
    }
    for (PaintPath *path in self.paths) {
        [path.color set];
        [path stroke];
    }
}
-(void)clearScreen
{
    [self.paths removeAllObjects];
    //重绘
    [self setNeedsDisplay];
}
```

#### ViewController.m

```
//清屏
- (IBAction)clearScreen:(UIBarButtonItem *)sender
{
    [_paintView clearScreen];
}
```

### 2.3 效果图

![][1]
## 三 撤销

### 3.1 说明

* 从paths中移除上一次的操作，并重绘

### 3.2 代码

#### PaintView.m

```
-(void)undo
{
    [self.paths removeLastObject];
    //重绘
    [self setNeedsDisplay];
}
```

#### ViewController.m

```
//撤销
- (IBAction)undo:(UIBarButtonItem *)sender
{
    [_paintView undo];
}
```

### 3.3 效果图
![][2]
## 四 橡皮擦

### 4.1 说明

* 将whiteColor赋值给PaintView的color

### 4.2 代码

```
//橡皮擦
- (IBAction)eraser:(UIBarButtonItem *)sender
{
    _paintView.color=[UIColor whiteColor];
}
```

### 4.3 效果图
![][3]
## 五 保存相册

### 5.1 功能说明

* 申请相册操作的权限
* 把画板截屏并保存到相册中
* 保存成功或失败，使用MBProgress显示操作结果

### 5.2 功能代码

#### info.plist(右键——Open as Source Code)

```
   <!-- 相册 -->
   <key>NSPhotoLibraryUsageDescription</key>
   <string>App需要您的同意,才能访问相册</string>
   <!-- 相机 -->
   <key>NSCameraUsageDescription</key>
   <string>App需要您的同意,才能访问相机</string>
   <!-- 媒体资料库 -->
   <key>NSAppleMusicUsageDescription</key>
   <string>App需要您的同意,才能访问媒体资料库</string> 
```

#### [MBProgress](https://github.com/jdg/MBProgressHUD)引用

```
[MBProgressHUD showHUDAddedTo:self.view animated:YES];
dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, 0.01 * NSEC_PER_SEC);
dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
	// Do something...
	[MBProgressHUD hideHUDForView:self.view animated:YES];
});
```

#### ViewController.m

```
//保存
- (IBAction)save:(UIBarButtonItem *)sender
{
    //把画板截屏
    //1-开启上下文
    UIGraphicsBeginImageContextWithOptions(_paintView.bounds.size, NO, 0.0);
    //获取当前上下文
    CGContextRef ctx=UIGraphicsGetCurrentContext();
    //把画板上的内容渲染到上下文
    [_paintView.layer renderInContext:ctx];
    //获取新的图片
    UIImage *newImage=UIGraphicsGetImageFromCurrentImageContext();
    //关闭上下文
    UIGraphicsEndImageContext();
    //保存到用户的相册里面
    UIImageWriteToSavedPhotosAlbum(newImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
}
//保存相册后回调
- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo
{
    if (error) { //保存失败
        
        MBProgressHUD *hud =[MBProgressHUD showHUDAddedTo:self.view animated:YES];
        hud.mode = MBProgressHUDModeAnnularDeterminate;
        hud.label.text = @"保存失败";
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC);
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
            [MBProgressHUD hideHUDForView:self.view animated:YES];
        });
        
        //[MBProgressHUD  :@"保存失败"];
        NSLog(@"保存失败");
    }else{  //保存成功
        
        MBProgressHUD *hud =[MBProgressHUD showHUDAddedTo:self.view animated:YES];
        hud.mode = MBProgressHUDModeAnnularDeterminate;
        hud.label.text = @"保存成功";
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC);
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
            [MBProgressHUD hideHUDForView:self.view animated:YES];
        });
        NSLog(@"保存成功");
    }
}
```

### 5.3 效果图

![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-clean-screen.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-undo.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-eraser.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-draw-capture-save.gif

