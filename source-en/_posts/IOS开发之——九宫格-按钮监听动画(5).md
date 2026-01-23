---
title: IOS开发之——九宫格-按钮监听动画(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 642a32b
date: 2020-06-03 23:21:48
---
## 一 概述

本文在上节的基础上，给九宫格中的按钮添加按钮监听动画  

* 收尾式动画的执行
* 防止按钮被多次点击

<!--more-->

## 二 代码

```
-(void)click:(UIButton *)button
{
    NSLog(@"%s--%ld",__func__,button.tag);
    //取出appInfo
    AppInfo *appInfo=self.appList[button.tag];
    //添加一个UILabel到界面上
    UILabel *label=[[UILabel alloc]initWithFrame:CGRectMake(100, 440, 160, 40)];
    //数值是0表示黑色,1表示纯白 alpha表示透明度
    label.backgroundColor=[UIColor colorWithWhite:0.0 alpha:0.2];
    label.text=appInfo.name;
    label.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:label];
    label.alpha=0.0;
    //禁用按钮
    button.enabled=NO;
    //动画效果,收尾式动画，修改对象的属性,frame,bounds,alpha
    [UIView animateWithDuration:1.0f animations:^{
        //要修改的动画属性
        label.alpha=1.0;
    } completion:^(BOOL finished) {
        //动画完成后，所做的操作
        [UIView animateWithDuration:1.0f animations:
         ^{
            label.alpha=0.0;
        } completion:^(BOOL finished) {
            [label removeFromSuperview];
            button.enabled=YES;
        }];
    }]; 
}
```