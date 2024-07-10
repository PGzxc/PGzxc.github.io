---
title: IOS开发之——图片资源
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - 基础
abbrlink: ee100ec
date: 2018-07-16 08:43:36
---
## 概述
* iOS开发中，会展示大量的图片资源，除了网络图片资源外，还需要一些本地图片资源
* 这些资源存放到什么位置，怎么引用，本文将通过实例讲解。  

<!--more-->

## 二 图片资源
### 2.1 图片格式
开发中主流使用的格式主要是 .png 和 .jpg 两种，.png 相对于 .jpg 的优点是，解压缩效率高，对 CPU 消耗小，而且是无损压缩，苹果公司推荐使用的格式也是 .png。而且 Asset Catalog 仅支持 .png 格式，如果项目中有 .jpg 格式的资源，则不能放入其中，需要再单独建立普通文件夹存放。

### 2.2 图片命名规范
最基本的原则是，文件名应该只描述图片的用途，而不描述图片的样式，所以名字中不应出现对颜色，样式等描述的单词。一种规范的格式是：

```
module_identifier_type_state 
```
1. module，代表的是功能模块，大部分的图片是对应着不同的界面，即对应了不同的功能模块，包括登录和启动界面也应作为一个单独的模块。对于一些在很多界面中通用的资源，可以放在 common 模块中。可以把 module 理解为命名空间（namespace）的作用  
2. identifier，主要作用就是用来描述图片的用途，如一个用于设置按钮的图片，这一部分就可以写为 setting；当一个单词无法准确描述用途时，也可用多个单词由 _ 分隔。
3. type，说明图片的类型，额外提供了一些图片的信息，一般可以分为背景(bg)，图标(icon)，图片(img)，按钮(btn)等
4. state，例如一个按钮的不同状态要对应不同的图片，在描述符相同的情况下，就可以用 state 来区分，可以是 normal，highlighted，selected，disabled 等

![][1]  

### 2.3  图片适配
不同屏幕分辨率下，可能需要加载不同图片资源大小的文件，iOS中一般在图片资源文件的后面加上不同的后缀表示，如@2x，@3x  

## 三 开发实例
效果图    
通过上下左右控制图片的移动方向     
![][2]  

### 3.1 功能说明
上下左右：四个Button，有normal状态和press状态，点击有响应的动作  
移动图片：设置了background的Button，点击切换Buttton的默认和高亮显示

### 3.2 Object-c下开发 
![][3]

### 3.3  Swift下开发
![][4]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-icon-namespace-example.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-icon-example.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-icon-move-object-c.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-icon-move-swift.png

