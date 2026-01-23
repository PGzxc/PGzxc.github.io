---
title: IOS开发之——单例-GCD实现(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 单例
abbrlink: 9b53860a
date: 2022-02-25 08:47:28
---
## 一 概述

* ARC模式下的GCD实现
* 非ARC模式下的GCD实现

<!--more-->

## 二 ARC模式下的GCD实现

### 2.1 如何确认ARC模式

#### TARGETS——Build Settings——搜索autom，找到Objective-C Automatic Reference Counting(YES)

![][1]

#### main.m方法使用@autoreleasepool

```
#import <UIKit/UIKit.h>
#import "AppDelegate.h"

int main(int argc, char * argv[]) {
    NSString * appDelegateClassName;
    @autoreleasepool {
        appDelegateClassName = NSStringFromClass([AppDelegate class]);
    }
    return UIApplicationMain(argc, argv, nil, appDelegateClassName);
}
```

### 2.2 ARC模式下的单例(NSDataTool)

#### NSDataTool.h

```
#import <Foundation/Foundation.h>
@interface NSDataTool : NSObject
+(instancetype)shareDataTool;
@end
```

#### NSDataTool.m

```
#import "NSDataTool.h"
@implementation NSDataTool
static id _instance;

+(instancetype)allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance=[super allocWithZone:zone];
    });
    return _instance;
}
+(instancetype)shareDataTool
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance=[[self alloc]init];
    });
    return _instance;
}
-(id)copyWithZone:(NSZone *)zone
{
    return _instance;
}
@end
```

## 三 非ARC模式下的GCD实现

### 3.1 非ARC确认

#### TARGETS——Build Settings——搜索autom，找到Objective-C Automatic Reference Counting(NO)
![][2]

#### main.m方法没有使用@autoreleasepool

```
#import <UIKit/UIKit.h>
#import "AppDelegate.h"
int main(int argc, char * argv[]) {
    NSString * appDelegateClassName;

        appDelegateClassName = NSStringFromClass([AppDelegate class]);
  
    return UIApplicationMain(argc, argv, nil, appDelegateClassName);
}
```

### 3.2 非ARC出现的问题(调用release方法)

![][3]

### 3.3 非ARC模式下的单例(NSDataTool)

#### NSDataTool.h

```
#import <Foundation/Foundation.h>
@interface NSDataTool : NSObject
+(instancetype)shareDataTool;
@end
```

#### NSDataTool.m

```
#import "NSDataTool.h"

@implementation NSDataTool

static id _instance;

+(instancetype)allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance=[super allocWithZone:zone];
    });
    return _instance;
}

+(instancetype)shareDataTool
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance=[[self alloc]init];
    });
    return _instance;
}
-(id)copyWithZone:(NSZone *)zone
{
    return _instance;
}
//空方法
-(oneway void)release
{  
}
-(instancetype)retain
{
    return self;
}
- (NSUInteger)retainCount
{
    return 1;
}
@end
```

说明：

* release：为空，不使用默认实现
* retain：返回当前示例
* retainCount：返回1


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-instance-arc-setting-yes.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-instance-arc-setting-no.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-instance-arc-setting-no-problem.png
