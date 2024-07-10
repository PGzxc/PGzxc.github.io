---
title: Android开发之——刷新显示数据变化动画
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 动画
abbrlink: 4bb06e5b
date: 2018-02-04 16:48:42
---
# 前言
先看一个效果，在展开本文的内容。  

![][1]
<!--more-->
# 实现
一般的App在刷新之后会显示本次刷新，增加了多少内容或更新，对于新闻类或直播类，比较常见。那么，这个效果如何实现呢？  

下拉刷新，得到服务器的最新数据后，会得到数据集合的大小与原来的比较，得到所需的值或者这个工作有服务器来完成。    

接下来就是通过动画来显示数据

## 使用类库
动画可以自己实现，本次借助于第三方类库[ViewAnimator][2]实现炫酷的特效，刷新使用SmartRefresh。  
## 导入类库引用
	//刷新-SmartRefreshLayout
    compile 'com.scwang.smartrefresh:SmartRefreshLayout:1.0.4-7'
    //流畅的Android动画库
    compile 'com.github.florent37:viewanimator:1.0.5@aar'
## 布局文件
	<com.scwang.smartrefresh.layout.SmartRefreshLayout
    	xmlns:android="http://schemas.android.com/apk/res/android"
    	xmlns:app="http://schemas.android.com/apk/res-auto"
    	android:id="@+id/refreshLayout"
    	android:layout_width="match_parent"
    	android:layout_height="match_parent"
    	app:srlEnableLoadmore="true">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Hello World!" />

        <RelativeLayout
            android:id="@+id/rl_top_toast"
            android:layout_width="match_parent"
            android:layout_height="30dp"
            android:background="#D6E9F6"
            android:visibility="gone">

            <TextView
                android:id="@+id/tv_toast"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerInParent="true"
                android:text="@string/live_toast"
                android:textColor="#3393D5"
                android:textSize="12sp" />
        </RelativeLayout>

    </RelativeLayout>
	</com.scwang.smartrefresh.layout.SmartRefreshLayout>
## 刷新动画
	private void setListener() 
	{
        refreshLayout.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(RefreshLayout refreshlayout) {
                showToast(new Random().nextInt(10) + 1);
                refreshlayout.finishRefresh();
            }
        });
    }

    private void showToast(int num) 
	{
        tvToast.setText(String.format(getResources().getString(R.string.live_toast), num + ""));
        rlTopToast.setVisibility(View.VISIBLE);
        ViewAnimator.animate(rlTopToast)
                .newsPaper()
                .duration(1000)
                .start()
                .onStop(() -> ViewAnimator.animate(rlTopToast)
                        .bounceOut()
                        .duration(1000)
                        .start());
    }
## 效果
![][3]

参考：  
[RefreshAnimal][4]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-refresh_animal.png
[2]: https://github.com/florent37/ViewAnimator
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-refresh.gif
[4]: https://github.com/PGzxc/RefreshAnimal