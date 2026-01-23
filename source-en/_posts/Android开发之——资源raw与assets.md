---
title: Android开发之——资源raw与assets
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - raw与assets
abbrlink: 3335eee7
date: 2017-12-26 01:03:23
---
## 一 android中raw与assets区别
### 1.1 res/raw和assets的相同点
两者目录下的文件在打包后会原封不动的保存在apk包中，不会被编译成二进制。
### 1.2 res/raw和assets的不同点
- res/raw中的文件会被映射到R.java文件中，访问的时候直接使用资源ID即R.raw.filename；assets文件夹下的文件不会被映射到R.java中，访问的时候需要AssetManager类。
- res/raw不可以有目录结构，而assets则可以有目录结构，也就是assets目录下可以再建立文件夹
<!--more-->

## 二 实例  
先看一张效果图   
![][1]
### 2.1  获取raw中资源
#### 获取raw中图片
	InputStream inputStream = getResources().openRawResource(R.raw.xiaoxin);
	Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
	imageView.setImageBitmap(bitmap);
#### 获取raw中音乐
	mp = MediaPlayer.create(this, R.raw.music);//创建mediaplayer对象

### 2.2 获取assets中资源
#### 获取assets中网址
	((WebView)findViewById(R.id.asset_webView)).loadUrl("file:///android_asset/a.html");
#### 获取assets中图片
	AssetManager assets = getAssets();
	InputStream inputStream = assets.open("hzw.jpg");
	Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
	((ImageView)findViewById(R.id.asset_img)).setImageBitmap(bitmap);
#### 获取assets中音乐
	AssetManager am = getAssets();
	//AssetManager am = getResources().getAssets();
	AssetFileDescriptor afd = null;
	afd = am.openFd("qichuang.mp3");
	FileDescriptor fd = afd.getFileDescriptor();
	mp = new MediaPlayer();
	mp.setAudioStreamType(AudioManager.STREAM_MUSIC);
	mp.setDataSource(fd, afd.getStartOffset(), afd.getLength());
	//mp.setDataSource(fd);
	mp.prepare();
	mp.start();


## 三 参考：  
[demo][2]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/raw_asset.gif
[2]: https://github.com/PGzxc/AndroidResource
