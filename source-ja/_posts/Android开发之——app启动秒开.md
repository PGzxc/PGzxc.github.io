---
title: Android开发之——app启动秒开
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - APP秒开
abbrlink: e88019ff
date: 2018-01-22 09:44:46
---
# 前言 
本篇博客要剖析和解决的两个问题：   
 
-  APP启动时白屏/黑屏、Activity打开时白屏/黑屏。    
- APP启动速度慢，如何实现点击ICON后APP秒开。APP启动加速。   

先看效果图(模拟映客启动)  
![][1]
<!--more-->

# APP启动时白屏/黑屏、Activity打开时白屏/黑屏  

首先要说明的是无论是APP启动，还是startActivity都是Activity的启动，所以这归根结底是一个问题，看完本博客就明白了。

这是一个很多新手或者从事Android开发已经一年多的同学们可能遇到的疑问，究其原因是对Activity的启动机制和Activity的绘制机智不太了解。  

绘制整个窗口需要按顺序执行以下几个步骤：   

1. 绘制背景。 
2. 绘制View本身的内容
3. 绘制子View。 
4. 绘制修饰内容（例如滚动条)。

这里是主要的四步，还有些其他对于今天内容不太重要省去没写。  
## 闪屏原因剖析StartingWindow（Preview Window）
我们正常开发中会在Activity的onCreate()方法中调用setContentView(View)设置该Activity的显示布局，那么问题就来了，既然我们设置了布局，为什么启动的时候还会白屏或者黑屏而不是显示我set的布局呢？下面就带领大家一起来剖析一下原因。  

当打开一个Activity时，如果这个Activity所属Application还没有在运行，系统会为这个Activity的创建一个进程（每开启一个进程都会有一个Application，所以Application的onCreate()可能会被调用多次），但进程的创建与初始化都需要时间，在这个动作完成之前，如果初始化的时间过长，屏幕上可能没有任何动静，用户会以为没有点到按钮。所以既不能停在原来的地方又没到显示新的界面，怎么办呢？这就有了StartingWindow（也称之为PreviewWindow）的出现，这样看起来就像Activity已经启动起来了，只是数据内容还没有初始化好。  

StartingWindow一般出现在应用程序进程创建并初始化成功前，所以它是个临时窗口，对应的WindowType是TYPE_APPLICATION_STARTING。目的是告诉用户，系统已经接受到操作，正在响应，在程序初始化完成后实现目的UI，同时移除这个窗口。

这个StartingWindow就是我们要讨论的白屏和黑屏的“元凶”，一般情况下我们会对Application和Activity设置Theme，系统会根据设置的Theme初始化StartingWindow。Window布局的顶层是DecorView，StartingWindow显示一个空DecorView，但是会给这个DecorView应用这个Activity指定的Theme，如果这个Activity没有指定Theme就用Application的（Application系统要求必须设置Theme）。

在Theme中可以指定窗口的背景，Activity的ICON，APP整体文字颜色等，如果说没有指定任何属性，就会用默认的属性，也就是上文中提到的空DecorView，所以我们的白屏和黑屏和空DecorView息息相关，我们给APP设置的Style就决定了是白屏还是黑屏。  


- 如果选择了Black的系列的主题那么Activity跳转的时候就是黑屏：

		@android:style/Theme.Black"
- 如果选择了Light的系列的主题那么Activity跳转的时候就是白屏：    

		@android:style/Theme.Light"

## 解决办法
通常的解决办法都是给Activity设置一个透明背景的主题：  

	<style name="SplashTheme" parent="AppTheme">
    	<item name="android:windowFullscreen">true</item>
    	<item name="android:windowIsTranslucent">true</item>
	</style>
如上设置后APP和Activity启动时，我们的StartingWindow会应用我们这个透明背景的主题，跳转时确实没有白屏和黑屏了，但是这样设置会产生如下后果：  

- 给SplashActivity设置后，用户点击我们APP图标后，需要等待2秒左右的时候才会显示contentView。造成了APP启动速度慢的假象，其实Activity已经启动了，只是background是透明的，这时候你点击桌面的其他地方是无效的。这样就和Google的初衷背道而驰了，所以还要继续往下看。  
- 给其他Activity设置后，会导致通过overridePendingTransition设置的启动关闭Activity的动画无效。需要在style中重新写如下几个动画：  

		<style name="AppTheme" parent="AppBaseTheme">
			<item name="android:windowAnimationStyle">@style/Animation.Activity.Translucent.Style</item>
			<item name="android:windowFullscreen">true...
			<item name="android:windowIsTranslucent">true...
		</style>

		<style name="Animation.Activity.Style" parent="@android:style/Animation.Activity">
			<item name="android:activityOpenEnterAnimation">...
			<item name="android:activityOpenExitAnimation">...
			<item name="android:activityCloseEnterAnimation">...
			<item name="android:activityCloseExitAnimation">...
		</style>

		<style name="Animation.Activity.Translucent.Style" parent="@android:style/Animation.Translucent"> 
			<item name="android:windowEnterAnimation">...
			<item name="android:windowExitAnimation">...
		</style>   


- Activity之间的跳转可能偶尔会看到桌面一闪而过（如果SplashActivity和其他Activity都设置了透明）。

小结：一般情况下是只会给SplashActivity设置一个透明背景的主题，其他Activity不会设置，经过实践，这种体验是最好的。但是如果要做到APP秒开还是不行的，和我们的文章开头所分析的原理相斥了。  

# 秒开方案
那像妈妈去哪儿、美团、淘宝等APP是如何实现秒开的？其实看完上面的原理分析，这个基本上也就明白了。

还是从Activity的Theme下手，既然可以让Window白屏黑屏或者透明，那么是不是可以设置其他颜色或者图片来实现APP的秒开呢？答案是肯定的。  
## 原理
我们之前设置了Window透明，实现了去掉白屏和黑屏，现在要弄一个颜色或者图片来代替白屏和黑屏，所以首先要把原来style中的透明属性去掉。然后给Window设置一个背景颜色或者图片。  
## 实现步骤
- 首先在res/drawable下新建一个layer-list，名字随便取，比如splash.xml：  

		<?xml version="1.0" encoding="utf-8"?>
		<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    	<!-- 背景颜色 -->
    	<item android:drawable="@color/white" />

    	<item>
        	<!-- 图片 -->
        	<bitmap
            	android:gravity="center"
            	android:src="@drawable/wel_page" />
    	</item>
		</layer-list>
	layer-list大家都会写吧，上面是背景颜色，下面是一张图，这张图可以是全屏的图，可以是一张小图。如果是全屏的图，那上面的颜色也可以不用设置，如果是小图，就要指定下颜色了，并且可以指定图片在位置。
- 给主题设置Window背景：

		<style name="SplashTheme" parent="AppBaseTheme">
    	<!-- 欢迎页背景引用刚才写好的 -->
    	<item name="android:windowBackground">@drawable/splash</item>
    	<item name="android:windowFullscreen">true</item>
    	<!-- <item name="android:windowIsTranslucent">true</item> --> <!-- 透明背景不要了 -->
		</style>
	上面的<item name="android:windowBackground">可以用我们上面的layer-list作为背景，当然也可以设置个全屏的图片。
- 在AndroidManifest.xml中定义SplashActivity的theme为SplashTheme：  

		<activity android:name=".SplashActivity"
    	android:theme="@style/SplashTheme">
        <intent-filter>
            <action android:name="android.intent.action.MAIN"/>
            <category android:name="android.intent.category.LAUNCHER"/>
        </intent-filter>
		</activity>
- SplashActivity的实现，在onCreate()启动你的MainActivity即可，其他什么都别干：

		public class SplashActivity extends Activity 
		{
    		@Override
    		protected void onCreate(Bundle savedInstanceState) 
			{
        		super.onCreate(savedInstanceState);
        		startActivity(new Intent(this, MainActivity.class));
        		finish();
    		}
		}
	特别注意：为保证启动速度，SplashActivity不要调用setContentView()方法。因为Activity设置了layout，它在App完全初始化完成后才会显示，也会耗时。使用该启动画面实现也能兼容到上面说的白屏和黑屏的问题。跟上面的小结一样，其他Activity不要设置。

	特别更新：博客刚发不久，有人跟我吐槽说，SplashActivity中需要做一个初始化的操作，被我放哪里了？可能是因为在上面第四点中说了个直接启动MainActivity其他什么都不别干，这里可以把MainActivity换成别的InitializeActivity，初始化、引导页的判断可以放在这里，这里都操作完了再启动MainActivity 、CoreActivity等即可。

	当然大多数必要的初始化可以放在Application中（建议再启动一个子线程），因为你的进程说不定什么时候就被系统回收了，这时候直接启动时是启动被系统回收的时候正处于Resume状态的那个Activity，那你的初始化的`Activity就不会被执行了。 


参考：  
[带你重新认识：Android Splash页秒开 Activity白屏 Activity黑屏][2]  
[SplashOpenApp][3]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/app_open_splash.gif
[2]: http://blog.csdn.net/yanzhenjie1003/article/details/52201896
[3]: https://github.com/PGzxc/SplashOpenApp
