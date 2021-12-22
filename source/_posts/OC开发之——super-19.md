---
title: OC开发之——super(19)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: 9f544b9c
date: 2020-04-02 23:51:00
---
## 一 概述

对于self好理解就是本类对象，那么super呢？实际super消息接受者也是本类对象，那么它与self有什么不同呢？

<!--more-->

## 二 代码实例

```
#include <Foundation/Foundation.h>
@interface Zoombie:NSObject
-(void)walk;
@end
@implementation Zoombie

-(void)walk
{
    NSLog(@"往前挪两步----");
}
@end

@interface JumpZoombie : Zoombie

@end
@implementation JumpZoombie

-(void)walk
{
    
    NSLog(@"跳两下");
    [super walk];
}

@end

int main()
{
    JumpZoombie *jump=[JumpZoombie new];
    [jump walk];
    
    return 0;
}
```

## 三 super关键字

* 分别调用父类的对象方法和类方法