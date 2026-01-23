---
title: IOS开发之——事件处理-抽屉效果(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: bfc06e1c
date: 2020-12-16 09:14:19
---
## 一 概述

* 事件处理-抽屉效果——界面布局
* 事件处理-抽屉效果——滑动处理
* 事件处理-抽屉效果——缩放处理
* 事件处理-抽屉效果——滑动定位
* 事件处理-抽屉效果——定位视图复位

<!--more-->

## 二 事件处理-抽屉效果——界面布局

### 2.1 界面关系

* DrawViewCOntroller继承UIViewController
* 启动界面的ViewController继承DrawViewCOntroller

## 三 事件处理-抽屉效果——滑动处理(DrawViewController)

### 3.1 添加子控件(左、右、中三个view)

```
- (void)addSubView
{
    //left view
    UIView *leftView=[[UIView alloc]initWithFrame:self.view.bounds];
    leftView.backgroundColor=[UIColor greenColor];
    [self.view addSubview:leftView ];
    _leftView=leftView;
    
    //right view
    UIView *rightView=[[UIView alloc]initWithFrame:self.view.bounds];
    rightView.backgroundColor=[UIColor blueColor];
    [self.view addSubview:rightView];
    _rightView=rightView;
    
    //main view
    UIView *mainView=[[UIView alloc]initWithFrame:self.view.bounds];
    mainView.backgroundColor=[UIColor redColor];
    [self.view addSubview:mainView];
    _mainView=mainView;
}
```

### 3.2 滑动视图处理

```
-(void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //获取UITouch对象
    UITouch *touch=[touches anyObject];
    //获取当前点
    CGPoint currentPoint=[touch locationInView:self.view];
    //获取上一个点
    CGPoint prePoint=[touch precisePreviousLocationInView:self.view];
    //x轴偏移量
    CGFloat offsetX=currentPoint.x-prePoint.x;
    //获取主视图的frame
    CGRect frame=_mainView.frame;
    frame.origin.x+=offsetX;
    _mainView.frame=frame;
}
```

### 3.3 监听_mainView的frame的改变

```
 [_mainView addObserver:self forKeyPath:@"frame" options:NSKeyValueObservingOptionNew context:nil];
 - (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    //NSLog(@"%@",NSStringFromCGRect(_mainView.frame));
    if (_mainView.frame.origin.x<0) { //向左滑动
        _rightView.hidden=NO;//显示右边
        _leftView.hidden=YES;//隐藏左边
    }else if(_mainView.frame.origin.x>0){ //向右滑动
        _rightView.hidden=YES;//隐藏右边
        _leftView.hidden=NO;//显示左边
    }
}
```

## 四 事件处理-抽屉效果——缩放处理

### 4.1 效果

![][1]

### 4.2 原理

假设：移动的x距离为320，y距离为50

* offsetY=offsetX*50/320
* scale=currentH/screenH
* currentH=screenH-2*offsetY
* x=frame.origin.x+offsetX
* h=frame.size.height*scale
* w=frame.size.weight*scale
* y=(screenH-h)*0.5

### 4.3 滑动时处理

#### 获取当前视图view

```
- (CGRect)getCurrentFrameWithOffsetX:(CGFloat)offsetX
{
    CGFloat screenW=[UIScreen mainScreen].bounds.size.width;
    CGFloat screenH=[UIScreen mainScreen].bounds.size.height;
    //获取y轴偏移量，手指每移动一点，y轴偏移多少
    CGFloat offsetY=offsetX*MaxY/screenW;
    CGFloat scale=(screenH-2*offsetY)/screenH;
    
    if (_mainView.frame.origin.x<0) { //往左边滑动
        scale=(screenH+2*offsetY)/screenH;
    }
    
    //获取之前的frame
    CGRect frame=_mainView.frame;
    frame.origin.x+=offsetX;
    frame.size.height=frame.size.height*scale;
    frame.size.width=frame.size.width*scale;
    frame.origin.y=(screenH-frame.size.height)*0.5;
    
    return  frame; 
}
```

#### 滑动时重新赋值视图

```
-(void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //获取UITouch对象
    UITouch *touch=[touches anyObject];
    //获取当前点
    CGPoint currentPoint=[touch locationInView:self.view];
    //获取上一个点
    CGPoint prePoint=[touch precisePreviousLocationInView:self.view];
    //x轴偏移量
    CGFloat offsetX=currentPoint.x-prePoint.x;
    //获取主视图的frame
    CGRect frame=_mainView.frame;
    frame.origin.x+=offsetX;
    _mainView.frame=[self getCurrentFrameWithOffsetX:offsetX];

}
```

## 五 事件处理-抽屉效果——滑动定位

### 5.1 说明

* 向右滑动时：当主视图的最大x大于屏幕的一半时，自动定位到屏幕右边
* 向左滑动时：当主视图的最大x小于屏幕的一半，自动定位到屏幕左边

### 5.2 代码实现

```
//定位
- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    CGFloat target=0;
    CGFloat screenW=[UIScreen mainScreen].bounds.size.width;
    if (_mainView.frame.origin.x>screenW*0.5) { //定位到右边
        target=rightTarget;
    }else if(CGRectGetMaxX(_mainView.frame)<screenW*0.5) //定位到左边
    {
        target=leftTarget;
    }
    [UIView animateWithDuration:0.25 animations:^{
        if (target) { //定位到左或右
            //获取偏移量
            CGFloat offsetX=target-_mainView.frame.origin.x;
            _mainView.frame=[self getCurrentFrameWithOffsetX:offsetX];
        }else{ //还原
            _mainView.frame=self.view.bounds;
        }
    }];
}
```

## 六 事件处理-抽屉效果——定位视图复

### 6.1 说明

* 当向左向右滑动至定位点时，点击视图重新复位到原来位置

### 6.2 代码实现

#### 定义变量

```
@property(nonatomic,assign) BOOL isDraging;
```

#### isDraging何时为YES

```
-(void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
  _isDraging=YES;
}
```

####  isDraging何时为NO

```
- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
  _isDraging=NO;
}
```

#### touchesEnded逻辑处理

```
 if (_isDraging==NO&&_mainView.frame.origin.x!=0) {
      [UIView animateWithDuration:0.25 animations:^{
          _mainView.frame=self.view.bounds;
      }];   
  }
```


## 七 效果图
![][2]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-event-drawa-move-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-event-draw-view.gif