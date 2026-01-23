---
title: Android开发之——启动库SplashScreen
abbrlink: 9c9cdac7
date: 2025-10-04 12:25:32
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
---
## 一 概述

```
SplashScreen 是 Android core-splashscreen 库中的一个类
用于在应用启动时显示启动画面(通常包含应用图标或品牌信息)
它支持Android 12+(API 31+)的原生启动画面，并为旧版本 API 提供兼容性
```

<!--more-->

## 二 集成步骤

### 2.1 添加依赖(build.gradle)

```
implementation "androidx.core:core-splashscreen:1.0.1"
```

### 2.2 自定义启动画面主题

1、Theme.SplashScreen

```
1、位置
res/values/themes.xml

2、内容
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
     <!-- 自定义启动画面 -->
     <item name="windowSplashScreenBackground">@color/splash_background</item>
     <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
     <item name="windowSplashScreenAnimationDuration">200</item>
     <item name="postSplashScreenTheme">@style/Theme.SplashScreenDemo</item>
</style>

3、说明
-windowSplashScreenBackground：设置启动画面背景颜色。
-windowSplashScreenAnimatedIcon：设置启动画面图标（API 31+ 支持动画矢量图）。
-windowSplashScreenAnimationDuration：设置图标动画持续时间（毫秒），动画图标设为 0。
-postSplashScreenTheme：启动画面结束后应用的主题。
```

2、Theme.SplashScreen.IconBackground

```
1、位置
res/values/themes.xml

2、内容
<style name="Theme.AppIcon.Starting" parent="Theme.SplashScreen.IconBackground">
     <item name="windowSplashScreenBackground">@color/splash_background</item>
     <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
     <item name="windowSplashScreenIconBackgroundColor">@color/icon_background</item>
     <item name="windowSplashScreenAnimationDuration">200</item>
     <item name="postSplashScreenTheme">@style/Theme.SplashScreenDemo</item>
</style>
```

### 2.3 代码中使用

```
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
          val splashScreen = installSplashScreen()
        // 保持 2 秒
        splashScreen.setKeepOnScreenCondition {
            SystemClock.elapsedRealtime() < 2000
        }
        // 淡出动画
        splashScreen.setOnExitAnimationListener { splashScreenViewProvider ->
            splashScreenViewProvider.view.animate()
                .alpha(0f)
                .setDuration(500)
                .setListener(object : AnimatorListenerAdapter() {
                    override fun onAnimationEnd(animation: Animator) {
                        splashScreenViewProvider.remove()
                    }
                })
        }
        enableEdgeToEdge()
        setContent {
            SplashScreenDemoTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}    
```

### 2.4 在 Manifest 中应用主题

```
<activity
        android:name=".MainActivity"
        android:exported="true"
        android:label="@string/default_name"
        android:theme="@style/Theme.App.Starting">
        <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
       </intent-filter>
</activity>
```

### 2.5 效果图

| 1-继承Theme.SplashScreen | 2-继承Theme.SplashScreen.IconBackground |
| :----------------------: | :-------------------------------------: |
|          ![][1]          |                 ![][2]                  |

## 三 全屏动画(Lottie)

### 3.1 代码逻辑

```
class SplashLottieActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        // 快速结束启动画面
        splashScreen.setKeepOnScreenCondition { false }
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_lottie)

        val lottieView = findViewById<LottieAnimationView>(R.id.lottie_animation)
        lottieView.addAnimatorListener(object : Animator.AnimatorListener {
            override fun onAnimationEnd(animation: Animator) {
                startActivity(Intent(this@SplashLottieActivity, MainActivity::class.java))
                finish()
            }
            override fun onAnimationStart(animation: Animator) {}
            override fun onAnimationCancel(animation: Animator) {}
            override fun onAnimationRepeat(animation: Animator) {}
        })

        // 点击跳过
        lottieView.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }

    private fun lottieNormal() {
        val lottieView = findViewById<LottieAnimationView>(R.id.lottie_animation)
        lottieView.addAnimatorListener(object : Animator.AnimatorListener {
            override fun onAnimationEnd(animation: Animator) {
                startActivity(Intent(this@SplashLottieActivity, MainActivity::class.java))
                finish()
            }

            // 其他回调方法
            override fun onAnimationStart(animation: Animator) {}
            override fun onAnimationCancel(animation: Animator) {}
            override fun onAnimationRepeat(animation: Animator) {}
        })
    }
}
```

### 3.2 效果图

![][3]

## 四 全屏动画(video)

### 4.1 代码逻辑

```
class SplashVideoActivity : ComponentActivity() {
    @SuppressLint("MissingSuperCall")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 安装启动画面，快速过渡
        installSplashScreen().setKeepOnScreenCondition { false }
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_video)

        // 获取 VideoView
        val videoView = findViewById<VideoView>(R.id.video_view)
        // 设置视频路径 (res/raw/splash_video.mp4)
        val videoUri = Uri.parse("android.resource://${packageName}/${R.raw.splash_video}")
        videoView.setVideoURI(videoUri)

        // 视频播放完成时跳转到主 Activity
        videoView.setOnCompletionListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        // 错误处理
        videoView.setOnErrorListener { _, what, extra ->
            // 如果视频播放失败，直接跳转到主 Activity
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            true // 表示错误已处理
        }

        // 开始播放
        videoView.start()

    }
}    
```

### 4.2 效果图

![][4]

## 五 启动图标去除

### 5.1 说明

```
默认的SplashScreen启动会带有图标
下面将介绍几种去除启动图标的方法
```

### 5.2 去除图标

1、在 theme 中去掉(不要设置 `windowSplashScreenAnimatedIco`—不生效)

```
1、位置：
res/values/themes.xml

2、设置内容
<style name="Theme.MyApp.Splash" parent="Theme.SplashScreen">
    <!-- 设置背景颜色 -->
    <item name="windowSplashScreenBackground">@color/white</item>
    
    <!-- 不设置 animatedIcon，即可去掉启动图标 -->
    <!-- <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item> -->

    <!-- 可选：自定义过渡 -->
    <item name="postSplashScreenTheme">@style/Theme.MyApp</item>
</style>

3、效果
-不生效，不设置使用默认icon
```

2、通过代码去除

```
1、位置
代码文件

2、设置内容
 // 去掉图标（通过替换成透明图标）
splashScreen.setOnExitAnimationListener { splashScreenViewProvider ->
        splashScreenViewProvider.iconView?.visibility = View.GONE
        splashScreenViewProvider.remove()
}

3、效果
不生效，仍然使用默认icon
```

3、windowSplashScreenAnimatedIcon使用透明色

```
1、设置
<path
        android:fillColor="#00000000" />
        
2、效果
生效
```

## 六 去除图标后的效果

| 1-Video效果(卡) | 2-Exo效果(流畅) | 3-Lottie效果 |
| :-------------: | :-------------: | :----------: |
|     ![][5]      |     ![][6]      |    ![][7]    |

## 七 参考

* [官方文档—SplashScreen](https://developer.android.google.cn/reference/kotlin/androidx/core/splashscreen/SplashScreen)
* [Github示例—userinterface-samples-过时](https://github.com/android/user-interface-samples)
* [Github示例—androidx-最新](https://github.com/androidx/androidx)
* [本项目示例](https://github.com/PGzxc/SplashScreenDemo)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-normal-1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-icon-2.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-lottie-3.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-video-4.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-video-5.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-expo-6.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-splash-lottie-7.gif