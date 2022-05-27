---
title: Android开发之——ConvenientBanner小结
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 轮播图
abbrlink: 5d558d7d
date: 2017-12-05 21:36:54
---
轮播图是每款APP的标配，无论是引导页还是首页展示，随从可见；自己实现的话，既要处理布局问题，数据适配问题，又要处理图片的轮询等一系列问题；好在有封装好的第三方的类库，从此实现轮播图就简单了好多！！
<!--more-->
先看效果图：  
![轮播图][1]    

如何实现？  
# 在Module下添加gradle依赖
	compile 'com.bigkoo:convenientbanner:2.0.5'
![banner][3]

# 在需要使用轮播图的地方添加布局
注：canLoop设置为“true”，表示轮播   

![布局][4] 
# 在代码中配置Banner选项
## 调用convenientBanner.setPages设置页面和数据
- setPages中的第一个参数为Holder(可以自定义布局)
注：createView为返回view，可以自定义，此处代码生成；UpdateUI为页面设置数据

	![][5]
- setPages中的第二个参数为数据集合

	![data][6]


## 调用setPageIndicator设置指示器
注：指示器为一个数组，有两个值，第一个为默认，第二个为当前选中时显示

![indicator][7]
## 调用setOnPageChangeListener设置ViewPager页面滑动事件

![scroll][8]
## 调用setOnItemClickListener设置页面被点击事件

![click][9]
## 当页面显示时调用 bannerNet.startTurning(xxx)开始轮播

![loop][10]
## 当页面不显示时调用bannerNet.stopTurning()暂停轮播
![stop][11]


参考：    
ConvenientBanner地址:[https://github.com/saiwu-bigkoo/Android-ConvenientBanner][2]   
[Demo地址][12]


[1]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-viewpager.gif
[2]: https://github.com/saiwu-bigkoo/Android-ConvenientBanner
[3]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner.png
[4]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_layout.png
[5]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_holder.png
[6]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_data.png
[7]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_indicator.png
[8]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_scroll.png
[9]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_click.png
[10]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_loop.png
[11]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/android-banner_stop.png
[12]: https://github.com/PGzxc/ConvenientBannerDemo