---
title: IOS开发之——事件处理-事件的产生和处理(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4df88b14
date: 2020-12-14 08:53:17
---
## 一 事件的产生和处理

* 发生触摸事件后，系统会将该事件加入到一个由<font color='purpple'>UIApplication</font>管理的事件<font color='red'>队列</font>中
* <font color='purpple'>UIApplication</font>会从事件队列中取出最前面的事件，并将事件分发下去以便处理，通常，先发送事件给应用程序的主窗口(keyWindow)
* 主窗口会在视图层次结构中<font color="red">找到一个最合适的视图来处理触摸事件</font>，但是这仅仅是整个事件处理过程中的第一步
* 找到合适的视图控件后，就会调用视图控件的touches方法来作具体的事件处理

<!--more-->

  ```
  - touchesBegan..
  - touchesMoved..
  - touchesEnded..
  ```

## 二 事件传递示例

### 2.1 界面布局

![][1]
### 2.2 界面关系说明

* BaseView：继承自UIView，复写touchesBegan方法
* WhiteView：继承自BaseView，是窗体的View
* GreenView：继承自BaseView，是2号绿色窗体的View
* OrangeView：继承自BaseView，是2号橙色窗体的View
* BlueView：继承自BaseView，是3号蓝色窗体的View
* RedView：继承自BaseView，是3号红色窗体的View
* YellowView：继承自BaseView，是4号黄色窗体的View

### 2.3 代码(BaseView -touchesBegan)

```
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    NSLog(@"%@",[self class]);
}
```

### 2.4 触摸事件的传递是从父控件传递到子控件

* 点击了绿色的view：UIApplication—>UIWindow—>白色—>绿色
* 点击了蓝色的view：UIApplication—>UIWindow—>白色—>橙色—>蓝色
* 点击了黄色的view：UIApplication—>UIWindow—>白色—>橙色—>蓝色—>黄色

### 2.5 说明

* 如果父空间不能接收触摸事件，那么子控件就不可能接收到触摸事件

## 三 UIVIew不接收触摸事件的三种情况

### 3.1 不接收用户交互

```
userInteractionEnabled=NO
```

### 3.2 隐藏

```
hidden=YES
```

### 3.3 透明

```
aplpa=0.0~0.01
```

<font color='blue'>提示：</font>UIImageView的userInteractionEnabled默认就是NO，因此UIImageView以及它的子控件默认是不能接收触摸事件的

## 四 如何找到最合适的控件来处理事件

* 自己是否能接收触控事件？否，事件传递到此结束
* 触摸点是否在自己身上？否，事件传递到此结束
* 从后往前遍历子控件，重复前面的两个步骤
*  如果没有符合条件的子控件，那么就自己最合适处理



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-event-touch-layout-multi.png

