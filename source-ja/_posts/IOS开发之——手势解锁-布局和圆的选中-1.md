---
title: IOS开发之——手势解锁-布局和圆的选中(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 438dabe1
date: 2021-01-27 08:34:18
---
## 一 概述

* `initWithCoder`通过代码向布局中添加九宫格圆按钮
* `layoutSubviews`设置圆按钮的位置
* 手指在屏幕上开始时，判断触摸点是否在圆内(是则选中，否则不选中)
* 手指在屏幕上移动时，原理同上

<!--more-->

## 二 功能实现

### 2.1 布局文件

底部是ImageView,ImageView上方是自定义View(LockView)

![][1]

### 2.2 功能代码(LockView)

```
#import "LockView.h"
@implementation LockView
//解析xib的时候调用
-(instancetype)initWithCoder:(NSCoder *)coder
{
    if (self=[super initWithCoder:coder]) {
        //添加按钮
        NSLog(@"%s",__func__);
        [self addBtns];
    }
    return self;   
}
- (void)awakeFromNib
{
    NSLog(@"%s",__func__);
}

-(void)addBtns
{
    NSLog(@"%s",__func__);
    for (int i=0; i<9; i++) {
        UIButton *button=[UIButton buttonWithType:UIButtonTypeCustom];
        //设置普通状态下的图片
        [button setImage:[UIImage imageNamed:@"gesture_node_normal"] forState:UIControlStateNormal];
        [button setImage:[UIImage imageNamed:@"gesture_node_highlighted"] forState:UIControlStateSelected];
        //[button addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchDown];
       //不允许用户交互
        button.userInteractionEnabled=NO;
        [self addSubview:button];
        
    }
}
//触摸点坐标
-(CGPoint)pointWithTouches:(NSSet *)touches
{
    UITouch *touch=[touches anyObject];
    return [touch locationInView:self];
}
//获取触摸按钮
-(UIButton *)buttonWithPoint:(CGPoint)pos
{
    for (UIButton *btn in self.subviews) {
        if (CGRectContainsPoint(btn.frame, pos)) {
            return  btn;
        }
    }
    return  nil;
}
//开始触摸时
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //当前触摸点
    CGPoint pos=[self pointWithTouches:touches];
    //获取触摸按钮
    UIButton *btn=[self buttonWithPoint:pos];
    if (btn) { //有触摸点地方才需要选中
        btn.selected=YES;
    }
}
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //当前触摸点
    CGPoint pos=[self pointWithTouches:touches];
    //获取触摸按钮
    UIButton *btn=[self buttonWithPoint:pos];
    if (btn) { //有触摸点地方才需要选中
        btn.selected=YES;
    }
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    //给按钮设置位置
    CGFloat col=0;
    CGFloat row=0;
    CGFloat btnW=74;
    CGFloat btnH=74;
    CGFloat btnX=0;
    CGFloat btnY=0;
    
    CGFloat totalCount=3;
    CGFloat margin=(self.bounds.size.width-totalCount*btnW)/(totalCount+1);
    
    for (int i=0; i<self.subviews.count; i++) {
        UIButton *button=self.subviews[i];
        col=i%3;
        row=i/3;
        btnX=margin+(margin+btnW)*col;
        btnY=(margin+btnH)*row;
        button.frame=CGRectMake(btnX, btnY, btnW, btnH);
    }
}
@end
```

### 2.3 手势解锁效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-unlock-layout-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-unlock-touch-move.gif