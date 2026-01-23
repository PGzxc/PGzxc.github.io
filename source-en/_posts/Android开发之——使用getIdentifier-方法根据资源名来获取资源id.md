---
title: Android开发之——使用getIdentifier()方法根据资源名来获取资源id
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Identifier
abbrlink: ba9a138a
date: 2019-09-20 20:15:43
---
## 一 前言
本文主要讲述通过getIdentifier()方法根据资源名获取资源id，并根据获取到的资源id进行相应的操作；   

* 根据布局名字获取id设置ContentView(要显示布局)
* 根据drawable图片名字获取资源id，设置显示图片
* 根据mipmap图片名字获取资源id，设置显示图片
* 根据R.string.xx名字资源id，设置字符串
* 根据R.dimen.xx名字获取资源id，设置文字大小
* 根据R.color.xx名字获取资源id,设置文字颜色
* 根据R.style.xx名字获取资源id，设置文字样式
* 其他(R.anim.xx，R.array.xx,R.attr.xx等)

<!--more-->
![][1]

## 二 Demo示例
### 2.1 代码结构
![][2]

### 2.2 代码功能
#### 2.2.1 根据布局名字获取id设置ContentView(要显示布局)

```
val layoutID=resources.getIdentifier("activity_main","layout",packageName)   
 setContentView(layoutID)
```

注：  

* setContentView(layoutID)代替setContentView(R.layout.activity_main)
* 项目正常启动且正确显示

#### 2.2.2 根据drawable图片名字获取资源id，设置显示图片

```
//获取Drawable图片资源的ID
val drawableId=resources.getIdentifier("ic_launcher","drawable",packageName)
val idDrawable=resources.getDrawable(drawableId)
idDrawable.bounds.set(0,0,idDrawable.minimumWidth,idDrawable.minimumHeight)
tvIdentifierDrawable.text=String.format(Locale.CHINA,"Drawable资源ID=%s",drawableId)
tvIdentifierDrawable.setCompoundDrawables(null,null,null,idDrawable)
```
注：  

* tvIdentifierDrawable 是TextView的ID
* 获取的drawableID用于给TextView设置drarableBottom显示图片

#### 2.2.3 根据mipmap图片名字获取资源id，设置显示图片

```
 //获取mipmap图片资源的ID
val mipmapId=resources.getIdentifier("ic_launcher_round","mipmap",packageName)
val idMipmap=resources.getDrawable(mipmapId)
idMipmap.bounds.set(0,0,idMipmap.minimumWidth,idMipmap.minimumHeight)
tvIdentifierMipMap.text=String.format(Locale.CHINA,"Mipmap资源ID=%s",mipmapId)
tvIdentifierMipMap.setCompoundDrawables(null,null,null,idMipmap)
```
注：  

* tvIdentifierMipMap 是TextView的ID
* 获取的mipmapId用于给TextView设置drarableBottom显示图片

#### 2.2.4 根据R.string.xx名字资源id，设置字符串

```
 //获取String字符串
val stringID=resources.getIdentifier("app_name","string",packageName)
tvIdentifierString.text=String.format(Locale.CHINA,"String资源ID(%s)=%s",stringID,getString(stringID))
```

注：  

* stringID是R.string.app_name通过getIdentifier获取的资源id
* 通过TextView.setText(R.id.stringID)来显示或者getString(stringID)(kotlin中赋值)


#### 2.2.5 根据R.dimen.xx，R.color.xx,获取资源id，设置文字大小和颜色
``` 
  //获取Dimen大小，颜色等
val dimenID=resources.getIdentifier("sp_30","dimen",packageName)
val colorID=resources.getIdentifier("colorAccent","color",packageName)
val size=getString(dimenID)
tvIdentifierDimen.apply {
	text=String.format(Locale.CHINA,"Dimen资源ID=%s,Color资ID=%s",dimenID,colorID)        		textSize=getString(dimenID).substring(0,getString(dimenID).indexOf("sp")).toFloat()
	 setTextColor(resources.getColor(colorID))
        
}
```

注：  

* dimenID是R.dimen.sp_30通过getIdentifier获取的资源id
* colorID是R.color.colorAccent通过getIdentifier获取的资源id
* TextView.apply给textView中的文字大小和颜色赋值  


#### 2.2.6 根据R.style.xx名字获取资源id，设置文字样式
```  
 //获取style
val styleID=resources.getIdentifier("MatchMatch","style",packageName)
println(styleID)
tvIdentifierStyle.setTextAppearance(this,styleID)
```

注：             

* style样式  
```
 <style name="MatchMatch">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">@dimen/dp_15</item>
        <item name="android:textStyle">bold</item>
        <item name="android:textSize">20sp</item>
        <item name="android:textColor">@color/colorPrimary</item>
    </style>
```

* TextView.setTextAppearance给textView设置样式  


## 三 R文件信息(Kotlin模式下)
### 3.1 R文件的位置
* app/build/intermediates/javac/debug/classes/package/R.class   

	![][3]

### 3.2 R文件结构  
* Windows 下按 Alt+7，Mac 下应该是 Command+7
	
	![][4]

### 3.3 根据获取到的值跟R文件中的值对比  
* 对比通过代码获取的值
* 查询R文件中对应的值
* 两者对比是否相同 


## 四 getIdentifier()源码查询 

```
    int getIdentifier(String name, String defType, String defPackage) {
        if (name == null) {
            throw new NullPointerException("name is null");
        }
        try {
            return Integer.parseInt(name);
        } catch (Exception e) {
            // Ignore
        }
        return mAssets.getResourceIdentifier(name, defType, defPackage);
    }
```


## 五 其他

参考：    

* [Android获取所有应用的资源id和对应的uri][5]  
* [【我的Android进阶之旅】Android使用getIdentifier()方法根据资源名来获取资源id][6]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-identifier-view.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-identifier-struct.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-identifier-r.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-identifier-r-struct.png
[5]: https://www.jianshu.com/p/d3aed93dfbc6
[6]: https://blog.csdn.net/ouyang_peng/article/details/53328000#commentBox