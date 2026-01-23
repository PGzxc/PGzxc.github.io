---
title: Android开发之——基于AppIntro制作引导页
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: e64f0f06
date: 2025-10-05 09:06:10
---
## 一 什么是 AppIntro

```
AppIntro 是一个 Android 库，
用于创建新手引导页，支持滑动页面、自定义布局、权限请求、Lottie 动画等功能。
它基于 ViewPager，提供了比原生 ViewPager2 更简单的 API 和预设样式，适合快速开发。
GitHub 仓库：https://github.com/AppIntro/AppIntro
```

<!--more-->

## 二 添加依赖

### 2.1 添加依赖

```
implementation 'com.github.AppIntro:AppIntro:6.3.1'
implementation 'androidx.appcompat:appcompat:1.7.0' //引导页OnboardingActivity
implementation 'com.airbnb.android:lottie:6.5.2' //添加Lottie自定义Fragement
```

### 2.2 说明

```
1.appcompat：是添加引导页时需要，AppIntro继承AppCompatActivity
2.AppIntro：引导页库
3.lottie：引导页使用全屏Lottie动画时使用
```

## 三 基本功能

### 3.1 创建OnboardingActivity继承自AppIntro

```
package com.pgzxc.appintrodemo


import android.Manifest
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.github.appintro.AppIntro
import com.github.appintro.AppIntroCustomLayoutFragment
import com.github.appintro.AppIntroFragment
import com.pgzxc.appintrodemo.view.CustomSlide

class OnboardingActivity : AppIntro() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    

        // 添加引导页
        addSlide(AppIntroFragment.newInstance(
            title = "欢迎使用",
            description = "这是我们的应用，带你开启新体验！",
            imageDrawable = R.drawable.ic_intro_1,
            backgroundColor = getColor(R.color.intro_background_1)
        ))

        addSlide(AppIntroFragment.newInstance(
            title = "探索功能",
            description = "发现更多有趣的内容！",
            imageDrawable = R.drawable.ic_intro_2,
            backgroundColor = getColor(R.color.intro_background_2)
        ))

        addSlide(AppIntroFragment.newInstance(
            title = "立即开始",
            description = "点击开始，进入主界面！",
            imageDrawable = R.drawable.ic_intro_3,
            backgroundColor = getColor(R.color.intro_background_3)
        ))
    }

    // 用户点击“完成”或“跳过”时的回调
    override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)
        finishOnboarding()
    }

    override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)
        finishOnboarding()
    }

    private fun finishOnboarding() {
        // 保存引导页已显示的状态
        getSharedPreferences("app_prefs", MODE_PRIVATE)
            .edit()
            .putBoolean("onboarding_shown", true)
            .apply()

        // 跳转到主界面
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
```

### 3.2 AppIntroFragment

```
1、说明
AppIntro 内置了默认布局，无需手动创建 XML 布局文件

2、包含
title：标题
description：描述
imageDrawable：图片
backgroundColor：背景颜色
```

### 3.3 声明 OnboardingActivity

1、自定义主题

```
<resources>

    <style name="Theme.AppIntroDemo" parent="android:Theme.Material.Light.NoActionBar" />

    <style name="AppIntroTheme" parent="Theme.AppCompat.NoActionBar">
        <item name="colorPrimary">@color/purple_500</item>
        <item name="colorAccent">@color/teal_200</item>
    </style>
</resources>
```

2、声明 OnboardingActivity

```
<activity
        android:name=".OnboardingActivity"
        android:theme="@style/AppIntroTheme"/>
```

### 3.4 检查是否显示引导页

```
1、位置
在应用启动时（例如 MainActivity 或 SplashActivity），检查是否需要显示引导页：

2、逻辑
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val prefs = getSharedPreferences("app_prefs", MODE_PRIVATE)
    if (!prefs.getBoolean("onboarding_shown", false)) {
        startActivity(Intent(this, OnboardingActivity::class.java))
        finish()
    } else {
        setContentView(R.layout.activity_main)
    }
}
```

### 3.5 图示

![][1]

## 四 自定义功能

### 4.1 自定义按钮

```
1、显示/隐藏按钮
isSkipButtonEnabled = true // 显示“跳过”按钮
isBackButtonVisible = false // 隐藏“返回”按钮
isIndicatorEnabled = true // 显示页面指示器

2、自定义按钮文本
setSkipText("跳过")
setDoneText("开始")
setNextText("下一步")
```

### 4.2 添加自定义 Fragment

```
1、何时使用
需要更复杂的页面布局，可以创建自定义 Fragment

2、自定义CustomSlide
class CustomSlide : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.custom_slide_layout, container, false)
    }
}

3、然后在 OnboardingActivity 中添加
addSlide(CustomSlide())
```

### 4.3 使用 Lottie 动画

```
1、将 Lottie 动画 JSON 文件放入 res/raw 或 assets。


2、添加布局(fragment_lottie_intro.xml)
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:lottie="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:gravity="center"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/black">

    <com.airbnb.lottie.LottieAnimationView
        android:id="@+id/lottieView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        lottie:lottie_rawRes="@raw/live_and_love_in_2018"
        android:scaleType="fitXY"
        lottie:lottie_autoPlay="true"
        lottie:lottie_loop="true" />
</LinearLayout>

3、在 OnboardingActivity 中添加
 // Slide 1: 全屏 Lottie 动画
 addSlide(AppIntroCustomLayoutFragment.newInstance(R.layout.fragment_lottie_intro))
```

### 4.4 权限请求

```
1、说明
AppIntro 支持在引导页中请求权限
用户授予权限后会自动进入下一页。

2、示例
askForPermissions(
        permissions = arrayOf(Manifest.permission.CAMERA),
        slideNumber = 2, // 在第 2 页请求权限
        required = true // 如果拒绝权限，无法继续
    )
```

### 4.5 自定义指示器

```
1、说明
默认使用点状指示器，可以自定义样式

2、示例
setIndicatorColor(
    selectedIndicatorColor = getColor(R.color.selected_dot),
    unselectedIndicatorColor = getColor(R.color.unselected_dot)
)
```

### 4.6 滑动动画

```
1、说明
设置页面切换动画
支持的动画类型包括：Fade、Zoom、Flow、SlideOver 等

2、示例
setTransformer(AppIntroPageTransformerType.Fade)
```

### 4.7 自定义效果

![][2]

## 五 参考

* [Github—AppIntro](https://github.com/AppIntro/AppIntro)
* [Github示例—AppIntroDemo](https://github.com/PGzxc/AppIntroDemo)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-appintro-normal-1.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-appintro-custom-2.gif