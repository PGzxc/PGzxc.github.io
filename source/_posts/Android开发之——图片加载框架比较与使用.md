---
title: Android开发之——图片加载框架比较与使用
categories:
  - 开发
  - 移动开发
  - Android
  - 第三方库
tags:
  - 网络图片
abbrlink: be069810
date: 2017-12-05 22:43:01
---

Android中网络图片的加载几乎是必须的，在使用图片的过程中经常伴随着OOM，错位，图像自定义等一系列问题；    
本文简单介绍一下常用的网络图片的第三方类库的使用方法   
   
- Fresco
- Glide
- Picasso
- Universal ImageLoader 
- Volley
<!--more-->
# Fresco
- 在build.gradle中导入     

		compile 'com.facebook.fresco:fresco:1.5.0' //fresco引用

- 基本使用  
布局： 
	
	![布局][1]
代码
	
	![fresco][2]

# Glide  
- 在build.gradle中导入

		compile 'com.github.bumptech.glide:glide:3.7.0' //glide引用

- 基本使用

	![glide][3]

# Picasso

- 在build.gradle中导入   

		 compile 'com.squareup.picasso:picasso:2.5.2' //加载图片
- 基本使用   

	![picaso][4]

# Universal ImageLoader    
- 在build.gradle中导入   

		compile 'com.nostra13.universalimageloader:universal-image-loader:1.9.4' //universal引用

- 基本使用  

	![imageloader][5]

# Volley
- 在build.gradle中导入     

		compile 'com.mcxiaoke.volley:library:1.0.19' //volley引用
- 基本使用  

	![volley][6]

参考：   
[参考Demo][7]   



[1]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/fresco-layout.png
[2]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/fresco-code.png
[3]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/glide-base-use.png
[4]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/picaso-base-use.png
[5]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/imageloader-base-use.png
[6]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/volley-base-use.png
[7]: https://github.com/PGzxc/ImageNet