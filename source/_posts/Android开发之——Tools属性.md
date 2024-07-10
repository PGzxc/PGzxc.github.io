---
title: Android开发之——Tools属性
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Tools
abbrlink: 96f01fef
date: 2019-08-29 20:06:45
---
## 一 前言
我们先看一张效果图片：协调布局ConstrainLayout中只有一个RecycleView，但是却显示出了数据列表。原因是什么呢？看完本文讲述的Android:Tools一些属性后，你就会明白
![][1]

<!--more-->

## 二  Android:Tools是啥？
* 再讲Android Tools之前，先看下什么是命名空间

### 2.1 命名空间
#### 2.1.1 定义
* namespace即“命名空间”，也称“名称空间” 、”名字空间”。VS.NET中的各种语言使用的一种代码组织的形式 通过名称空间来分类，区别不同的代码功能 同时也是VS.NET中所有类的完全名称的一部分。[百度百科][2]
#### 2.1.2 命名空间作用
* 提供避免元素命名冲突的方法，里面存放的是特性属性的集合；
* 如：android:text和tools:text代表两个不同的属性

#### 2.1.3 命名空间分类
在Android中的命名空间可分为3种，如下：

-  android命名空间：xmlns:android="http://schemas.android.com/apk/res/android;
-  tools命名空间：xmlns:tools="http://schemas.android.com/tools;
-  自定义命名空间：xmlns:app="http://schemas.android.com/apk/res-auto"

### 2.2 Android:Tools
Android Tools属性，能够在布局运行到手机前预览效果，不会污染真实请求后数据的显示。并且在构建应用程序时，构建工具会删除这些属性，这样就不会对APK大小或运行时行为产生影响。有三个主要功能：  

 - 布局错误处理
 - 预览
 - 资源压缩

## 三 Tools功能详解

### 3.1 布局文件错误处理属性  

#### 3.1.1 tools:ignore
* 作用：让Lint 工具在检查代码时忽略指定的错误。
* 取值： tools:ignore="ContentDescription"
* 示例：
  - 处理前：    
  	![][3]
  - 处理后:   
	![][4]

#### 3.1.2 tools:targetApi
* 作用： 指明某个控件只在指定的API 及更高的版本中生效
* 取值：API 版本号对应的 int值
* 示例：RippleDrawable 水波纹(res\drawable\ripple_1.xml)
  - 处理前：    
  	![][5]
  - 处理后:   
	![][6]

#### 3.1.3  tools:locale
* 作用： 指明 resources 中元素的语言类型
* 示例  
		```
	<resources xmlns:tools="http://schemas.android.com/tools"
   tools:locale="zh">
	```
### 3.2 视图预览相关属性
* 以下属性在xml中定义之后，只在预览时会展示，正式部署之后并不会展示

#### 3.2.1 用 tools:xxxx 替代 android:xxxx，只在预览时有效
* 作用对象：View
* 作用：将view的任意属性值的 android 前缀替换为 tools 之后，就可以实现预览效果
* 取值范围：具体取值以view的属性取值为准
* 示例：tools:text,tools:visibility等
  - 预览时：    
  	![][7]
  - 真实显示:   
	![][8]

#### 3.2.2 tools:context
* 作用对象：layout
* 作用：声明该布局文件默认关联的 activity、
* 取值说明：与layout关联的activity的全路径
* 示例：  
	- tools：context
		```
		<android.support.constraint.ConstraintLayout
      		xmlns:android="http://schemas.android.com/apk/res/android"
      		xmlns:tools="http://schemas.android.com/tools"
      		tools:context=".MainActivity" >
    ```
	- tools关联的点击提示
	![][9]

#### 3.2.3 tools:itemCount
* 作用对象：<RecyclerView>
* 作用：在 <RecyclerView> 节点中设置该属性之后，会指定在预览界面中绘制/展示几个条目
* 取值说明：int 类型数值
* 示例：  

	- tools:itemCount  
		```
		<android.support.v7.widget.RecyclerView
     android:id="@+id/recyclerView"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     tools:itemCount="3"/>
  	```
	- 预览效果   
	
		![][10]
        
#### 3.2.4 tools:layout
* 作用对象：	<fragment>
* 作用：声明在预览时将哪个布局文件填充到该Fragment
* 取值说明：布局id 的引用值
* 示例： 

	- tools:layout

    		```
    <fragment
      android:id="@+id/fragment"
      android:layout_width="0dp"
      android:layout_height="0dp"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      tools:layout="@layout/layout_profile_list" />
    ```
	- 预览效果  
		![][11]

#### 3.2.5 tools:listitem 、 tools:listheader 、 tools:listfooter
* 作用对象： <AdapterView>及其子类，如<ListView>
* 作用：在预览界面显示列表、表头、表尾
* 取值说明：布局文件的引用
* 示例：  
	- tools:listitem 、tools:listheader 、tools:listfooter

			```<ListView xmlns:android="http://schemas.android.com/apk/res/android"
     xmlns:tools="http://schemas.android.com/tools"
     android:id="@android:id/list"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     tools:listitem="@layout/item_profile"
     tools:listheader="@layout/sample_list_header"
     tools:listfooter="@layout/sample_list_footer" />
     ```
	- 预览效果    
		![][12]


#### 3.2.6 tools:showIn
* 作用对象：布局文件的根节点
* 作用：声明该布局文件将会被哪个布局通过 <include>引用。
* 注意事项：声明之后，在对应的文件中不要忘了用 <include>引用
* 示例：  
	- 声明：  
			
		```
		<TextView xmlns:android="http://schemas.android.com/apk/res/android"
			 xmlns:app="http://schemas.android.com/apk/res-auto"
			 xmlns:tools="http://schemas.android.com/tools"
			 android:id="@+id/ratingTextView"
			 android:layout_width="match_parent"
			 android:layout_height="match_parent"
			 android:textColor="@color/colorPrimary"
			 android:gravity="center"
			 app:layout_constraintBottom_toBottomOf="parent"
			 app:layout_constraintLeft_toLeftOf="parent"
			 app:layout_constraintRight_toRightOf="parent"
			 app:layout_constraintTop_toTopOf="parent"
			 tools:showIn="@layout/activity_main"
			 tools:text="Header" />
		```

- 引用(activity_main)
	
	```
	<include layout="@layout/sample_list_header"/>
	```

#### 3.2.7  tools:menu
* 作用对象：布局文件的根节点、
* 作用：声明在预览界面中 AppBar 将展示哪些菜单
* 取值：直接填写res/menu/xxx的名字，不需要填写前缀： @menu/或者后缀.xml
* 示例：  
	- munu菜单(tools:menu下显示红色不知为何，但运行到手机里面时没有错误)  
		![][13]  
		![][14]
	- 预览布局 
		![][15]

#### 3.2.8 tools:minValue / tools:maxValue
* 作用对象：<NumberPicker>
* 作用：为NumberPicker 设置预览时的最小值和最大值
* 取值：int 型数值
* 示例

	- 代码  
		
			 ```
		<NumberPicker xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      android:id="@+id/numberPicker"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      tools:minValue="1"
      tools:maxValue="10" />
      ```
    - 预览
         ![][16]

#### 3.2.9 tools:openDrawer
* 作用对象：<DrawerLayout>
* 作用：在预览界面中将 DrawerLayout 打开
* 取值：end、left、right、start
* 注意事项：tools:openDrawer 的取值必须与侧拉窗口的 layout_gravity 的取值一致
* 示例：  

	- 代码  

	    ```
	    <android.support.v4.widget.DrawerLayout 		xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      	   android:id="@+id/drawer_layout"
      	   android:layout_width="match_parent"
      	   android:layout_height="match_parent"
      	  tools:openDrawer="start">
      	  
      		<TextView
        		android:layout_width="match_parent"
        		android:layout_height="match_parent"
        		android:gravity="center"
        		tools:background="@color/colorAccent"
        		tools:text="主内容" />
      
      		<TextView
        		android:layout_width="50dp"
        		android:layout_height="match_parent"
        		android:layout_gravity="start"
        		android:gravity="center"
        		tools:background="#ff00ff"
        		tools:text="侧拉" />
      
	    	</android.support.v4.widget.DrawerLayout>
	    ```
	- 预览
		![][17]

#### 3.2.10 "@tools:sample/*" resources
* 作用对象：支持text文本或者image的view控件

* 作用：为View设置占位文本或图片

* 取值：  

  ​	

  |              属性值              |                        占位符数据说明                        |
  | :------------------------------: | :----------------------------------------------------------: |
  |     @tools:sample/full_names     | 随机组合生成的全名。`@tools:sample/first_names`和`@tools:sample/last_names`. |
  |    @tools:sample/first_names     |                          普通的名字                          |
  |     @tools:sample/last_names     |                           普通姓氏                           |
  |       @tools:sample/cities       |                    来自世界各地的城市名称                    |
  |    @tools:sample/us_zipcodes     |                    随机生成的美国邮政编码                    |
  |     @tools:sample/us_phones      |        随机生成的电话号码格式如下：`(800) 555-xxxx`.         |
  |       @tools:sample/lorem        |                   从拉丁文派生的占位符文本                   |
  |  @tools:sample/date/day_of_week  |                   指定格式的随机日期和时间                   |
  |   `@tools:sample/date/ddmmyy`    |                   指定格式的随机日期和时间                   |
  |    @tools:sample/date/mmddyy     |                   指定格式的随机日期和时间                   |
  |     @tools:sample/date/hhmm      |                   指定格式的随机日期和时间                   |
  |    @tools:sample/date/hhmmss     |                   指定格式的随机日期和时间                   |
  |      @tools:sample/avatars       |                 可用作配置文件化身的矢量绘图                 |
  | @tools:sample/backgrounds/scenic |                       可用作背景的图像                       |

* 示例
	- 布局   	
		```
	<TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      android:gravity="center"
      tools:text="@tools:sample/full_names"
      tools:drawableLeft="@tools:sample/avatars"/>
    ```
	- 预览
		![][18]

### 3.3 资源压缩属性
* 打包输出时，可以进行资源压缩，在 module 的build.gradle 文件作如下修改  
		 ```
android 
	{
    	buildTypes 
		{
        release {
            	shrinkResources true
            	minifyEnabled true
            	proguardFiles getDefaultProguardFile('proguard-android.txt'),'proguard-rules.pro'
        			}
    		}
		} 
	```
#### 3.3.1 tools:shrinkMode
* 作用对象：<resources>
* 作用：开启了资源压缩的构建工具
* 取值：safe(安全模式)、strict(严格模式)    

|  模式  |                             说明                             |
| :----: | :----------------------------------------------------------: |
|  safe  | 保留被显示引用的，或者可能通过[Resources.getIdentifier()](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.android.google.cn%2Freference%2Fandroid%2Fcontent%2Fres%2FResources.html)被动态引用的资源 |
| strict |         保留 resources 或者 代码中 被显示引用的资源          |

* 示例(在res/raw/keep.xml中配置tools:shrinkMode)

  ```
  <?xml version="1.0" encoding="utf-8"?><resources xmlns:tools="http://schemas.android.com/tools"    tools:shrinkMode="strict" />
  ```

#### 3.3.2 tools:keep

* 作用对象：<resources>

* 作用：使用资源压缩去移除未被使用的资源时，该属性将允许你指明哪些资源可以被保留

* 示例(res/raw/keep.xml)

  ```
  <?xml version="1.0" encoding="utf-8"?>
  <resources xmlns:tools="http://schemas.android.com/tools"
   tools:keep="@layout/used_1,@layout/used_2,@layout/*_3" />
  ```

#### 3.3.3 tools:discard

* 作用对象：<resources>

* 作用：当使用资源收缩删除未使用的资源时，此属性允许您指定要手动丢弃的资源

* 示例(res/raw/keep.xml)

  ```
  <?xml version="1.0" encoding="utf-8"?>
  <resources xmlns:tools="http://schemas.android.com/tools"
   tools:discard="@layout/unused_1" />
  ```
## 四 参考
[Android总结：命名空间][19]
[Tools attributes reference][20]
[Android:Tools命名空间原来是有大用处的][21]
[Android 冷兵器 之 tools][22]
[是时候让 Android Tools 属性拯救你了][23]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-effect.png
[2]: https://dwz.cn/MHl1xA75
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-ignore-before.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-ignore-after.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-targetapi-before.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-targetapi-after.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-preview-view-tools-before.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-preview-view-tools-after.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-context-click.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-itemcount-2.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-layout-priview.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-listitem-header-footer.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-menu-before.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-layout-menu-preview.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-layout-menu-after.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-numberpicker-preview.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-drawaer-layout-preview.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-tools-sample-preview.png
[19]: https://blog.csdn.net/p106786860/article/details/53943540
[20]: https://developer.android.google.cn/studio/write/tool-attributes.html
[21]: https://www.jianshu.com/p/2912bcba4465
[22]: https://www.jianshu.com/p/52ba7800d3b9
[23]: https://juejin.im/post/5d500b1a6fb9a06b1417d5c9