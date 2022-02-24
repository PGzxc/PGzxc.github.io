---
title: IOS开发之——单例-1次性代码(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 单例
abbrlink: e090563f
date: 2022-02-24 09:08:07
---
## 一 概述

使用`dispatch_once`函数能保证某段代码在程序运行过程中只被执行1次

```
static dispatch_oncce_t onceToken;
dispatch_once(&onceToken,^{
	//只执行1次的代码(这里面默认是线程安全的)
});
```

<!--more-->

## 二 示例

### 2.1 示例一(变量控制)

```
#import "ViewController.h"

@interface ViewController ()
@property(nonatomic,assign) BOOL hasExecuted;
@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    if(self.hasExecuted)return;
    NSLog(@"下载图片---------");
    self.hasExecuted=YES;    
}
@end
```

### 2.2 示例2(下载工具类)

#### 下载工具类(ILImageDownloader)

```
#import "ILImageDownloader.h"

@interface ILImageDownloader()
@property(nonatomic,assign) BOOL hasExecuted;
@end

@implementation ILImageDownloader

-(void)download
{
    if (self.hasExecuted) return;
    NSLog(@"下载图片-----");
    self.hasExecuted=YES;
}
@end
```

#### ViewController

```
#import "ViewController.h"
#import "ILImageDownloader.h"

@interface ViewController ()
@property(nonatomic,strong) ILImageDownloader *downloader;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.downloader=[[ILImageDownloader alloc]init];
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self.downloader download];
}
@end
```

### 2.3 示例三(dispatch_once)

#### 下载工具类(ILImageDownloader)

```
#import "ILImageDownloader.h"

@implementation ILImageDownloader

-(void)download
{
    NSLog(@"下载图片-----");
}
@end
```

#### ViewController

```

#import "ILImageDownloader.h"


@interface ViewController ()

@property(nonatomic,strong) ILImageDownloader *downloader;

@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        ILImageDownloader *downloader=[[ILImageDownloader alloc]init];
        [downloader download];
    });
}
@end
```

