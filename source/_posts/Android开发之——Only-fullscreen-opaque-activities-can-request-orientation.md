---
title: Android开发之——Only fullscreen opaque activities can request orientation
date: 2017-12-25 12:48:44  
categories: [开发,移动开发,Android,Error]   
tags: [Error]  
---
# 问题   
给activity启动页设置orientation后出现了如下错误：  
![orientation][1]
<!--more-->
# 定位错误
从错误信息中可以看出原因：Only fullscreen opaque activities can request orientation(只有全屏不透明的activity可以设置orientation)  
# 解决  
由错误原因可知，有两种解决方案：
   
- 去掉activity中的orientation属性
![resove-1][2]
- activity的style中Translucent设置为false
![resove-2][3]



[1]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/orientation-error.png
[2]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/orientation-solve-1.png
[3]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/orientation-solve-2.png