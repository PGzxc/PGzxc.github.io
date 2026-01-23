---
title: Android开发之——7.0适配之应用之间共享文件(FileProvider)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - FileProvider
abbrlink: f6618f6d
date: 2018-01-07 16:21:10
---
# 前言  
Android 7.0强制启用了被称作StrictMode的策略，带来的影响就是你的App对外无法暴露file://类型的URI了。  

如果你使用Intent携带这样的URI去打开外部App(比如：打开系统相机拍照)，那么会抛出FileUriException异常。  
官方给出解决这个问题的方案，就是使用FileProvider：  
![][1]  
<!--more-->  
我们来看一段代码：  

	String cachePath = getApplicationContext().getExternalCacheDir().getPath();
	File picFile = new File(cachePath, "test.jpg");
	Uri picUri = Uri.fromFile(picFile);
	Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	intent.putExtra(MediaStore.EXTRA_OUTPUT, picUri);
	startActivityForResult(intent, 100);  
这是常见的打开系统相机拍照的代码，拍照成功后，照片会存储在picFile文件中。   

这段代码在Android7.0之前是没有任何问题的(奇葩情况忽略)，但是如果你尝试在7.0的系统上运行，会抛出FileUriException异常。   
# 使用FileProvider  
FileProvider使用大概分为以下几个步骤：  

- manifest中申明FileProvider  
- res/xml中定义对外暴露的文件夹路径  
- 生成content://类型的Uri  
- 给Uri授予临时权限  
- 使用Intent传递Uri  

我们分别看下面这几个步骤的具体实现吧      
## manifest中申明FileProvider  

	<manifest>
		...
	<application>
    	...
    <provider
        android:name="android.support.v4.content.FileProvider"
        android:authorities="com.mydomain.fileprovider"
        android:exported="false"
        android:grantUriPermissions="true">
        ...
    </provider>
    ...
	</application>
	</manifest>  

- android:name：provider你可以使用v4包提供的FileProvider，或者自定义你自己的，只需要在name申明就好了，一般使用系统的就足够了。
- Android：authorities:类似schema，命名空间之类，后面会用到。
- Android：exported:false表示我们的providr不需要对外开发。  
- Android：grantUriPermissions:申明为true，你才能获取临时共享权限。  

## res/xml中定义对外暴露的文件夹路径  
新建file_paths.xml，文件名随便起，后面会引用到。  

	<paths xmlns:android="http://schemas.android.com/apk/res/android">
	<files-path name="my_images" path="images"/>
	</paths>   
- name:一个引用字符串 
- path:文件夹"相对路径"，完整路径取决于当前的标签类型。  
path可以为空，表示指定目录下的所有文件、文件夹都可以被共享。  
### <paths>这个元素内可以包含一下一个或多个，具体如下： 
 
- 物理路径Context.getFilesDir()+"/path/"

	<files-path name="name",path="path">

- 物理路径Context.getCacheDir()+"/path/"

	<cache-path name="name" path="path">
- 物理路径Environment.getExternalStorageDirectory()+"/path/"  

	<external-path name="name" path="path">  

- 物理路径Context.getExternalFilesDir(String)+"/path/"  

	<external-file-path name="name" path="path"> 
- 物理路径Context.getExternalCacheDir()+"/path/" 

	<external-cache-path name="name" path="path">
注意：external-cache-path在support-v4:24.0.0这个版本并不支持，直到support-v4:25.0.0才支持。  

- 番外：以上是官方提供的几种path类型，不过如果你想使用外置SD卡，可以用这个:  

	<root-path name="name" path="path"> 
物理路径相当于/path/  
这个官方文档并没有给出，我们可以查看源码可以发现：  
![][2]  
### 编写好file_paths.xml，我们在manifest中的provider这样使用：  

	<provider
		android:name="android.support.v4.content.FileProvider"
		android:authorities="com.mydomain.fileprovider"
		android:exported="false"
		android:grantUriPermissions="true">
	<meta-data
      android:name="android.support.FILE_PROVIDER_PATHS"
      android:resource="@xml/file_paths" />
	</provider>
## 生成content://类型的Uri   
我们通常通过File生成Uri的代码是这样：  

	File picFile=xxx;
	Uri picUri=Uri.fromFile(picFile);
这样生成的Uri，路径格式为file://xxx。前面我们也说了这种Uri是无法再App之间共享的，我们需要生成content://xxx类型的Uri，方法就是通过context.getUriFromFile来实现：   

	File imagePath=new File(Context.getFilesDir(),"images");  
	File newFile=new File(imagePath,"default_image.jpg");
	Uri contentUri=getUriForFile(getContext(),"com.mydmain.fleprovider",newFile);  

- imagePath  
使用的路径需要和你在file_paths.xml申明的其中一个符合(或者子文件夹："images/work")。当然，你可以申明N个你需要共享的路径： 
 
		<paths xmlns:android="http://schemas.android.com/apk/res/android">    
	  	<files-path name="my_images" path="images"/>    
	  	<files-path name="my_docs" path="docs"/>
	  	<external-files-path name="my_video" path="video" />
	  	//...
		</paths>
- getUriForFile  
第一个参数是Context；第二个参数，就是我们之前在manifest#provider中定义的android:authorities属性的值；第三个参数是File.  

## 给Uri授予临时权限  

	intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

FLAG_GRANT_READ_URI_PERMISSION：表示读取权限；  
FLAG_GRANT_WRITE_URI_PERMISSION：表示写入权限；  
你可以同时或单独使用这两个权限，视你的需求而定。  
## 使用Intent传递Uri  
以开头的拍照代码作为示例，需要这样改写：  

	// 重新构造Uri：content://
	File imagePath = new File(Context.getFilesDir(), "images");
	if (!imagePath.exists()){imagePath.mkdirs();}
	File newFile = new File(imagePath, "default_image.jpg");
	Uri contentUri = getUriForFile(getContext(), 
                 "com.mydomain.fileprovider", newFile);
	Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	intent.putExtra(MediaStore.EXTRA_OUTPUT, contentUri);
	// 授予目录临时共享权限
	intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION
               | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
	startActivityForResult(intent, 100);


参考：  
[Android 7.0适配-应用之间共享文件(FileProvider)][3]  
[Android 7.0 行为变更 通过FileProvider在应用间共享文件吧][4]  
[快速使用FileProvider解决Android7.0文件权限问题][5]  
[Android 7.0 FileProvider的使用][6]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/fileprovider.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/fileprovider-path.png
[3]: https://www.jianshu.com/p/55eae30d133c  
[4]: http://blog.csdn.net/lmj623565791/article/details/72859156  
[5]: http://blog.csdn.net/xifengwanzhao/article/details/53587234
[6]: http://blog.csdn.net/yq6073025/article/details/52934326

