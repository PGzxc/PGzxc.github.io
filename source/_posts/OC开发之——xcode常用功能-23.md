---
title: OC开发之——xcode常用功能(23)
categories:
  - 开发
  - A-基础语言
  - Object-C
tags:
  - OC
abbrlink: e4576ee
date: 2020-04-05 23:15:26
---
## 一 概述

上一篇介绍了使用xcode开发object-c，本文继续介绍xcode的一些常用功能，如：

* 界面布局及快速调整
* OC代码调试
* 添加pragma mark标记
* 代码编写提示

<!--more-->

## 二 OC界面布局及快速调整

* 使用xcode打开项目后的布局如下图

  ```
  1.左侧按钮：hide or show the navigator(显示或隐藏导航条——控制左侧部分)
  2.中间按钮：hide or show the debug area(显示或隐藏debug区域——代码下部分)
  3.右侧按钮：hide or show the inspectors(显示或隐藏预览——最右侧部分)
  ```

  ![][1]
  
* 点击左侧按钮的效果(左侧代码隐藏)
	![][2]
	
* 点击中间按钮的效果
	
	```
	打开debug区域后，下方有2个按钮：
	1. 左侧：show the variables view——显示变量
	2. 右侧：hide the console——隐藏控制台
	3. 向下箭头：hide the debug area——隐藏debug区域
	4. 向右五边形：Deactive breakpoints——断开调试断点
	```

    ![][3]

* 点击右侧按钮的效果
	![][4]

## 三 OC代码调试

* 在代码处点击，出现如图所示标示，标示已添加调试点
	![][5]
	
* 点击左上角的右三角运行项目，停止在如图所示断点位置
	![][6]
	
* 将指针放在调试位置处，显示初始化前的信息
	![][7]
	
* 点击右三角所示的位置继续程序执行，可以看到信息被复制
	
	```
	1. continue program execution:继续程序执行
	2. step over:跳出当前程序
	3. step into:调到方法里，调试程序的方法里
	4. step out: 与step into对应
	```
    ![][8]

* 在debug处右键，删除调试点
	![][9]

## 四 添加pragma mark标记

```
#pragma mark - 姓名的set方法
- (void)setName:(NSString *)name
{
    _name=name;
#pragma mark - 今天就写到这里。。。
}
```

![][10]

## 五 代码编写提示
说明：新安装的xcode默认是勾选了编写代码提示，如果不想使用代码提示或者查看代码提示是否已经勾选，可通过下面的方式：

* 依次打开：xcode——>Preferences——>Text Editing——>Editing，将`suggest completions while typing(打字时建议补全)`勾选
	![][11]
  



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-preview-full.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-preview-left-hidden.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-preview-middle-show.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-preview-right-hide.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-debug-point-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-debug-run.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-debug-point-first.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-debug-point-revalue.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-debug-point-delete.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-pragram-mark.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/oc-xcode-code-suggest-code.png
