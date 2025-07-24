---
title: React Native开发之——组件ViewPagerAndroid(24)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件ViewPagerAndroid
abbrlink: 8805ed25
date: 2018-03-20 09:44:24
---
## 一 概述
```
今天我们来讲解一下关于 ViewPager 的使用，它是一个允许子视图左右滚动翻页的容器。
我们知道在Android开发中系统有ViewPager这个组件，作用是实现滚动翻页的，在RN中也是有这么一个组件的（ViewPagerAndroid），每一个ViewPagerAndroid的子容器会被视作一个单独的页，并且会被拉伸填满ViewPagerAndroid。  
```

<!--more-->  

## 二 ViewPagerAndroid属性
```
1、initialPage number 
顾名思义：初始索引页，当然我们也可以通过 setPage 函数来翻页，还可以通过 onPageSelected 方法来监听页面的滑动。

2、keyboardDismissMode 
enum(‘none’, “on-drag”) 这个还是很人性化的，就是监听在滑动的时候是否隐藏软键盘。

- none ： 默认值，意思是不会隐藏消失
- on-drag ： 当拖拽滑动时软键盘消失

3、onPageScroll function 
当在页面间滑动切换时（不管是动画还是由于用户在页间滑动或者拖拽）执行。

- position 从左数起第一个当前可见的页面的下标。
- offset 一个在[0,1)(大于等于0，小于1)之间的范围，代表当前页面切换的状态。
值x表示现在”position”所表示的页有(1-x)的部分可见，而下一页有x的部分可见。

4、onPageScrollStateChanged function 
顾名思义：当页面滑动状态变化时调用这个函数，页面滑动的状态有三种：

 - idle ： 无交互时，空闲状态
 - dragging ： 拖拽滑动中，意思是页面正在拖拽当中
 - settling ： 处理中，意味着当前页面发生过交互，且正在结束开头或收尾的动画。
 
5、onPageSelected function 
上面我们提到过，这个函数是当页面切换完成后调用。
该方法回调参数中的event.nativeEvent对象会携带一个属性 : ‘position’ 。
该属性代表当前选中的页面的索引值。 

6、scrollEnabled bool 布尔值，true是默认是，可以滑动，false代表禁止滚动。
```

## 三 代码实例 

### 3.1 代码

![][1]  

### 3.2 效果 
![][2]  

## 四 参考
参考：[Github下载][3]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-viewpagerandroid-code.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-viewpagerandroid.gif
[3]: https://github.com/PGzxc/RN_ViewPagerAndroid
