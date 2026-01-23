---
title: IOS开发之——事件处理-View拖动(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 140058b1
date: 2020-12-11 00:08:00
---
## 一 IOS中的事件

* 在用户使用app过程中，会产生各种各样的事件
* IOS中的事件可以分为3大类型：触摸事件、加速计事件、远程控制事件

<!--more-->

## 二 响应者对象

* 在iOS中不是任何对象都能处理事件，只有继承了UIResponder的对象才能接收并处理事件。我们称之为“响应者对象”
* UIApplication、UIViewController、UIView都能继承自UIResponder，因此它们都是响应者对象，都能接收并处理事件

## 三 UIResponder

### 3.1 UIResponder内部提供了以下方法来处理事件

#### 触摸事件

```
-(void)touchBegan:(NSSet *)touches withEvent:(UIEvent *)event;
-(void)touchMoved:(NSSet *)touches withEvent:(UIEvent *)event;
-(void)touchEnded:(NSSet *)touches withEvent:(UIEvent *)event;
-(void)touchCancelled:(NSSet *)touches withEvent:(UIEvent *)event;
```

#### 加速计事件

```
-(void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event;
-(void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event;
-(void)motionCancelled:(UIEventSubtype)motion withEvent:(UIEvent *)event;
```

#### 远程控制事件

```
-(void)remoteControlReceivedWithEvent:(UIEvent *)event;
```

## 四 UIView的触摸事件处理

### 4.1 UIView是UIResponder的子类，可以实现下列4个方法处理不同的触摸事件

#### 一根或者多根手指开始触摸view，系统会自动调用view的下面方法

* -(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event;

#### 一根或多根手指在view上移动，系统会自动调用view的下面方法(随着手指的移动持续调用该方法)

* -(void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event;

#### 一根或者多根手指离开view，系统会自动调用view的下面方法

* -(void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event;

#### 触摸结束前，某个系统事件(例如电话呼入)会打断触摸过程，系统会自动调用下面的方法

* -(void)touchesCancelled:(NSSet *)touches withEvent:(UIEvent *)event;

## 4.2 说明

* touches中存放的都是UITouch对象

##  五 UITouch

### 5.1  什么是UITouch

* 当用户用一根手指触摸屏幕时，会创建一个与手指相关联的UITouch对象
* 一根手指对应一个UITouch对象

### 5.2 UITouch的作用

* 保存着跟手指相关的信息，比如触摸的位置、时间、阶段

### 5.3 手指移动时

* 当手指移动时，系统会更新同一个UITouch对象，使之能够一直保存该手指的触摸位置

### 5.4 常用的属性
####   触摸产生时所处的窗口

```
@property(nonatomic,readonly,retain)UIWindow *window;
```

#### 触摸产生时所处的视图

```
@property(nonatomic,readonly,retain)UIView *view;
```

#### 短时间内点击屏幕的次数，可以根据tapCount判断单击、双击或更多的点击

```
@property(nonatomic,readonly)NSUInteger tapCount;
```

#### 记录了触摸事件产生或变化的时间，单位是秒

```
@property(nonatomic,readonly)NSTimeInterval timestamp;
```

#### 当前触摸事件所处的状态

```
@property(nonatomic,readonly)UITouchPhase phase;
```

### 5.5 常用的方法

#### touches.count

* 触摸的手指数(勾选Multiple Touch)

#### touch.tapCount

* 点击屏幕的次数

#### touch.phase(枚举类型)

```
typedef NS_ENUM(NSInteger, UITouchPhase) {
    UITouchPhaseBegan,             // whenever a finger touches the surface.
    UITouchPhaseMoved,             // whenever a finger moves on the surface.
    UITouchPhaseStationary,        // whenever a finger is touching the surface but hasn't moved since the previous event.
    UITouchPhaseEnded,             // whenever a finger leaves the surface.
    UITouchPhaseCancelled,     
```

## 六 view拖动

### 6.1 思路

* 获取当前手指的位置
* 获取上一个点
* 计算偏移量(x轴和y轴)
* 获取视图Center，根据偏移量获取最新位置

### 6.2 代码

```
//触摸移动
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch=[touches anyObject];
   //获取当前的位置
    CGPoint current=[touch locationInView:self];
    CGPoint pre=[touch previousLocationInView:self];

    //x轴的偏移量
    CGFloat offsetX=current.x-pre.x;
    CGFloat offsetY=current.y-pre.y;
    CGPoint center=self.center;
    center.x+=offsetX;
    center.y+=offsetY;
    self.center=center;
    //NSLog(@"%d",touch.phase);
    //NSLog(@"%s---%p",__func__,touch);
}
```

### 6.3 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-touch-view.gif